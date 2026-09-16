# Traveler Task List

**harness_schema:** traveler-screen-route-v1
**generated_at:** 2026-09-15
**source_snapshot:** docs/tasks/_src_app_tree_snapshot.json

## Tasks

| Task ID | Type | Screen | Title | Depends On | Requirement Refs | Task Status |
|---|---|---|---|---|---|---|
| INFRA-001 | INFRA | COMMON | 디자인 토큰/Tailwind 설정(D-001 색상·타이포·spacing·radius·shadow) | - | REQ-NF-023 | NOT_STARTED |
| INFRA-002 | INFRA | COMMON | 공통 Header/Footer 레이아웃(src/app/layout.tsx, 반응형) | INFRA-001 | REQ-FUNC-064, REQ-FUNC-065, REQ-FUNC-079 | NOT_STARTED |
| INFRA-003 | INFRA | COMMON | 이미지 최적화 공통 설정(Next/Image, lazy load) | INFRA-001 | REQ-NF-006 | NOT_STARTED |
| INFRA-004 | INFRA | COMMON | Supabase 클라이언트/환경변수 설정 | - | REQ-NF-012, REQ-NF-016 | NOT_STARTED |
| INFRA-005 | INFRA | COMMON | Supabase DB 마이그레이션(6개 테이블) + RLS 정책 | INFRA-004 | REQ-FUNC-044, REQ-NF-013 | NOT_STARTED |
| INFRA-006 | INFRA | COMMON | 인증/역할 가드 유틸(로그인 세션, 성인확인, Admin 판별) + CSRF/입력 검증 유틸 | INFRA-004, INFRA-005 | REQ-FUNC-027, REQ-FUNC-028, REQ-NF-014, REQ-NF-015 | NOT_STARTED |
| INFRA-007 | INFRA | COMMON | 공개 연락처(전화번호/이메일/메신저 ID) 탐지 유틸 | - | REQ-FUNC-032 | NOT_STARTED |
| INFRA-008 | INFRA | COMMON | 외부 링크 이동 유틸(새 탭, noopener/noreferrer, 허용목록 검증) | - | REQ-FUNC-016, REQ-FUNC-018, REQ-FUNC-024, REQ-FUNC-026, REQ-FUNC-049, REQ-FUNC-077 | NOT_STARTED |
| INFRA-009 | INFRA | COMMON | not-found/error 기술 Route(src/app/not-found.tsx, src/app/error.tsx) | INFRA-002 | REQ-FUNC-078 | NOT_STARTED |
| INFRA-010 | INFRA | COMMON | Playwright Chromium 프로젝트 설정(playwright.config.ts, Chromium 단일 프로젝트) | - | - | NOT_STARTED |
| INFRA-011 | INFRA | COMMON | CI 게이트(TypeScript strict + ESLint, 병합 조건) | - | REQ-NF-031 | NOT_STARTED |
| INFRA-012 | INFRA | COMMON | 즐겨찾기 localStorage 유틸 | - | REQ-FUNC-068 | NOT_STARTED |
| DATA-001 | DATA | COMMON | 여행지 정적 데이터(국내 10곳 이상, 해외 15개국 30도시 이상, 콘텐츠 스키마) | - | REQ-FUNC-004, REQ-FUNC-008, REQ-NF-026 | NOT_STARTED |
| DATA-002 | DATA | COMMON | 국가 안전정보 정적 데이터(8개 카테고리, 출처, 확인일, 경보 범위) | - | REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-052, REQ-FUNC-053, REQ-NF-027 | NOT_STARTED |
| DATA-003 | DATA | COMMON | free_traveler 대표 프로필 정적 데이터(수치, 타임라인, 방문국가, 갤러리, 추천 여행지) | - | REQ-FUNC-057, REQ-FUNC-058, REQ-FUNC-059, REQ-FUNC-060, REQ-FUNC-061 | NOT_STARTED |
| SCR-001-COMP-01 | COMPONENT | SCR-001 | Hero + 검색바 + 국내/해외 구분 | INFRA-001, INFRA-002 | REQ-FUNC-001, REQ-FUNC-003 | NOT_STARTED |
| SCR-001-COMP-02 | COMPONENT | SCR-001 | 필터(국가·도시·계절·테마·기간) + 결과 없음 안내 | INFRA-001 | REQ-FUNC-002, REQ-FUNC-005 | NOT_STARTED |
| SCR-001-COMP-03 | COMPONENT | SCR-001 | 여행지 Card Grid(국내 6 + 해외 6, 이미지 alt) | INFRA-001, INFRA-003, DATA-001 | REQ-FUNC-004, REQ-FUNC-007 | NOT_STARTED |
| SCR-001-COMP-04 | COMPONENT | SCR-001 | 여행지 상세 Drawer/Modal(기본 정보) | SCR-001-COMP-03, DATA-001 | REQ-FUNC-004, REQ-FUNC-006 | NOT_STARTED |
| SCR-001-COMP-05 | COMPONENT | SCR-001 | 안전정보 하위 탭(Drawer 내, stale 경고, 중대 경보) | SCR-001-COMP-04, DATA-002, INFRA-008 | REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-049, REQ-FUNC-050, REQ-FUNC-051, REQ-FUNC-052, REQ-FUNC-053, REQ-FUNC-054, REQ-NF-028 | NOT_STARTED |
| SCR-001-COMP-06 | COMPONENT | SCR-001 | 최근 동행글 섹션(3개 또는 완성형 Empty State) | INFRA-004, INFRA-005 | - | NOT_STARTED |
| SCR-001-COMP-07 | COMPONENT | SCR-001 | free_traveler 요약 섹션 + 즐겨찾기 토글 | DATA-003, INFRA-012 | REQ-FUNC-057, REQ-FUNC-068 | NOT_STARTED |
| SCR-001-OWNER | PAGE_OWNER | SCR-001 | SCR-001(`/`) 메인 페이지 조립 | SCR-001-COMP-01, SCR-001-COMP-02, SCR-001-COMP-03, SCR-001-COMP-04, SCR-001-COMP-05, SCR-001-COMP-06, SCR-001-COMP-07 | REQ-FUNC-001 | NOT_STARTED |
| SCR-002-COMP-01 | COMPONENT | SCR-002 | Profile Hero + 여행 지표 카드 3개 | DATA-003, INFRA-001 | REQ-FUNC-057, REQ-FUNC-058 | NOT_STARTED |
| SCR-002-COMP-02 | COMPONENT | SCR-002 | 자기소개·철학 2~4문단(좌우 분할) | DATA-003 | REQ-FUNC-058 | NOT_STARTED |
| SCR-002-COMP-03 | COMPONENT | SCR-002 | 여행 Timeline(6개 이상) | DATA-003 | REQ-FUNC-060 | NOT_STARTED |
| SCR-002-COMP-04 | COMPONENT | SCR-002 | 방문 국가 권역별 Chip(30개) | DATA-003 | REQ-FUNC-059 | NOT_STARTED |
| SCR-002-COMP-05 | COMPONENT | SCR-002 | Gallery(사진 8개 이상, 이미지 alt) | DATA-003, INFRA-003 | REQ-FUNC-061 | NOT_STARTED |
| SCR-002-COMP-06 | COMPONENT | SCR-002 | 추천 여행지 4개 + CTA Banner | DATA-003, DATA-001 | REQ-FUNC-062, REQ-FUNC-063 | NOT_STARTED |
| SCR-002-OWNER | PAGE_OWNER | SCR-002 | SCR-002(`/about`) 대표 소개 페이지 조립 | SCR-002-COMP-01, SCR-002-COMP-02, SCR-002-COMP-03, SCR-002-COMP-04, SCR-002-COMP-05, SCR-002-COMP-06 | REQ-FUNC-057 | NOT_STARTED |
| SCR-003-COMP-01 | COMPONENT | SCR-003 | Intro(이용 순서 3단계 요약) | INFRA-001 | - | NOT_STARTED |
| SCR-003-COMP-02 | COMPONENT | SCR-003 | 탭 셸(항공편/숙소/동행 구하기, 독립 상태 관리) | INFRA-001 | - | NOT_STARTED |
| SCR-003-COMP-03 | COMPONENT | SCR-003 | 항공편 찾기 탭(폼·검증·요약·외부 이동) | SCR-003-COMP-02, INFRA-008 | REQ-FUNC-011, REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014, REQ-FUNC-015, REQ-FUNC-016, REQ-FUNC-017, REQ-FUNC-018, REQ-FUNC-054, REQ-NF-017 | NOT_STARTED |
| SCR-003-COMP-04 | COMPONENT | SCR-003 | 숙소 찾기 탭(폼·검증·요약·외부 이동) | SCR-003-COMP-02, INFRA-008 | REQ-FUNC-019, REQ-FUNC-020, REQ-FUNC-021, REQ-FUNC-022, REQ-FUNC-023, REQ-FUNC-024, REQ-FUNC-025, REQ-FUNC-026 | NOT_STARTED |
| SCR-003-COMP-05 | COMPONENT | SCR-003 | 찾기 Tip 3개 섹션 | SCR-003-COMP-02 | - | NOT_STARTED |
| SCR-003-COMP-06 | COMPONENT | SCR-003 | 동행 구하기 탭(작성 폼, 연락처 탐지, 안전수칙 동의, 로그인 안내) | SCR-003-COMP-02, INFRA-006, INFRA-007, INFRA-005 | REQ-FUNC-027, REQ-FUNC-031, REQ-FUNC-032, REQ-FUNC-080 | NOT_STARTED |
| SCR-003-OWNER | PAGE_OWNER | SCR-003 | SCR-003(`/travel-tools`) 통합 여행 준비 페이지 조립 | SCR-003-COMP-01, SCR-003-COMP-02, SCR-003-COMP-03, SCR-003-COMP-04, SCR-003-COMP-05, SCR-003-COMP-06 | REQ-FUNC-011 | NOT_STARTED |
| SCR-004-COMP-01 | COMPONENT | SCR-004 | Intro + 글 작성 CTA | INFRA-001 | - | NOT_STARTED |
| SCR-004-COMP-02 | COMPONENT | SCR-004 | Filter 바 + 결과 요약 | INFRA-005 | REQ-FUNC-030 | NOT_STARTED |
| SCR-004-COMP-03 | COMPONENT | SCR-004 | 동행글 Card 목록(최대 8개, 모집중/마감 배지) | INFRA-005, SCR-004-COMP-02 | REQ-FUNC-033, REQ-FUNC-037 | NOT_STARTED |
| SCR-004-COMP-04 | COMPONENT | SCR-004 | 상세 영역(Desktop 분할/Mobile Drawer) + 참가 요청 폼 | SCR-004-COMP-03, INFRA-005, INFRA-006 | REQ-FUNC-027, REQ-FUNC-034, REQ-FUNC-035, REQ-NF-013 | NOT_STARTED |
| SCR-004-COMP-05 | COMPONENT | SCR-004 | 작성자 승인/거절, 마감/수정/삭제 | SCR-004-COMP-04, INFRA-005 | REQ-FUNC-036, REQ-FUNC-038 | NOT_STARTED |
| SCR-004-COMP-06 | COMPONENT | SCR-004 | 신고·차단 액션 | INFRA-005, INFRA-006 | REQ-FUNC-039, REQ-FUNC-040 | NOT_STARTED |
| SCR-004-COMP-07 | COMPONENT | SCR-004 | 신청 방법 3단계 안내 + 안전 안내 CTA Banner | SCR-004-COMP-04 | REQ-FUNC-043 | NOT_STARTED |
| SCR-004-OWNER | PAGE_OWNER | SCR-004 | SCR-004(`/mates`) 동행 조회 페이지 조립 | SCR-004-COMP-01, SCR-004-COMP-02, SCR-004-COMP-03, SCR-004-COMP-04, SCR-004-COMP-05, SCR-004-COMP-06, SCR-004-COMP-07 | REQ-FUNC-030 | NOT_STARTED |
| SCR-005-COMP-01 | COMPONENT | SCR-005 | Guest: 로그인·가입·비밀번호 재설정 폼 | INFRA-004, INFRA-006 | REQ-FUNC-066 | NOT_STARTED |
| SCR-005-COMP-02 | COMPONENT | SCR-005 | 성인확인 절차(생년월일 미저장, 확인 시각만 기록) | SCR-005-COMP-01, INFRA-005 | REQ-FUNC-028 | NOT_STARTED |
| SCR-005-COMP-03 | COMPONENT | SCR-005 | Member: 프로필 요약 + 수정 | SCR-005-COMP-02, INFRA-005 | REQ-FUNC-029 | NOT_STARTED |
| SCR-005-COMP-04 | COMPONENT | SCR-005 | Member: 내가 작성한 동행글 / 내가 보낸 참가 요청 목록 | INFRA-005, SCR-005-COMP-03 | REQ-FUNC-036, REQ-FUNC-038, REQ-FUNC-043 | NOT_STARTED |
| SCR-005-COMP-05 | COMPONENT | SCR-005 | Member: 즐겨찾기(완성형 Empty State) + 차단 목록/해제 | INFRA-012, INFRA-005 | REQ-FUNC-040, REQ-FUNC-068 | NOT_STARTED |
| SCR-005-COMP-06 | COMPONENT | SCR-005 | Admin: 신고 상태 변경 | INFRA-005, INFRA-006 | REQ-FUNC-041 | NOT_STARTED |
| SCR-005-COMP-07 | COMPONENT | SCR-005 | Admin: 항공·숙소 외부 URL 설정 | INFRA-005, INFRA-006, INFRA-008 | REQ-FUNC-077 | NOT_STARTED |
| SCR-005-OWNER | PAGE_OWNER | SCR-005 | SCR-005(`/account`) 계정·관리 페이지 조립(Guest/Member/Admin) | SCR-005-COMP-01, SCR-005-COMP-02, SCR-005-COMP-03, SCR-005-COMP-04, SCR-005-COMP-05, SCR-005-COMP-06, SCR-005-COMP-07 | REQ-FUNC-066 | NOT_STARTED |
| TEST-001 | TEST | SCR-001 | Playwright Chromium Smoke: SCR-001 탐색·필터·상세 Drawer 흐름 | INFRA-010, SCR-001-OWNER | - | NOT_STARTED |
| TEST-002 | TEST | SCR-003 | Playwright Chromium Smoke: SCR-003 항공/숙소/동행 작성 흐름 | INFRA-010, SCR-003-OWNER | - | NOT_STARTED |
| TEST-003 | TEST | SCR-004 | Playwright Chromium Smoke: SCR-004 참가 요청·신고·차단 흐름 | INFRA-010, SCR-004-OWNER | - | NOT_STARTED |
| TEST-004 | TEST | SCR-005 | Playwright Chromium Smoke: SCR-005 인증·내 활동·관리자 흐름 | INFRA-010, SCR-005-OWNER | - | NOT_STARTED |

## Excluded Requirements Registry

EXCLUDED로 분류된 Requirement는 상세 구현 Task를 만들지 않되(Skill 규칙 16), 아래에 전건(37건) 등록해 추적표에서 삭제하지 않는다. 사유 근거는 모두 `docs/PROJECT_SCOPE.md`다.

| Requirement | Reason Ref |
|---|---|
| REQ-FUNC-009 | PROJECT_SCOPE.md — F1, Should 우선순위, 직접 구현 범위 밖 |
| REQ-FUNC-010 | PROJECT_SCOPE.md — F1, Should 우선순위, 직접 구현 범위 밖 |
| REQ-FUNC-042 | PROJECT_SCOPE.md — F4, 관리자 범위(신고 상태·외부 URL)를 벗어난 제재 기능 |
| REQ-FUNC-045 | PROJECT_SCOPE.md — F4, 범용 운영 절차로 직접 구현 범위 밖 |
| REQ-FUNC-055 | PROJECT_SCOPE.md — F5, 전체 콘텐츠 CMS 제외 방침(정적 데이터로 대체) |
| REQ-FUNC-056 | PROJECT_SCOPE.md — F5, 범용 감사 로그 제외 방침 |
| REQ-FUNC-067 | PROJECT_SCOPE.md — F7, 직접 구현 범위 밖(여행지 검색으로 대체) |
| REQ-FUNC-069 | PROJECT_SCOPE.md — F7, Should 우선순위, 직접 구현 범위 밖 |
| REQ-FUNC-070 | PROJECT_SCOPE.md — F7, 직접 구현 범위 밖 |
| REQ-FUNC-071 | PROJECT_SCOPE.md — F7, 직접 구현 범위 밖 |
| REQ-FUNC-072 | PROJECT_SCOPE.md — F7, 전체 콘텐츠 CMS 제외 방침 |
| REQ-FUNC-073 | PROJECT_SCOPE.md — F7, 미디어 업로드·라이선스 워크플로 제외 방침 |
| REQ-FUNC-074 | PROJECT_SCOPE.md — F7, CMS 워크플로 전제로 제외 |
| REQ-FUNC-075 | PROJECT_SCOPE.md — F7, 관리자 범위 밖 |
| REQ-FUNC-076 | PROJECT_SCOPE.md — F7, 범용 감사 로그 제외 방침 |
| REQ-NF-001 | PROJECT_SCOPE.md — Performance, 부하 테스트/성능 측정 체계 제외 방침 |
| REQ-NF-002 | PROJECT_SCOPE.md — Performance, 부하 테스트/성능 측정 체계 제외 방침 |
| REQ-NF-003 | PROJECT_SCOPE.md — Performance, 부하 테스트/성능 측정 체계 제외 방침 |
| REQ-NF-004 | PROJECT_SCOPE.md — Performance, 부하 테스트 제외 방침 |
| REQ-NF-005 | PROJECT_SCOPE.md — Performance, 부하 테스트 제외 방침 |
| REQ-NF-007 | PROJECT_SCOPE.md — Performance, CI 성능 게이트 제외 방침 |
| REQ-NF-008 | PROJECT_SCOPE.md — Reliability, 인프라 운영 범위 밖 |
| REQ-NF-009 | PROJECT_SCOPE.md — Reliability, 장애 알림 제외 방침 |
| REQ-NF-010 | PROJECT_SCOPE.md — Reliability, 자동 백업 제외 방침 |
| REQ-NF-011 | PROJECT_SCOPE.md — Reliability, 자동 점검 배치 미구축 |
| REQ-NF-018 | PROJECT_SCOPE.md — Security, 직접 구현 범위 밖 |
| REQ-NF-019 | PROJECT_SCOPE.md — Safety/Moderation, 부하 테스트 제외 방침 |
| REQ-NF-020 | PROJECT_SCOPE.md — Safety/Moderation, 운영 인력 체계 전제로 범위 밖 |
| REQ-NF-021 | PROJECT_SCOPE.md — Safety/Moderation, 속도 제한 인프라 미구축 |
| REQ-NF-022 | PROJECT_SCOPE.md — Safety/Moderation, 감사 로그 제외 방침 |
| REQ-NF-024 | PROJECT_SCOPE.md — Accessibility, 자동 검사 도구 도입 범위 밖 |
| REQ-NF-025 | PROJECT_SCOPE.md — Accessibility, 전문 수동 QA 프로세스 범위 밖 |
| REQ-NF-029 | PROJECT_SCOPE.md — Content/SEO, 미디어 라이선스 워크플로 제외 방침 |
| REQ-NF-030 | PROJECT_SCOPE.md — Content/SEO, SEO 메타데이터 게이트 범위 밖 |
| REQ-NF-032 | PROJECT_SCOPE.md — Maintainability, 구조화 로그 제외 방침 |
| REQ-NF-033 | PROJECT_SCOPE.md — Maintainability, 장애 알림 제외 방침 |
| REQ-NF-034 | PROJECT_SCOPE.md — Maintainability, 인프라 비용 모니터링 체계 미구축 |
