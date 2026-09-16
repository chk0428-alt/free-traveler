# Free Traveler — UI/UX Traceability Matrix

**Document ID:** UIUX-TRACE-001
**기반 문서:** `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`, `03_UI_COVERAGE_ANALYSIS.md`, `05_UIUX_APPROVED.md`, `06_SRS_UIUX_REVISED.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`
**작성일:** 2026-09-15
**상태:** Traceability Baseline — REQ-FUNC-001~080, REQ-NF-001~034 전건(114건) 수록

---

## 1. 열 정의

| 열 | 정의 |
|---|---|
| **Requirement** | SRS ID + 요약(원문은 `02_SRS_BASELINE.md` 4절 참조, 이 문서에서 축약하지 않고 전건 나열) |
| **Implementation Status** | `PROJECT_SCOPE.md` 확정 분류: `IMPLEMENT` / `IMPLEMENT(축소)` / `EXCLUDED`. 구현 범위 결정이며 **코드 작성 완료를 의미하지 않는다.** |
| **Screen** | 승인된 SCR-001~005 중 배치 위치, 또는 `전체 공통`(Header/Footer/반응형 등 공통 레이아웃), `기술 Route`, `N/A(미구현)` |
| **Route** | `design-reference/SCREEN_ROUTE_CONTRACT.json` 기준 실제 Next.js Route |
| **Page Entry** | 대응 파일 경로(App Router) |
| **Task** | 구현 Task ID. Task가 아직 생성되지 않았으므로 전 항목 `PENDING_TASK_GENERATION` |
| **Test** | SRS 5.1/5.2절 Test Case ID(`TC-FUNC-XXX`/`TC-NF-XXX`, 요구사항과 1:1 번호 대응) + 검증 방법 태그. EXCLUDED 항목은 "(SRS 정의, 미구현으로 실행 안 함)"으로 표기 |
| **Status** | 이 요구사항의 현재 실제 진행 상태. `EXCLUDED`(제외 확정) / `DESIGN_APPROVED_PENDING_IMPLEMENTATION`(Screen 디자인 승인 완료, 코드 미작성) / `PENDING_IMPLEMENTATION`(디자인 승인 대상이 아닌 기술/인프라 항목, 코드 미작성). **어떤 항목도 "구현 완료"로 표기하지 않는다** — 현재 `src/app`에는 실제 페이지 코드가 존재하지 않기 때문이다. |

---

## 2. Functional Requirements (REQ-FUNC-001~080)

### 2.1 F1. Destination Guide

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-001 국내·해외 여행지 목록 구분 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-001 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-002 국가·도시·계절·테마·기간 필터 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-002 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-003 키워드 검색 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-003 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-004 상세 필수 콘텐츠 항목 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-004 (코드리뷰+렌더확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-005 결과 없음 안내·초기화 버튼 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-005 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-006 해외 상세 → 국가 안전 페이지 연결 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-006 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-007 대표 이미지 alt/출처/작가/라이선스 | IMPLEMENT(축소) | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-007 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-008 게시 수량 기준(국내10/해외15개국30도시) 검증 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-008 (수동확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-009 관련 여행지 추천 최대 6개 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-009 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-010 필터 상태 URL 반영·복원 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-010 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 2.2 F2. Flight Link-out

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-011 국가·지역·출발일·귀국일 필수 입력 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-011 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-012 국가별 지역 옵션 제한·초기화 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-012 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-013 과거/역전 날짜 제출 차단 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-013 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-014 유효 입력 후 요약 표시 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-014 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-015 입력값 비전달 고지 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-015 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-016 외부 항공 URL 새 탭(noopener) | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-016 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-017 입력값 서버 미저장 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-017 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-018 외부 URL 오류 시 이동 차단·재시도 | IMPLEMENT | SCR-003(항공편 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-018 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |

### 2.3 F3. Hotel Link-out

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-019 국가·지역·체크인·체크아웃 필수 입력 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-019 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-020 국가별 지역 옵션 제한·초기화 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-020 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-021 과거/역전 날짜 제출 차단 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-021 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-022 유효 입력 후 요약 표시 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-022 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-023 입력값 비전달 고지 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-023 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-024 외부 호텔 URL 새 탭(noopener) | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-024 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-025 입력값 서버 미저장 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-025 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-026 URL 오류 시 이동 차단·재시도 | IMPLEMENT | SCR-003(숙소 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-026 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |

### 2.4 F4. Travel Mate

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-027 쓰기 작업에 이메일 인증 세션 요구 | IMPLEMENT | SCR-003, SCR-004 | `/travel-tools`, `/mates` | `src/app/travel-tools/page.tsx`, `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-027 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-028 성인확인 요구, 생년월일 미저장 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-028 (Supabase 스키마 확인+Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-029 동행 프로필(닉네임·연령대·성별·스타일·소개) | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-029 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-030 국가·기간·연령대·성별·스타일·상태 필터 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-030 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-031 모집글 작성 필드·검증 | IMPLEMENT | SCR-003(동행 구하기 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-031 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-032 공개 연락처 패턴 탐지·제출 차단 | IMPLEMENT | SCR-003(동행 구하기 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-032 (단위테스트+Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-033 모집글 표시 시 연락처 비노출 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-033 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-034 참가 메시지 비공개 제출(PENDING) | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-034 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-035 중복 PENDING/ACCEPTED 요청 차단 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-035 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-036 작성자의 승인/거절 처리 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-036 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-037 종료일 경과 시 자동 CLOSED(조회 시점 계산) | IMPLEMENT(축소) | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-037 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-038 작성자의 수동 마감·수정·삭제 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-038 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-039 글/사용자/요청 신고 제출 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-039 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-040 사용자 차단·해제 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-040 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-041 Moderator 신고 목록·상태 필터 | IMPLEMENT(축소) | SCR-005(관리자 탭) | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-041 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-042 경고·숨김·계정 제한 등 제재 조치 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-042 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-043 요청/신고 처리 결과 알림(이메일 선택) | IMPLEMENT(축소) | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-043 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-044 RLS 기반 비공개 데이터 접근 제한 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-044 (Supabase RLS 테스트+Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-045 탈퇴 시 비식별화·30일 삭제 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-045 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 2.5 F5. Country Safety

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-046 소개 해외국가 전체 안전 페이지 확보 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-046 (수동확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-047 8개 안전 카테고리 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-047 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-048 공식 출처·최종 확인일·편집자 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-048 (데이터 스키마 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-049 외교부 원문 링크 새 탭 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-049 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-050 확인 후 7일 초과 stale 경고(렌더링 시 계산) | IMPLEMENT(축소) | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-050 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-051 중대 경보 상단 텍스트 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-051 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-052 국가/지역 경보 범위 구분 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-052 (데이터 스키마 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-053 긴급연락처(현지·영사콜센터) 표시 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-053 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-054 공식 판단 대체 불가 고지 | IMPLEMENT | SCR-001, SCR-003 | `/`, `/travel-tools` | `src/app/page.tsx`, `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-054 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-055 Editor/Admin 안전 콘텐츠 작성·검수 워크플로 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-055 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-056 안전정보 변경 이력 보존 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-056 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 2.6 F6. About free_traveler

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-057 대표명·50+/30+ 표시 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-057 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-058 소개문·철학·편집 원칙 표시 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-058 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-059 방문 권역/30개국 이상 목록 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-059 (데이터 개수 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-060 여행 타임라인 표시 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-060 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-061 대표 이미지 alt/출처/작가/라이선스 | IMPLEMENT(축소) | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-061 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-062 문의·SNS 링크 | IMPLEMENT(축소) | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-062 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-063 추천 여행지 6곳 연결 | IMPLEMENT | SCR-002 → SCR-001 | `/about` → `/` | `src/app/about/page.tsx` → `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-063 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |

### 2.7 F7. Common, Admin, Governance

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-064 전역 내비게이션·푸터 | IMPLEMENT | 전체 공통(SCR-001~005) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-FUNC-064 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-065 320px~데스크톱 반응형 레이아웃 | IMPLEMENT | 전체 공통(SCR-001~005) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-FUNC-065 (수동 뷰포트 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-066 이메일 가입·인증·로그인·로그아웃·재설정 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-066 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-067 여행지·안전정보 통합 검색 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-067 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-068 여행지 즐겨찾기 추가/해제/조회 | IMPLEMENT | SCR-001, SCR-005 | `/`, `/account` | `src/app/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-068 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-069 공개 페이지 URL 공유 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-069 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-070 SEO 메타데이터·구조화 데이터 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-070 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-071 행동 분석 이벤트 기록 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-071 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-072 Editor/Admin 콘텐츠 CRUD | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-072 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-073 미디어 업로드 시 출처·라이선스 필수 입력 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-073 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-074 게시 전 완전성 게이트 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-074 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-075 안전정보 stale 대시보드 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-075 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-076 관리자 변경·신고 처리 감사 로그 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-076 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-FUNC-077 항공·호텔 외부 URL 허용목록 설정 | IMPLEMENT | SCR-005(관리자 탭) | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-077 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-078 404/500/권한없음/외부연결실패 복구 행동 | IMPLEMENT | 기술 Route | `*` | `src/app/not-found.tsx`, `src/app/error.tsx` | PENDING_TASK_GENERATION | TC-FUNC-078 (Playwright) | PENDING_IMPLEMENTATION |
| REQ-FUNC-079 폼·모달·탭 시맨틱/ARIA | IMPLEMENT(축소) | 전체 공통(SCR-001~005) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-FUNC-079 (코드리뷰+수동 키보드 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-FUNC-080 정책 고지 + 동행 안전수칙 동의 기록 | IMPLEMENT(축소) | SCR-003(동행 구하기 탭) | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-080 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |

---

## 3. Non-Functional Requirements (REQ-NF-001~034)

### 3.1 Performance

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-001 LCP p75 ≤2.5s | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-001 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-002 INP p75 ≤200ms | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-002 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-003 CLS p75 ≤0.1 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-003 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-004 필터 응답 p95 ≤1s(동시 50명) | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-004 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-005 쓰기 API 응답 p95 ≤3s | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-005 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-006 이미지 반응형·lazy load | IMPLEMENT | 전체 공통(SCR-001~004) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-NF-006 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-007 배포 전 Lighthouse 성능 예산 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-007 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.2 Reliability and Recovery

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-008 월간 가용성 ≥99.5% | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-008 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-009 내부 API 5xx ≤0.5% | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-009 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-010 DB 백업 RPO/RTO | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-010 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-011 외부·공식 링크 주 1회 자동 점검 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-011 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.3 Security and Privacy

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-012 TLS 1.2 이상 | IMPLEMENT | N/A(인프라) | N/A(인프라) | N/A(Vercel 배포 설정) | PENDING_TASK_GENERATION | TC-NF-012 (HTTPS 접속 확인) | PENDING_IMPLEMENTATION |
| REQ-NF-013 인증·역할·RLS 서버 검증 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-NF-013 (Supabase RLS 테스트+Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-014 CSRF 방어·SameSite 쿠키 | IMPLEMENT(축소) | 전체 공통(SCR-003,004,005) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-NF-014 (코드리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-015 입력 검증·이스케이프, 저장 XSS 차단 | IMPLEMENT | SCR-003, SCR-004, SCR-005 | `/travel-tools`, `/mates`, `/account` | `src/app/travel-tools/page.tsx`, `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-NF-015 (단위 테스트) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-016 비밀키 환경변수 관리 | IMPLEMENT | N/A(인프라) | N/A(인프라) | N/A(Vercel 환경변수) | PENDING_TASK_GENERATION | TC-NF-016 (빌드 산출물 확인) | PENDING_IMPLEMENTATION |
| REQ-NF-017 항공·호텔 원시 입력값 미보존 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-NF-017 (코드리뷰+네트워크 탭 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-018 개인정보 내보내기·삭제 요청 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-018 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.4 Safety and Moderation

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-019 신고 접수 응답 p95 ≤3s | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-019 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-020 신고 1차 검토 24h 이내 90% | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-020 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-021 글/요청/신고 속도 제한(429) | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-021 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-022 Moderator 조치 추적 가능성 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-022 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.5 Accessibility

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-023 WCAG 2.2 AA 목표 | IMPLEMENT(축소) | 전체 공통(SCR-001~005) | 전체 | `src/app/layout.tsx` | PENDING_TASK_GENERATION | TC-NF-023 (수동 점검) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-024 자동 접근성 검사(axe) | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-024 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-025 키보드·스크린리더 수동 검사 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-025 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.6 Content, Freshness, SEO, Copyright

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-026 여행지 콘텐츠 완전성 100% | IMPLEMENT(축소) | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-NF-026 (데이터 스키마 리뷰) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-027 해외 안전정보 커버리지 100% | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-NF-027 (데이터 커버리지 확인) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-028 안전정보 최신 확인율/경고 | IMPLEMENT(축소) | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-NF-028 (Playwright) | DESIGN_APPROVED_PENDING_IMPLEMENTATION |
| REQ-NF-029 미디어 라이선스 메타데이터 100% | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-029 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-030 공개 페이지 SEO 메타데이터 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-030 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

### 3.7 Maintainability, Monitoring, Cost

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-031 TS strict·lint·테스트 병합 게이트 | IMPLEMENT(축소) | N/A(CI) | N/A(CI) | N/A(개발 프로세스) | PENDING_TASK_GENERATION | TC-NF-031 (CI 실행 결과 확인) | PENDING_IMPLEMENTATION |
| REQ-NF-032 구조화 로그 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-032 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-033 핵심 오류 5분 이내 알림 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-033 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |
| REQ-NF-034 월 인프라 비용 목표 | EXCLUDED | N/A(미구현) | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-034 (SRS 정의, 미구현으로 실행 안 함) | EXCLUDED |

---

## 4. 집계 검증

| 구분 | 건수 |
|---|---|
| REQ-FUNC-001~080 수록 건수 | 80 |
| REQ-NF-001~034 수록 건수 | 34 |
| **합계** | **114** |
| Implementation Status = IMPLEMENT | 63 |
| Implementation Status = IMPLEMENT(축소) | 14 |
| Implementation Status = EXCLUDED | 37 |
| Status = DESIGN_APPROVED_PENDING_IMPLEMENTATION | 73 |
| Status = PENDING_IMPLEMENTATION | 4 |
| Status = EXCLUDED | 37 |
| Task = PENDING_TASK_GENERATION | 114 (전건) |

REQ-FUNC-001~080, REQ-NF-001~034는 삭제되거나 누락 없이 전건(114건) 수록되었으며, 어떤 행도 "구현 완료"로 표기되지 않았다(현재 코드 구현 착수 전 단계).
