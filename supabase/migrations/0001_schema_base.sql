-- Free Traveler 스키마 — docs/ARCHITECTURE.md 8절의 6개 테이블만 생성한다.
-- 이 6개 테이블(user_profile, mate_post, mate_application, user_block, report,
-- outbound_link_setting) 외의 테이블/뷰/함수는 이 마이그레이션 범위에서 추가하지 않는다.

create table if not exists public.user_profile (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null unique,
  is_adult boolean not null default false,
  adult_verified_at timestamptz,
  age_band text,
  gender text,
  travel_styles text[] not null default '{}',
  bio text,
  -- 계정 상태 겸 역할 표시: 'active' | 'suspended' | 'moderator' | 'admin'.
  -- 별도 역할 테이블을 두지 않고 이 컬럼 하나로 docs/ARCHITECTURE.md 8-2절의
  -- "user_profile.status(또는 별도 역할 컬럼)" 원칙을 따른다.
  status text not null default 'active'
    check (status in ('active', 'suspended', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mate_post (
  post_id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  country_id text not null,
  region_id text,
  start_date date not null,
  end_date date not null,
  capacity integer not null check (capacity >= 1),
  preferences text,
  travel_styles text[] not null default '{}',
  title text not null,
  description text not null,
  -- 'OPEN' | 'CLOSED'. 종료일 경과분은 조회 시점에 애플리케이션 계층(DB-ACCESS)이
  -- CLOSED로 계산하며, 이 컬럼은 작성자의 수동 마감 상태를 저장한다.
  status text not null default 'OPEN' check (status in ('OPEN', 'CLOSED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mate_post_date_order check (end_date >= start_date)
);

create table if not exists public.mate_application (
  application_id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.mate_post (post_id) on delete cascade,
  applicant_id uuid not null references auth.users (id) on delete cascade,
  message text not null check (char_length(message) <= 500),
  status text not null default 'PENDING'
    check (status in ('PENDING', 'ACCEPTED', 'REJECTED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 동일 신청자가 같은 글에 PENDING/ACCEPTED 상태로 중복 신청하지 못하게 막는다
-- (REJECTED는 재신청 허용). API-MATE-APPLICATION의 "동일 사용자 중복 PENDING/ACCEPTED
-- 차단" 요건을 DB 제약으로도 이중 보장한다.
create unique index if not exists mate_application_active_unique
  on public.mate_application (post_id, applicant_id)
  where status in ('PENDING', 'ACCEPTED');

create table if not exists public.user_block (
  blocker_id uuid not null references auth.users (id) on delete cascade,
  blocked_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint user_block_not_self check (blocker_id <> blocked_id)
);

create table if not exists public.report (
  report_id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users (id) on delete cascade,
  target_type text not null check (target_type in ('mate_post', 'mate_application', 'user_profile')),
  target_id uuid not null,
  reason_code text not null,
  description text,
  -- TASK-API-MATE-REPORT AC: Admin이 OPEN/REVIEWING/RESOLVED/DISMISSED 4단계로 전이시킨다.
  status text not null default 'OPEN'
    check (status in ('OPEN', 'REVIEWING', 'RESOLVED', 'DISMISSED')),
  assignee_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- 항공/숙소 외부 이동 URL 설정. Admin 1인 이상 운영이 전제이므로 단일 행만 관리한다.
create table if not exists public.outbound_link_setting (
  id smallint primary key default 1 check (id = 1),
  flight_url text,
  hotel_url text,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into public.outbound_link_setting (id)
values (1)
on conflict (id) do nothing;

create index if not exists mate_post_owner_id_idx on public.mate_post (owner_id);
create index if not exists mate_post_status_idx on public.mate_post (status);
create index if not exists mate_application_post_id_idx on public.mate_application (post_id);
create index if not exists mate_application_applicant_id_idx on public.mate_application (applicant_id);
create index if not exists report_status_idx on public.report (status);
