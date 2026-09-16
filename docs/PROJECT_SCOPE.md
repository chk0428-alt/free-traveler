# Free Traveler — 프로젝트 구현 범위 정의서 (PROJECT_SCOPE)

**Document ID:** SCOPE-TRAVEL-001
**기반 문서:** `01_PRD.md`, `02_SRS_BASELINE.md`, `package.json`, `src/app`
**작성일:** 2026-09-10
**상태:** Implementation Scope Baseline

---

## 1. 목적

본 문서는 `01_PRD.md`와 `02_SRS_BASELINE.md`에 정의된 REQ-FUNC-001~080, REQ-NF-001~034 전체 요구사항을 대상으로, 이번 구현 단계에서 **직접 구현(IMPLEMENT)**할 항목과 **제외(EXCLUDED)**할 항목을 확정한다. SRS의 요구사항 ID는 하나도 삭제하지 않으며, 각 항목의 분류·처리 방법·확인 방법을 기록한다.

---

## 2. 반드시 직접 구현하는 범위

| # | 범위 |
|---|---|
| 1 | 핵심 화면 4개와 보조 화면 1개 |
| 2 | 여행지 검색·필터와 상세 패널 |
| 3 | 국가 안전정보 패널 |
| 4 | `free_traveler` 대표 소개 |
| 5 | 항공·숙소 입력·검증·요약·외부 이동 |
| 6 | Supabase 이메일 인증과 성인 확인 |
| 7 | 동행글 작성·조회·수정·마감 |
| 8 | 참가 요청·승인·거절 |
| 9 | 간단한 차단·신고 |
| 10 | 내 활동과 간단한 관리자 탭 |
| 11 | Playwright 핵심 Smoke Test |
| 12 | Vercel 배포 |

### 2-1. 화면 인벤토리 (핵심 4 + 보조 1)

| 구분 | 화면 | 포함 라우트(SRS 3.5 기준) | 대응 범위 |
|---|---|---|---|
| 핵심 1 | 홈 | `/` | 전역 내비게이션·핵심 기능 진입점 |
| 핵심 2 | 여행지 | `/destinations`, `/destinations/domestic`, `/destinations/overseas`, `/destinations/[slug]` | 범위 2, 3 (안전정보 패널은 여행지 상세에 연결) |
| 핵심 3 | 항공·호텔 찾기 | `/flights`, `/hotels` | 범위 5 |
| 핵심 4 | 동행 찾기 | `/mates`, `/mates/[id]`, `/mates/new` | 범위 7, 8, 9(신고·차단 진입) |
| 보조 1 | 마이페이지·인증·대표소개·관리자 | `/auth/*`, `/my/*`, `/about`, `/admin/*` | 범위 4, 6, 9(내 차단 목록), 10 |

`/safety`, `/safety/[countryCode]`는 별도 화면이 아니라 여행지 상세의 **안전정보 패널**로 구현한다(범위 3). 이는 SRS 3.5의 독립 라우트 구성을 화면 수 제약("핵심 4 + 보조 1")에 맞춰 통합한 결정이다.

---

## 3. 구현 방식 원칙

| 원칙 | 내용 |
|---|---|
| 콘텐츠 | 여행지·안전·대표 콘텐츠는 `src/data`의 정적 데이터로 관리한다. Editor/Admin CMS를 만들지 않는다. |
| 즐겨찾기 | `localStorage`에만 저장한다. 서버 동기화·계정 간 공유를 구현하지 않는다. |
| 알림 | 실제 이메일 발송 대신 Toast 또는 화면 상태로 결과를 표시한다. |
| 모집글 자동 마감 | 배치 작업 없이, 목록·상세 **조회 시점**에 종료일을 계산해 마감 여부를 판정한다. |
| 안전정보 최신성(stale) | 배치 검증 없이, **렌더링 시점**에 `verified_at`과 현재 시각의 차이를 계산해 7일 초과 여부를 표시한다. |
| 이미지 | 일반 인터넷 이미지 URL과 `alt` 텍스트만 사용한다. 출처·작가·라이선스 메타데이터 입력·승인 절차는 만들지 않는다. |
| 관리자 | 신고 상태 처리와 항공·호텔 외부 URL 설정만 다룬다. 콘텐츠 CRUD, 사용자 제재, 감사 로그는 다루지 않는다. |

---

## 4. 제외 기능

| 항목 | 제외 이유 |
|---|---|
| 전체 콘텐츠 CMS | 콘텐츠는 `src/data` 정적 데이터로 대체 |
| 미디어 업로드·라이선스 승인 워크플로 | 이미지 URL + alt 텍스트만 사용하는 방식으로 대체 |
| 범용 감사 로그 | 관리자 기능이 신고 상태·외부 URL 설정으로 한정되어 별도 이력 추적 체계 불필요 |
| 자동 백업·장애 알림·부하 테스트 | 운영 인프라 구축 범위 밖 |
| 외부 이메일 사업자 연동 | Toast/화면 상태 알림으로 대체 |
| EC2·AWS 인프라 | Vercel + Supabase로 배포·데이터 구성 |
| 무인 자동 Merge Runner | 수동 검토·배포 프로세스 유지 |

---

## 5. 기능 요구사항 분류 (REQ-FUNC-001~080)

범례 — **IMPLEMENT**: 구현하고 Playwright Smoke Test 또는 수동 확인으로 검증. **IMPLEMENT(축소)**: 요구사항 취지는 구현하되 위 구현 방식 원칙에 따라 범위를 축소. **EXCLUDED**: 만들지 않음.

### 5.1 F1. Destination Guide

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-001 | IMPLEMENT | `/destinations` 탭에서 `src/data` 정적 목록을 `scope`(DOMESTIC/OVERSEAS) 필드로 분리 표시 | Playwright: 탭 전환 시 표시 항목의 scope 일치 확인 |
| REQ-FUNC-002 | IMPLEMENT | 국가·도시·계절·테마·기간 필터를 클라이언트 상태로 AND 조건 적용 | Playwright: 복수 필터 적용 후 결과 검증 |
| REQ-FUNC-003 | IMPLEMENT | 여행지명·국가명·테마 키워드 부분 일치 검색(클라이언트 필터) | Playwright: 키워드 검색 결과·빈 검색어 동작 확인 |
| REQ-FUNC-004 | IMPLEMENT | 정적 데이터 스키마에 소개·명소·시기·1일/3일 일정·예산·교통·음식·에티켓·출처·수정일 필드를 필수로 정의하고 시드 데이터 작성 시 채움 | 데이터 스키마 타입 체크 + 상세 페이지 렌더 확인 |
| REQ-FUNC-005 | IMPLEMENT | 필터 결과 0건 시 안내 문구와 초기화 버튼 표시 | Playwright: 결과 없는 필터 조합 확인 |
| REQ-FUNC-006 | IMPLEMENT | 해외 여행지 상세에서 `country_code`로 동일 상세 페이지 내 안전정보 패널을 조회 | Playwright: 국가 코드 매칭 확인 |
| REQ-FUNC-007 | IMPLEMENT(축소) | 대표 이미지 URL과 `alt_text`만 관리(구현 방식 원칙). 출처·작가·라이선스 메타데이터 입력·게시 검증은 만들지 않음 | 코드 리뷰: 모든 이미지 태그에 `alt` 존재 확인 |
| REQ-FUNC-008 | IMPLEMENT | 시드 데이터 개수(국내 10곳 이상, 해외 15개국 30개 도시 이상)를 데이터 파일 작성 시점에 충족 | 데이터 파일 개수 스크립트/수동 카운트 확인 |
| REQ-FUNC-009 | EXCLUDED | Should 우선순위이며 직접 구현 범위(2절) 밖 | 해당 없음 |
| REQ-FUNC-010 | EXCLUDED | Should 우선순위이며 직접 구현 범위 밖(필터 URL 동기화 미구현) | 해당 없음 |

### 5.2 F2. Flight Link-out

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-011 | IMPLEMENT | 국가·지역·출발일·귀국일 필수 입력 폼 구현(범위 5) | Playwright: 필드 렌더링·라벨 확인 |
| REQ-FUNC-012 | IMPLEMENT | 국가 선택값 기준으로 지역 옵션을 정적 데이터에서 필터링, 국가 변경 시 지역값 초기화 | Playwright: 국가 변경 후 지역 초기화 확인 |
| REQ-FUNC-013 | IMPLEMENT | 클라이언트 검증: 과거 출발일, 귀국일<출발일 시 제출 차단 및 오류 표시 | Playwright: 경계값 케이스 제출 차단 확인 |
| REQ-FUNC-014 | IMPLEMENT | 유효 입력 후 요약 단계(국가·지역·출발일·귀국일)를 브라우저 상태로 표시 | Playwright: 요약 값과 입력값 일치 확인 |
| REQ-FUNC-015 | IMPLEMENT | 폼·요약 화면에 "입력값은 외부 사이트로 전달되지 않습니다" 고지 문구 표시 | Playwright: 고지 텍스트 노출 확인 |
| REQ-FUNC-016 | IMPLEMENT | 환경변수로 설정된 항공 URL을 `target=_blank`, `rel=noopener noreferrer`로 새 탭 오픈 | Playwright: 링크 속성 확인 |
| REQ-FUNC-017 | IMPLEMENT | 항공 폼은 서버 API/DB 없이 클라이언트 상태로만 처리(설계상 서버 저장 경로 없음) | 코드 리뷰: 서버 액션/DB 호출 부재 확인 |
| REQ-FUNC-018 | IMPLEMENT | 외부 URL 미설정·허용목록 밖일 때 이동 차단, 오류 메시지와 재시도 버튼 제공 | Playwright: URL 미설정 시나리오 확인 |

### 5.3 F3. Hotel Link-out

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-019 | IMPLEMENT | 숙박 국가·지역·체크인·체크아웃 필수 입력 폼(범위 5) | Playwright: 필드 렌더링 확인 |
| REQ-FUNC-020 | IMPLEMENT | 국가별 지역 옵션 필터링과 초기화(항공과 동일 로직 재사용) | Playwright: 국가 변경 시 지역 초기화 확인 |
| REQ-FUNC-021 | IMPLEMENT | 과거 체크인, 체크아웃≤체크인 시 제출 차단 | Playwright: 경계값 케이스 확인 |
| REQ-FUNC-022 | IMPLEMENT | 유효 입력 후 국가·지역·체크인·체크아웃 요약 표시 | Playwright: 요약 일치 확인 |
| REQ-FUNC-023 | IMPLEMENT | 비전달 고지 문구 표시(항공과 동일 컴포넌트 재사용) | Playwright: 고지 노출 확인 |
| REQ-FUNC-024 | IMPLEMENT | 설정된 호텔 URL을 `noopener,noreferrer` 새 탭으로 오픈 | Playwright: 링크 속성 확인 |
| REQ-FUNC-025 | IMPLEMENT | 서버 API/DB 없이 클라이언트 상태로만 처리 | 코드 리뷰 확인 |
| REQ-FUNC-026 | IMPLEMENT | URL 오류 시 이동 차단·재시도 제공(운영 오류 로그는 만들지 않음, 화면 상태로만 표시) | Playwright: 오류 시나리오 확인 |

### 5.4 F4. Travel Mate

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-027 | IMPLEMENT | Supabase Auth 세션 확인 후 쓰기 라우트 접근 허용(범위 6, 7) | Playwright: 비로그인 접근 시 로그인 화면 리다이렉트 확인 |
| REQ-FUNC-028 | IMPLEMENT | 생년월일 미저장, `is_adult`·`adult_verified_at`만 Supabase에 저장(범위 6) | Supabase 스키마 확인 + Playwright 인증 플로우 |
| REQ-FUNC-029 | IMPLEMENT | 닉네임·연령대·여행 스타일 필수, 성별 선택형 프로필 폼 | Playwright: 프로필 저장·필수값 검증 |
| REQ-FUNC-030 | IMPLEMENT | 국가·지역·기간 겹침·연령대·성별·스타일·상태 필터(범위 2 로직 재사용) | Playwright: 필터 결과 확인 |
| REQ-FUNC-031 | IMPLEMENT | 모집글 필드 전체 입력 폼과 날짜·필수값 검증(범위 7) | Playwright: 필수값 누락·역전 날짜 차단 확인 |
| REQ-FUNC-032 | IMPLEMENT | 정규식 기반 전화번호·이메일·메신저 ID 패턴 탐지 후 제출 차단 및 안내 | 단위 테스트 + Playwright: 탐지 케이스 제출 차단 확인 |
| REQ-FUNC-033 | IMPLEMENT | 모집글 응답에서 이메일·연락처 필드 미노출 | Playwright: 렌더된 HTML에 연락처 부재 확인 |
| REQ-FUNC-034 | IMPLEMENT | 참가 메시지(최대 500자) 비공개 제출, PENDING 저장(범위 8) | Playwright: 참가 요청 제출·PENDING 상태 확인 |
| REQ-FUNC-035 | IMPLEMENT | Supabase 유니크 제약 + UI 중복 요청 방지 | Playwright: 중복 요청 시도 시 오류 확인 |
| REQ-FUNC-036 | IMPLEMENT | 작성자만 ACCEPTED/REJECTED 전이 가능(범위 8) | Playwright: 작성자/비작성자 권한 확인 |
| REQ-FUNC-037 | IMPLEMENT(축소) | 배치 작업 대신 목록·상세 조회 시점에 `end_date` 경과를 계산해 CLOSED로 표시(구현 방식 원칙) | Playwright: 종료일 경과 글의 마감 표시 확인 |
| REQ-FUNC-038 | IMPLEMENT | 작성자의 수동 마감·수정·삭제(범위 7) | Playwright: 마감/수정/삭제 동작 확인 |
| REQ-FUNC-039 | IMPLEMENT | 사유 코드·설명으로 글/사용자/요청 신고 제출(범위 9) | Playwright: 신고 접수 확인 화면 노출 확인 |
| REQ-FUNC-040 | IMPLEMENT | 사용자 차단·해제, 차단된 상대 콘텐츠 미노출(범위 9) | Playwright: 차단 후 상호 노출 제한 확인 |
| REQ-FUNC-041 | IMPLEMENT(축소) | 간단한 관리자 탭에서 신고 목록과 상태(OPEN/RESOLVED 등) 필터만 제공, 우선순위·증거 큐는 만들지 않음(범위 10) | Playwright: 관리자 신고 목록·상태 필터 확인 |
| REQ-FUNC-042 | EXCLUDED | 경고·콘텐츠 숨김·계정 제한 등 제재 기능은 관리자 범위(신고 상태·외부 URL 설정)를 벗어남 | 해당 없음 |
| REQ-FUNC-043 | IMPLEMENT(축소) | 인앱 알림은 Toast/화면 상태로 구현하고, 실제 이메일 발송은 만들지 않음(구현 방식 원칙) | Playwright: 상태 변경 시 Toast 노출 확인 |
| REQ-FUNC-044 | IMPLEMENT | Supabase RLS로 본인 글·요청, 작성자, 관리자만 비공개 데이터 열람 | Supabase RLS 정책 테스트 + Playwright 권한 확인 |
| REQ-FUNC-045 | EXCLUDED | 탈퇴 시 비식별화·30일 삭제 워크플로는 범용 운영 절차로 직접 구현 범위 밖 | 해당 없음 |

### 5.5 F5. Country Safety

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-046 | IMPLEMENT | `src/data`에 소개되는 모든 해외 국가의 안전정보 항목 작성(범위 3) | 데이터 파일 커버리지 수동 확인 |
| REQ-FUNC-047 | IMPLEMENT | 치안·사기·법규·교통·재난·보건·문화·긴급연락처 8개 카테고리를 안전정보 패널에 표시 | Playwright: 카테고리 전체 렌더 확인 |
| REQ-FUNC-048 | IMPLEMENT | 정적 데이터에 출처명·URL·최종 확인일 필드 포함(편집자 필드는 고정값으로 단순화) | 데이터 스키마·상세 패널 렌더 확인 |
| REQ-FUNC-049 | IMPLEMENT | 외교부 해외안전여행 링크를 `noopener,noreferrer` 새 탭으로 제공 | Playwright: 링크 속성·URL 확인 |
| REQ-FUNC-050 | IMPLEMENT(축소) | 배치 검사 없이 렌더링 시 `verified_at` 기준 7일 초과 여부를 계산해 stale 경고 표시(구현 방식 원칙) | Playwright: 7일 초과 더미데이터로 경고 노출 확인 |
| REQ-FUNC-051 | IMPLEMENT | 중대 경보(여행금지 등)를 안전정보 패널 상단에 텍스트 라벨로 표시 | Playwright: 상단 노출 순서 확인 |
| REQ-FUNC-052 | IMPLEMENT | 데이터 모델에 `scope_type`(COUNTRY/REGION), `scope_text` 필드 포함 | 데이터 스키마 확인 |
| REQ-FUNC-053 | IMPLEMENT | 현지 긴급전화·영사콜센터 정보를 안전정보 패널에 표시 | Playwright: 긴급연락처 섹션 렌더 확인 |
| REQ-FUNC-054 | IMPLEMENT | 안전정보 패널과 항공 요약 화면에 공식 판단 대체 불가 고지 표시 | Playwright: 고지 문구 노출 확인 |
| REQ-FUNC-055 | EXCLUDED | Editor/Admin 콘텐츠 작성·검수·게시 워크플로는 CMS 제외 방침에 해당(정적 데이터로 대체) | 해당 없음 |
| REQ-FUNC-056 | EXCLUDED | 변경 이력 보존은 범용 감사 로그 성격으로 제외, Git 커밋 이력으로 대체 | 해당 없음 |

### 5.6 F6. About free_traveler

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-057 | IMPLEMENT | 대표명·`50+ Trips`·`30+ Countries`를 단일 정적 데이터 소스에서 참조해 표시(범위 4) | Playwright: 대표 페이지·홈 노출 값 일치 확인 |
| REQ-FUNC-058 | IMPLEMENT | 확정 소개문·여행 철학·편집 원칙을 정적 데이터로 표시 | Playwright: 텍스트 렌더 확인 |
| REQ-FUNC-059 | IMPLEMENT | 방문 국가 목록(30개국 이상)을 정적 데이터로 표시 | 데이터 개수 확인 |
| REQ-FUNC-060 | IMPLEMENT | 여행 타임라인(연도·장소·요약)을 정적 데이터로 표시 | Playwright: 타임라인 렌더 확인 |
| REQ-FUNC-061 | IMPLEMENT(축소) | 대표 이미지 URL과 `alt_text`만 사용(구현 방식 원칙), 출처·작가·라이선스 메타데이터는 관리하지 않음 | 코드 리뷰: `alt` 속성 확인 |
| REQ-FUNC-062 | IMPLEMENT(축소) | 문의·SNS 링크를 관리자 설정이 아닌 정적 데이터/환경변수로 관리 | Playwright: 링크 렌더·허용 프로토콜 확인 |
| REQ-FUNC-063 | IMPLEMENT | 추천 여행지 6곳을 정적 데이터로 지정해 상세 페이지로 연결 | Playwright: 링크 유효성 확인 |

### 5.7 F7. Common, Admin, Governance

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-064 | IMPLEMENT | 전역 내비게이션·푸터를 모든 공개 페이지에 공통 레이아웃으로 적용(범위 1) | Playwright: 내비게이션 존재·핵심 링크 확인 |
| REQ-FUNC-065 | IMPLEMENT | Tailwind 반응형 클래스로 320px~데스크톱 대응 | 수동 뷰포트 확인(320px, 768px, 1280px) |
| REQ-FUNC-066 | IMPLEMENT | Supabase Auth 이메일 가입·인증·로그인·로그아웃·비밀번호 재설정(범위 6) | Playwright: 인증 플로우 E2E 확인 |
| REQ-FUNC-067 | EXCLUDED | 여행지·안전정보 통합 검색은 직접 구현 범위 밖(범위 2의 여행지 검색으로 대체) | 해당 없음 |
| REQ-FUNC-068 | IMPLEMENT | 즐겨찾기를 `localStorage`에 저장·해제·조회(구현 방식 원칙) | Playwright: 즐겨찾기 추가·새로고침 후 유지 확인 |
| REQ-FUNC-069 | EXCLUDED | Should 우선순위이며 직접 구현 범위 밖(URL 공유 기능 미구현) | 해당 없음 |
| REQ-FUNC-070 | EXCLUDED | SEO 메타데이터·구조화 데이터 최적화는 직접 구현 범위 밖 | 해당 없음 |
| REQ-FUNC-071 | EXCLUDED | 행동 분석 이벤트 수집 체계는 직접 구현 범위 밖 | 해당 없음 |
| REQ-FUNC-072 | EXCLUDED | Editor/Admin 콘텐츠 CRUD는 전체 콘텐츠 CMS 제외 방침에 해당 | 해당 없음 |
| REQ-FUNC-073 | EXCLUDED | 미디어 업로드·라이선스 메타데이터 입력은 명시적 제외 항목 | 해당 없음 |
| REQ-FUNC-074 | EXCLUDED | 게시 전 완전성 게이트는 CMS 워크플로 전제이며 정적 데이터 방식에서는 불필요 | 해당 없음 |
| REQ-FUNC-075 | EXCLUDED | 안전정보 stale 대시보드는 관리자 범위(신고 상태·외부 URL) 밖 | 해당 없음 |
| REQ-FUNC-076 | EXCLUDED | 감사 로그는 명시적 제외 항목 | 해당 없음 |
| REQ-FUNC-077 | IMPLEMENT | 관리자 탭에서 항공·호텔 외부 URL을 HTTPS 허용목록으로만 설정(범위 10) | Playwright: 비HTTPS/허용목록 밖 URL 저장 차단 확인 |
| REQ-FUNC-078 | IMPLEMENT | Next.js `not-found`/`error` 화면에 홈 이동·재시도 버튼 제공 | Playwright: 404 페이지 접근 및 복구 버튼 확인 |
| REQ-FUNC-079 | IMPLEMENT(축소) | 폼·모달·탭에 시맨틱 HTML과 기본 ARIA 속성 적용, 전수 접근성 인증은 하지 않음 | 코드 리뷰 + 핵심 화면 키보드 조작 수동 확인 |
| REQ-FUNC-080 | IMPLEMENT(축소) | 동행글 작성 시 안전수칙 동의 체크박스와 동의 시각 저장(범위 7). 이용약관·개인정보처리방침 등 전체 법적 문서 정비와 버전별 동의 이력 관리는 만들지 않음 | Playwright: 동의 미체크 시 제출 차단 확인 |

---

## 6. 비기능 요구사항 분류 (REQ-NF-001~034)

### 6.1 Performance

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-001 | EXCLUDED | 성능 측정 체계 구축은 부하 테스트 제외 방침과 동일한 성격으로 범위 밖 | 해당 없음 |
| REQ-NF-002 | EXCLUDED | INP 실사용자 측정 인프라 미구축 | 해당 없음 |
| REQ-NF-003 | EXCLUDED | CLS 측정 체계 미구축 | 해당 없음 |
| REQ-NF-004 | EXCLUDED | 동시 사용자 부하 기준 성능 목표는 부하 테스트 제외 방침에 해당 | 해당 없음 |
| REQ-NF-005 | EXCLUDED | 쓰기 API p95 목표는 부하 테스트 제외 방침에 해당 | 해당 없음 |
| REQ-NF-006 | IMPLEMENT | Next.js `Image` 컴포넌트로 반응형 크기·lazy load 기본 적용 | 코드 리뷰: `Image` 컴포넌트 사용 확인 |
| REQ-NF-007 | EXCLUDED | Lighthouse CI 성능 게이트는 CI 인프라 구축 범위 밖 | 해당 없음 |

### 6.2 Reliability and Recovery

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-008 | EXCLUDED | 가용성 SLA 측정·운영 체계는 인프라 범위 밖 | 해당 없음 |
| REQ-NF-009 | EXCLUDED | 5xx 비율 모니터링은 장애 알림 제외 방침에 해당 | 해당 없음 |
| REQ-NF-010 | EXCLUDED | DB 백업 RPO/RTO는 자동 백업 제외 방침에 해당(Supabase 기본 관리 기능에 위임) | 해당 없음 |
| REQ-NF-011 | EXCLUDED | 외부 링크 주간 자동 점검 배치는 미구축, 배포 전 수동 확인으로 대체 | 배포 전 수동 링크 클릭 확인 |

### 6.3 Security and Privacy

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-012 | IMPLEMENT | Vercel 배포 기본 HTTPS/TLS 1.2 이상 적용(범위 12) | 배포 URL HTTPS 접속 확인 |
| REQ-NF-013 | IMPLEMENT | Supabase Auth 세션 검증과 RLS 정책을 서버 측에서 적용(범위 6, 7) | Playwright + Supabase RLS 정책 테스트 |
| REQ-NF-014 | IMPLEMENT(축소) | Next.js Server Action 기본 CSRF 보호와 Supabase SameSite 쿠키 사용, 별도 CSRF 토큰 체계는 구축하지 않음 | 코드 리뷰 |
| REQ-NF-015 | IMPLEMENT | React 기본 이스케이프와 폼 입력 검증(zod 등)으로 저장 XSS 방지 | 단위 테스트: 스크립트 태그 입력 케이스 |
| REQ-NF-016 | IMPLEMENT | Supabase 키 등 비밀정보는 Vercel 환경변수로 관리, 클라이언트 번들 미포함 | 빌드 산출물에서 비밀키 노출 여부 확인 |
| REQ-NF-017 | IMPLEMENT | 항공·호텔 폼은 서버 API 없이 클라이언트 상태로만 처리(설계상 서버 미저장) | 코드 리뷰 + 네트워크 탭 확인 |
| REQ-NF-018 | EXCLUDED | 개인정보 내보내기·삭제 요청 기능은 직접 구현 범위 밖 | 해당 없음 |

### 6.4 Safety and Moderation

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-019 | EXCLUDED | 응답 시간 SLA 측정은 부하 테스트 제외 방침에 해당 | 해당 없음 |
| REQ-NF-020 | EXCLUDED | 24시간 1차 검토 SLA는 운영 인력 체계 전제로 범위 밖 | 해당 없음 |
| REQ-NF-021 | EXCLUDED | 속도 제한(rate limiting) 인프라 미구축 | 해당 없음 |
| REQ-NF-022 | EXCLUDED | 관리자 조치 추적성은 감사 로그 제외 방침에 해당 | 해당 없음 |

### 6.5 Accessibility

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-023 | IMPLEMENT(축소) | WCAG 2.2 AA를 개발 목표로 삼아 시맨틱 마크업·라벨을 적용하되 공식 인증·전수 검증은 하지 않음 | 핵심 화면 수동 점검 |
| REQ-NF-024 | EXCLUDED | axe 등 자동 접근성 검사 도구 도입은 범위 밖(Playwright 핵심 Smoke Test로 대체) | 해당 없음 |
| REQ-NF-025 | EXCLUDED | 전문 스크린리더·키보드 수동 QA 프로세스는 범위 밖 | 해당 없음 |

### 6.6 Content, Freshness, SEO, Copyright

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-026 | IMPLEMENT(축소) | 정적 데이터 작성 시점에 필수 필드를 충족시키며, 런타임 게시 게이트는 만들지 않음 | 데이터 스키마 리뷰 |
| REQ-NF-027 | IMPLEMENT | 소개되는 모든 해외 국가의 안전정보를 정적 데이터로 100% 작성 | 데이터 커버리지 수동 확인 |
| REQ-NF-028 | IMPLEMENT(축소) | 렌더링 시 stale 계산으로 7일 초과 항목에 경고 표시(구현 방식 원칙), 95% 이내 최신성 지표 집계는 하지 않음 | Playwright: stale 경고 표시 확인 |
| REQ-NF-029 | EXCLUDED | 미디어 라이선스 메타데이터 100% 확보는 이미지 URL+alt만 사용하는 방침과 상충되어 제외 | 해당 없음 |
| REQ-NF-030 | EXCLUDED | SEO 메타데이터 게이트는 REQ-FUNC-070과 동일하게 범위 밖 | 해당 없음 |

### 6.7 Maintainability, Monitoring, Cost

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-031 | IMPLEMENT(축소) | TypeScript strict, ESLint, Playwright 핵심 Smoke Test를 배포 전 필수 통과 조건으로 적용. 별도 단위 테스트 스위트는 구축하지 않음 | CI/로컬에서 `lint`, `build`, Playwright 실행 결과 확인 |
| REQ-NF-032 | EXCLUDED | 구조화 로그 체계는 범용 감사 로그와 동일 성격으로 제외 | 해당 없음 |
| REQ-NF-033 | EXCLUDED | 핵심 오류 알림은 장애 알림 제외 방침에 해당 | 해당 없음 |
| REQ-NF-034 | EXCLUDED | 인프라 비용 모니터링 체계는 구축하지 않음(Vercel·Supabase 무료/개인 플랜 사용으로 대체) | 해당 없음 |

---

## 7. 검증 계획 요약

| 항목 | 방법 |
|---|---|
| 기능 검증 | 위 5절·6절의 "확인 방법" 열에 따라 Playwright 핵심 Smoke Test 또는 코드 리뷰·수동 확인 수행 |
| Smoke Test 범위 | 화면 인벤토리(2-1절)의 핵심 4 화면과 보조 1 화면에서의 대표 흐름: 여행지 탐색→상세→안전정보, 항공/호텔 입력→요약→외부 이동, 로그인→성인 확인→동행글 작성→참가 요청→승인, 신고·차단, 관리자 신고 상태·외부 URL 설정 |
| 배포 검증 | Vercel Preview/Production 배포 후 위 Smoke 흐름을 배포 환경에서 재확인 |

---

## 8. 요구사항 카운트 검증

- REQ-FUNC-001~080: 총 80건 전수 기록(IMPLEMENT/IMPLEMENT(축소) 65건, EXCLUDED 15건).
- REQ-NF-001~034: 총 34건 전수 기록(IMPLEMENT/IMPLEMENT(축소) 12건, EXCLUDED 22건).
- 삭제되거나 누락된 Requirement ID 없음.
