import Link from "next/link";
import { listMatePosts } from "@/lib/data/mate-posts";

export async function MatePreview() {
  // Supabase 연결 실패도 사용자 입장에서는 "동행글 없음"과 동일하게 완성형 Empty
  // State로 보여준다 — DB 오류로 홈 전체가 깨지는 것을 막는다.
  const posts = await listMatePosts()
    .then((rows) => rows.slice(0, 3))
    .catch(() => []);

  return (
    <section className="mx-auto w-full max-w-content-desktop-max bg-surface-soft px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        최근 동행 모집글
      </h2>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-md rounded-md border border-hairline bg-canvas p-lg text-center">
          <p className="text-body-md text-body">
            아직 등록된 동행 모집글이 없습니다. 함께 떠날 동행을 가장 먼저
            구해보세요.
          </p>
          <p className="text-body-sm text-muted">
            여행 준비에서 동행 구하기 탭을 이용하면 국가·기간·모집 인원을 입력해
            모집글을 등록할 수 있습니다.
          </p>
          <Link
            href="/travel-tools"
            className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
          >
            동행글 작성하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-md md:grid-cols-3 md:gap-lg">
          {posts.map((post) => (
            <Link
              key={post.post_id}
              href="/mates"
              data-testid="mate-post-card"
              className="flex flex-col gap-sm rounded-md border border-hairline bg-canvas p-md hover:shadow-raised"
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
                {post.country_id.toUpperCase()} · {post.start_date} ~{" "}
                {post.end_date} · 정원 {post.capacity}명
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
