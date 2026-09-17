#!/usr/bin/env python3
"""
check_screen_contract.py — 5개 고정 Screen(SCR-001~005)의 Route/Page Owner/기술
경로/구현 여부 계약을 검사한다.

입력:
  - design-reference/SCREEN_ROUTE_CONTRACT.json (Screen·Route·기술 경로 정본)
  - TASKS/TASK_MANIFEST.csv                     (Page Owner Task, SCR-003 Task 구성)
  - src/app 디렉터리                             (mode=ci/release에서 실제 구현 검사)

실행 모드(`--mode=plan|ci|release`, 기본값 plan):
  - plan    : Page Owner Task와 Route 계획만 검사한다(실제 파일 존재를 요구하지 않음).
  - ci      : plan의 모든 검사 + 5개 Screen의 Page Entry 파일이 실제로 존재하는지,
              그리고 src/app 안에 허용되지 않은 신규 Page(여행지 상세/안전정보 등)가
              생기지 않았는지까지 검사한다. 5개 Screen이 전부 구현되기 전(예: Wave
              W13/W14 이전)에는 실패하는 것이 정상이다.
  - release : ci의 모든 검사 + `docs/preview-checks/SCR-001.md`~`SCR-005.md` 5개
              Preview Checkpoint 기록 파일의 존재까지 검사한다.

검사 6개(항상 이 번호로 보고한다):
  1. 고정 화면 5개(SCR-001~005, Route 고정)가 정확히 존재한다.
     (mode=ci/release에서는 각 Screen의 Page Entry 실제 파일 존재까지 검사)
  2. 각 화면의 Page Owner Task가 정확히 하나다.
  3. 기술 경로(`/auth/callback`, `/api/**`, not-found, error)를 사용자 화면 수에
     포함하지 않는다.
  4. (mode=ci/release) 여행지 상세·안전정보 등을 새 Page(Route)로 만들지 않았는지
     `src/app` 실제 트리를 검사한다.
  5. SCR-003 Task 구성이 여행 입력(항공·숙소)과 동행 작성 요구를 모두 포함한다.
  6. (mode=release) `docs/preview-checks/SCR-001.md`~`SCR-005.md` 5개가 모두 존재한다.

오류는 모두 파일·화면 ID·수정 힌트를 포함해 출력한다. 하나라도 실패하면 exit code 1.
이 스크립트는 어떤 파일도 생성·수정하지 않는다(순수 검사).
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HARNESS_SCHEMA = "traveler-screen-route-v1"

SCREEN_CONTRACT_PATH = REPO_ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
MANIFEST_PATH = REPO_ROOT / "TASKS" / "TASK_MANIFEST.csv"
APP_DIR = REPO_ROOT / "src" / "app"
PREVIEW_CHECKS_DIR = REPO_ROOT / "docs" / "preview-checks"

# 고정 화면 5개(사용자 지정, design-reference/SCREEN_ROUTE_CONTRACT.json과 대조 검증한다)
FIXED_SCREENS: dict[str, str] = {
    "SCR-001": "/",
    "SCR-002": "/about",
    "SCR-003": "/travel-tools",
    "SCR-004": "/mates",
    "SCR-005": "/account",
}

# 허용 기술 경로(사용자 지정 3종 + SCREEN_ROUTE_CONTRACT.json의 error_boundary는
# Next.js 표준 특수 파일이라 별도 사용자 Route가 아니므로 항상 허용한다).
ALLOWED_TECHNICAL_ROUTE_TYPES = {"auth_callback", "api_route", "not_found", "error_boundary"}

# 과거 SRS(02_SRS_BASELINE.md) 개별 Route가 5-Screen 구조로 통합된 매핑
# (docs/06_SRS_UIUX_REVISED.md 2.3절). src/app에 이 경로들이 새 Page로 다시
# 생기면 "Drawer/탭으로 통합"이라는 결정을 위반한 것이다.
FORBIDDEN_ROUTE_HINTS: list[tuple[str, str, str]] = [
    ("/destinations", "SCR-001", "여행지 목록/상세는 SCR-001(`/`)의 Card Grid + 상세 Drawer/Modal로 통합한다. 새 Route를 만들지 않는다(design-reference/UI_CONTRACT.md 1절)."),
    ("/flights", "SCR-003", "항공편 찾기는 SCR-003(`/travel-tools`)의 항공편 탭(COMP-SCR003-FLIGHT-FORM)으로 통합한다."),
    ("/hotels", "SCR-003", "숙소 찾기는 SCR-003(`/travel-tools`)의 숙소 탭(COMP-SCR003-HOTEL-FORM)으로 통합한다."),
    ("/mates/new", "SCR-003", "동행 모집글 작성은 SCR-003(`/travel-tools`)의 동행 구하기 탭(COMP-SCR003-MATE-WRITE)으로 통합한다."),
    ("/mates/", "SCR-004", "동행글 상세는 SCR-004(`/mates`)의 상세 패널(Desktop)/상세 Drawer(Mobile)로 통합한다. 별도 `/mates/[id]` Route를 만들지 않는다."),
    ("/safety", "SCR-001", "국가별 주의사항은 SCR-001(`/`) 여행지 상세 Drawer 내 안전정보 하위 탭으로 통합한다(COMP-SCR001-SAFETY-TAB)."),
    ("/my", "SCR-005", "내 활동(내 글·요청·즐겨찾기·차단)은 SCR-005(`/account`)의 내 활동 탭으로 통합한다."),
    ("/admin", "SCR-005", "관리자 기능(신고 상태·외부 URL 설정)은 SCR-005(`/account`)의 관리자 탭으로 통합한다."),
]

results: list[tuple[int, str, bool, str]] = []
issues: list[dict[str, str]] = []


def check(num: int, name: str, ok: bool, detail: str = "") -> bool:
    results.append((num, name, ok, detail))
    return ok


def issue(file: str, screen: str, hint: str, detail: str = "") -> None:
    issues.append({"file": file, "screen": screen, "hint": hint, "detail": detail})


def read_text(path: Path) -> str | None:
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8")


def load_screen_contract() -> dict | None:
    text = read_text(SCREEN_CONTRACT_PATH)
    if text is None:
        return None
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        issue(SCREEN_CONTRACT_PATH.relative_to(REPO_ROOT).as_posix(), "-", "JSON 문법 오류를 수정한다.", f"JSONDecodeError: {e}")
        return None


def load_manifest() -> list[dict] | None:
    text = read_text(MANIFEST_PATH)
    if text is None:
        return None
    return list(csv.DictReader(text.splitlines()))


def split_semicolon(value: str) -> list[str]:
    value = (value or "").strip()
    if not value or value == "-":
        return []
    return [v.strip() for v in value.split(";") if v.strip()]


# ---------------------------------------------------------------------------
# 검사 1. 고정 화면 5개 정확히 존재
# ---------------------------------------------------------------------------

def check_1_fixed_screens(contract: dict | None, mode: str) -> None:
    manifest_rel = SCREEN_CONTRACT_PATH.relative_to(REPO_ROOT).as_posix()

    if contract is None:
        check(1, "고정 화면 5개 존재", False, f"{manifest_rel} 없음 또는 파싱 실패")
        issue(manifest_rel, "-", f"{manifest_rel} 파일을 생성하거나 JSON 오류를 수정한다.")
        return

    schema_ok = contract.get("schema_version") == HARNESS_SCHEMA
    if not schema_ok:
        issue(
            manifest_rel, "-",
            f"schema_version을 {HARNESS_SCHEMA!r}로 맞춘다.",
            f"실제 값: {contract.get('schema_version')!r}",
        )

    screens = contract.get("screens", [])
    found = {s.get("screen_id"): s.get("route") for s in screens}

    missing = [sid for sid in FIXED_SCREENS if sid not in found]
    mismatched_route = [
        sid for sid in FIXED_SCREENS
        if sid in found and found[sid] != FIXED_SCREENS[sid]
    ]
    extra = [sid for sid in found if sid not in FIXED_SCREENS]

    for sid in missing:
        issue(manifest_rel, sid, f"`screens` 배열에 {sid}(Route `{FIXED_SCREENS[sid]}`)를 추가한다.")
    for sid in mismatched_route:
        issue(
            manifest_rel, sid,
            f"{sid}의 route를 `{FIXED_SCREENS[sid]}`로 고정한다.",
            f"현재 값: {found[sid]!r}",
        )
    for sid in extra:
        issue(manifest_rel, sid, "고정 5개 화면 밖의 Screen이다 — 화면 수를 5개로 유지하거나 이 화면이 정말 필요한지 재확인한다.")

    count_ok = len(screens) == 5
    if not count_ok:
        issue(manifest_rel, "-", "screens 배열 길이를 정확히 5로 맞춘다.", f"현재 개수: {len(screens)}")

    file_exists_ok = True
    if mode in ("ci", "release"):
        for sid, route in FIXED_SCREENS.items():
            entry = found.get(sid)
            screen_obj = next((s for s in screens if s.get("screen_id") == sid), None)
            page_entry = screen_obj.get("page_entry") if screen_obj else None
            if not page_entry:
                continue
            page_path = REPO_ROOT / page_entry
            if not page_path.exists():
                file_exists_ok = False
                issue(
                    page_entry, sid,
                    f"{sid}({route})의 Page Owner Task(`TASKS/TASK-PAGE-{sid.replace('SCR-', 'SCR')}.md` 등)를 구현해 이 파일을 생성한다.",
                    "mode=ci/release는 계획이 아니라 실제 구현 파일 존재를 요구한다.",
                )

    ok = (
        not missing and not mismatched_route and not extra and count_ok
        and schema_ok and (mode == "plan" or file_exists_ok)
    )
    detail = f"5개 화면 계약 일치, schema_version 일치" if ok else "위 issue 목록 참고"
    if mode in ("ci", "release"):
        detail += " (Page Entry 실제 파일 존재 포함)"
    check(1, "고정 화면 5개 정확히 존재" + ("(+ 실제 Page 파일)" if mode != "plan" else ""), ok, detail)


# ---------------------------------------------------------------------------
# 검사 2. 화면당 Page Owner Task 정확히 1개
# ---------------------------------------------------------------------------

def check_2_page_owner_unique(manifest: list[dict] | None) -> None:
    manifest_rel = MANIFEST_PATH.relative_to(REPO_ROOT).as_posix()
    if manifest is None:
        check(2, "화면당 Page Owner Task 정확히 1개", False, f"{manifest_rel} 없음")
        issue(manifest_rel, "-", "scripts/audit_tasks.py를 먼저 실행해 TASK_MANIFEST.csv를 생성한다.")
        return

    owners_by_screen: dict[str, list[str]] = {sid: [] for sid in FIXED_SCREENS}
    for row in manifest:
        if row.get("Category", "").strip() != "PAGE_OWNER":
            continue
        screen = row.get("Screen", "").strip().split(";")[0].strip()
        if screen in owners_by_screen:
            owners_by_screen[screen].append(row.get("Task ID", "").strip())

    ok = True
    for sid, owners in owners_by_screen.items():
        if len(owners) == 0:
            ok = False
            issue(manifest_rel, sid, f"{sid}의 Page Owner Task(Category=PAGE_OWNER)를 TASKS/00_TASK_LIST.md와 TASK_MANIFEST.csv에 추가한다.")
        elif len(owners) > 1:
            ok = False
            issue(
                manifest_rel, sid,
                f"{sid}에 Page Owner Task를 1개만 남기고 나머지는 COMPONENT로 재분류하거나 제거한다.",
                f"현재 {len(owners)}개: {owners}",
            )

    detail = "5개 화면 모두 Page Owner 1개" if ok else "위 issue 목록 참고"
    check(2, "화면당 Page Owner Task 정확히 1개", ok, detail)


# ---------------------------------------------------------------------------
# 검사 3. 기술 경로를 사용자 화면으로 세지 않음
# ---------------------------------------------------------------------------

def check_3_technical_routes_excluded(contract: dict | None) -> None:
    manifest_rel = SCREEN_CONTRACT_PATH.relative_to(REPO_ROOT).as_posix()
    if contract is None:
        check(3, "기술 경로를 화면 수에서 제외", False, f"{manifest_rel} 없음 또는 파싱 실패")
        return

    technical_routes = contract.get("technical_routes", [])
    screens = contract.get("screens", [])

    ok = True

    unknown_types = [t.get("type") for t in technical_routes if t.get("type") not in ALLOWED_TECHNICAL_ROUTE_TYPES]
    if unknown_types:
        ok = False
        issue(
            manifest_rel, "-",
            "technical_routes의 type을 허용된 값(auth_callback/api_route/not_found/error_boundary)으로 맞춘다.",
            f"알 수 없는 type: {unknown_types}",
        )

    counted_as_screen_true = [t for t in technical_routes if t.get("counted_as_screen") is True]
    if counted_as_screen_true:
        ok = False
        for t in counted_as_screen_true:
            issue(
                manifest_rel, "-",
                f"기술 경로 {t.get('route')!r}의 counted_as_screen을 false로 되돌린다.",
            )

    completion = contract.get("completion_checks", {})
    if completion.get("screen_count") != 5:
        ok = False
        issue(manifest_rel, "-", "completion_checks.screen_count를 5로 고정한다.", f"현재 값: {completion.get('screen_count')!r}")

    screen_ids = {s.get("screen_id") for s in screens}
    technical_route_paths = {t.get("route") for t in technical_routes}
    overlap = screen_ids & technical_route_paths
    if overlap:
        ok = False
        issue(manifest_rel, "-", "화면 Route와 기술 Route가 겹치지 않게 한다.", f"겹침: {overlap}")

    detail = "기술 경로 4종 전부 counted_as_screen=false, screen_count=5" if ok else "위 issue 목록 참고"
    check(3, "기술 경로를 화면 수에서 제외", ok, detail)


# ---------------------------------------------------------------------------
# 검사 4. (ci/release) src/app에 허용되지 않은 신규 Page 없음
# ---------------------------------------------------------------------------

def route_from_page_file(page_file: Path) -> str:
    """src/app/**/page.(t|j)sx? 파일 경로를 Next.js Route 문자열로 변환한다."""
    rel = page_file.relative_to(APP_DIR)
    parts = list(rel.parts[:-1])  # 마지막(page.tsx 등) 제외
    # Route Group `(group)`은 URL에 나타나지 않는다.
    parts = [p for p in parts if not (p.startswith("(") and p.endswith(")"))]
    if not parts:
        return "/"
    return "/" + "/".join(parts)


def check_4_no_new_pages(contract: dict | None) -> None:
    app_rel = APP_DIR.relative_to(REPO_ROOT).as_posix()
    if not APP_DIR.exists():
        check(4, "허용되지 않은 신규 Page(여행지 상세·안전정보 등) 없음", False, f"{app_rel} 디렉터리 없음")
        issue(app_rel, "-", "src/app 디렉터리를 먼저 생성한다(Next.js App Router 기본 구조).")
        return

    allowed_routes = set(FIXED_SCREENS.values())

    page_files = sorted(
        p for p in APP_DIR.rglob("page.*")
        if p.suffix in (".tsx", ".ts", ".jsx", ".js")
    )

    ok = True
    for pf in page_files:
        route = route_from_page_file(pf)
        if route in allowed_routes:
            continue
        ok = False
        rel_path = pf.relative_to(REPO_ROOT).as_posix()
        matched_hint = next(
            ((screen, hint) for prefix, screen, hint in FORBIDDEN_ROUTE_HINTS if route == prefix or route.startswith(prefix + "/") or route.startswith(prefix)),
            None,
        )
        if matched_hint:
            screen, hint = matched_hint
        else:
            screen, hint = "-", "5개 고정 화면 밖의 Route다. 새 Page를 만들지 말고 해당 기능을 5개 Screen 중 하나의 탭/Drawer/Modal/패널로 통합한다(design-reference/UI_CONTRACT.md 참고)."
        issue(rel_path, screen, hint, f"발견된 Route: {route}")

    detail = f"{len(page_files)}개 page 파일 전부 5개 고정 화면 안" if ok else "위 issue 목록 참고"
    check(4, "허용되지 않은 신규 Page(여행지 상세·안전정보 등) 없음", ok, detail)


# ---------------------------------------------------------------------------
# 검사 5. SCR-003 Task가 여행 입력 + 동행 작성 양쪽을 포함
# ---------------------------------------------------------------------------

def check_5_scr003_dual_requirement(manifest: list[dict] | None) -> None:
    manifest_rel = MANIFEST_PATH.relative_to(REPO_ROOT).as_posix()
    if manifest is None:
        check(5, "SCR-003이 여행 입력·동행 작성 양쪽 요구 포함", False, f"{manifest_rel} 없음")
        return

    scr003_task_ids = [
        row.get("Task ID", "").strip()
        for row in manifest
        if "SCR-003" in row.get("Screen", "")
    ]

    def has_any(keywords: list[str]) -> list[str]:
        return [tid for tid in scr003_task_ids if any(k in tid for k in keywords)]

    flight_tasks = has_any(["FLIGHT"])
    hotel_tasks = has_any(["HOTEL"])
    mate_write_tasks = has_any(["MATE-WRITE"])

    ok = True
    if not flight_tasks:
        ok = False
        issue(manifest_rel, "SCR-003", "항공편 입력 Task(예: COMP-SCR003-FLIGHT-FORM)를 SCR-003에 추가한다.")
    if not hotel_tasks:
        ok = False
        issue(manifest_rel, "SCR-003", "숙소 입력 Task(예: COMP-SCR003-HOTEL-FORM)를 SCR-003에 추가한다.")
    if not mate_write_tasks:
        ok = False
        issue(manifest_rel, "SCR-003", "동행 작성 Task(예: COMP-SCR003-MATE-WRITE)를 SCR-003에 추가한다.")

    detail = (
        f"여행 입력={flight_tasks + hotel_tasks}, 동행 작성={mate_write_tasks}"
        if ok else "위 issue 목록 참고"
    )
    check(5, "SCR-003이 여행 입력·동행 작성 양쪽 요구 포함", ok, detail)


# ---------------------------------------------------------------------------
# 검사 6. (release) Preview Checkpoint 기록 5개 존재
# ---------------------------------------------------------------------------

def check_6_preview_checkpoints() -> None:
    dir_rel = PREVIEW_CHECKS_DIR.relative_to(REPO_ROOT).as_posix()
    ok = True
    for sid in FIXED_SCREENS:
        f = PREVIEW_CHECKS_DIR / f"{sid}.md"
        if not f.exists():
            ok = False
            rel = f.relative_to(REPO_ROOT).as_posix()
            issue(
                rel, sid,
                f"사람이 {sid} Preview를 확인한 뒤 `{dir_rel}/{sid}.md`에 확인일·확인자·결과를 기록한다"
                "(`docs/DECISION_LOG.md` DEC-010, `.claude/commands/run-wave.md` 8절 Preview Checkpoint 참고).",
            )
    detail = "5개 Preview Checkpoint 기록 전부 존재" if ok else "위 issue 목록 참고"
    check(6, "Preview Checkpoint 기록 5개 존재(release)", ok, detail)


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Traveler 5-Screen Route Contract 검사")
    parser.add_argument(
        "--mode",
        choices=["plan", "ci", "release"],
        default="plan",
        help="plan(계획만) | ci(+실제 Page 구현) | release(+Preview Checkpoint)",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    args = parse_args(argv)
    mode = args.mode

    print(f"=== check_screen_contract.py — HARNESS_SCHEMA={HARNESS_SCHEMA}, mode={mode} ===\n")

    contract = load_screen_contract()
    manifest = load_manifest()

    check_1_fixed_screens(contract, mode)
    check_2_page_owner_unique(manifest)
    check_3_technical_routes_excluded(contract)
    if mode in ("ci", "release"):
        check_4_no_new_pages(contract)
    check_5_scr003_dual_requirement(manifest)
    if mode == "release":
        check_6_preview_checkpoints()

    failed = 0
    for num, name, ok, detail in sorted(results, key=lambda r: r[0]):
        mark = "PASS" if ok else "FAIL"
        line = f"[{mark}] ({num}) {name}"
        if detail:
            line += f" — {detail}"
        print(line)
        if not ok:
            failed += 1

    if issues:
        print("\n--- 오류 상세 (파일 / 화면 ID / 수정 힌트) ---")
        for it in issues:
            print(f"파일: {it['file']}")
            print(f"화면 ID: {it['screen']}")
            print(f"수정 힌트: {it['hint']}")
            if it.get("detail"):
                print(f"근거: {it['detail']}")
            print("")

    print(f"총 {len(results)}건 검사(mode={mode}), 실패 {failed}건\n")

    if failed:
        print("SCREEN_CONTRACT_FAIL")
        return 1

    print("SCREEN_CONTRACT_PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
