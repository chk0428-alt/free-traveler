import type { Config } from "tailwindcss";

/**
 * design-reference/D-001/DESIGN.md 2~6절 토큰의 1:1 코드화.
 * 이 표에 없는 임의 값은 추가하지 않는다 — 새 토큰이 필요하면 DESIGN.md를 먼저 갱신한다.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F2613B",
        "primary-active": "#D24E2B",
        "primary-tint": "#FDE3D8",
        "on-primary": "#FFFFFF",
        ink: "#23262B",
        body: "#4A4E56",
        muted: "#767B84",
        hairline: "#E4E6E9",
        canvas: "#FFFFFF",
        "surface-soft": "#F7F6F4",
        "surface-card": "#FFFFFF",
        danger: "#C23B2E",
        "danger-bg": "#FBEAE7",
        warning: "#9C6B14",
        "warning-bg": "#FBF1DE",
        success: "#1E7A50",
        "success-bg": "#E7F5EE",
        "focus-ring": "#1D4ED8",
        scrim: "#000000",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": ["40px", { lineHeight: "1.2" }],
        "display-xl-mobile": ["28px", { lineHeight: "1.2" }],
        "display-lg": ["32px", { lineHeight: "1.25" }],
        "display-lg-mobile": ["24px", { lineHeight: "1.25" }],
        title: ["20px", { lineHeight: "1.3" }],
        "title-mobile": ["18px", { lineHeight: "1.3" }],
        "body-md": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        btn: ["16px", { lineHeight: "1.25" }],
        badge: ["12px", { lineHeight: "1.3" }],
      },
      borderRadius: {
        none: "0px",
        sm: "8px",
        md: "14px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        raised: "0 2px 6px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.08)",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "section-desktop-min": "64px",
        "section-desktop-max": "96px",
        "section-mobile-min": "40px",
        "section-mobile-max": "64px",
        "gutter-desktop": "80px",
        "gutter-mobile": "20px",
      },
      maxWidth: {
        "content-desktop-min": "1200px",
        "content-desktop-max": "1280px",
      },
    },
  },
};

export default config;
