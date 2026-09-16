#!/usr/bin/env python3
"""
build_waves.py — TASKS/TASK_MANIFEST.csv의 66개 Task를 실행 가능한 Wave로 묶는다.

입력:
  - TASKS/TASK_MANIFEST.csv       (정본 — Seq/Category/Screen/Depends On/Expected Files)
  - TASKS/TASK-*.md               (상세 파일 존재 확인용. 사용자 스펙은 "TASKS/details/TASK-*.md"를
                                    지정했지만 실제 저장소에는 TASKS/details/ 디렉터리가 없고 상세
                                    파일은 TASKS/ 바로 아래에 있다 — 존재하지 않는 경로를 가정하지
                                    않고 실제 위치를 읽는다. TASKS/details/가 나중에 생기면 그쪽을
                                    우선한다.)
  - design-reference/SCREEN_ROUTE_CONTRACT.json (Screen→Route, preview_required)

출력:
  - TASKS/TASK_DAG.md             (의존성 그래프, 순환 의존성 검사 결과, 위상 정렬 순서)
  - TASKS/WAVE_PLAN.md            (Wave 구성 — .claude/commands/run-wave.md가 읽는 정본 포맷)
  - TASKS/WAVE_STATE.json         (Wave 실행 상태 초기값)
  - TASKS/TASK_MANIFEST.csv       (wave_id 열 추가, 나머지 열 그대로 보존)

Wave 배치 규칙(사용자 지정 1~8번):
  1. Depends On 그래프의 순환 의존성을 검사한다(DFS 기반).
  2. 어떤 Task의 Depends On이 그 Task보다 "뒤" Wave에 배치되면 실패로 처리한다
     (같은 Wave 안에 함께 있는 것은 허용한다. 같은 Wave 안에서도 Task ID 문자열
     알파벳 순은 의존 순서를 보장하지 않는다 — 예: INFRA-AUTH-GUARD는 같은 Wave의
     DB-SCHEMA-BASE/DB-RLS-BASE에 의존하지만 Task ID·Seq 모두 그보다 앞선다. 그래서
     이 스크립트가 WAVE_PLAN.md/WAVE_STATE.json에 나열하는 task_ids 순서는 "소속 목록
     표시용 Seq 오름차순"일 뿐 실행 순서가 아니며, 실제 실행 순서는 `.claude/commands/
     run-wave.md` 3절의 런타임 규칙 — "Depends On이 전부 DONE인 Task 중 Seq가 가장
     앞선 것 하나를 고른다" — 을 그대로 따른다. 이 런타임 규칙은 DONE 여부로 매번
     다시 계산되므로 나열 순서와 무관하게 항상 의존 순서를 지킨다).
  3. 기본적으로 Wave당 4~7개 Task. 그룹 총량이 7개를 넘으면 여러 Wave로 분할하고,
     분할 후 마지막 잔여 Wave가 4개 미만이 되는 것은 불가피한 예외로 허용한다
     (허용하지 않으면 그룹 경계를 깨야 하므로 오히려 규칙 4·5를 위반한다).
  4. Page Owner Task는 해당 Screen 그룹의 마지막 Wave에 단독으로 배치한다.
  5. Expected Files가 겹치는 Task는 서로 다른 Wave로 분리한다.
  6. Wave 내부에서도 Task는 한 번에 하나씩, Seq 순으로 실행한다(run-wave.md와 동일 정의).
  7. 이 스크립트는 자동 재시도/자동 수정 루프를 구현하지 않는다(정적 계획 생성만 한다).
  8. 자동 Branch 생성·자동 PR 생성·자동 Merge는 이 스크립트의 어떤 기능에도 포함하지 않는다.

Wave 그룹 순서(1~10, 사용자 지정)는 GROUP_TITLES에 고정하되, Wave ID(W01, W02, ...)는
그룹을 여러 Wave로 나눈 결과에 따라 동적으로 부여한다 — W00~W10으로 미리 고정하지 않는다.
"""

from __future__ import annotations

import csv
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HARNESS_SCHEMA = "traveler-screen-route-v1"

MANIFEST_PATH = REPO_ROOT / "TASKS" / "TASK_MANIFEST.csv"
DETAILS_DIR_SPEC = REPO_ROOT / "TASKS" / "details"   # 사용자 지정 경로(존재하지 않을 수 있음)
DETAILS_DIR_ACTUAL = REPO_ROOT / "TASKS"             # 실제 상세 파일 위치
SCREEN_CONTRACT_PATH = REPO_ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"

DAG_PATH = REPO_ROOT / "TASKS" / "TASK_DAG.md"
WAVE_PLAN_PATH = REPO_ROOT / "TASKS" / "WAVE_PLAN.md"
WAVE_STATE_PATH = REPO_ROOT / "TASKS" / "WAVE_STATE.json"

MAX_WAVE_SIZE = 7
MIN_WAVE_SIZE = 4

GROUP_TITLES = {
    1: "Scaffold, 문서, Harness 확인",
    2: "Airbnb 스타일 공통 UI, 정적 데이터, Layout",
    3: "Supabase Auth, 6개 Table, 기본 RLS",
    4: "SCR-001 메인 Component와 Page Owner",
    5: "SCR-002 대표 소개 Component와 Page Owner",
    6: "SCR-003 여행 입력·외부 이동·동행글 입력 Component와 Page Owner",
    7: "SCR-004 동행 목록·상세·신청 Component와 Page Owner",
    8: "SCR-005 계정·내 활동·간단 관리자 Component와 Page Owner",
    9: "Unit·Playwright·접근성·CI",
    10: "Vercel Preview와 Release 확인",
}

SCREEN_TO_GROUP = {
    "SCR-001": 4,
    "SCR-002": 5,
    "SCR-003": 6,
    "SCR-004": 7,
    "SCR-005": 8,
}


class BuildError(Exception):
    pass


def read(path: Path) -> str | None:
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8")


def split_semicolon(value: str) -> list[str]:
    value = value.strip()
    if not value or value == "-":
        return []
    return [v.strip() for v in value.split(";") if v.strip()]


def extract_file_paths(expected_files_cell: str) -> list[str]:
    """Expected Files 셀(예: "`a.ts`(신규), `b.ts`(수정)")에서 backtick 안 경로만 뽑는다."""
    return re.findall(r"`([^`]+)`", expected_files_cell)


def load_manifest() -> list[dict]:
    text = read(MANIFEST_PATH)
    if text is None:
        raise BuildError(f"{MANIFEST_PATH} 없음 — 먼저 scripts/audit_tasks.py를 실행해 생성해야 한다.")
    rows = list(csv.DictReader(text.splitlines()))
    if not rows:
        raise BuildError(f"{MANIFEST_PATH}에 Task 행이 없다.")
    tasks = []
    for row in rows:
        task_id = row["Task ID"].strip()
        tasks.append(
            {
                "seq": int(row["Seq"]),
                "id": task_id,
                "category": row["Category"].strip(),
                "screen": row["Screen"].strip(),
                "route": row["Route"].strip(),
                "depends_on": split_semicolon(row["Depends On"]),
                "expected_files": extract_file_paths(row["Expected Files"]),
                "detail_file": row["Detail File"].strip(),
                "priority": row["Priority"].strip(),
                "raw": row,
            }
        )
    return tasks


def resolve_detail_dir() -> tuple[Path, str]:
    if DETAILS_DIR_SPEC.exists():
        return DETAILS_DIR_SPEC, "TASKS/details/ (사용자 지정 경로, 실제 존재)"
    return DETAILS_DIR_ACTUAL, "TASKS/ (실제 위치 — TASKS/details/ 디렉터리는 저장소에 없어 대체)"


def check_detail_files_exist(tasks: list[dict]) -> list[str]:
    detail_dir, _ = resolve_detail_dir()
    missing = []
    for t in tasks:
        if not (detail_dir / t["detail_file"]).exists():
            missing.append(t["id"])
    return missing


def load_screen_contract() -> dict:
    text = read(SCREEN_CONTRACT_PATH)
    if text is None:
        raise BuildError(f"{SCREEN_CONTRACT_PATH} 없음")
    data = json.loads(text)
    if data.get("schema_version") != HARNESS_SCHEMA:
        raise BuildError(
            f"{SCREEN_CONTRACT_PATH}의 schema_version이 {HARNESS_SCHEMA}와 다르다: "
            f"{data.get('schema_version')!r}"
        )
    return {s["screen_id"]: s for s in data["screens"]}


# ---------------------------------------------------------------------------
# 1. 순환 의존성 검사 (DFS, white/gray/black)
# ---------------------------------------------------------------------------

def detect_cycles(tasks_by_id: dict[str, dict]) -> list[list[str]]:
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {tid: WHITE for tid in tasks_by_id}
    cycles: list[list[str]] = []
    stack: list[str] = []

    def visit(tid: str):
        color[tid] = GRAY
        stack.append(tid)
        for dep in tasks_by_id[tid]["depends_on"]:
            if dep not in tasks_by_id:
                continue  # 존재하지 않는 의존성은 audit_tasks.py의 검사 3 영역, 여기선 건너뜀
            if color[dep] == GRAY:
                cycle_start = stack.index(dep)
                cycles.append(stack[cycle_start:] + [dep])
            elif color[dep] == WHITE:
                visit(dep)
        stack.pop()
        color[tid] = BLACK

    for tid in tasks_by_id:
        if color[tid] == WHITE:
            visit(tid)
    return cycles


# ---------------------------------------------------------------------------
# 위상 정렬 (Kahn's algorithm, 동률은 Seq 오름차순으로 결정)
# ---------------------------------------------------------------------------

def topological_order(tasks_by_id: dict[str, dict]) -> list[str]:
    indegree = {tid: 0 for tid in tasks_by_id}
    dependents: dict[str, list[str]] = {tid: [] for tid in tasks_by_id}
    for tid, t in tasks_by_id.items():
        for dep in t["depends_on"]:
            if dep not in tasks_by_id:
                continue
            indegree[tid] += 1
            dependents[dep].append(tid)

    ready = sorted([tid for tid, d in indegree.items() if d == 0], key=lambda x: tasks_by_id[x]["seq"])
    order: list[str] = []
    while ready:
        ready.sort(key=lambda x: tasks_by_id[x]["seq"])
        tid = ready.pop(0)
        order.append(tid)
        for nxt in dependents[tid]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                ready.append(nxt)

    if len(order) != len(tasks_by_id):
        remaining = set(tasks_by_id) - set(order)
        raise BuildError(f"위상 정렬 실패 — 순환 의존성으로 정렬되지 않은 Task: {sorted(remaining)}")
    return order


# ---------------------------------------------------------------------------
# Wave 그룹 배정 (사용자 지정 1~10 그룹)
# ---------------------------------------------------------------------------

def assign_group(t: dict) -> int:
    category = t["category"]
    if category == "INFRA":
        return 3 if t["id"] == "INFRA-AUTH-GUARD" else 2
    if category == "DATA":
        return 2
    if category in ("DB", "API", "RLS_TEST"):
        return 3
    if category in ("COMPONENT", "PAGE_OWNER"):
        screen = t["screen"].split(";")[0].strip()
        group = SCREEN_TO_GROUP.get(screen)
        if group is None:
            raise BuildError(f"{t['id']}: Screen 값 {t['screen']!r}을 Wave 그룹에 매핑할 수 없다.")
        return group
    if category in ("UNIT_TEST", "E2E_TEST", "CI", "MANUAL_CHECK"):
        return 9
    if category == "RELEASE_CHECK":
        return 10
    raise BuildError(f"{t['id']}: 알 수 없는 Category {category!r} — Wave 그룹 규칙에 없음.")


# ---------------------------------------------------------------------------
# 그룹 내부를 4~7개 단위 Wave로 분할 (Page Owner 단독 배치 + 파일 충돌 분리 포함)
# ---------------------------------------------------------------------------

def files_conflict(chunk: list[dict], candidate: dict) -> bool:
    existing = set()
    for t in chunk:
        existing.update(t["expected_files"])
    return bool(existing & set(candidate["expected_files"]))


def chunk_group(group_tasks_topo_order: list[dict]) -> list[list[dict]]:
    chunks: list[list[dict]] = []
    current: list[dict] = []

    def close_current():
        nonlocal current
        if current:
            chunks.append(current)
            current = []

    for t in group_tasks_topo_order:
        if t["category"] == "PAGE_OWNER":
            # 규칙 4: Page Owner는 해당 Screen 그룹의 마지막 Wave에 단독 배치
            close_current()
            chunks.append([t])
            continue
        if current and files_conflict(current, t):
            # 규칙 5: Expected Files가 겹치면 다른 Wave로 분리
            close_current()
        current.append(t)
        if len(current) >= MAX_WAVE_SIZE:
            close_current()
    close_current()
    return chunks


# ---------------------------------------------------------------------------
# 규칙 2 검증: 어떤 Task의 Depends On도 자신보다 뒤 Wave에 있으면 안 된다(같은 Wave는 허용)
# ---------------------------------------------------------------------------

def validate_no_forward_dependency(tasks_by_id: dict[str, dict], wave_index_of: dict[str, int]) -> list[str]:
    violations = []
    for tid, t in tasks_by_id.items():
        for dep in t["depends_on"]:
            if dep not in wave_index_of:
                continue
            if wave_index_of[dep] > wave_index_of[tid]:
                violations.append(
                    f"{tid}(Wave #{wave_index_of[tid]})의 선행 Task {dep}가 더 뒤 Wave(#{wave_index_of[dep]})에 배치됨"
                )
    return violations


# ---------------------------------------------------------------------------
# 출력 파일 작성
# ---------------------------------------------------------------------------

def write_task_dag(tasks: list[dict], tasks_by_id: dict[str, dict], cycles: list[list[str]], topo: list[str]) -> None:
    lines = [
        "# Task Dependency Graph (TASK_DAG)",
        "",
        f"**HARNESS_SCHEMA:** {HARNESS_SCHEMA}",
        f"**생성 스크립트:** `scripts/build_waves.py`",
        f"**대상:** `TASKS/TASK_MANIFEST.csv`({len(tasks)}개 Task)",
        "",
        "## 1. 순환 의존성 검사",
        "",
        f"검출된 순환 의존성: **{len(cycles)}건**",
        "",
    ]
    if cycles:
        for i, cyc in enumerate(cycles, start=1):
            lines.append(f"{i}. `{' -> '.join(cyc)}`")
    else:
        lines.append("순환 의존성 없음.")
    lines += [
        "",
        "## 2. 전역 위상 정렬 순서 (동률은 Seq 오름차순)",
        "",
    ]
    for i, tid in enumerate(topo, start=1):
        t = tasks_by_id[tid]
        deps = ", ".join(t["depends_on"]) if t["depends_on"] else "-"
        lines.append(f"{i}. `{tid}` (Seq {t['seq']}, {t['category']}) — Depends On: {deps}")
    lines += [
        "",
        "## 3. Task별 의존 관계 원본",
        "",
        "| Task ID | Category | Screen | Depends On | Expected Files |",
        "|---|---|---|---|---|",
    ]
    for t in tasks:
        deps = "; ".join(t["depends_on"]) if t["depends_on"] else "-"
        files = "; ".join(t["expected_files"]) if t["expected_files"] else "-"
        lines.append(f"| {t['id']} | {t['category']} | {t['screen']} | {deps} | {files} |")
    lines.append("")
    DAG_PATH.write_text("\n".join(lines), encoding="utf-8")


def write_wave_plan(waves: list[dict], screens: dict) -> None:
    lines = [
        "# Wave Plan",
        "",
        f"**HARNESS_SCHEMA:** {HARNESS_SCHEMA}",
        "**생성 스크립트:** `scripts/build_waves.py` — 이 문서와 `TASKS/WAVE_STATE.json`의 Wave ID가",
        "이후 `/run-wave`, `/release-check` 등 모든 단계의 정본이다. Wave ID는 W00~W10으로 사전 고정하지",
        "않고, 그룹(1~10) 총 Task 수가 7개를 넘거나 Expected Files 충돌·Page Owner 단독 배치 규칙 때문에",
        "그룹이 여러 Wave로 나뉜 결과에 따라 동적으로 부여했다.",
        "",
        "각 Wave의 `Tasks:` 목록은 **소속 표시용으로 Seq 오름차순 나열**한 것이며 실행 순서가 아니다. 실제 실행 순서는 `.claude/commands/run-wave.md` 3절의 런타임 규칙 — 그 Wave에서 Depends On이 전부 DONE인 Task 중 Seq가 가장 앞선 것을 하나씩 고르는 방식 — 을 따른다. 이 방식은 매번 DONE 여부로 다시 계산되므로, 나열 순서와 무관하게(예: W03의 `INFRA-AUTH-GUARD`가 `DB-SCHEMA-BASE`보다 먼저 나열되어 있어도) 항상 의존 순서를 지켜 실행된다.",
        "",
    ]
    for w in waves:
        lines.append(f"## {w['wave_id']}")
        lines.append(f"- Group: {w['group']} — {w['title']}")
        lines.append(f"- Tasks: {', '.join(w['task_ids'])}")
        cp = w["checkpoint_required"]
        if cp and w["group"] in SCREEN_TO_GROUP.values():
            screen_id = w["checkpoint_screen"]
            route = screens.get(screen_id, {}).get("route", "?")
            lines.append(f"- Preview Checkpoint: yes (SCREEN {screen_id} `{route}`)")
        elif cp:
            lines.append("- Preview Checkpoint: yes (전체 릴리스 판정)")
        else:
            lines.append("- Preview Checkpoint: no")
        lines.append("")
    WAVE_PLAN_PATH.write_text("\n".join(lines), encoding="utf-8")


def write_wave_state(waves: list[dict]) -> None:
    state = {
        "schema_version": HARNESS_SCHEMA,
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "waves": [
            {
                "wave_id": w["wave_id"],
                "title": w["title"],
                "task_ids": w["task_ids"],
                "status": "pending",
                "checkpoint_required": w["checkpoint_required"],
                "checkpoint_result": None,
            }
            for w in waves
        ],
    }
    WAVE_STATE_PATH.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_manifest_with_wave_id(tasks: list[dict], wave_id_of: dict[str, str]) -> None:
    text = read(MANIFEST_PATH)
    reader = csv.DictReader(text.splitlines())
    fieldnames = list(reader.fieldnames)
    if "wave_id" not in fieldnames:
        fieldnames = fieldnames + ["wave_id"]
    rows = []
    for row in reader:
        row = dict(row)
        row["wave_id"] = wave_id_of.get(row["Task ID"].strip(), "")
        rows.append(row)
    with MANIFEST_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    print(f"=== build_waves.py — HARNESS_SCHEMA={HARNESS_SCHEMA} ===\n")

    try:
        tasks = load_manifest()
    except BuildError as e:
        print(f"BUILD_WAVES_FAIL: {e}")
        return 1

    tasks_by_id = {t["id"]: t for t in tasks}

    detail_dir, detail_dir_note = resolve_detail_dir()
    print(f"상세 Task 파일 위치: {detail_dir_note}")
    missing_details = check_detail_files_exist(tasks)
    if missing_details:
        print(f"BUILD_WAVES_FAIL: 상세 파일 누락 — {missing_details}")
        return 1

    try:
        screens = load_screen_contract()
    except BuildError as e:
        print(f"BUILD_WAVES_FAIL: {e}")
        return 1

    # 1. 순환 의존성 검사
    cycles = detect_cycles(tasks_by_id)
    print(f"순환 의존성 검사: {len(cycles)}건 발견")
    if cycles:
        for cyc in cycles:
            print(f"  - {' -> '.join(cyc)}")
        print("\nBUILD_WAVES_FAIL: 순환 의존성이 있어 Wave를 구성할 수 없다.")
        # 그래도 진단용으로 DAG는 남긴다(WAVE_PLAN/STATE/MANIFEST는 쓰지 않는다)
        try:
            topo_partial = []  # 위상 정렬 불가능하므로 빈 순서로 기록
            write_task_dag(tasks, tasks_by_id, cycles, topo_partial)
            print(f"진단용 {DAG_PATH} 작성됨(Wave 산출물은 작성하지 않음).")
        except Exception:
            pass
        return 1

    # 존재하지 않는 Depends On 참조 검사(그룹 배정 전에 걸러야 위상 정렬이 안전함)
    dangling = []
    for t in tasks:
        for dep in t["depends_on"]:
            if dep not in tasks_by_id:
                dangling.append(f"{t['id']} -> {dep}")
    if dangling:
        print(f"BUILD_WAVES_FAIL: 존재하지 않는 Depends On 참조 {len(dangling)}건 — {dangling}")
        return 1

    topo = topological_order(tasks_by_id)

    # 그룹 배정
    try:
        for t in tasks:
            t["group"] = assign_group(t)
    except BuildError as e:
        print(f"BUILD_WAVES_FAIL: {e}")
        return 1

    # 그룹별로 전역 위상 순서를 유지한 채 모아서 청크(Wave)로 분할
    waves: list[dict] = []
    wave_counter = 0
    for group_num in range(1, 11):
        group_tasks = [tasks_by_id[tid] for tid in topo if tasks_by_id[tid]["group"] == group_num]
        if not group_tasks:
            print(f"Group {group_num}({GROUP_TITLES[group_num]}): TASK_MANIFEST.csv에 해당 Task 없음 — Wave 생성 생략")
            continue
        chunks = chunk_group(group_tasks)
        multi = len(chunks) > 1
        for i, chunk in enumerate(chunks, start=1):
            wave_counter += 1
            wave_id = f"W{wave_counter:02d}"
            title = GROUP_TITLES[group_num] if not multi else f"{GROUP_TITLES[group_num]} ({i}/{len(chunks)})"
            is_page_owner_wave = len(chunk) == 1 and chunk[0]["category"] == "PAGE_OWNER"
            is_release_wave = group_num == 10
            checkpoint_required = is_page_owner_wave or is_release_wave
            checkpoint_screen = chunk[0]["screen"].split(";")[0].strip() if is_page_owner_wave else None
            waves.append(
                {
                    "wave_id": wave_id,
                    "group": group_num,
                    "title": title,
                    "task_ids": [t["id"] for t in sorted(chunk, key=lambda x: x["seq"])],
                    "checkpoint_required": checkpoint_required,
                    "checkpoint_screen": checkpoint_screen,
                }
            )

    wave_index_of = {}
    wave_id_of = {}
    for idx, w in enumerate(waves, start=1):
        for tid in w["task_ids"]:
            wave_index_of[tid] = idx
            wave_id_of[tid] = w["wave_id"]

    # 규칙 2 검증
    violations = validate_no_forward_dependency(tasks_by_id, wave_index_of)
    if violations:
        print(f"BUILD_WAVES_FAIL: 선행 Task가 뒤 Wave에 배치된 위반 {len(violations)}건")
        for v in violations:
            print(f"  - {v}")
        return 1

    # 산출물 작성
    write_task_dag(tasks, tasks_by_id, cycles, topo)
    write_wave_plan(waves, screens)
    write_wave_state(waves)
    write_manifest_with_wave_id(tasks, wave_id_of)

    # 종료 보고
    print("\n=== 결과 ===")
    print(f"순환 의존성 수: {len(cycles)}")
    print(f"Wave 수: {len(waves)}")
    print("\nWave별 Task 수:")
    undersized = []
    for w in waves:
        n = len(w["task_ids"])
        flag = ""
        if n < MIN_WAVE_SIZE:
            flag = "  (4개 미만 — 그룹 잔여/Page Owner 단독/Release 단독으로 인한 예외)"
            undersized.append(w["wave_id"])
        print(f"  {w['wave_id']} [{w['title']}]: {n}개{flag}")

    print("\nPage Owner 위치:")
    for w in waves:
        if len(w["task_ids"]) == 1 and w["task_ids"][0].startswith("PAGE-"):
            print(f"  {w['task_ids'][0]} -> {w['wave_id']} (단독 배치, Preview Checkpoint: yes)")

    print(f"\n산출물: {DAG_PATH}, {WAVE_PLAN_PATH}, {WAVE_STATE_PATH}, {MANIFEST_PATH}(wave_id 열 추가)")
    print("\nBUILD_WAVES_PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
