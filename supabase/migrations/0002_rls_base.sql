-- Free Traveler RLS — docs/ARCHITECTURE.md 8-2절의 "간단한 RLS 원칙"을 그대로 코드화한다.
-- 기본값은 비허용(RLS 활성화 후 정책 없는 접근은 전부 거부)이며, 아래 정책만 명시적으로 허용한다.
-- 이 파일 범위에서 6개 테이블 외 신규 테이블/뷰/함수는 추가하지 않는다(헬퍼 함수 대신
-- 정책마다 user_profile 서브쿼리를 인라인으로 반복한다).

alter table public.user_profile enable row level security;
alter table public.mate_post enable row level security;
alter table public.mate_application enable row level security;
alter table public.user_block enable row level security;
alter table public.report enable row level security;
alter table public.outbound_link_setting enable row level security;

-- ── user_profile ─────────────────────────────────────────────
-- 닉네임 등 공개 필드 노출을 위해 인증 사용자에게는 행 자체를 공개하되(간단한 원칙),
-- 쓰기는 본인 행만 허용한다. 어떤 필드를 화면에 노출할지는 애플리케이션 계층이 결정한다.
create policy user_profile_select_authenticated
  on public.user_profile for select
  to authenticated
  using (true);

create policy user_profile_insert_own
  on public.user_profile for insert
  to authenticated
  with check (user_id = auth.uid());

create policy user_profile_update_own
  on public.user_profile for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ── mate_post ────────────────────────────────────────────────
-- 모집중/마감 여부와 무관하게 공개 목록/상세 조회이므로 비로그인 포함 전체 공개.
create policy mate_post_select_public
  on public.mate_post for select
  to anon, authenticated
  using (true);

create policy mate_post_insert_own
  on public.mate_post for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy mate_post_update_own
  on public.mate_post for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy mate_post_delete_own
  on public.mate_post for delete
  to authenticated
  using (owner_id = auth.uid());

-- ── mate_application ─────────────────────────────────────────
-- 본인 신청 또는 해당 글 작성자만 열람. 그 외 요청은 RLS로 빈 결과 처리된다.
create policy mate_application_select_owner_or_applicant
  on public.mate_application for select
  to authenticated
  using (
    applicant_id = auth.uid()
    or exists (
      select 1 from public.mate_post
      where mate_post.post_id = mate_application.post_id
        and mate_post.owner_id = auth.uid()
    )
  );

create policy mate_application_insert_own
  on public.mate_application for insert
  to authenticated
  with check (applicant_id = auth.uid());

-- 승인/거절은 글 작성자만 가능(신청자 본인은 상태를 바꿀 수 없다).
create policy mate_application_update_post_owner
  on public.mate_application for update
  to authenticated
  using (
    exists (
      select 1 from public.mate_post
      where mate_post.post_id = mate_application.post_id
        and mate_post.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.mate_post
      where mate_post.post_id = mate_application.post_id
        and mate_post.owner_id = auth.uid()
    )
  );

-- ── user_block ───────────────────────────────────────────────
create policy user_block_select_own
  on public.user_block for select
  to authenticated
  using (blocker_id = auth.uid());

create policy user_block_insert_own
  on public.user_block for insert
  to authenticated
  with check (blocker_id = auth.uid());

create policy user_block_delete_own
  on public.user_block for delete
  to authenticated
  using (blocker_id = auth.uid());

-- ── report ───────────────────────────────────────────────────
create policy report_insert_own
  on public.report for insert
  to authenticated
  with check (reporter_id = auth.uid());

create policy report_select_own_or_moderator
  on public.report for select
  to authenticated
  using (
    reporter_id = auth.uid()
    or exists (
      select 1 from public.user_profile
      where user_profile.user_id = auth.uid()
        and user_profile.status in ('moderator', 'admin')
    )
  );

create policy report_update_moderator_only
  on public.report for update
  to authenticated
  using (
    exists (
      select 1 from public.user_profile
      where user_profile.user_id = auth.uid()
        and user_profile.status in ('moderator', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.user_profile
      where user_profile.user_id = auth.uid()
        and user_profile.status in ('moderator', 'admin')
    )
  );

-- ── outbound_link_setting ────────────────────────────────────
create policy outbound_link_setting_select_authenticated
  on public.outbound_link_setting for select
  to authenticated
  using (true);

create policy outbound_link_setting_update_admin_only
  on public.outbound_link_setting for update
  to authenticated
  using (
    exists (
      select 1 from public.user_profile
      where user_profile.user_id = auth.uid()
        and user_profile.status = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.user_profile
      where user_profile.user_id = auth.uid()
        and user_profile.status = 'admin'
    )
  );
