# Free Traveler — Design Manifest

**Active Design Version:** D-001
**Status:** LOCKED
**Locked Date:** 2026-09-15
**Active File:** `design-reference/D-001/DESIGN.md`
**Vendor Reference:** `design-reference/vendor/airbnb/DESIGN.md` (레이아웃·elevation 원리만 참고, 상표 요소 미사용)

---

## 1. 정본 관계

`design-reference/D-001/DESIGN.md`가 Free Traveler UI의 유일한 디자인 정본(Single Source of Truth)이다. `docs/04_UIUX_PLAN.md`와 `docs/STITCH_VALIDATION_REPORT.md`의 확정 내용을 근거로 확정되었으며, 이후 화면 구현·추가 Stitch 생성·코드 작업은 모두 D-001을 기준으로 한다.

| 문서 | 역할 |
|---|---|
| `design-reference/vendor/airbnb/DESIGN.md` | 참고용 Vendor 레퍼런스(레이아웃·밀도·elevation 원리만 차용) |
| `docs/04_UIUX_PLAN.md` | Screen별 Section 계약 원안 |
| `docs/STITCH_VALIDATION_REPORT.md` | 승인된 Stitch 화면의 검증 근거 |
| `design-reference/D-001/DESIGN.md` | **정본** — Color/Typography/Spacing/Component/Section 규칙 |

---

## 2. Approved Screens (Stitch Project `1129186265623832820`)

| Screen | Route | 승인 Screen ID | Device |
|---|---|---|---|
| SCR-001 | `/` | `2a0bea03968b44548ab4995d295c5a4d` | Desktop 1440px |
| SCR-002 | `/about` | `86756e99f46e4d06b68d1ab22cdc5327` | Desktop 1440px |
| SCR-003 | `/travel-tools` | `ed9175c4fae84c29976b5dee948f82a7` | Desktop 1440px |
| SCR-004 | `/mates` | `6e4e82f9d4724e21b40b73717526ba4f` | Desktop 1440px |
| SCR-005 | `/account` | `b0f813f46e80419480b1cd7c8ad632f8` (관리자 탭 포함 최종본) | Desktop 1440px |

### Mobile Variants

| Screen | 승인 Screen ID | Device |
|---|---|---|
| SCR-001 | `eec6035a9fef48f5a2f18462a5849d15` | Mobile 390px |
| SCR-003 | `f290caa5ed354c70bde4b18f60be16d6` | Mobile 390px |

> SCR-002, SCR-004, SCR-005는 Mobile 변형이 이번 승인 범위에 포함되지 않는다(D-001 15절의 반응형 규칙을 구현 시점에 동일 적용).

### 비정본 화면 (참고, 구현 기준 아님)

Stitch 프로젝트에는 생성 과정에서 남은 중복·구버전 화면이 존재하나 정본으로 취급하지 않는다: `40a46f344a44462eaf86c4b4b1343f1d`, `09f3b41025f94421b5d6e6a2d7f77ad6`, `1c313be51e34499895c95ba425a44e47`(SCR-005 구버전, Admin 미포함), `2f18318752454ae0a895aafec6668860`, `9bb9cea06b164018827a85c57c3eeb3d`.

---

## 3. LOCKED 상태의 의미

- D-001은 **LOCKED** 상태다. 색상/타이포그래피/스페이싱/컴포넌트 토큰과 화면별 Section 계약을 변경하려면 새 버전(D-002 등)을 발행해야 하며, D-001 파일을 직접 덮어쓰지 않는다.
- 오탈자 등 비실질적 수정은 예외로 허용하되, 토큰 값·Section 순서·최소 콘텐츠 수 변경은 버전업 대상이다.
- 구현(코드) 단계에서 D-001과 다른 값을 쓰는 경우 이 매니페스트와 D-001을 먼저 갱신한 뒤 코드에 반영한다.

---

## 4. 금지 사항 (D-001 19절과 동일, 요약)

- Airbnb 상표 요소(워드마크, 제품 탭 아이콘, "Guest favorite"/"NEW" 배지 등) 사용 금지
- 구매·예약·결제·가격비교·체크아웃 UI 금지
- Proprietary 폰트 파일 포함 금지(Inter + 시스템 한글 폰트만 사용)
- D-001에 정의되지 않은 임의 색상 추가 금지
