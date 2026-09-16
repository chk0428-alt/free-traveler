---
version: D-001
name: Free-Traveler-design-system
description: A warm, photography-led travel-preparation platform on a clean white canvas with a single coral accent (#F2613B) reserved for primary CTAs and active states. Dark near-black ink text, gently rounded cards and pill-shaped search/chip controls, one restrained shadow tier, and generous-but-not-empty section rhythm. No booking, payment, checkout, or price-comparison UI anywhere in the system; admin surfaces are simple lists with status changes and a URL-settings form, never a metrics dashboard.

colors:
  primary: "#F2613B"
  primary-active: "#D24E2B"
  primary-tint: "#FDE3D8"
  on-primary: "#FFFFFF"
  ink: "#23262B"
  body: "#4A4E56"
  muted: "#767B84"
  hairline: "#E4E6E9"
  canvas: "#FFFFFF"
  surface-soft: "#F7F6F4"
  surface-card: "#FFFFFF"
  danger: "#C23B2E"
  danger-bg: "#FBEAE7"
  warning: "#9C6B14"
  warning-bg: "#FBF1DE"
  success: "#1E7A50"
  success-bg: "#E7F5EE"
  focus-ring: "#1D4ED8"
  scrim: "#000000"

typography:
  display-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 40px
    fontSizeMobile: 28px
    fontWeight: 700
    lineHeight: 1.2
  display-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 32px
    fontSizeMobile: 24px
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 20px
    fontSizeMobile: 18px
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
  badge:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3

rounded:
  none: 0px
  sm: 8px
  md: 14px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-desktop-min: 64px
  section-desktop-max: 96px
  section-mobile-min: 40px
  section-mobile-max: 64px
  content-max-desktop-min: 1200px
  content-max-desktop-max: 1280px
  gutter-desktop: 80px
  gutter-mobile: 20px

shadow:
  none: "none"
  raised: "0 2px 6px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.08)"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "14px 24px"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    height: 48px
    border: "1px solid {colors.ink}"
  button-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  search-bar-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 56px
    border: "1px solid {colors.hairline}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 56px
    padding: "14px 16px"
    border: "1px solid {colors.hairline}"
    borderFocus: "2px solid {colors.focus-ring}"
  chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  chip-selected:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
  tab-active:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    typography: "{typography.button}"
  tab-inactive:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.button}"
  destination-card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
    textColor: "{colors.ink}"
  mate-post-card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
    textColor: "{colors.ink}"
  badge-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
    typography: "{typography.badge}"
  badge-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
    rounded: "{rounded.full}"
    typography: "{typography.badge}"
  badge-danger:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
    rounded: "{rounded.full}"
    typography: "{typography.badge}"
  badge-neutral:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    typography: "{typography.badge}"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    shadow: "{shadow.raised}"
  drawer:
    backgroundColor: "{colors.canvas}"
    shadow: "{shadow.raised}"
    scrim: "{colors.scrim}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    height: 72px
    heightMobile: 60px
    border-bottom: "1px solid {colors.hairline}"
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: "64px 80px"
---

## 1. Visual Theme

Free Traveler는 예약·결제 마켓플레이스가 아니라 **여행 준비 허브**다. 기본 캔버스는 순백색(`{colors.canvas}`)이고, 텍스트는 순수 검정이 아닌 짙은 잉크(`{colors.ink}` — #23262B)를 사용한다. 브랜드 강조색은 코랄 1색(`{colors.primary}` — #F2613B)뿐이며 Primary CTA, 활성 탭/Chip, 핵심 링크에만 제한적으로 쓴다. 시각적 위계는 화려한 타이포그래피가 아니라 실제 여행지 사진과 여백으로 만든다. 카드는 부드럽게 둥글고(`{rounded.md}` 14px), 검색창·Chip·배지는 완전한 pill 형태(`{rounded.full}`)이며, 그림자는 단 1단계만 존재한다(9절 참고).

Airbnb 참고본(`design-reference/vendor/airbnb/DESIGN.md`)에서는 **레이아웃 원리**(절제된 elevation, 사진 중심 카드, 섹션 밀도 조절, pill 형태 검색바)만 차용했다. Airbnb Cereal 폰트, Rausch 정확값, "Guest favorite"/"NEW" 배지, 3-product 내비게이션, Reserve/체크아웃 컴포넌트 등 Airbnb 고유 요소는 이 시스템에 존재하지 않는다.

## 2. Color Token

| 토큰 | 값 | 용도 |
|---|---|---|
| `colors.primary` | `#F2613B` | Primary 버튼, 활성 탭/Chip, 핵심 CTA 링크 — 유일한 브랜드 강조색 |
| `colors.primary-active` | `#D24E2B` | Primary 버튼 press 상태 |
| `colors.primary-tint` | `#FDE3D8` | Primary 버튼 disabled, 선택된 Chip/Tab 배경 |
| `colors.on-primary` | `#FFFFFF` | 코랄 배경 위 텍스트 |
| `colors.ink` | `#23262B` | 헤드라인, 본문, 내비게이션 라벨 |
| `colors.body` | `#4A4E56` | 본문 단락, 카드 설명 |
| `colors.muted` | `#767B84` | 캡션, 메타 텍스트, 비활성 라벨 |
| `colors.hairline` | `#E4E6E9` | 카드 테두리, 구분선, 입력 필드 기본 테두리 |
| `colors.canvas` | `#FFFFFF` | 페이지 기본 배경 |
| `colors.surface-soft` | `#F7F6F4` | 섹션 배경 교차, 비활성 Chip 배경 |
| `colors.surface-card` | `#FFFFFF` | 카드 배경 |
| `colors.danger` / `colors.danger-bg` | `#C23B2E` / `#FBEAE7` | 폼 오류, 중대 여행경보 배너 |
| `colors.warning` / `colors.warning-bg` | `#9C6B14` / `#FBF1DE` | 안전정보 stale(7일 초과) 경고, 주의 배지 |
| `colors.success` / `colors.success-bg` | `#1E7A50` / `#E7F5EE` | 완료·승인·모집중 상태 |
| `colors.focus-ring` | `#1D4ED8` | 키보드 포커스 아웃라인 전용 — 다른 의미로 재사용하지 않는다 |
| `colors.scrim` | `#000000` (50% 적용) | Drawer/Modal 백드롭 |

> **규칙:** 화면·컴포넌트 어디서도 위 표에 없는 임의 hex 값을 새로 추가하지 않는다. 새로운 의미(예: 새로운 상태)가 필요하면 먼저 이 표에 토큰을 추가한 뒤 사용한다. 오류(danger)·경고(warning)·성공(success)은 코랄과 색상 계열이 겹치지 않게 분리되어 있다.

## 3. Typography

폰트 스택: `Inter, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif`. Inter는 Google Fonts/오픈소스 라이선스로 배포되는 서체이며, 한글은 OS 기본 탑재 시스템 폰트로 자연스럽게 대체된다. **별도의 Proprietary 폰트 파일을 프로젝트에 포함하지 않는다.**

| 토큰 | Desktop | Mobile | 굵기 | 용도 |
|---|---|---|---|---|
| `typography.display-xl` | 40px / 1.2 | 28px / 1.2 | 700 | SCR-001·SCR-002 Hero 헤드라인 |
| `typography.display-lg` | 32px / 1.25 | 24px / 1.25 | 700 | Section 제목 |
| `typography.title` | 20px / 1.3 | 18px / 1.3 | 600 | 카드 제목, 탭 라벨 |
| `typography.body-md` | 16px / 1.6 | 16px / 1.6 | 400 | 본문·Section 설명 문장 |
| `typography.body-sm` | 14px / 1.5 | 14px / 1.5 | 400 | 카드 메타, 캡션 |
| `typography.button` | 16px / 1.25 | 16px / 1.25 | 600 | 버튼·탭 라벨 |
| `typography.badge` | 12px / 1.3 | 12px / 1.3 | 600 | 상태 배지, Chip |

## 4. Spacing

- 기본 단위: 4px 그리드(`xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32).
- **Section 상하 여백:** Desktop **64~96px**, Mobile **40~64px**. 범위를 벗어나는 임의 값을 쓰지 않는다.
- **Page Section 최대 폭:** Desktop **1200~1280px**, 중앙 정렬, 최소 좌우 거터 80px. Mobile은 100% 폭에 좌우 거터 20px.
- 카드 그리드 간격: Desktop 24px, Mobile 16px.

## 5. Radius

| 토큰 | 값 | 적용 대상 |
|---|---|---|
| `rounded.sm` | 8px | 버튼, 입력 필드 |
| `rounded.md` | 14px | 카드(Destination Card, Mate Post Card), Drawer 패널 |
| `rounded.full` | 9999px | 검색창, Chip, 탭, 배지 |
| `rounded.none` | 0px | Section 배경, 컨테이너 |

## 6. Shadow

시스템 전체에서 그림자는 **단 1단계**(`shadow.raised`)만 존재한다. 기본 상태의 95% 이상 표면은 그림자 없이 hairline 테두리와 배경색 전환만으로 구분한다.

| 토큰 | 값 | 적용 |
|---|---|---|
| `shadow.none` | 없음 | 기본 Section, Header, Footer, 카드 정지 상태 |
| `shadow.raised` | `0 2px 6px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.08)` | 카드 hover, Drawer, Modal, Toast, 드롭다운 |

Drawer/Modal 백드롭은 `colors.scrim`을 50% 불투명도로 렌더링한다.

## 7. Header · Footer

5개 Screen(SCR-001~005) 전체가 동일한 Header/Footer를 공유한다.

**Header** — `{component.top-nav}`, 흰 배경, 하단 1px hairline, 높이 Desktop 72px / Mobile 60px.
- 좌측: Free Traveler 텍스트 워드마크 → `/` 이동
- 중앙(Desktop만 노출, Mobile은 햄버거 메뉴로 축소): 여행지 / 여행 준비(`/travel-tools`) / 동행 찾기(`/mates`) / 대표 소개(`/about`)
- 우측: 비로그인 — "로그인" 텍스트 버튼 + 코랄 "가입하기" 버튼. 로그인 — 닉네임+아바타(`/account`로 이동)

**Footer** — `{component.footer-light}`, 흰 배경(대비 배경 없음), Desktop 4컬럼 / Mobile 1컬럼 아코디언.
1. Free Traveler 소개 한 줄 + `/about` 링크
2. 서비스: 여행지 / 여행 준비 / 동행 찾기
3. 안전·정책: 이용약관 / 개인정보 처리방침 / 동행 안전수칙 / 콘텐츠 면책 안내
4. 문의·SNS 링크(관리 데이터 기반)
하단 바: 저작권 문구 + "외부 예약 사이트 이용 시 조건은 해당 사이트를 따릅니다" 고지.

## 8. Search · Filter

- **Search Bar Pill** (`{component.search-bar-pill}`): 흰 배경, `{rounded.full}`, 56px 높이, 1px hairline 테두리, 정지 상태 그림자 없음. SCR-001 Hero에 배치.
- **Filter Bar**: 국가·지역·기간·테마·모집상태 등 조건을 드롭다운 또는 `{component.chip}` 그룹으로 구성. 복수 필터는 AND 조건으로 적용하고, 적용 즉시 결과 개수를 요약 문장으로 표시한다(SCR-004 "총 N개의 동행 모집글").
- **Chip** (`{component.chip}` / `{component.chip-selected}`): 테마·필터·방문국가 그룹핑에 사용. 선택 시 `primary-tint` 배경 + `primary` 텍스트로 전환.
- 결과 0건일 때는 5절/13절의 Empty State 규칙을 그대로 따른다(빈 화면 금지).

## 9. Destination Card

`{component.destination-card}` — 흰 카드, `{rounded.md}` 14px, 1px hairline 테두리.
- 상단: 실제 장소를 촬영한 인터넷 이미지(URL), 반드시 해당 장소를 설명하는 `alt` 텍스트 포함.
- 본문: 제목(`typography.title`), 국가/테마 메타(`typography.body-sm`, muted), 필요 시 안전정보 stale 배지(`badge-warning`) 또는 경보 배지(`badge-danger`).
- 우상단(선택): 즐겨찾기 아이콘, 저장 시 코랄로 채움.
- 클릭 시 같은 화면에서 Drawer/Modal로 상세를 연다(새 페이지 이동 아님).

## 10. Form · Tabs

**Tabs** (`{component.tab-active}` / `{component.tab-inactive}`) — SCR-003의 항공편/숙소/동행 구하기 탭처럼 세그먼트형으로 배치. 활성 탭은 `primary-tint` 배경 pill 또는 코랄 밑줄로 강조, 비활성 탭은 `muted` 텍스트. **탭마다 입력·검증·완료 상태를 독립적으로 유지**하며 탭 전환이 다른 탭의 입력값을 초기화하지 않는다.

**Form / Text Input** (`{component.text-input}`) — 흰 배경, 1px hairline 테두리, `{rounded.sm}` 8px, 56px 높이. 라벨은 필드 위 `body-sm`(muted). 오류 시 테두리를 `colors.danger`로 바꾸고 필드 바로 아래 danger 텍스트로 원인을 표시한다(색상만으로 구분하지 않는다). 포커스 시 2px `colors.focus-ring` 아웃라인을 적용한다(호버 상태와 시각적으로 구분).

## 11. Mate Post Card

`{component.mate-post-card}` — 흰 카드, `{rounded.md}`, 1px hairline.
- 제목(`title`), 국가·기간·모집 인원(`body-sm`), 여행 스타일 `{component.chip}` 목록.
- 상태 배지: 모집중 → `badge-success`, 마감 → `badge-neutral`. 색상 배지에는 항상 텍스트 라벨을 병기한다.
- 연락처(이메일·전화번호·메신저 ID)는 카드/상세 어디에도 노출하지 않는다 — 참가 요청은 비공개 메시지로만 이루어진다.
- 상세 진입: Desktop은 목록 옆 분할 패널, Mobile은 Drawer로 연다(14절).

## 12. Drawer · Modal

- **트리거:** 여행지/안전정보 상세(SCR-001), 동행 상세(SCR-004 Mobile).
- **Desktop:** 화면 우측에서 슬라이드인하는 Drawer, 폭 480px, `{shadow.raised}` 적용, 배경은 `colors.scrim` 50%.
- **Mobile:** 전체 화면 Modal, 상단 고정 닫기 버튼.
- **공통 규칙:** `Esc` 키·Scrim 클릭으로 닫힘, 열림 시 포커스가 Drawer/Modal 내부로 이동(포커스 트랩), 닫힘 시 트리거 요소로 포커스 복귀. SCR-004 Desktop 동행 상세는 Drawer 대신 좌우 분할 패널을 사용한다(목록 유지 + 우측 상세).

## 13. Alert · Toast

- **Toast** (`{component.toast}`): 잉크 배경 + 흰 텍스트, `{shadow.raised}`, 화면 우하단 또는 상단에 일시 노출 후 자동 소멸. 참가 요청 접수, 신고 접수, 저장 완료 등 상태 변경 확인에 사용(REQ-FUNC-043 등 이메일 대신 Toast/화면 상태로 알림).
- **Inline Alert / Banner**: 폼 오류는 `badge-danger`/`danger` 텍스트로 필드 인접 배치. 안전정보 stale 경고는 `badge-warning`. 중대 여행경보(여행금지 등)는 Section 상단에 `danger` 배경 배너로 텍스트 라벨과 함께 표시하며 색상만으로 구분하지 않는다.

## 14. Loading · Empty · Error 상태

| 상태 | 표현 규칙 |
|---|---|
| **Loading** | 텍스트("로딩 중...")가 아니라 카드/문단 형태의 스켈레톤 블록(`surface-soft` 배경)으로 표시한다. |
| **Empty** | 15절 규칙에 따라 설명 문장 + 이용 방법 + 다음 행동 CTA를 반드시 포함한 **완성형 Empty State**로 디자인한다. 빈 카드, 빈 여백만 남기지 않는다. |
| **Error** | Section 상단 또는 필드 인접에 `danger` 인라인 배너/텍스트로 원인을 설명하고, 가능한 경우 "다시 시도" 버튼을 제공한다. 외부 이동 실패, 폼 검증 실패, 신청 중복 등에 적용. |
| **Unauthorized** | 콘텐츠 대신 안내 카드(로그인/가입 CTA 포함)로 대체하며, 접근 가능한 탭만 렌더링한다(권한 없는 탭 자체를 그리지 않음). |

## 15. Desktop · Mobile 규칙

| 항목 | Desktop (1440px 기준) | Mobile (390px 기준) |
|---|---|---|
| Page Section 최대 폭 | 1200~1280px, 중앙 정렬, 좌우 거터 ≥80px | 100% 폭, 좌우 거터 20px |
| Section 상하 여백 | 64~96px | 40~64px |
| Card Grid | 3~4열 | 1열 |
| Hero 높이 | 480~620px 내외로 제한 (예: SCR-001 승인본 540px) | 콘텐츠 기준 자동 높이 |
| 내비게이션 | 전체 메뉴 노출 | 햄버거 메뉴로 축소 |
| 동행 상세(SCR-004) | 목록+상세 좌우 분할 | 목록 → 상세 Drawer(전체화면) |
| 터치 영역 | 최소 44×44px | 최소 44×44px(필수) |
| 키보드 포커스 | `focus-ring` 2px 아웃라인 필수 | 동일 |

### Hero 높이와 "다음 Section 미리보기" 규칙

Hero는 **화면 전체 높이를 차지하지 않는다.** Desktop 1440px 화면에서 Hero 아래 다음 Section의 상단(제목 일부 이상)이 스크롤 없이 보여야 하며, 이를 위해 Hero 높이를 480~620px 범위로 제한한다(SCR-001 승인본은 540px로 검증됨). Mobile에서는 Hero가 콘텐츠 기준 자동 높이를 가지되 다음 Section 진입까지 불필요한 여백을 남기지 않는다.

## 16. Section별 제목·설명·본문·CTA 계층과 시각적 리듬

모든 Section은 Header와 Footer 사이에서 다음 4단 계층을 갖는다:

1. **제목** — `typography.display-lg`(Section 타이틀) 또는 `typography.title`(하위 Section).
2. **설명** — 1~3문장, `typography.body-md` 또는 `body-sm`(muted), 자연스러운 한국어 완성 문장.
3. **본문** — 실제 콘텐츠(Card Grid, Chip 목록, Form, Timeline, Gallery 등).
4. **CTA** — 다음 행동을 위한 버튼/링크. 콘텐츠가 없는 경우(Empty State)에도 반드시 CTA를 포함한다.

**시각적 리듬:** 한 화면 안에서 Hero, Card Grid, 좌우 분할, Chip 목록, 3단계 안내, CTA Banner를 교차 배치해 동일 유형이 연속되지 않게 한다. 배경은 `canvas`↔`surface-soft`를 Section 단위로 교차해 스크롤 중 구간을 구분한다(SCR-001 승인본에서 검증된 패턴).

## 17. 화면별 Section 순서와 최소 콘텐츠 수

승인된 Stitch 화면(Approved Screens)을 기준으로 고정한다. 화면 수를 늘리거나 Section 순서를 임의로 바꾸지 않는다.

### SCR-001 `/` 메인 — 7 Section
1. Hero (검색창 + `/travel-tools` CTA, 높이 제한)
2. 국내 인기 여행지 — Destination Card **6개**
3. 해외 인기 여행지 — Destination Card **6개** (안전정보 배지 포함)
4. 여행 동기·테마 — Chip **6개**
5. 국가별 주의사항 — Card **6개** + 안전정보 Drawer 연결
6. 최근 동행글 **3개** 또는 완성형 Empty State
7. free_traveler 요약(50+ Trips / 30+ Countries) + `/about` CTA

### SCR-002 `/about` 대표 소개 — 7 Section
1. Profile Hero(대표 사진 + 소개 문장)
2. 여행 지표(50+ Trips / 30+ Countries 포함 카드 **3개**)
3. 자기소개·철학 — 2~4개 문단
4. 여행 Timeline — 시점 **6개 이상**
5. 방문 국가 — 권역별 Chip/목록 **30개**
6. Gallery — 서로 다른 장소 사진 **8개 이상**
7. 기억에 남는 여행지 **4개** + `/travel-tools`·`/mates` CTA

### SCR-003 `/travel-tools` — 6 Section
1. Intro(이용 순서 3단계 요약)
2. 탭(항공편 / 숙소 / 동행 구하기 — **3개 모두 필수**, 상태 상호 독립)
3. 여행정보 입력 Form(국가·지역·출발일·귀국일 4필드)
4. 입력 요약 + 외부 이동 Action Card
5. 찾기 Tip **3개**(입력값 비전달 고지 포함)
6. 동행 작성 Form 또는 로그인 안내 + 안전 안내

### SCR-004 `/mates` 동행 조회 — 6 Section
1. Intro + 글 작성 CTA
2. Filter + 결과 요약
3. 동행글 Card 목록 — 데이터 있으면 **최대 8개** 우선 노출
4. 상세 영역(Desktop 목록+상세 분할 / Mobile 목록→상세 Drawer)
5. 신청 방법 3단계 안내
6. 안전한 만남·신고·차단 안내 + `/travel-tools` CTA

### SCR-005 `/account` 계정·관리 — 역할 기반
- **Guest:** 계정 기능 Intro, 로그인·가입·비밀번호 재설정 Card, 로그인 후 가능한 기능 안내, 보안 안내(3단계)
- **Member(승인본 반영):** 프로필·성인확인 요약, 내가 작성한 동행글, 내가 보낸 참가 요청, 즐겨찾기(완성형 Empty State)·차단 목록, 새 동행글 작성 CTA 배너
- **Admin(Member 탭에 추가):** 관리자 탭 — 신고 상태 변경(신고 카드 목록 + OPEN/REVIEWING/RESOLVED/DISMISSED 상태 변경) + 항공·숙소 외부 URL 설정 Form
- 역할에 없는 탭/Section은 렌더링하지 않는다(예: Guest에게 관리자 탭 노출 금지).

## 18. 완성형 Empty State와 Placeholder 문구 금지 규칙

- 다음 문구·패턴을 **어떤 화면에도 사용하지 않는다**: `Lorem ipsum`, `준비 중`, `정보 확인 필요`, 내용 없는 빈 Card, 근거 없는 과도한 빈 여백.
- 목록형 Section(동행글, 즐겨찾기, 참가 요청, 신고 목록 등)에 데이터가 없을 때는 아래 3요소를 모두 포함한 **완성형 Empty State**로 디자인한다:
  1. 왜 비어 있는지 설명하는 자연스러운 한 문장(예: "아직 즐겨찾기한 여행지가 없습니다")
  2. 간단한 이용 방법 1~2문장
  3. 다음 행동으로 연결되는 명확한 CTA(예: "동행글 작성하기", 홈으로 이동)
- Empty State는 승인된 Stitch 화면(SCR-001 동행글 섹션, SCR-005 즐겨찾기 섹션)에서 이미 검증된 패턴을 그대로 재사용한다.

## 19. Do / Do Not

### Do
- 모든 색상은 2절 토큰에서만 가져와 사용한다.
- 폰트는 Inter + 시스템 한글 폰트 스택만 사용한다(웹폰트 CDN 또는 시스템 폰트, 파일 임베드 없음).
- 모든 이미지에 실제 장소·상황을 설명하는 `alt` 텍스트를 붙인다.
- 모든 인터랙션 요소에 44×44px 이상의 터치 영역과 `focus-ring` 키보드 포커스 스타일을 적용한다.
- 오류·경고·안전정보는 코랄과 다른 semantic color(danger/warning)로 표시하고 텍스트 라벨을 병기한다.
- 데이터가 없는 목록은 18절의 완성형 Empty State로 채운다.
- Section마다 제목·설명·본문/CTA 4단 계층을 지킨다.

### Do Not
- Airbnb 워드마크, 제품 탭 아이콘, "Guest favorite"/"NEW" 배지 등 Airbnb 고유 상표 요소를 재현하지 않는다.
- 예약, 결제, 가격 비교, 장바구니/체크아웃 등 구매 관련 UI를 만들지 않는다(Free Traveler는 조건 정리 후 외부 새 탭 이동만 제공한다).
- Airbnb Cereal 등 Proprietary 폰트 파일을 프로젝트에 포함하지 않는다.
- 2절 표에 없는 임의 색상을 코드·디자인에 새로 추가하지 않는다.
- `Lorem ipsum`, `준비 중`, `정보 확인 필요`, 빈 Card, 과도한 빈 여백을 사용하지 않는다.
- 관리자 화면에 통계 대시보드·차트를 추가하지 않는다(신고 상태 변경 + 외부 URL 설정 목록형 UI로 한정).
- 동행 카드/상세 어디에도 이메일·전화번호 등 공개 연락처를 노출하지 않는다.
