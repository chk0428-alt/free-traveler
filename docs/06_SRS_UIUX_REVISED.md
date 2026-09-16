# SRS Revision — UI/UX Route Consolidation

**Document ID:** SRS-TRAVEL-001-REV-UIUX
**개정 대상:** `02_SRS_BASELINE.md`(SRS-TRAVEL-001 v1.0) 3.5절 Page and Route Inventory, 3.6절 Use Cases
**개정 근거:** `05_UIUX_APPROVED.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`
**작성일:** 2026-09-15
**상태:** Revision Baseline — REQ-FUNC-001~080, REQ-NF-001~034 전건 유지

---

## 1. 개정 범위와 원칙

이 문서는 `02_SRS_BASELINE.md`의 **요구사항 본문(REQ-FUNC-001~080, REQ-NF-001~034)을 하나도 삭제·변경하지 않는다.** 요구사항의 정식 텍스트, 우선순위, Acceptance Criteria는 `02_SRS_BASELINE.md` 4절을 그대로 따른다. 이 문서가 개정하는 대상은 오직 **화면·라우트 구조**(3.5절 Page and Route Inventory, 3.6절 Use Cases의 화면 매핑)이며, 다중 공개 Route를 5개 승인 Screen(SCR-001~005)의 탭·Drawer/Modal·패널로 통합한 결과를 반영한다.

요구사항별 최종 배치(Screen/Route/Page Entry)와 구현 여부(IMPLEMENT/IMPLEMENT(축소)/EXCLUDED)는 `docs/UIUX_TRACEABILITY.md`에서 전건 확인할 수 있다. 이 문서는 그 근거가 되는 라우트 구조 개정만 다룬다.

---

## 2. 개정된 3.5절 — Page and Route Inventory

### 2.1 승인된 공개 Screen (5개)

| Route | Screen | Access | 비고 |
|---|---|---|---|
| `/` | SCR-001 메인 | Public | 여행지 탐색 + 여행지/안전정보 상세(Drawer/Modal) |
| `/about` | SCR-002 대표 소개 | Public | |
| `/travel-tools` | SCR-003 통합 여행 준비 | Public(동행 탭 작성은 Adult Member) | 항공/숙소/동행 구하기 3탭 |
| `/mates` | SCR-004 동행 조회 | Public(참가 요청·글쓰기는 Adult Member) | 목록 + 상세(Desktop 분할/Mobile Drawer) |
| `/account` | SCR-005 계정·관리 | Public(Guest)/Member/Admin | 로그인·프로필, 내 활동, 관리자 탭(권한별 표시) |

### 2.2 기술 Route (Screen 수에서 제외)

| Route | 용도 |
|---|---|
| `/auth/callback` | Supabase Auth 이메일 인증 콜백 |
| `/api/*` | 여행지·동행·신고·차단·관리자 설정 API |
| 공통 404 | `not-found.tsx` |
| 공통 500 | `error.tsx` |

### 2.3 원래 SRS 3.5절 Route → 승인 Screen 매핑(삭제가 아닌 통합)

원래 SRS 3.5절에 개별 Route로 정의되어 있던 아래 화면들은 **삭제되는 것이 아니라**, 동일한 사용자 가치를 5개 Screen 내부의 탭/Drawer/Modal/패널로 제공하도록 통합되었다.

| 원래 Route(SRS 3.5) | 통합된 위치 |
|---|---|
| `/destinations`, `/destinations/domestic`, `/destinations/overseas` | SCR-001 국내/해외 여행지 섹션 |
| `/destinations/[slug]` | SCR-001 여행지 상세 Drawer/Modal |
| `/flights` | SCR-003 항공편 찾기 탭 |
| `/hotels` | SCR-003 숙소 찾기 탭 |
| `/mates/[id]` | SCR-004 상세 패널(Desktop)/상세 Drawer(Mobile) |
| `/mates/new` | SCR-003 동행 구하기 탭 |
| `/safety`, `/safety/[countryCode]` | SCR-001 여행지 상세 Drawer 내 안전정보 하위 탭 |
| `/auth/*` | SCR-005 로그인·프로필 탭 |
| `/my/*` | SCR-005 내 활동 탭 |
| `/admin/*` | SCR-005 관리자 탭(신고 상태 변경 + 외부 URL 설정으로 범위 축소, `PROJECT_SCOPE.md` 기준) |

---

## 3. 개정된 3.6절 — Use Cases

`02_SRS_BASELINE.md` 3.6절의 Use Case ID와 Related Requirements 범위는 변경하지 않는다. Actor/Screen 매핑만 5-Screen 구조에 맞게 갱신한다.

| ID | Use Case | Actor | Screen(개정) | Related Requirements |
|---|---|---|---|---|
| UC-01 | 여행지 검색·필터·상세 열람 | Guest/Member | SCR-001 | REQ-FUNC-001~010 |
| UC-02 | 항공 여행 조건 입력·요약·외부 이동 | Guest/Member | SCR-003(항공편 탭) | REQ-FUNC-011~018 |
| UC-03 | 호텔 숙박 조건 입력·요약·외부 이동 | Guest/Member | SCR-003(숙소 탭) | REQ-FUNC-019~026 |
| UC-04 | 동행 모집글 작성·마감 | Adult Member | SCR-003(동행 구하기 탭) 작성 / SCR-004 마감·수정 | REQ-FUNC-027~033, 037~038 |
| UC-05 | 동행 참가 요청·승인·거절 | Adult Member | SCR-004(상세 패널) / SCR-005(내 활동) | REQ-FUNC-034~036, 043 |
| UC-06 | 신고·차단·운영 처리 | Adult Member/Moderator | SCR-004(신고·차단) / SCR-005(관리자 탭) | REQ-FUNC-039~045 |
| UC-07 | 국가별 안전정보 확인 | Guest/Member | SCR-001(안전정보 Drawer) | REQ-FUNC-046~056 |
| UC-08 | 대표 소개 확인 | Guest/Member | SCR-002 | REQ-FUNC-057~063 |
| UC-09 | 콘텐츠·외부 URL 관리 | Editor/Admin | SCR-005(관리자 탭, 외부 URL 설정만 — 콘텐츠 CRUD는 EXCLUDED) | REQ-FUNC-072~077 (072~076은 EXCLUDED, 077만 IMPLEMENT) |

> UC-09는 원래 "콘텐츠·외부 URL 관리"였으나 `PROJECT_SCOPE.md`에 따라 콘텐츠 CRUD(REQ-FUNC-072~076)는 EXCLUDED다. Use Case 이름과 Related Requirements 범위는 원문 그대로 유지하되, 실제 SCR-005 관리자 탭은 REQ-FUNC-077(외부 URL 설정)만 제공한다는 점을 명시한다.

---

## 4. 유지되는 Constraint에 추가되는 항목

`02_SRS_BASELINE.md` 1.2.3절 Constraints(CON-01~14)는 변경하지 않으며, 아래 항목을 라우팅 관련 제약으로 추가한다.

| ID | 제약사항 | 유형 |
|---|---|---|
| **CON-15** | 공개 UI는 정확히 5개 디자인 Screen(SCR-001~005)으로 구성하며, 신규 공개 Route를 추가로 만들지 않는다. 하위 기능은 Screen 내부의 탭/Drawer/Modal/패널로 구현한다. | 아키텍처 |
| **CON-16** | Screen–Route–Page Entry 대응은 `design-reference/SCREEN_ROUTE_CONTRACT.json`을 정본으로 하며, Route/Page Entry 중복을 만들지 않는다. | 아키텍처 |

---

## 5. 요구사항 전건 유지 확인

REQ-FUNC-001~080(80건), REQ-NF-001~034(34건) 총 **114건**은 `02_SRS_BASELINE.md` 4절에 정의된 원문을 그대로 유지하며 이 개정에서 삭제되거나 축소 표기되지 않는다. 각 요구사항의 (a) `PROJECT_SCOPE.md` 구현 여부 분류, (b) 개정된 Screen/Route/Page Entry 배치, (c) Task/Test 상태는 `docs/UIUX_TRACEABILITY.md`에서 1:1로 확인한다.

| 분류 | 건수 |
|---|---|
| REQ-FUNC-001~080 | 80건 (전건 `UIUX_TRACEABILITY.md`에 등장) |
| REQ-NF-001~034 | 34건 (전건 `UIUX_TRACEABILITY.md`에 등장) |
| 합계 | 114건 |
