import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright(E2E)는 127.0.0.1로 접속하는데, Next 16 dev 서버는 기본적으로
  // localhost와 127.0.0.1을 다른 Origin으로 간주해 dev 리소스(HMR·클라이언트
  // 번들) 요청을 차단한다 — 이 때문에 로컬 E2E에서 hydration이 실패했다.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
