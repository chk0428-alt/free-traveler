#!/usr/bin/env python3
"""
audit_tasks.py — Traveler Task List / Task 상세 파일 최종 감사 스크립트.

대상:
  - TASKS/00_TASK_LIST.md   (16열 Task 표, 카테고리별로 여러 테이블에 분산 + NON_IMPLEMENTATION 표)
  - TASKS/TASK-<ID>.md      (Task 상세, 1개 Task = 1개 파일)
  - docs/PROJECT_SCOPE.md   (Implementation Status 정본 교차 확인)
  - design-reference/SCREEN_ROUTE_CONTRACT.json (Screen/Route/Page Entry 정본)

정적 검사만 수행하며 코드를 실행하거나 외부 서비스를 호출하지 않는다.

산출물(항상 생성 시도):
  - TASKS/TASK_MANIFEST.csv
  - TASKS/TASK_AUDIT_REPORT.md

종료 코드:
  0 = 모든 검사 통과 → 표준출력에 "AUDIT_PASS"와 검사 수 출력
  1 = 하나 이상 검사 실패
  2 = NO_ARTIFACTS(TASKS/00_TASK_LIST.md가 아직 없음 — 매니페스트/리포트도 만들지 않는다)
"""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HARNESS_SCHEMA = "traveler-screen-route-v1"

TASKLIST_PATH = REPO_ROOT / "TASKS" / "00_TASK_LIST.md"
TASKS_DIR = REPO_ROOT / "TASKS"
PROJECT_SCOPE_PATH = REPO_ROOT / "docs" / "PROJECT_SCOPE.md"
SCREEN_ROUTE_CONTRACT_PATH = REPO_ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
MANIFEST_CSV_PATH = TASKS_DIR / "TASK_MANIFEST.csv"
AUDIT_REPORT_PATH = TASKS_DIR / "TASK_AUDIT_REPORT.md"

EXPECTED_SCREENS = ["SCR-001", "SCR-002", "SCR-003", "SCR-004", "SCR-005"]

ALLOWED_DB_TABLES = {
    "user_profile",
    "mate_post",
    "mate_application",
    "user_block",
    "report",
    "outbound_link_setting",
}
# "6개 기본 테이블을 크게 넘지 않음" — 소량의 초과(오탐/보조 식별자)는 허용하되
# 그 이상은 DB 범위 확장으로 간주해 실패시킨다.
DB_TABLE_OVERAGE_TOLERANCE = 2

FORBIDDEN_PATTERNS = [
    (r"\bEC2\b", "EC2 인프라 Task 금지"),
    (r"\bAWS\b", "AWS 리소스 프로비저닝 Task 금지"),
    (r"Auto[- ]?[Mm]erge|자동\s*병합|머지\s*러너|[Mm]erge\s*[Rr]unner", "자동 Merge Task 금지"),
]
NEGATION_MARKERS = ["금지", "않는다", "없음", "미포함", "제외", "허용하지"]

REQ_REF_RE = re.compile(r"REQ-(?:FUNC|NF)-\d{3}")

results: list[tuple[int, str, bool, str]] = []


def check(num: int, name: str, ok: bool, detail: str = "") -> bool:
    results.append((num, name, ok, detail))
    return ok


def strip_bt(s: str) -> str:
    return s.strip().strip("`").strip()


def split_cell_list(s: str) -> list[str]:
    if not s or s.strip() == "-":
        return []
    return [x.strip() for x in s.split(",") if x.strip()]


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------

def parse_task_rows(text: str) -> list[dict]:
    body = text[: text.index("## NON_IMPLEMENTATION")] if "## NON_IMPLEMENTATION" in text else text
    tasks = []
    for line in body.splitlines():
        s = line.strip()
        if not s.startswith("|"):
            continue
        m = re.match(r"^\| *(\d+) *\|", s)
        if not m:
            continue
        cells = [c.strip() for c in s.strip("|").split("|")]
        if len(cells) != 16:
            continue
        (
            seq, task_id, title, category, impl_status, req_ref, screen, route,
            page_entry, depends_on, expected_files, functional_ac, visual_ac,
            security_ac, verify, priority,
        ) = cells
        tasks.append(
            {
                "seq": seq,
                "task_id": task_id,
                "title": title,
                "category": category,
                "impl_status": impl_status,
                "req_ref_raw": req_ref,
                "req_ref": REQ_REF_RE.findall(req_ref),
                "screen_raw": screen,
                "screen": [x.strip() for x in screen.split(",") if x.strip() and x.strip() != "-"],
                "route_raw": route,
                "route": [strip_bt(x) for x in route.split(",")] if route.strip() != "-" else [],
                "page_entry_raw": page_entry,
                "page_entry": [strip_bt(x) for x in page_entry.split(",")] if page_entry.strip() != "-" else [],
                "depends_on": split_cell_list(depends_on),
                "expected_files_raw": expected_files,
                "functional_ac": functional_ac,
                "visual_ac": visual_ac,
                "security_ac": security_ac,
                "verify_raw": verify,
                "verify": split_cell_list(verify),
                "priority": priority,
            }
        )
    return tasks


def parse_non_implementation(text: str) -> set[str]:
    if "## NON_IMPLEMENTATION" not in text:
        return set()
    section = text[text.index("## NON_IMPLEMENTATION") :]
    return set(re.findall(r"^\| *(REQ-(?:FUNC|NF)-\d{3}) *\|", section, re.MULTILINE))


def load_project_scope_status() -> dict[str, str]:
    """Cross-reference: {REQ-ID: 'IMPLEMENT'|'EXCLUDED'} from docs/PROJECT_SCOPE.md."""
    if not PROJECT_SCOPE_PATH.exists():
        return {}
    text = PROJECT_SCOPE_PATH.read_text(encoding="utf-8")
    rows = [m.group(0) for m in re.finditer(r"^\|\s*REQ-(?:FUNC|NF)-\d{3}(?!~)[^\n]*$", text, re.MULTILINE)]
    out: dict[str, str] = {}
    for row in rows:
        rm = re.search(r"(REQ-(?:FUNC|NF)-\d{3})", row)
        if not rm:
            continue
        req_id = rm.group(1)
        if "EXCLUDED" in row:
            out[req_id] = "EXCLUDED"
        elif "IMPLEMENT" in row:
            out[req_id] = "IMPLEMENT"
    return out


def load_screen_route_contract() -> dict:
    if not SCREEN_ROUTE_CONTRACT_PATH.exists():
        return {}
    return json.loads(SCREEN_ROUTE_CONTRACT_PATH.read_text(encoding="utf-8"))


def read_detail_files() -> dict[str, str]:
    out = {}
    for p in sorted(TASKS_DIR.glob("TASK-*.md")):
        out[p.stem[len("TASK-") :]] = p.read_text(encoding="utf-8")
    return out


# ---------------------------------------------------------------------------
# 1. Task List 구현 ID와 상세 Task 파일 1:1
# ---------------------------------------------------------------------------

def check_01_one_to_one(tasks, detail_files):
    task_ids = {t["task_id"] for t in tasks}
    detail_ids = set(detail_files.keys())
    missing = sorted(task_ids - detail_ids)
    orphan = sorted(detail_ids - task_ids)
    check(
        1, "Task List 구현 ID와 상세 Task 파일 1:1",
        not missing and not orphan,
        f"상세 없음: {missing}; 고아 파일: {orphan}" if (missing or orphan) else f"{len(task_ids)}개 전부 1:1",
    )


# ---------------------------------------------------------------------------
# 2. 중복 Task ID 0
# ---------------------------------------------------------------------------

def check_02_no_dup_ids(tasks):
    ids = [t["task_id"] for t in tasks]
    dups = sorted({i for i in ids if ids.count(i) > 1})
    check(2, "중복 Task ID 0", len(dups) == 0, f"중복: {dups}" if dups else "0건")


# ---------------------------------------------------------------------------
# 3. Depends On 누락 0 (dangling reference)
# ---------------------------------------------------------------------------

def check_03_depends_on_missing(tasks):
    valid_ids = {t["task_id"] for t in tasks}
    dangling = [(t["task_id"], d) for t in tasks for d in t["depends_on"] if d not in valid_ids]
    check(3, "Depends On 누락 0(존재하지 않는 Task 참조)", len(dangling) == 0, f"{dangling}" if dangling else "0건")


# ---------------------------------------------------------------------------
# 4. Dependency Cycle 0
# ---------------------------------------------------------------------------

def check_04_no_cycles(tasks):
    graph = {t["task_id"]: t["depends_on"] for t in tasks}
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {tid: WHITE for tid in graph}
    cycles: list[list[str]] = []
    stack: list[str] = []

    def dfs(node: str):
        if node not in color:
            return
        color[node] = GRAY
        stack.append(node)
        for dep in graph.get(node, []):
            if dep not in color:
                continue
            if color[dep] == GRAY:
                idx = stack.index(dep)
                cycles.append(stack[idx:] + [dep])
            elif color[dep] == WHITE:
                dfs(dep)
        stack.pop()
        color[node] = BLACK

    for tid in graph:
        if color[tid] == WHITE:
            dfs(tid)

    check(4, "Dependency Cycle 0", len(cycles) == 0, f"발견된 순환: {cycles}" if cycles else "0건")


# ---------------------------------------------------------------------------
# 5. Screen 5개 모두 Page Owner 정확히 1개
# ---------------------------------------------------------------------------

def check_05_page_owner_per_screen(tasks):
    owners = [t for t in tasks if t["category"] == "PAGE_OWNER"]
    owner_screens = [s for t in owners for s in t["screen"]]
    from collections import Counter
    counts = Counter(owner_screens)
    problems = []
    for scr in EXPECTED_SCREENS:
        if counts.get(scr, 0) != 1:
            problems.append(f"{scr}: {counts.get(scr, 0)}개")
    extra_screens = [s for s in counts if s not in EXPECTED_SCREENS]
    if extra_screens:
        problems.append(f"미정의 Screen에 Owner 존재: {extra_screens}")
    check(5, "Screen 5개 모두 Page Owner 정확히 1개", len(problems) == 0, "; ".join(problems) if problems else "5/5 확인")


# ---------------------------------------------------------------------------
# 6. Route·Page Entry·Expected Files 일치
# ---------------------------------------------------------------------------

def check_06_route_page_entry_consistency(tasks, contract):
    canonical = {s["screen_id"]: s for s in contract.get("screens", [])}
    problems = []

    for t in tasks:
        # Route: 나열된 Screen 순서와 canonical route가 1:1로 일치해야 한다.
        if t["screen"]:
            expected_routes = [canonical[s]["route"] for s in t["screen"] if s in canonical]
            if len(expected_routes) == len(t["screen"]) and t["route"] != expected_routes:
                problems.append(f"{t['task_id']}: route {t['route']} != 정본 {expected_routes}")

        if t["category"] == "PAGE_OWNER":
            # Page Owner는 canonical page.tsx 자체를 실제로 만들거나 수정하는 유일한 Task이므로
            # page_entry가 정본과 정확히 같아야 하고 Expected Files에도 그 경로가 있어야 한다.
            scr = t["screen"][0] if t["screen"] else None
            expected_pe = canonical.get(scr, {}).get("page_entry")
            if expected_pe and t["page_entry"] != [expected_pe]:
                problems.append(f"{t['task_id']}: page_entry {t['page_entry']} != 정본 {expected_pe}")
            if expected_pe and expected_pe not in t["expected_files_raw"]:
                problems.append(f"{t['task_id']}: Expected Files에 정본 page_entry({expected_pe}) 없음")

        elif t["category"] == "API":
            # API Task의 page_entry는 실제로 자신이 만드는 Server Action 파일이어야 하므로
            # Expected Files와 일치해야 하고, 같은 인덱스의 Screen 라우트 디렉터리 하위여야 한다.
            for i, pe in enumerate(t["page_entry"]):
                if pe not in t["expected_files_raw"]:
                    problems.append(f"{t['task_id']}: Page Entry '{pe}'가 Expected Files에 없음")
                scr = t["screen"][i] if i < len(t["screen"]) else (t["screen"][0] if t["screen"] else None)
                root = canonical.get(scr, {}).get("page_entry", "")
                prefix = root.rsplit("/", 1)[0] + "/" if "/" in root else ""
                if prefix and not pe.startswith(prefix):
                    problems.append(f"{t['task_id']}: Page Entry '{pe}'가 {scr} 디렉터리('{prefix}') 밖")

        else:
            # Component/Infra/Data/Test 등은 page_entry를 "이 Task가 속한 Route" 참고 정보로만
            # 기록하며, 실제 소유 파일이 아니므로 Expected Files 일치를 요구하지 않는다.
            # 다만 값이 있다면 canonical page_entry와 동일하거나(같은 Route 소속) '-' 여야 한다.
            for i, pe in enumerate(t["page_entry"]):
                scr = t["screen"][i] if i < len(t["screen"]) else (t["screen"][0] if t["screen"] else None)
                expected_pe = canonical.get(scr, {}).get("page_entry")
                if expected_pe and pe != expected_pe:
                    problems.append(f"{t['task_id']}: Page Entry '{pe}'가 {scr}의 정본 Route({expected_pe})와 다름")

    check(
        6, "Route·Page Entry·Expected Files 일치",
        len(problems) == 0,
        "; ".join(problems[:20]) + (" ... 외 더 있음" if len(problems) > 20 else "") if problems else "전건 일치",
    )


# ---------------------------------------------------------------------------
# 7. Component-only Screen 0
# ---------------------------------------------------------------------------

def check_07_no_component_only_screen(tasks):
    owner_screens = {s for t in tasks if t["category"] == "PAGE_OWNER" for s in t["screen"]}
    component_screens = {s for t in tasks if t["category"] == "COMPONENT" for s in t["screen"]}
    orphaned = sorted(component_screens - owner_screens)
    check(
        7, "Component-only Screen 0(Owner 없이 Component만 존재하는 Screen 없음)",
        len(orphaned) == 0,
        f"Owner 없는 Screen: {orphaned}" if orphaned else "0건",
    )


# ---------------------------------------------------------------------------
# 8. SCR-001 Starter 제거 AC 존재
# ---------------------------------------------------------------------------

def check_08_scr001_starter_ac(tasks, detail_files):
    owner = next((t for t in tasks if t["category"] == "PAGE_OWNER" and "SCR-001" in t["screen"]), None)
    if not owner:
        check(8, "SCR-001 Starter 제거 AC 존재", False, "SCR-001 Page Owner Task 없음")
        return
    content = detail_files.get(owner["task_id"], "")
    ok = bool(re.search(r"[Ss]tarter|스타터|기본\s*템플릿", content))
    check(8, "SCR-001 Starter 제거 AC 존재", ok, "" if ok else f"{owner['task_id']} 상세에서 키워드 미발견")


# ---------------------------------------------------------------------------
# 9. SCR-003 세 탭 조립 AC 존재
# ---------------------------------------------------------------------------

def check_09_scr003_three_tabs(tasks, detail_files):
    owner = next((t for t in tasks if t["category"] == "PAGE_OWNER" and "SCR-003" in t["screen"]), None)
    by_id = {t["task_id"]: t for t in tasks}
    if not owner:
        check(9, "SCR-003 세 탭 조립 AC 존재", False, "SCR-003 Page Owner Task 없음")
        return
    dep_titles = " ".join(by_id[d]["title"] for d in owner["depends_on"] if d in by_id)
    content = detail_files.get(owner["task_id"], "")
    has_flight = "항공" in dep_titles or "항공" in content
    has_hotel = "숙소" in dep_titles or "숙소" in content
    has_mate = "동행" in dep_titles or "동행" in content
    ok = has_flight and has_hotel and has_mate
    check(9, "SCR-003 세 탭 조립 AC 존재", ok, f"항공={has_flight}, 숙소={has_hotel}, 동행={has_mate}")


# ---------------------------------------------------------------------------
# 10. SCR-005 역할별 상태 조립 AC 존재
# ---------------------------------------------------------------------------

def check_10_scr005_roles(tasks, detail_files):
    owner = next((t for t in tasks if t["category"] == "PAGE_OWNER" and "SCR-005" in t["screen"]), None)
    if not owner:
        check(10, "SCR-005 역할별 상태 조립 AC 존재", False, "SCR-005 Page Owner Task 없음")
        return
    content = detail_files.get(owner["task_id"], "")
    has_guest = bool(re.search(r"Guest|게스트|비로그인", content))
    has_member = bool(re.search(r"Member|회원|프로필", content))
    has_admin = bool(re.search(r"Admin|관리자", content))
    ok = has_guest and has_member and has_admin
    check(10, "SCR-005 역할별 상태 조립 AC 존재", ok, f"Guest={has_guest}, Member={has_member}, Admin={has_admin}")


# ---------------------------------------------------------------------------
# 11. DB Schema·RLS·Access·Seed Task 존재
# ---------------------------------------------------------------------------

def check_11_db_tasks_present(tasks):
    ids = {t["task_id"] for t in tasks if t["category"] == "DB"}
    required = {"DB-SCHEMA-BASE", "DB-RLS-BASE", "DB-ACCESS", "DB-SEED-BASE"}
    missing = sorted(required - ids)
    check(11, "DB Schema·RLS·Access·Seed Task 존재", len(missing) == 0, f"누락: {missing}" if missing else "4/4 존재")


# ---------------------------------------------------------------------------
# 12. DB Table 범위가 6개 기본 테이블을 크게 넘지 않음
# ---------------------------------------------------------------------------

def check_12_db_table_scope(detail_files):
    found_tables: set[str] = set()
    for content in detail_files.values():
        for m in re.finditer(r"`([a-z][a-z0-9_]*)`\s*테이블", content):
            found_tables.add(m.group(1))
    extra = sorted(found_tables - ALLOWED_DB_TABLES)
    ok = len(extra) <= DB_TABLE_OVERAGE_TOLERANCE
    check(
        12, f"DB Table 범위가 6개 기본 테이블을 크게 넘지 않음(허용 초과 {DB_TABLE_OVERAGE_TOLERANCE}개까지)",
        ok,
        f"기본 6개: {sorted(ALLOWED_DB_TABLES)}; 추가 발견: {extra}" if extra else f"기본 6개만 사용: {sorted(found_tables)}",
    )


# ---------------------------------------------------------------------------
# 13. 외부 입력 비저장 AC 존재 (항공/숙소 입력값 서버·DB·URL 미전달)
# ---------------------------------------------------------------------------

def check_13_external_input_not_stored(tasks, detail_files):
    targets = [
        t for t in tasks
        if t["task_id"] in ("COMP-SCR003-FLIGHT-FORM", "COMP-SCR003-HOTEL-FORM", "INFRA-OUTBOUND-LINK")
        or "REQ-NF-017" in t["req_ref"]
    ]
    missing = []
    for t in targets:
        content = detail_files.get(t["task_id"], "")
        combined = t["functional_ac"] + " " + t["security_ac"] + " " + content
        has_server = "서버" in combined
        has_negation = bool(re.search(r"미전달|미전송|전달하지\s*않|저장하지\s*않|보내지\s*않", combined))
        if not (has_server and has_negation):
            missing.append(t["task_id"])
    check(
        13, "외부 입력(항공·숙소) 비저장 AC 존재",
        len(missing) == 0,
        f"AC 미확인 Task: {missing}" if missing else f"{len(targets)}개 Task에서 확인",
    )


# ---------------------------------------------------------------------------
# 14. Auth·성인·기본 RLS AC 존재
# ---------------------------------------------------------------------------

def check_14_auth_adult_rls(detail_files):
    all_text = "\n".join(detail_files.values())
    has_auth = bool(re.search(r"인증|로그인|Auth", all_text))
    has_adult = "성인" in all_text
    has_rls = "RLS" in all_text
    ok = has_auth and has_adult and has_rls
    check(14, "Auth·성인·기본 RLS AC 존재", ok, f"Auth={has_auth}, 성인확인={has_adult}, RLS={has_rls}")


# ---------------------------------------------------------------------------
# 15. Playwright Chromium Smoke Task 존재
# ---------------------------------------------------------------------------

def check_15_playwright_chromium(tasks, detail_files):
    e2e_tasks = [t for t in tasks if t["category"] == "E2E_TEST"]
    if not e2e_tasks:
        check(15, "Playwright Chromium Smoke Task 존재", False, "E2E_TEST Task 없음")
        return
    bad = []
    for t in e2e_tasks:
        content = detail_files.get(t["task_id"], "")
        mentions_chromium = "Chromium" in content or "Chromium" in t["title"]
        # Firefox/WebKit/Safari가 언급되어도 그 줄이 금지 문구("추가하지 않는다" 등)라면
        # 다른 브라우저를 실제로 쓰겠다는 뜻이 아니므로 위반으로 보지 않는다.
        mentions_other_browser = False
        for line in content.split("\n"):
            if any(marker in line for marker in NEGATION_MARKERS):
                continue
            if re.search(r"\bFirefox\b|\bWebKit\b|\bSafari\b", line):
                mentions_other_browser = True
                break
        if not mentions_chromium or mentions_other_browser:
            bad.append(t["task_id"])
    ok = len(bad) == 0
    check(
        15, "Playwright Chromium Smoke Task 존재",
        ok,
        f"E2E_TEST {len(e2e_tasks)}개 중 문제: {bad}" if bad else f"E2E_TEST {len(e2e_tasks)}개 전부 Chromium 전용",
    )


# ---------------------------------------------------------------------------
# 16. AWS·EC2·자동 Merge 구현 Task 0
# ---------------------------------------------------------------------------

def check_16_no_aws_ec2_automerge(tasklist_text, detail_files):
    violations: list[str] = []
    sources = [("00_TASK_LIST.md", tasklist_text)] + list(detail_files.items())
    for source_name, content in sources:
        for line_no, line in enumerate(content.split("\n"), start=1):
            if any(marker in line for marker in NEGATION_MARKERS):
                continue
            for pattern, reason in FORBIDDEN_PATTERNS:
                for m in re.finditer(pattern, line):
                    violations.append(f"{source_name}:{line_no} '{m.group(0)}' — {reason}")
    check(
        16, "AWS·EC2·자동 Merge 구현 Task 0(금지 문구 자체는 제외)",
        len(violations) == 0,
        "; ".join(violations[:20]) if violations else "0건",
    )


# ---------------------------------------------------------------------------
# 17. REQ-FUNC 80개와 REQ-NF 34개가 Task 또는 EXCLUDED 표에 존재
# ---------------------------------------------------------------------------

def check_17_requirement_coverage(tasks, excluded_registry_ids):
    scope = load_project_scope_status()
    if not scope:
        check(17, "REQ-FUNC 80개/REQ-NF 34개가 Task 또는 EXCLUDED 표에 존재", False, "docs/PROJECT_SCOPE.md를 읽을 수 없음")
        return

    referenced: set[str] = set()
    for t in tasks:
        referenced.update(t["req_ref"])

    func_ids = {f"REQ-FUNC-{i:03d}" for i in range(1, 81)}
    nf_ids = {f"REQ-NF-{i:03d}" for i in range(1, 35)}
    all_ids = func_ids | nf_ids

    accounted = referenced | excluded_registry_ids
    missing = sorted(all_ids - accounted)

    mismatched = []
    for req_id, family in scope.items():
        in_task = req_id in referenced
        in_excluded = req_id in excluded_registry_ids
        if family == "IMPLEMENT" and not in_task:
            mismatched.append(f"{req_id}(PROJECT_SCOPE=IMPLEMENT이나 Task 미참조)")
        if family == "EXCLUDED" and not in_excluded:
            mismatched.append(f"{req_id}(PROJECT_SCOPE=EXCLUDED이나 NON_IMPLEMENTATION 미등록)")

    ok = len(missing) == 0 and len(mismatched) == 0
    detail = []
    if missing:
        detail.append(f"REQ-FUNC/REQ-NF 114개 중 어디에도 없음: {missing}")
    if mismatched:
        detail.append(f"PROJECT_SCOPE.md 불일치: {mismatched}")
    check(
        17, "REQ-FUNC 80개와 REQ-NF 34개가 Task 또는 EXCLUDED 표에 존재",
        ok,
        "; ".join(detail) if detail else f"114/114 확인(REQ-FUNC 80 + REQ-NF 34), PROJECT_SCOPE.md와 일치",
    )


# ---------------------------------------------------------------------------
# 18. EXCLUDED 상세 구현 파일이 생성되지 않음
# ---------------------------------------------------------------------------

def check_18_excluded_no_detail_file(tasks, excluded_registry_ids, detail_files):
    problems = []
    # (a) 상세 파일명이 EXCLUDED Requirement ID 자체로 만들어지지 않았는지
    for excluded_id in excluded_registry_ids:
        if excluded_id in detail_files:
            problems.append(f"{excluded_id}.md가 EXCLUDED Requirement 이름으로 생성됨")
    # (b) 어떤 Task의 Requirement Ref가 전부 EXCLUDED ID로만 구성되지 않았는지
    #     (구현 Task인데 참조하는 요구사항이 전부 제외 대상이면 EXCLUDED 기능을 몰래 구현한 것)
    for t in tasks:
        if t["req_ref"] and all(r in excluded_registry_ids for r in t["req_ref"]):
            problems.append(f"{t['task_id']}가 EXCLUDED Requirement({t['req_ref']})만 구현 대상으로 참조")
    check(
        18, "EXCLUDED 상세 구현 파일이 생성되지 않음",
        len(problems) == 0,
        "; ".join(problems) if problems else f"EXCLUDED {len(excluded_registry_ids)}건 모두 구현 Task/파일 없음",
    )


# ---------------------------------------------------------------------------
# Manifest / Report writers
# ---------------------------------------------------------------------------

def write_manifest_csv(tasks: list[dict], detail_files: dict[str, str]) -> None:
    TASKS_DIR.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "Seq", "Task ID", "Category", "Implementation Status", "Requirement Ref",
        "Screen", "Route", "Page Entry", "Depends On", "Expected Files",
        "Detail File", "Detail File Exists", "Verify", "Priority",
    ]
    with MANIFEST_CSV_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for t in tasks:
            detail_name = f"TASK-{t['task_id']}.md"
            writer.writerow(
                {
                    "Seq": t["seq"],
                    "Task ID": t["task_id"],
                    "Category": t["category"],
                    "Implementation Status": t["impl_status"],
                    "Requirement Ref": "; ".join(t["req_ref"]) if t["req_ref"] else "-",
                    "Screen": "; ".join(t["screen"]) if t["screen"] else "-",
                    "Route": "; ".join(t["route"]) if t["route"] else "-",
                    "Page Entry": "; ".join(t["page_entry"]) if t["page_entry"] else "-",
                    "Depends On": "; ".join(t["depends_on"]) if t["depends_on"] else "-",
                    "Expected Files": t["expected_files_raw"],
                    "Detail File": detail_name,
                    "Detail File Exists": "YES" if t["task_id"] in detail_files else "NO",
                    "Verify": "; ".join(t["verify"]) if t["verify"] else "-",
                    "Priority": t["priority"],
                }
            )


def write_audit_report(tasks: list[dict], detail_files: dict[str, str], excluded_registry_ids: set[str]) -> bool:
    failed = [r for r in results if not r[2]]
    ok = len(failed) == 0

    lines = []
    lines.append("# Traveler Task Audit Report")
    lines.append("")
    lines.append(f"**HARNESS_SCHEMA:** {HARNESS_SCHEMA}")
    lines.append(f"**대상:** `TASKS/00_TASK_LIST.md`, `TASKS/TASK-*.md`, `docs/PROJECT_SCOPE.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`")
    lines.append(f"**Task 수:** {len(tasks)} / **상세 파일 수:** {len(detail_files)} / **EXCLUDED 등록 수:** {len(excluded_registry_ids)}")
    lines.append("")
    lines.append(f"## 결과: {'AUDIT_PASS' if ok else 'AUDIT_FAIL'}")
    lines.append("")
    lines.append(f"총 {len(results)}건 검사, 실패 {len(failed)}건")
    lines.append("")
    lines.append("## 검사 상세 (1~18)")
    lines.append("")
    lines.append("| # | 검사 항목 | 결과 | 근거 |")
    lines.append("|---|---|---|---|")
    for num, name, passed, detail in sorted(results, key=lambda r: r[0]):
        mark = "PASS" if passed else "**FAIL**"
        detail_cell = detail.replace("|", "\\|") if detail else ""
        if len(detail_cell) > 300:
            detail_cell = detail_cell[:300] + " ...(생략)"
        lines.append(f"| {num} | {name} | {mark} | {detail_cell} |")
    lines.append("")

    if failed:
        lines.append("## 실패 항목 상세")
        lines.append("")
        for num, name, _, detail in sorted(failed, key=lambda r: r[0]):
            lines.append(f"### [{num}] {name}")
            lines.append("")
            lines.append(detail if detail else "(세부 사유 없음)")
            lines.append("")

    lines.append("## 참고")
    lines.append("")
    lines.append("- 개수(Task 수, 상세 파일 수)는 정보 제공용이며 합격/불합격 기준으로 사용하지 않는다.")
    lines.append("- 본 리포트와 `TASKS/TASK_MANIFEST.csv`는 매 실행 시 갱신된다.")
    lines.append("")

    AUDIT_REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")
    return ok


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    print(f"=== audit_tasks.py — HARNESS_SCHEMA={HARNESS_SCHEMA} ===")
    print(f"대상: {TASKLIST_PATH.relative_to(REPO_ROOT)}\n")

    if not TASKLIST_PATH.exists():
        print(f"[NO_ARTIFACTS] {TASKLIST_PATH.relative_to(REPO_ROOT)} 이(가) 존재하지 않습니다.")
        print("\nAUDIT_TASKS: NO_ARTIFACTS")
        return 2

    tasklist_text = TASKLIST_PATH.read_text(encoding="utf-8")
    tasks = parse_task_rows(tasklist_text)
    excluded_registry_ids = parse_non_implementation(tasklist_text)
    detail_files = read_detail_files()
    contract = load_screen_route_contract()

    # 매니페스트는 검사 통과 여부와 무관하게 항상 최신 상태로 남긴다(디버깅 목적).
    write_manifest_csv(tasks, detail_files)

    check_01_one_to_one(tasks, detail_files)
    check_02_no_dup_ids(tasks)
    check_03_depends_on_missing(tasks)
    check_04_no_cycles(tasks)
    check_05_page_owner_per_screen(tasks)
    check_06_route_page_entry_consistency(tasks, contract)
    check_07_no_component_only_screen(tasks)
    check_08_scr001_starter_ac(tasks, detail_files)
    check_09_scr003_three_tabs(tasks, detail_files)
    check_10_scr005_roles(tasks, detail_files)
    check_11_db_tasks_present(tasks)
    check_12_db_table_scope(detail_files)
    check_13_external_input_not_stored(tasks, detail_files)
    check_14_auth_adult_rls(detail_files)
    check_15_playwright_chromium(tasks, detail_files)
    check_16_no_aws_ec2_automerge(tasklist_text, detail_files)
    check_17_requirement_coverage(tasks, excluded_registry_ids)
    check_18_excluded_no_detail_file(tasks, excluded_registry_ids, detail_files)

    ok = write_audit_report(tasks, detail_files, excluded_registry_ids)

    for num, name, passed, detail in sorted(results, key=lambda r: r[0]):
        mark = "PASS" if passed else "FAIL"
        line = f"[{mark}] ({num}) {name}"
        if detail:
            line += f" — {detail}"
        print(line)

    print(f"\n산출물: {MANIFEST_CSV_PATH.relative_to(REPO_ROOT)}, {AUDIT_REPORT_PATH.relative_to(REPO_ROOT)}")
    print(f"총 검사 수: {len(results)}, 실패: {sum(1 for r in results if not r[2])}\n")

    if not ok:
        print("AUDIT_FAIL")
        return 1

    print(f"AUDIT_PASS ({len(results)} checks)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
