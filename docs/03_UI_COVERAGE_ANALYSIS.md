# Free Traveler — UI Coverage Analysis

**Document ID:** UICOV-TRAVEL-001
**기반 문서:** `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`
**작성일:** 2026-09-10
**상태:** UI Screen Mapping Baseline

---

## 1. 목적

본 문서는 SRS의 REQ-FUNC-001~080, REQ-NF-001~034 전체 114개 요구사항을 유지한 채, 정확히 5개의 디자인 Screen에 UI 요구사항을 배치한다. 각 요구사항은 UI 성격 분류와 `PROJECT_SCOPE.md`의 구현 여부 분류를 함께 기록하며, 어떤 Requirement도 삭제하지 않는다.

---

## 2. 분류 기준

### 2-1. UI 성격 분류

| 분류 | 정의 |
|---|---|
| **UI_DIRECT** | 화면에 고유한 시각적 컴포넌트·콘텐츠 블록으로 직접 나타나는 요구사항 |
| **UI_STATE** | 별도 컴포넌트가 아니라 기존 화면 요소의 상태(검증 오류, 활성/비활성, 계산된 배지, 알림 상태 등)로 나타나는 요구사항 |
| **NON_UI** | 특정 화면 위젯으로 나타나지 않고 데이터 구조·서버 로직·인프라 제약으로 처리되며 화면 결과에 간접적으로만 영향을 주는 요구사항 |
| **OPERATIONS** | 운영·모니터링·SLA·인프라·거버넌스 프로세스 요구사항으로 화면 설계 대상이 아님 |

### 2-2. PROJECT_SCOPE 분류 (재기록)

`PROJECT_SCOPE.md`에서 확정된 분류를 그대로 인용한다: **IMPLEMENT**, **IMPLEMENT(축소)**, **EXCLUDED**.

### 2-3. Screen 고정 목록

| Screen ID | Route | 개요 |
|---|---|---|
| **SCR-001** | `/` | 메인 — 여행지 탐색 + 여행지/안전정보 상세는 Drawer·Modal |
| **SCR-002** | `/about` | 대표 소개 |
| **SCR-003** | `/travel-tools` | 통합 여행 준비 — 항공·숙소·동행작성 3탭 |
| **SCR-004** | `/mates` | 동행 조회 — 목록 + 상세 패널 |
| **SCR-005** | `/account` | 계정·관리 — 로그인/프로필·내활동·간단관리자 3탭 |

API Route, 인증 콜백(`/auth/callback` 등), 404/500 오류 처리 페이지는 **기술 Route**로 취급하며 위 5개 Screen 수에 포함하지 않는다.

---

## 3. Screen 정의 (사용자 목표 · 주요 영역 · 상태 · 이동 목적지)

### SCR-001 `/` 메인

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 국내·해외 여행지를 탐색·필터링해 후보를 좁히고, 해외 여행지의 안전정보를 함께 확인한다 |
| 주요 영역 | 히어로/대표 소개 진입 배너, 국내·해외 탭, 검색바, 필터(국가·도시·계절·테마·기간), 여행지 카드 그리드, 여행지 상세 Drawer/Modal(안전정보 패널 하위 포함), 즐겨찾기 버튼, 전역 내비게이션·푸터 |
| 상태 | 목록 로딩/빈 결과 안내, 필터 적용 상태, Drawer/Modal 열림·닫힘, 안전정보 stale 경고 노출 여부, 즐겨찾기 on/off |
| 이동 목적지 | SCR-002(대표 소개), SCR-003(항공/숙소 찾기 CTA), SCR-004(동행 찾기 CTA), SCR-005(로그인/내 활동), 외부 MOFA 링크(안전정보 패널 내) |

### SCR-002 `/about` 대표 소개

| 항목 | 내용 |
|---|---|
| 사용자 목표 | `free_traveler`의 여행 경험·철학·기준을 확인해 콘텐츠 신뢰도를 판단한다 |
| 주요 영역 | 대표 이미지+한 줄 소개, `50+ Trips`/`30+ Countries` 카드, 철학·편집 원칙, 방문 국가 목록, 여행 타임라인, 추천 여행지 6곳, 문의·SNS 링크 |
| 상태 | 정적 콘텐츠 중심, 페이지 로딩 상태만 존재 |
| 이동 목적지 | SCR-001 여행지 상세 Drawer/Modal(추천 여행지 클릭 시) |

### SCR-003 `/travel-tools` 통합 여행 준비

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 항공·숙소 조건을 입력·검증·요약한 뒤 외부 사이트로 이동하거나, 동행 모집글을 작성한다 |
| 주요 영역 | 3개 탭(항공 찾기 / 숙소 찾기 / 동행 작성), 탭별 입력 폼, 필드 오류 영역, 입력 요약 단계, 비전달 고지 문구, 외부 이동 버튼, 동행 작성 폼(안전수칙 동의 체크박스 포함) |
| 상태 | 탭 선택, 폼 입력 중/검증 실패/요약 확인, 외부 URL 오류(재시도 제공), 동행글 제출 성공/공개 연락처 탐지 차단, 비로그인·성인확인 미완료 시 동행 작성 탭 접근 제한 |
| 이동 목적지 | 외부 새 탭(Google Flights/Booking.com), SCR-005(로그인·성인확인 필요 시), SCR-004(동행글 작성 완료 후 목록 확인 유도) |

### SCR-004 `/mates` 동행 조회

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 조건이 맞는 동행 모집글을 찾아 참가를 요청하거나, 본인 모집글의 요청을 처리한다 |
| 주요 영역 | 필터 바(국가·지역·기간·연령대·성별·스타일·모집상태), 모집글 목록, 상세 패널(조건·설명·작성자·모집 상태), 참가 요청 폼, 신고·차단 버튼, 작성자용 승인/거절·마감/수정/삭제 컨트롤 |
| 상태 | 목록 필터링, 상세 패널 열림/닫힘, OPEN/조회시점 계산 CLOSED 배지, 참가 요청 PENDING/ACCEPTED/REJECTED, 신고 접수 완료 상태, 차단 적용 후 상호 노출 제한 |
| 이동 목적지 | SCR-003(새 동행글 작성 탭), SCR-005(로그인 필요 시, 내 활동에서 요청 상태 재확인) |

### SCR-005 `/account` 계정·관리

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 가입·로그인·성인확인 후 본인 프로필과 활동을 관리하고, 관리자 권한이 있으면 신고 상태·외부 URL을 설정한다 |
| 주요 영역 | 3개 탭(로그인·프로필[가입/인증/성인확인/비밀번호 재설정 포함] / 내 활동[내 모집글·참가요청·즐겨찾기·차단목록] / 관리자[신고 목록·상태 필터, 외부 URL 설정]) |
| 상태 | 비로그인/로그인, 성인확인 완료 여부, 각 탭 로딩/빈 상태, 관리자 탭은 권한 계정에만 노출 |
| 이동 목적지 | SCR-001(즐겨찾기 항목), SCR-004(내 모집글·요청 상세) |

---

## 4. Requirement 매핑 — Functional Requirements (REQ-FUNC-001~080)

### 4.1 F1. Destination Guide (001~010) → SCR-001

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-001 | 국내·해외 여행지 목록 구분 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (탭) |
| REQ-FUNC-002 | 국가·도시·계절·테마·기간 필터 | UI_DIRECT | IMPLEMENT | SCR-001 (필터 바) |
| REQ-FUNC-003 | 키워드 검색 | UI_DIRECT | IMPLEMENT | SCR-001 (검색바) |
| REQ-FUNC-004 | 상세 필수 콘텐츠 항목 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (여행지 상세 Drawer/Modal) |
| REQ-FUNC-005 | 결과 없음 안내·초기화 버튼 | UI_STATE | IMPLEMENT | SCR-001 (목록 빈 상태) |
| REQ-FUNC-006 | 해외 상세 → 국가 안전 페이지 연결 | UI_DIRECT | IMPLEMENT | SCR-001 (Drawer 내 안전정보 패널) |
| REQ-FUNC-007 | 대표 이미지 alt/출처/작가/라이선스 | UI_DIRECT | IMPLEMENT(축소) | SCR-001 (Drawer 이미지) |
| REQ-FUNC-008 | 게시 수량 기준(국내10/해외15개국30도시) 검증 | NON_UI | IMPLEMENT | SCR-001 (데이터 소스) |
| REQ-FUNC-009 | 관련 여행지 추천 최대 6개 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-010 | 필터 상태 URL 반영·복원 | UI_STATE | EXCLUDED | N/A(미구현) |

### 4.2 F2. Flight Link-out (011~018) → SCR-003 (항공 탭)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-011 | 국가·지역·출발일·귀국일 필수 입력 | UI_DIRECT | IMPLEMENT | SCR-003 (항공 탭) |
| REQ-FUNC-012 | 국가별 지역 옵션 제한·초기화 | UI_STATE | IMPLEMENT | SCR-003 (항공 탭) |
| REQ-FUNC-013 | 과거/역전 날짜 제출 차단 | UI_STATE | IMPLEMENT | SCR-003 (항공 탭) |
| REQ-FUNC-014 | 유효 입력 후 요약 표시 | UI_DIRECT | IMPLEMENT | SCR-003 (항공 탭 요약 단계) |
| REQ-FUNC-015 | 입력값 비전달 고지 | UI_DIRECT | IMPLEMENT | SCR-003 (항공 탭) |
| REQ-FUNC-016 | 외부 항공 URL 새 탭(noopener) | UI_DIRECT | IMPLEMENT | SCR-003 (항공 탭 CTA) |
| REQ-FUNC-017 | 입력값 서버 미저장 | NON_UI | IMPLEMENT | SCR-003 (항공 탭, 비가시 제약) |
| REQ-FUNC-018 | 외부 URL 오류 시 이동 차단·재시도 | UI_STATE | IMPLEMENT | SCR-003 (항공 탭 오류 상태) |

### 4.3 F3. Hotel Link-out (019~026) → SCR-003 (숙소 탭)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-019 | 국가·지역·체크인·체크아웃 필수 입력 | UI_DIRECT | IMPLEMENT | SCR-003 (숙소 탭) |
| REQ-FUNC-020 | 국가별 지역 옵션 제한·초기화 | UI_STATE | IMPLEMENT | SCR-003 (숙소 탭) |
| REQ-FUNC-021 | 과거/역전 날짜 제출 차단 | UI_STATE | IMPLEMENT | SCR-003 (숙소 탭) |
| REQ-FUNC-022 | 유효 입력 후 요약 표시 | UI_DIRECT | IMPLEMENT | SCR-003 (숙소 탭 요약 단계) |
| REQ-FUNC-023 | 입력값 비전달 고지 | UI_DIRECT | IMPLEMENT | SCR-003 (숙소 탭) |
| REQ-FUNC-024 | 외부 호텔 URL 새 탭(noopener) | UI_DIRECT | IMPLEMENT | SCR-003 (숙소 탭 CTA) |
| REQ-FUNC-025 | 입력값 서버 미저장 | NON_UI | IMPLEMENT | SCR-003 (숙소 탭, 비가시 제약) |
| REQ-FUNC-026 | URL 오류 시 이동 차단·재시도 | UI_STATE | IMPLEMENT | SCR-003 (숙소 탭 오류 상태) |

### 4.4 F4. Travel Mate (027~045) → SCR-003(작성) / SCR-004(조회·상세) / SCR-005(내활동·관리자)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-027 | 쓰기 작업에 이메일 인증 세션 요구 | UI_STATE | IMPLEMENT | SCR-003(작성 탭 접근 제한), SCR-004(참가요청 접근 제한) |
| REQ-FUNC-028 | 성인확인 요구, 생년월일 미저장 | UI_STATE | IMPLEMENT | SCR-005 (로그인·프로필 탭, 성인확인 절차) |
| REQ-FUNC-029 | 동행 프로필(닉네임·연령대·성별·스타일·소개) | UI_DIRECT | IMPLEMENT | SCR-005 (프로필 탭) |
| REQ-FUNC-030 | 국가·기간·연령대·성별·스타일·상태 필터 | UI_DIRECT | IMPLEMENT | SCR-004 (필터 바) |
| REQ-FUNC-031 | 모집글 작성 필드·검증 | UI_DIRECT | IMPLEMENT | SCR-003 (동행 작성 탭) |
| REQ-FUNC-032 | 공개 연락처 패턴 탐지·제출 차단 | UI_STATE | IMPLEMENT | SCR-003 (동행 작성 탭) |
| REQ-FUNC-033 | 모집글 표시 시 연락처 비노출 | UI_DIRECT | IMPLEMENT | SCR-004 (목록·상세 패널) |
| REQ-FUNC-034 | 참가 메시지 비공개 제출(PENDING) | UI_DIRECT | IMPLEMENT | SCR-004 (상세 패널) |
| REQ-FUNC-035 | 중복 PENDING/ACCEPTED 요청 차단 | UI_STATE | IMPLEMENT | SCR-004 (상세 패널) |
| REQ-FUNC-036 | 작성자의 승인/거절 처리 | UI_DIRECT | IMPLEMENT | SCR-004 (상세 패널, 작성자 뷰), SCR-005 (내 활동) |
| REQ-FUNC-037 | 종료일 경과 시 자동 CLOSED | UI_STATE | IMPLEMENT(축소) | SCR-004 (목록·상세 배지) |
| REQ-FUNC-038 | 작성자의 수동 마감·수정·삭제 | UI_DIRECT | IMPLEMENT | SCR-004 (상세 패널), SCR-005 (내 활동) |
| REQ-FUNC-039 | 글/사용자/요청 신고 제출 | UI_DIRECT | IMPLEMENT | SCR-004 (상세 패널 신고 버튼) |
| REQ-FUNC-040 | 사용자 차단·해제 | UI_DIRECT | IMPLEMENT | SCR-004 (차단 버튼), SCR-005 (차단 목록) |
| REQ-FUNC-041 | Moderator 신고 목록·상태 필터 | UI_DIRECT | IMPLEMENT(축소) | SCR-005 (관리자 탭) |
| REQ-FUNC-042 | 경고·숨김·계정 제한 등 제재 조치 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-043 | 요청/신고 처리 결과 알림(이메일 선택) | UI_STATE | IMPLEMENT(축소) | SCR-004, SCR-005 (Toast/상태 표시) |
| REQ-FUNC-044 | RLS 기반 비공개 데이터 접근 제한 | NON_UI | IMPLEMENT | SCR-004, SCR-005 (데이터 계층) |
| REQ-FUNC-045 | 탈퇴 시 비식별화·30일 삭제 | NON_UI | EXCLUDED | N/A(미구현) |

### 4.5 F5. Country Safety (046~056) → SCR-001 (Drawer/Modal 하위 패널)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-046 | 소개 해외국가 전체 안전 페이지 확보 | NON_UI | IMPLEMENT | SCR-001 (데이터 커버리지) |
| REQ-FUNC-047 | 8개 안전 카테고리 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널) |
| REQ-FUNC-048 | 공식 출처·최종 확인일·편집자 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널) |
| REQ-FUNC-049 | 외교부 원문 링크 새 탭 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널) |
| REQ-FUNC-050 | 확인 후 7일 초과 stale 경고 | UI_STATE | IMPLEMENT(축소) | SCR-001 (안전정보 패널 배지) |
| REQ-FUNC-051 | 중대 경보 상단 텍스트 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널 상단) |
| REQ-FUNC-052 | 국가/지역 경보 범위 구분 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널) |
| REQ-FUNC-053 | 긴급연락처(현지·영사콜센터) 표시 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널) |
| REQ-FUNC-054 | 공식 판단 대체 불가 고지 | UI_DIRECT | IMPLEMENT | SCR-001 (안전정보 패널), SCR-003 (항공 요약) |
| REQ-FUNC-055 | Editor/Admin 안전 콘텐츠 작성·검수 워크플로 | NON_UI | EXCLUDED | N/A(미구현) |
| REQ-FUNC-056 | 안전정보 변경 이력 보존 | NON_UI | EXCLUDED | N/A(미구현) |

### 4.6 F6. About free_traveler (057~063) → SCR-002

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-057 | 대표명·50+/30+ 표시 | UI_DIRECT | IMPLEMENT | SCR-002 |
| REQ-FUNC-058 | 소개문·철학·편집 원칙 표시 | UI_DIRECT | IMPLEMENT | SCR-002 |
| REQ-FUNC-059 | 방문 권역/30개국 이상 목록 | UI_DIRECT | IMPLEMENT | SCR-002 |
| REQ-FUNC-060 | 여행 타임라인 표시 | UI_DIRECT | IMPLEMENT | SCR-002 |
| REQ-FUNC-061 | 대표 이미지 alt/출처/작가/라이선스 | UI_DIRECT | IMPLEMENT(축소) | SCR-002 |
| REQ-FUNC-062 | 문의·SNS 링크 | UI_DIRECT | IMPLEMENT(축소) | SCR-002 |
| REQ-FUNC-063 | 추천 여행지 6곳 연결 | UI_DIRECT | IMPLEMENT | SCR-002 → SCR-001 (Drawer로 이동) |

### 4.7 F7. Common, Admin, Governance (064~080)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-FUNC-064 | 전역 내비게이션·푸터 | UI_DIRECT | IMPLEMENT | 전체 공통(SCR-001~005) |
| REQ-FUNC-065 | 320px~데스크톱 반응형 레이아웃 | UI_STATE | IMPLEMENT | 전체 공통(SCR-001~005) |
| REQ-FUNC-066 | 이메일 가입·인증·로그인·로그아웃·재설정 | UI_DIRECT | IMPLEMENT | SCR-005 (로그인·프로필 탭) |
| REQ-FUNC-067 | 여행지·안전정보 통합 검색 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-068 | 여행지 즐겨찾기 추가/해제/조회 | UI_DIRECT | IMPLEMENT | SCR-001 (버튼), SCR-005 (내 활동 목록) |
| REQ-FUNC-069 | 공개 페이지 URL 공유 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-070 | SEO 메타데이터·구조화 데이터 | NON_UI | EXCLUDED | N/A(미구현) |
| REQ-FUNC-071 | 행동 분석 이벤트 기록 | NON_UI | EXCLUDED | N/A(미구현) |
| REQ-FUNC-072 | Editor/Admin 콘텐츠 CRUD | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-073 | 미디어 업로드 시 출처·라이선스 필수 입력 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-074 | 게시 전 완전성 게이트 | NON_UI | EXCLUDED | N/A(미구현) |
| REQ-FUNC-075 | 안전정보 stale 대시보드 | UI_DIRECT | EXCLUDED | N/A(미구현) |
| REQ-FUNC-076 | 관리자 변경·신고 처리 감사 로그 | NON_UI | EXCLUDED | N/A(미구현) |
| REQ-FUNC-077 | 항공·호텔 외부 URL 허용목록 설정 | UI_DIRECT | IMPLEMENT | SCR-005 (관리자 탭) |
| REQ-FUNC-078 | 404/500/권한없음/외부연결실패 복구 행동 | UI_DIRECT | IMPLEMENT | 기술 Route (Design Screen 아님) |
| REQ-FUNC-079 | 폼·모달·탭 시맨틱/ARIA | UI_STATE | IMPLEMENT(축소) | 전체 공통(SCR-001~005) |
| REQ-FUNC-080 | 정책 고지 + 동행 안전수칙 동의 기록 | UI_DIRECT | IMPLEMENT(축소) | SCR-003 (동행 작성 탭) |

---

## 5. Requirement 매핑 — Non-Functional Requirements (REQ-NF-001~034)

### 5.1 Performance (001~007)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-001 | LCP p75 ≤2.5s | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-002 | INP p75 ≤200ms | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-003 | CLS p75 ≤0.1 | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-004 | 필터 응답 p95 ≤1s(동시 50명) | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-005 | 쓰기 API 응답 p95 ≤3s | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-006 | 이미지 반응형·lazy load | NON_UI | IMPLEMENT | 전체 공통(이미지 사용 SCR-001,002,003,004) |
| REQ-NF-007 | 배포 전 Lighthouse 성능 예산 | OPERATIONS | EXCLUDED | N/A |

### 5.2 Reliability and Recovery (008~011)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-008 | 월간 가용성 ≥99.5% | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-009 | 내부 API 5xx ≤0.5% | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-010 | DB 백업 RPO/RTO | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-011 | 외부·공식 링크 주 1회 자동 점검 | OPERATIONS | EXCLUDED | N/A |

### 5.3 Security and Privacy (012~018)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-012 | TLS 1.2 이상 | NON_UI | IMPLEMENT | 전체 공통(인프라) |
| REQ-NF-013 | 인증·역할·RLS 서버 검증 | NON_UI | IMPLEMENT | SCR-004, SCR-005 (데이터 계층) |
| REQ-NF-014 | CSRF 방어·SameSite 쿠키 | NON_UI | IMPLEMENT(축소) | 전체 공통(폼이 있는 SCR-003,004,005) |
| REQ-NF-015 | 입력 검증·이스케이프, 저장 XSS 차단 | NON_UI | IMPLEMENT | SCR-003, SCR-004, SCR-005 (폼 처리) |
| REQ-NF-016 | 비밀키 환경변수 관리 | OPERATIONS | IMPLEMENT | N/A(인프라) |
| REQ-NF-017 | 항공·호텔 원시 입력값 미보존 | NON_UI | IMPLEMENT | SCR-003 |
| REQ-NF-018 | 개인정보 내보내기·삭제 요청 | UI_DIRECT | EXCLUDED | N/A(미구현) |

### 5.4 Safety and Moderation (019~022)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-019 | 신고 접수 응답 p95 ≤3s | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-020 | 신고 1차 검토 24h 이내 90% | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-021 | 글/요청/신고 속도 제한(429) | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-022 | Moderator 조치 추적 가능성 | OPERATIONS | EXCLUDED | N/A |

### 5.5 Accessibility (023~025)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-023 | WCAG 2.2 AA 목표 | UI_STATE | IMPLEMENT(축소) | 전체 공통(SCR-001~005) |
| REQ-NF-024 | 자동 접근성 검사(axe) | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-025 | 키보드·스크린리더 수동 검사 | OPERATIONS | EXCLUDED | N/A |

### 5.6 Content, Freshness, SEO, Copyright (026~030)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-026 | 여행지 콘텐츠 완전성 100% | NON_UI | IMPLEMENT(축소) | SCR-001 (데이터 소스) |
| REQ-NF-027 | 해외 안전정보 커버리지 100% | NON_UI | IMPLEMENT | SCR-001 (데이터 소스) |
| REQ-NF-028 | 안전정보 최신 확인율/경고 | UI_STATE | IMPLEMENT(축소) | SCR-001 (안전정보 패널 배지) |
| REQ-NF-029 | 미디어 라이선스 메타데이터 100% | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-030 | 공개 페이지 SEO 메타데이터 | OPERATIONS | EXCLUDED | N/A |

### 5.7 Maintainability, Monitoring, Cost (031~034)

| ID | 요구사항 요약 | UI 분류 | PROJECT_SCOPE | 배치 |
|---|---|---|---|---|
| REQ-NF-031 | TS strict·lint·테스트 병합 게이트 | OPERATIONS | IMPLEMENT(축소) | N/A(개발 프로세스) |
| REQ-NF-032 | 구조화 로그 | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-033 | 핵심 오류 5분 이내 알림 | OPERATIONS | EXCLUDED | N/A |
| REQ-NF-034 | 월 인프라 비용 목표 | OPERATIONS | EXCLUDED | N/A |

---

## 6. 기술 Route (5개 디자인 Screen에 미포함)

아래 항목은 사용자가 접하지만 디자인 Screen으로 세지 않는 기술 Route다. 관련 Requirement는 위 4·5절에 이미 배치되어 있으며 여기서는 참조만 표시한다.

| 기술 Route | 설명 | 관련 Requirement |
|---|---|---|
| `/api/*` | 여행지·안전정보·동행·신고·차단 등 API Route | REQ-FUNC-030, 034, 036, 039, 040, 041, 077 등 |
| `/auth/callback` 등 인증 콜백 | Supabase Auth 이메일 인증·세션 콜백 처리 | REQ-FUNC-027, 028, 066 |
| 404/500/오류 처리 | 공통 오류 화면과 복구 행동 | REQ-FUNC-078 |

---

## 7. UI 분류 요약 카운트

| UI 분류 | FUNC 건수 | NF 건수 | 합계 |
|---|---:|---:|---:|
| UI_DIRECT | 51 | 1 | 52 |
| UI_STATE | 17 | 2 | 19 |
| NON_UI | 12 | 8 | 20 |
| OPERATIONS | 0 | 23 | 23 |
| Requirement 소계 | 80 | 34 | 114 |

---

## 8. Requirement 총수 검증

- REQ-FUNC-001~080: 4절 표에 4.1~4.7 절 합계 10+8+8+19+11+7+17 = **80건** 전수 등장.
- REQ-NF-001~034: 5절 표에 5.1~5.7 절 합계 7+4+7+4+3+5+4 = **34건** 전수 등장.
- 총 Requirement 수: 80 + 34 = **114건** — 요청된 총수와 일치.
- PROJECT_SCOPE 분류(IMPLEMENT/IMPLEMENT(축소)/EXCLUDED)는 `PROJECT_SCOPE.md`와 동일하게 유지했으며, EXCLUDED 항목을 IMPLEMENT로 변경하거나 구현 범위로 되돌린 항목은 없다.
- 디자인 Screen은 SCR-001~SCR-005 5개로 고정했으며, 이를 초과하는 화면을 추가하지 않았다.
