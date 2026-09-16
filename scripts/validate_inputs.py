#!/usr/bin/env python3
"""
validate_inputs.py — Traveler Task 생성 파이프라인의 입력 검증 게이트.

`/gen-tasklist` 실행 전 반드시 먼저 실행한다(gen-tasklist.md 커맨드가 자동으로 호출한다).
이 스크립트는 파일을 생성/수정하지 않는다. 예외:
  - docs/tasks/_src_app_tree_snapshot.json 은 매 실행 시 현재 src/app 트리로 덮어써 갱신한다
    (Skill 규칙 4 — Expected Files는 실제 파일 트리를 확인한 뒤 작성해야 하므로,
    이 스냅샷이 '실제 확인'의 증거가 된다).

종료 코드: 0 = 모든 검증 통과, 1 = 하나 이상 실패.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HARNESS_SCHEMA = "traveler-screen-route-v1"

REQUIRED_FUNC_COUNT = 80
REQUIRED_NF_COUNT = 34

REQUIRED_INPUT_FILES = [
    "docs/06_SRS_UIUX_REVISED.md",
    "docs/PROJECT_SCOPE.md",
    "docs/UIUX_TRACEABILITY.md",
    "design-reference/D-001/DESIGN.md",
    "design-reference/DESIGN_MANIFEST.md",
    "design-reference/UI_CONTRACT.md",
    "design-reference/SCREEN_ROUTE_CONTRACT.json",
    "package.json",
]

EXPECTED_SCREEN_IDS = ["SCR-001", "SCR-002", "SCR-003", "SCR-004", "SCR-005"]

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> bool:
    results.append((name, ok, detail))
    return ok


def read_text(rel_path: str) -> str | None:
    p = REPO_ROOT / rel_path
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")


def validate_file_existence() -> None:
    for rel in REQUIRED_INPUT_FILES:
        exists = (REPO_ROOT / rel).exists()
        check(f"입력 파일 존재: {rel}", exists, "" if exists else "파일을 찾을 수 없음")


def validate_screen_route_contract() -> dict | None:
    rel = "design-reference/SCREEN_ROUTE_CONTRACT.json"
    text = read_text(rel)
    if text is None:
        check("SCREEN_ROUTE_CONTRACT.json 파싱", False, "파일 없음")
        return None

    try:
        data = json.loads(text)
    except json.JSONDecodeError as e:
        check("SCREEN_ROUTE_CONTRACT.json 파싱", False, f"JSON 오류: {e}")
        return None
    check("SCREEN_ROUTE_CONTRACT.json 파싱", True)

    schema_ok = data.get("schema_version") == HARNESS_SCHEMA
    check(
        f"schema_version == '{HARNESS_SCHEMA}' (HARNESS_SCHEMA)",
        schema_ok,
        f"실제 값: {data.get('schema_version')!r}",
    )

    framework_ok = data.get("framework") == "nextjs-app-router"
    check("framework == 'nextjs-app-router'", framework_ok, f"실제 값: {data.get('framework')!r}")

    screens = data.get("screens", [])
    check("screens 배열 길이 == 5", len(screens) == 5, f"실제 길이: {len(screens)}")

    screen_ids = [s.get("screen_id") for s in screens]
    check(
        "screen_id 집합이 SCR-001~005와 정확히 일치",
        sorted(screen_ids) == sorted(EXPECTED_SCREEN_IDS),
        f"실제: {sorted(screen_ids)}",
    )

    routes = [s.get("route") for s in screens]
    check("Route 중복 없음", len(set(routes)) == len(routes), f"routes: {routes}")

    entries = [s.get("page_entry") for s in screens]
    check("Page Entry 중복 없음", len(set(entries)) == len(entries), f"page_entry: {entries}")

    core = [s["screen_id"] for s in screens if s.get("classification") == "core"]
    support = [s["screen_id"] for s in screens if s.get("classification") == "supporting"]
    check("핵심 Screen 4개", len(core) == 4, f"core: {core}")
    check("보조 Screen 1개", len(support) == 1, f"supporting: {support}")

    scr001 = next((s for s in screens if s.get("screen_id") == "SCR-001"), None)
    check(
        "SCR-001 starter_template_forbidden == true",
        bool(scr001 and scr001.get("starter_template_forbidden") is True),
    )
    for sid in EXPECTED_SCREEN_IDS:
        if sid == "SCR-001":
            continue
        s = next((x for x in screens if x.get("screen_id") == sid), None)
        check(
            f"{sid} starter_template_forbidden == false",
            bool(s and s.get("starter_template_forbidden") is False),
        )

    cc = data.get("completion_checks", {})
    check("completion_checks.route_duplicates == false", cc.get("route_duplicates") is False)
    check("completion_checks.page_entry_duplicates == false", cc.get("page_entry_duplicates") is False)
    check("completion_checks.screen_count == 5", cc.get("screen_count") == 5)

    return data


def validate_design_manifest_locked() -> None:
    text = read_text("design-reference/DESIGN_MANIFEST.md")
    if text is None:
        check("DESIGN_MANIFEST.md LOCKED 상태 확인", False, "파일 없음")
        return
    locked = bool(re.search(r"\*\*Status:\*\*\s*LOCKED", text))
    d001 = bool(re.search(r"Active Design Version:\*\*\s*D-001", text))
    check("DESIGN_MANIFEST.md Status == LOCKED", locked)
    check("DESIGN_MANIFEST.md Active Design Version == D-001", d001)


def validate_traceability() -> None:
    text = read_text("docs/UIUX_TRACEABILITY.md")
    if text is None:
        check("UIUX_TRACEABILITY.md 요구사항 전수 확인", False, "파일 없음")
        return

    func_ids = re.findall(r"^\|\s*(REQ-FUNC-\d{3})(?!~)", text, re.MULTILINE)
    nf_ids = re.findall(r"^\|\s*(REQ-NF-\d{3})(?!~)", text, re.MULTILINE)

    func_set = sorted(set(func_ids))
    nf_set = sorted(set(nf_ids))

    expected_func = [f"REQ-FUNC-{i:03d}" for i in range(1, REQUIRED_FUNC_COUNT + 1)]
    expected_nf = [f"REQ-NF-{i:03d}" for i in range(1, REQUIRED_NF_COUNT + 1)]

    check(
        f"REQ-FUNC-001~{REQUIRED_FUNC_COUNT:03d} 전건 존재, 중복 없음",
        func_set == expected_func and len(func_ids) == REQUIRED_FUNC_COUNT,
        f"발견 {len(func_ids)}건, 고유 {len(func_set)}건",
    )
    check(
        f"REQ-NF-001~{REQUIRED_NF_COUNT:03d} 전건 존재, 중복 없음",
        nf_set == expected_nf and len(nf_ids) == REQUIRED_NF_COUNT,
        f"발견 {len(nf_ids)}건, 고유 {len(nf_set)}건",
    )

    # 각 행에 Implementation Status(IMPLEMENT 계열 또는 EXCLUDED)가 기록되어 있는지 확인 (Skill 규칙 15)
    rows = re.findall(r"^\|\s*REQ-(?:FUNC|NF)-\d{3}(?!~)[^\n]*$", text, re.MULTILINE)
    missing_status = [r for r in rows if "IMPLEMENT" not in r and "EXCLUDED" not in r]
    check(
        "모든 Requirement 행에 IMPLEMENT 또는 EXCLUDED 기록",
        len(missing_status) == 0,
        f"미기록 {len(missing_status)}건" if missing_status else "",
    )


def validate_package_json() -> None:
    text = read_text("package.json")
    if text is None:
        check("package.json 파싱", False, "파일 없음")
        return
    try:
        pkg = json.loads(text)
    except json.JSONDecodeError as e:
        check("package.json 파싱", False, f"JSON 오류: {e}")
        return
    check("package.json 파싱", True)
    has_next = "next" in pkg.get("dependencies", {})
    check("package.json에 next 의존성 존재(App Router 전제)", has_next)


def snapshot_src_app_tree() -> None:
    src_app = REPO_ROOT / "src" / "app"
    files: list[str] = []
    if src_app.exists():
        for p in sorted(src_app.rglob("*")):
            if p.is_file():
                files.append(str(p.relative_to(REPO_ROOT)).replace("\\", "/"))

    out_dir = REPO_ROOT / "docs" / "tasks"
    out_dir.mkdir(parents=True, exist_ok=True)
    snapshot_path = out_dir / "_src_app_tree_snapshot.json"
    snapshot = {
        "harness_schema": HARNESS_SCHEMA,
        "generated_by": "scripts/validate_inputs.py",
        "src_app_files": files,
    }
    snapshot_path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    check(
        "src/app 파일 트리 스냅샷 갱신",
        True,
        f"{len(files)}개 파일, 저장 위치: {snapshot_path.relative_to(REPO_ROOT)}",
    )


def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    validate_file_existence()
    validate_screen_route_contract()
    validate_design_manifest_locked()
    validate_traceability()
    validate_package_json()
    snapshot_src_app_tree()

    print(f"\n=== validate_inputs.py — HARNESS_SCHEMA={HARNESS_SCHEMA} ===\n")
    failed = 0
    for name, ok, detail in results:
        mark = "PASS" if ok else "FAIL"
        line = f"[{mark}] {name}"
        if detail:
            line += f" — {detail}"
        print(line)
        if not ok:
            failed += 1

    print(f"\n총 {len(results)}건 검사, 실패 {failed}건\n")
    if failed:
        print("VALIDATE_INPUTS: FAIL")
        return 1
    print("VALIDATE_INPUTS: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
