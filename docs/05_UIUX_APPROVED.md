# Free Traveler — UI/UX Approved Baseline

**Document ID:** UIUX-APPROVED-001
**기반 문서:** `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`, `03_UI_COVERAGE_ANALYSIS.md`, `04_UIUX_PLAN.md`, `STITCH_VALIDATION_REPORT.md`, `design-reference/D-001/DESIGN.md`, `design-reference/DESIGN_MANIFEST.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`
**작성일:** 2026-09-15
**상태:** APPROVED — 구현 착수 전 승인 기준선(코드 구현은 아직 없음)

---

## 1. 승인 배경

`01_PRD.md` → `02_SRS_BASELINE.md`(REQ-FUNC-001~080, REQ-NF-001~034) → `PROJECT_SCOPE.md`(IMPLEMENT/IMPLEMENT(축소)/EXCLUDED 분류) → `03_UI_COVERAGE_ANALYSIS.md`(UI 분류 + 5 Screen 배치) → `04_UIUX_PLAN.md`(Screen별 Section 계약) → Google Stitch 생성·검증(`STITCH_VALIDATION_REPORT.md`, 최종 판정 `STITCH_VALIDATION_PASS`) → `design-reference/D-001/DESIGN.md`(디자인 정본, LOCKED) → `design-reference/UI_CONTRACT.md` / `SCREEN_ROUTE_CONTRACT.json`(Next.js 구현 계약)으로 이어지는 전체 체인을 근거로, 아래 5개 Screen을 **UI/UX 승인 기준선**으로 확정한다.

이 문서는 **디자인·구현 계약의 승인 상태**를 기록하는 문서이며, 실제 Next.js 코드 구현 여부를 의미하지 않는다. 현재 `src/app`에는 `layout.tsx`, `page.tsx`(초기 템플릿)만 존재하고 `about`, `travel-tools`, `mates`, `account` 라우트의 구현 코드는 아직 작성되지 않았다.

---

## 2. 승인된 5개 Screen

| Screen ID | Route | Page Entry | 분류 | Stitch 승인 ID(Desktop) | Mobile 변형 | 상태 |
|---|---|---|---|---|---|---|
| SCR-001 | `/` | `src/app/page.tsx` | 핵심 | `2a0bea03968b44548ab4995d295c5a4d` | ✅ `eec6035a9fef48f5a2f18462a5849d15` | DESIGN_APPROVED |
| SCR-002 | `/about` | `src/app/about/page.tsx` | 보조 | `86756e99f46e4d06b68d1ab22cdc5327` | ❌ 미승인 | DESIGN_APPROVED (Desktop만) |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | 핵심 | `ed9175c4fae84c29976b5dee948f82a7` | ✅ `f290caa5ed354c70bde4b18f60be16d6` | DESIGN_APPROVED |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | 핵심 | `6e4e82f9d4724e21b40b73717526ba4f` | ❌ 미승인 | DESIGN_APPROVED (Desktop만) |
| SCR-005 | `/account` | `src/app/account/page.tsx` | 핵심 | `b0f813f46e80419480b1cd7c8ad632f8`(관리자 탭 포함 최종본) | ❌ 미승인 | DESIGN_APPROVED (Desktop만) |

핵심 4(SCR-001, SCR-003, SCR-004, SCR-005) · 보조 1(SCR-002) 구분은 `design-reference/UI_CONTRACT.md` 0절과 동일하다. SCR-002/004/005의 Mobile 변형은 이번 승인 범위에 포함되지 않으며, 구현 시 `design-reference/D-001/DESIGN.md` 15절 규칙을 적용한 뒤 별도 Stitch 검증이 필요하다.

---

## 3. 기존 다중 Route → 5 Screen 통합 매핑

`02_SRS_BASELINE.md` 3.5절에 정의된 기존 다중 공개 Route는 신규 라우트를 만들지 않고 5개 Screen의 탭·Drawer/Modal·패널로 통합한다.

| 기존 SRS Route | 기존 용도 | 통합 대상 | 통합 방식 |
|---|---|---|---|
| `/` | 홈 | SCR-001 | 그대로 유지 |
| `/destinations`, `/destinations/domestic`, `/destinations/overseas` | 여행지 목록 | SCR-001 | 국내/해외 Card Grid 섹션(탭 없이 하나의 스크롤 섹션으로 통합) |
| `/destinations/[slug]` | 여행지 상세 | SCR-001 | 같은 화면의 **상세 Drawer/Modal** |
| `/flights` | 항공 입력·요약 | SCR-003 | **항공편 찾기 탭** |
| `/hotels` | 호텔 입력·요약 | SCR-003 | **숙소 찾기 탭** |
| `/mates` | 동행 모집글 목록 | SCR-004 | 그대로 유지 |
| `/mates/[id]` | 동행 모집글 상세 | SCR-004 | Desktop 좌우 분할 상세 패널 / Mobile 상세 **Drawer** |
| `/mates/new` | 동행 모집글 작성 | SCR-003 | **동행 구하기 탭**의 작성 Form |
| `/safety`, `/safety/[countryCode]` | 국가별 주의사항 | SCR-001 | 여행지 상세 Drawer 내 **안전정보 하위 탭** |
| `/about` | 대표 소개 | SCR-002 | 그대로 유지 |
| `/auth/*` | 가입·로그인·성인확인 | SCR-005 | **로그인·프로필 탭** |
| `/my/*` | 내 글·참가 요청·차단 | SCR-005 | **내 활동 탭** |
| `/admin/*` | 콘텐츠·신고·설정 | SCR-005 | **관리자 탭**(신고 상태 변경 + 외부 URL 설정만, 콘텐츠 CRUD는 EXCLUDED) |

> `/admin/*`의 원래 범위(콘텐츠 CRUD, 미디어 관리 등)는 `PROJECT_SCOPE.md`에 따라 대부분 **EXCLUDED**이며, SCR-005 관리자 탭에는 신고 상태 변경과 외부 URL 설정만 남는다. 존재하지 않는 기능을 있는 것처럼 표기하지 않는다.

---

## 4. UI Route Contract

`design-reference/SCREEN_ROUTE_CONTRACT.json`(schema `traveler-screen-route-v1`, framework `nextjs-app-router`)을 이 승인 문서의 정본 계약으로 채택한다. 핵심 내용 요약:

### 4.1 Screens (5개, 중복 없음)

| screen_id | route | page_entry | page_owner_task_required | preview_required | starter_template_forbidden |
|---|---|---|---|---|---|
| SCR-001 | `/` | `src/app/page.tsx` | true | true | **true** |
| SCR-002 | `/about` | `src/app/about/page.tsx` | true | true | false |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | true | true | false |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | true | true | false |
| SCR-005 | `/account` | `src/app/account/page.tsx` | true | true | false |

### 4.2 Technical Routes (Screen 수에 미포함)

| type | route | page_entry |
|---|---|---|
| auth_callback | `/auth/callback` | `src/app/auth/callback/route.ts` |
| api_route | `/api/*` | `src/app/api/**/route.ts` |
| not_found | `*` | `src/app/not-found.tsx` |
| error_boundary | `*` | `src/app/error.tsx` |

### 4.3 Required Navigation / External Navigation

화면 간 이동(`required_navigation`)과 외부 새 탭 이동(`external_navigation`)은 `SCREEN_ROUTE_CONTRACT.json`과 `UI_CONTRACT.md` 7절의 Mermaid 다이어그램을 정본으로 한다. 외부 이동은 항공/숙소 외부 사이트와 외교부 안전정보 원문으로 한정하며 `target=_blank`, `rel=noopener noreferrer`를 적용한다.

### 4.4 Completion Checks

`route_duplicates: false`, `page_entry_duplicates: false`, `screen_count: 5`, `core_screen_count: 4`, `supporting_screen_count: 1` — `SCREEN_ROUTE_CONTRACT.json` 생성 시점에 검증 완료.

---

## 5. Release Acceptance Criteria

아래 조건을 **모두** 충족해야 해당 범위의 릴리스를 승인할 수 있다. 체크 항목은 현재 상태를 함께 표기한다(가짜로 완료 처리하지 않는다).

| # | 기준 | 현재 상태 |
|---|---|---|
| 1 | REQ-FUNC-001~080, REQ-NF-001~034 전수가 `docs/UIUX_TRACEABILITY.md`에 누락 없이 매핑되어 있다 | ✅ 충족(114건 매핑, 3절 참고) |
| 2 | IMPLEMENT/IMPLEMENT(축소)로 분류된 모든 요구사항이 승인된 5 Screen 중 하나(또는 공통 레이아웃/기술 Route)에 배치되어 있다 | ✅ 충족 |
| 3 | EXCLUDED로 분류된 요구사항이 어떤 Screen에도 기능으로 구현되지 않는다 | ✅ 충족(Stitch 승인 화면에 CMS·통계 대시보드·리뷰·실시간 가격 등 미포함, `STITCH_VALIDATION_REPORT.md` 검증) |
| 4 | 5개 Screen 모두 Stitch 검증 판정이 PASS다 | ✅ 충족(`STITCH_VALIDATION_PASS`) |
| 5 | SCR-001, SCR-003의 Mobile 변형이 승인되어 있다 | ✅ 충족 |
| 6 | SCR-002, SCR-004, SCR-005의 Mobile 변형이 승인되어 있다 | ❌ 미충족 — 구현 전 별도 Stitch 검증 필요 |
| 7 | `design-reference/D-001/DESIGN.md`가 LOCKED 상태이며 색상·타이포그래피·컴포넌트 토큰 외 임의 값이 없다 | ✅ 충족 |
| 8 | Route 중복, Page Entry 중복이 없다 | ✅ 충족(`SCREEN_ROUTE_CONTRACT.json` completion_checks) |
| 9 | Airbnb 상표 요소, 예약·결제 UI, Proprietary 폰트가 승인 화면에 없다 | ✅ 충족(`STITCH_VALIDATION_REPORT.md` grep 기반 검증) |
| 10 | 각 Requirement에 대한 Task가 생성되어 있다 | ❌ 미충족 — 전 항목 `PENDING_TASK_GENERATION`(4절 참고) |
| 11 | 각 IMPLEMENT/IMPLEMENT(축소) 요구사항에 대응하는 Page Entry 코드가 실제로 작성되어 있다 | ❌ 미충족 — 코드 구현 전 단계 |
| 12 | Playwright 핵심 Smoke Test가 정의되고 통과한다 | ❌ 미충족 — 테스트 코드 작성 전 단계 |

> 6·10·11·12번은 **구현 착수 전이므로 미충족이 정상**이다. 이 문서는 "구현 완료"가 아니라 "구현에 착수할 수 있는 승인된 설계 기준선"임을 명시한다.

---

## 6. EXCLUDED 기능 (재확인)

`PROJECT_SCOPE.md`에서 확정된 EXCLUDED 항목(REQ-FUNC 15건, REQ-NF 22건, 총 37건)은 이번 승인 범위에도 그대로 EXCLUDED로 유지되며, 5개 Screen 어디에도 기능으로 구현하지 않는다. 대표 항목: 전체 콘텐츠 CMS(REQ-FUNC-072), 미디어 라이선스 업로드(REQ-FUNC-073), 감사 로그(REQ-FUNC-076), 통합검색(REQ-FUNC-067), 회원 탈퇴 자동 비식별화(REQ-FUNC-045), 성능/가용성/속도제한 등 운영 모니터링 전반(REQ-NF-001~005, 008~011, 019~022, 024~025, 029~034). 전체 목록과 사유는 `PROJECT_SCOPE.md` 5·6절, 매핑은 `docs/UIUX_TRACEABILITY.md`를 따른다.

---

## 7. 승인 서명

| 항목 | 값 |
|---|---|
| Active Design Version | D-001 (LOCKED) |
| Approved Screens | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005 |
| Approved Mobile Variants | SCR-001, SCR-003 |
| UI Route Contract | `design-reference/SCREEN_ROUTE_CONTRACT.json` |
| Traceability | `docs/UIUX_TRACEABILITY.md` |
| Next Step | Task 생성(`PENDING_TASK_GENERATION` → 개별 Task ID 배정) 후 Page Entry 구현 착수 |
