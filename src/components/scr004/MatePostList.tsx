import Link from "next/link";
import {
  listMatePosts,
  type MatePostWithComputedStatus,
} from "@/lib/data/mate-posts";
import { listBlockedUserIds } from "@/lib/data/user-blocks";
import { getCurrentSessionUser } from "@/lib/auth/session";
import type { MatePostFilterState } from "@/components/scr004/Filter";

const MAX_LIST_SIZE = 8;

export type MatePostListFilters = Partial<MatePostFilterState>;

/**
 * 필터·차단 관계를 서버에서 적용한 뒤 최대 8개만 반환한다.
 * 연령대/성별 필터는 mate_post에 직접 저장된 값이 없어(작성자 프로필에만 존재)
 * 이번 축소 범위에서는 국가·스타일·모집상태만 실제로 필터링한다 — DB-ACCESS
 * 계층을 이 Task 범위에서 확장하지 않기 위한 의도적 제약이다.
 */
export async function getVisibleMatePosts(
  filters: MatePostListFilters,
): Promise<MatePostWithComputedStatus[]> {
  const [allPosts, currentUser] = await Promise.all([
    listMatePosts(),
    getCurrentSessionUser(),
  ]);

  const blockedOwnerIds = currentUser
    ? await listBlockedUserIds(currentUser.id).catch(() => [])
    : [];

  return allPosts
    .filter((post) => !blockedOwnerIds.includes(post.owner_id))
    .filter((post) =>
      filters.countryId
        ? post.country_id.toLowerCase() === filters.countryId.toLowerCase()
        : true,
    )
    .filter((post) =>
      filters.status ? post.computedStatus === filters.status : true,
    )
    .filter((post) =>
      filters.travelStyles && filters.travelStyles.length > 0
        ? filters.travelStyles.some((style) =>
            post.travel_styles.includes(style),
          )
        : true,
    )
    .slice(0, MAX_LIST_SIZE);
}

export type MatePostListProps = {
  posts: MatePostWithComputedStatus[];
  selectedPostId?: string;
};

export function MatePostList({ posts, selectedPostId }: MatePostListProps) {
  if (posts.length === 0) {
    return (
      <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
        <div className="flex flex-col items-center gap-md rounded-md border border-hairline bg-canvas p-lg text-center">
          <p className="text-body-md text-body">
            조건에 맞는 동행 모집글이 없습니다. 필터를 초기화하거나 새로운
            모집글을 등록해 보세요.
          </p>
          <p className="text-body-sm text-muted">
            여행 준비에서 동행 구하기 탭을 이용하면 국가·기간·모집 인원을 입력해
            모집글을 등록할 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-sm">
            <Link
              href="/mates"
              className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
            >
              필터 초기화
            </Link>
            <Link
              href="/travel-tools"
              className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
            >
              동행글 작성하기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <div className="grid grid-cols-1 gap-md md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.post_id}
            href={`/mates?postId=${post.post_id}`}
            data-testid="mate-post-card"
            className={
              post.post_id === selectedPostId
                ? "flex flex-col gap-sm rounded-md border-2 border-primary bg-surface-card p-md"
                : "flex flex-col gap-sm rounded-md border border-hairline bg-surface-card p-md hover:shadow-raised"
            }
          >
            <span
              className={
                post.computedStatus === "OPEN"
                  ? "w-fit rounded-full bg-success-bg px-sm py-xs text-body-sm font-semibold text-success"
                  : "w-fit rounded-full bg-surface-soft px-sm py-xs text-body-sm font-semibold text-muted"
              }
            >
              {post.computedStatus === "OPEN" ? "모집중" : "마감"}
            </span>
            <p className="text-title font-semibold text-ink">{post.title}</p>
            <p className="text-body-sm text-muted">
              {post.country_id} · {post.start_date} ~ {post.end_date} · 정원{" "}
              {post.capacity}명
            </p>
            <div className="flex flex-wrap gap-xs">
              {post.travel_styles.map((style) => (
                <span
                  key={style}
                  className="rounded-full bg-surface-soft px-sm py-xs text-body-sm text-ink"
                >
                  {style}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
