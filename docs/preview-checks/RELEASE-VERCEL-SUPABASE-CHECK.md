# RELEASE-VERCEL-SUPABASE-CHECK

- Supabase 프로젝트: `free-traveler`(ref `uneqonqjmcirxfjmregp`, ap-northeast-1) — 기존 조직(`chk0428-alt's Org`)에 이미 생성돼 있던 프로젝트를 사용. `0001_schema_base.sql`, `0002_rls_base.sql` 마이그레이션을 `supabase db push`로 적용 완료.
- Vercel 프로젝트: `chk0428-4869/free-traveler`, GitHub(`chk0428-alt/free-traveler`) 연결. `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`를 Production/Preview/Development 전체에 설정.
- 배포 URL: https://free-traveler-two.vercel.app

## 확인 결과 (2026-09-18)

- 5개 Route 전부 200 응답: `/`, `/about`, `/travel-tools`, `/mates`, `/account`
- HTTP 접속 시 HTTPS로 308 리다이렉트 확인(HTTPS 강제)
- 서빙된 HTML에 `service_role`/`sb_secret` 등 비밀키 문자열 없음(클라이언트 번들 미노출 확인) — Service Role Key는애초에 코드베이스 어디에서도 참조하지 않음(`CLAUDE.md` 14~15번 규칙)
- Supabase 연결 성공(로컬에서 `.env.local`로 실제 프로젝트에 연결해 5개 Route 렌더링 확인, `/mates` 빈 목록 정상 표시)
- Seed 데이터(`supabase/seed.sql`)는 주석에 명시된 대로 로컬 전용(`supabase start`)이라 이 운영 프로젝트에는 적용하지 않음 — 현재 운영 DB는 스키마/RLS만 적용된 빈 상태

## 판정: PASS
