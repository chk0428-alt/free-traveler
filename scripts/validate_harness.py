#!/usr/bin/env python3
"""
validate_harness.py — Traveler 파이프라인의 "하네스"(CLAUDE.md, Skill, Command, Harness
Marker, 핵심 규칙 존재 여부) 자체를 검증한다.

`scripts/validate_inputs.py`(콘텐츠/문서 정본 검증), `scripts/audit_tasks.py`(Task 산출물
검증)와 역할이 다르다 — 이 스크립트는 **거버넌스 계층 자체**(규칙이 실제로 어딘가에 선언되어
있는지)를 검사하며, 파일을 생성·수정하지 않는다.

종료 코드: 0 = 전부 통과(VALIDATE_HARNESS_PASS), 1 = 하나 이상 실패(누락 파일·규칙을 출력).
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HARNESS_SCHEMA = "traveler-screen-route-v1"

CLAUDE_MD_PATH = REPO_ROOT / "CLAUDE.md"
SKILL_PATH = REPO_ROOT / ".claude" / "skills" / "traveler-project-pipeline" / "SKILL.md"
COMMANDS_DIR = REPO_ROOT / ".claude" / "commands"
SCREEN_CONTRACT_DEFAULT_PATH = REPO_ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
DESIGN_DEFAULT_PATH = REPO_ROOT / "design-reference" / "D-001" / "DESIGN.md"

# 하네스가 갖춰야 할 7개 Command(파이프라인 전 구간: 계획 생성 → 상세화 → 감사 →
# 착수 준비 → 구현 → Wave 진행 → 릴리스 판정).
REQUIRED_COMMANDS = [
    "gen-tasklist.md",
    "gen-task-details.md",
    "audit-tasks.md",
    "prepare-task.md",
    "implement-task.md",
    "run-wave.md",
    "release-check.md",
]

ALLOWED_DB_TABLES = [
    "user_profile",
    "mate_post",
    "mate_application",
    "user_block",
    "report",
    "outbound_link_setting",
]

results: list[tuple[int, str, bool, str]] = []


def check(num: int, name: str, ok: bool, detail: str = "") -> bool:
    results.append((num, name, ok, detail))
    return ok


def read(path: Path) -> str | None:
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8")


def parse_harness_markers(claude_md_text: str) -> dict[str, str]:
    """CLAUDE.md의 ```...``` Harness Marker 코드 블록을 key=value 딕셔너리로 파싱한다."""
    m = re.search(r"```\s*\n((?:[A-Z_]+=.*\n?)+)```", claude_md_text)
    if not m:
        return {}
    markers: dict[str, str] = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or "=" not in line:
            continue
        key, _, value = line.partition("=")
        markers[key.strip()] = value.strip()
    return markers


def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    print(f"=== validate_harness.py — HARNESS_SCHEMA={HARNESS_SCHEMA} ===\n")

    # ---------------------------------------------------------------
    # 1. CLAUDE.md 존재
    # ---------------------------------------------------------------
    claude_md_text = read(CLAUDE_MD_PATH)
    check(1, "CLAUDE.md 존재", claude_md_text is not None, "" if claude_md_text else f"{CLAUDE_MD_PATH} 없음")

    # ---------------------------------------------------------------
    # 2. Claude Code Skill 파일 존재
    # ---------------------------------------------------------------
    skill_text = read(SKILL_PATH)
    check(
        2, "Claude Code Skill 파일 존재(traveler-project-pipeline/SKILL.md)",
        skill_text is not None,
        "" if skill_text else f"{SKILL_PATH} 없음",
    )

    # ---------------------------------------------------------------
    # 3. 7개 Command 존재
    # ---------------------------------------------------------------
    missing_commands = [c for c in REQUIRED_COMMANDS if not (COMMANDS_DIR / c).exists()]
    check(
        3, f"{len(REQUIRED_COMMANDS)}개 Command 존재",
        len(missing_commands) == 0,
        f"누락: {missing_commands}" if missing_commands else f"{len(REQUIRED_COMMANDS)}개 전부 존재",
    )

    markers = parse_harness_markers(claude_md_text) if claude_md_text else {}

    # ---------------------------------------------------------------
    # 4. traveler-screen-route-v1 Marker 존재
    # ---------------------------------------------------------------
    marker_ok = markers.get("HARNESS_SCHEMA") == HARNESS_SCHEMA
    check(
        4, f"CLAUDE.md에 HARNESS_SCHEMA={HARNESS_SCHEMA} Marker 존재",
        marker_ok,
        f"실제 값: {markers.get('HARNESS_SCHEMA')!r}" if not marker_ok else "",
    )

    # ---------------------------------------------------------------
    # 5. D-001 DESIGN 경로 일치
    # ---------------------------------------------------------------
    design_path_marker = markers.get("DESIGN_PATH")
    design_path_ok = design_path_marker == "design-reference/D-001/DESIGN.md"
    design_file_exists = DESIGN_DEFAULT_PATH.exists()
    check(
        5, "CLAUDE.md DESIGN_PATH가 design-reference/D-001/DESIGN.md와 일치하고 실제 파일 존재",
        design_path_ok and design_file_exists,
        f"Marker={design_path_marker!r}, 파일존재={design_file_exists}",
    )

    # ---------------------------------------------------------------
    # 6. Screen Contract 경로 일치
    # ---------------------------------------------------------------
    screen_contract_marker = markers.get("SCREEN_CONTRACT")
    screen_contract_ok = screen_contract_marker == "design-reference/SCREEN_ROUTE_CONTRACT.json"
    contract_schema_ok = False
    contract_detail = f"Marker={screen_contract_marker!r}"
    if SCREEN_CONTRACT_DEFAULT_PATH.exists():
        try:
            data = json.loads(SCREEN_CONTRACT_DEFAULT_PATH.read_text(encoding="utf-8"))
            contract_schema_ok = data.get("schema_version") == HARNESS_SCHEMA
            contract_detail += f", 파일 schema_version={data.get('schema_version')!r}"
        except json.JSONDecodeError as e:
            contract_detail += f", JSON 파싱 오류: {e}"
    else:
        contract_detail += ", 파일 없음"
    check(
        6, "CLAUDE.md SCREEN_CONTRACT 경로 일치 및 schema_version 일치",
        screen_contract_ok and contract_schema_ok,
        contract_detail,
    )

    # ---------------------------------------------------------------
    # 7. Page Owner 5개 규칙 존재
    # ---------------------------------------------------------------
    combined_rules_text = (skill_text or "") + "\n" + (claude_md_text or "")
    page_owner_rule_ok = bool(
        re.search(r"5개\s*Screen[^\n]{0,40}Page Owner", combined_rules_text)
        or re.search(r"Page Owner[^\n]{0,60}5개", combined_rules_text)
    )
    check(
        7, "Page Owner 5개 규칙 존재(Skill/CLAUDE.md)",
        page_owner_rule_ok,
        "" if page_owner_rule_ok else "5개 Screen당 Page Owner 1개 규칙 문구를 찾을 수 없음",
    )

    # ---------------------------------------------------------------
    # 8. DB Table 6개 기본 범위 존재
    # ---------------------------------------------------------------
    missing_tables = [t for t in ALLOWED_DB_TABLES if f"`{t}`" not in (skill_text or "")]
    check(
        8, "DB Table 6개 기본 범위 규칙 존재(Skill)",
        len(missing_tables) == 0,
        f"Skill에서 찾지 못한 테이블: {missing_tables}" if missing_tables else "6개 전부 명시",
    )

    # ---------------------------------------------------------------
    # 9. 외부 입력 비저장 규칙 존재
    # ---------------------------------------------------------------
    external_input_rule_ok = bool(
        re.search(r"항공.{0,10}숙소.{0,60}(서버|DB|URL)", combined_rules_text)
        and re.search(r"(보내지|전달하지|저장하지)\s*않는다", combined_rules_text)
    )
    check(
        9, "외부 입력(항공·숙소) 비저장 규칙 존재",
        external_input_rule_ok,
        "" if external_input_rule_ok else "항공·숙소 입력값을 서버/DB/URL로 보내지 않는다는 규칙 문구를 찾을 수 없음",
    )

    # ---------------------------------------------------------------
    # 10. Playwright Chromium Smoke 규칙 존재
    # ---------------------------------------------------------------
    playwright_scope_marker_ok = markers.get("PLAYWRIGHT_SCOPE") == "chromium-smoke"
    playwright_rule_text_ok = bool(re.search(r"Playwright[^\n]{0,30}Chromium[^\n]{0,30}Smoke", combined_rules_text))
    check(
        10, "Playwright Chromium Smoke 규칙 존재(Marker+Skill 문구)",
        playwright_scope_marker_ok and playwright_rule_text_ok,
        f"PLAYWRIGHT_SCOPE={markers.get('PLAYWRIGHT_SCOPE')!r}, 규칙 문구 발견={playwright_rule_text_ok}",
    )

    # ---------------------------------------------------------------
    # 11. AUTO_MERGE=false
    # ---------------------------------------------------------------
    check(11, "CLAUDE.md AUTO_MERGE=false", markers.get("AUTO_MERGE") == "false", f"실제 값: {markers.get('AUTO_MERGE')!r}")

    # ---------------------------------------------------------------
    # 12. AWS_ENABLED=false
    # ---------------------------------------------------------------
    check(12, "CLAUDE.md AWS_ENABLED=false", markers.get("AWS_ENABLED") == "false", f"실제 값: {markers.get('AWS_ENABLED')!r}")

    # ---------------------------------------------------------------
    # 13. EXCLUDED 보호 규칙 존재
    # ---------------------------------------------------------------
    excluded_rule_ok = bool(
        re.search(r"EXCLUDED[^\n]{0,60}(삭제하지 않는다|보존)", combined_rules_text)
    )
    check(
        13, "EXCLUDED 보호 규칙 존재(구현 Task 미생성 + 추적표 보존)",
        excluded_rule_ok,
        "" if excluded_rule_ok else "EXCLUDED를 삭제하지 않고 보존한다는 규칙 문구를 찾을 수 없음",
    )

    # ---------------------------------------------------------------
    # 출력
    # ---------------------------------------------------------------
    failed = 0
    for num, name, ok, detail in sorted(results, key=lambda r: r[0]):
        mark = "PASS" if ok else "FAIL"
        line = f"[{mark}] ({num}) {name}"
        if detail:
            line += f" — {detail}"
        print(line)
        if not ok:
            failed += 1

    print(f"\n총 {len(results)}건 검사, 실패 {failed}건\n")

    if failed:
        print("VALIDATE_HARNESS_FAIL")
        return 1

    print("VALIDATE_HARNESS_PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
