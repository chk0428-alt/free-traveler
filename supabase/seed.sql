-- 로컬 개발/RLS 테스트 전용 Seed 데이터(TEST-RLS-BASIC이 사용).
-- 실제 개인정보는 포함하지 않으며, `supabase start`로 띄운 로컬 인스턴스에서만
-- 실행한다(운영 프로젝트에는 적용하지 않는다).

-- 테스트용 auth.users 3명(작성자, 신청자, 관리자). 비밀번호는 로컬 전용 더미 값이다.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated', 'authenticated',
    'seed-owner@example.com', crypt('seed-local-only', gen_salt('bf')),
    now(), now(), now(), '{"provider":"email"}', '{}'
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated', 'authenticated',
    'seed-applicant@example.com', crypt('seed-local-only', gen_salt('bf')),
    now(), now(), now(), '{"provider":"email"}', '{}'
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-3333-3333-333333333333',
    'authenticated', 'authenticated',
    'seed-admin@example.com', crypt('seed-local-only', gen_salt('bf')),
    now(), now(), now(), '{"provider":"email"}', '{}'
  )
on conflict (id) do nothing;

insert into public.user_profile (user_id, nickname, is_adult, adult_verified_at, status)
values
  ('11111111-1111-1111-1111-111111111111', 'seed-owner', true, now(), 'active'),
  ('22222222-2222-2222-2222-222222222222', 'seed-applicant', true, now(), 'active'),
  ('33333333-3333-3333-3333-333333333333', 'seed-admin', true, now(), 'admin')
on conflict (user_id) do nothing;

insert into public.mate_post (
  post_id, owner_id, country_id, region_id, start_date, end_date,
  capacity, travel_styles, title, description, status
) values (
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'jp', 'tokyo', current_date + interval '30 days', current_date + interval '35 days',
  4, array['도심', '미식'], '[Seed] 도쿄 5일 동행 구합니다',
  'RLS 테스트용 더미 모집글입니다. 실제 여행 정보가 아닙니다.', 'OPEN'
)
on conflict (post_id) do nothing;

insert into public.mate_application (
  application_id, post_id, applicant_id, message, status
) values (
  '55555555-5555-5555-5555-555555555555',
  '44444444-4444-4444-4444-444444444444',
  '22222222-2222-2222-2222-222222222222',
  'RLS 테스트용 더미 참가 요청 메시지입니다.', 'PENDING'
)
on conflict (application_id) do nothing;

insert into public.report (
  report_id, reporter_id, target_type, target_id, reason_code, description, status
) values (
  '66666666-6666-6666-6666-666666666666',
  '22222222-2222-2222-2222-222222222222',
  'mate_post',
  '44444444-4444-4444-4444-444444444444',
  'SEED_TEST',
  'RLS 테스트용 더미 신고입니다.', 'OPEN'
)
on conflict (report_id) do nothing;
