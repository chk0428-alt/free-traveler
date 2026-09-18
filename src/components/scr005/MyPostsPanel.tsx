import Link from "next/link";
import { listMatePosts } from "@/lib/data/mate-posts";
import {
  listApplicationsForPost,
  listApplicationsByApplicant,
} from "@/lib/data/mate-applications";

const APPLICATION_STATUS_LABEL: Record<string, string> = {
  PENDING: "대기중",
  ACCEPTED: "수락됨",
  REJECTED: "거절됨",
};

export type MyPostsPanelProps = {
  userId: string;
};

export async function MyPostsPanel({ userId }: MyPostsPanelProps) {
  const [allPosts, myApplications] = await Promise.all([
    listMatePosts(),
    listApplicationsByApplicant(userId).catch(() => []),
  ]);

  const myPosts = allPosts.filter((post) => post.owner_id === userId);
  const myPostsWithRequestCount = await Promise.all(
    myPosts.map(async (post) => ({
      post,
      requestCount: (
        await listApplicationsForPost(post.post_id).catch(() => [])
      ).length,
    })),
  );

  return (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
      <section>
        <h3 className="mb-md text-title font-semibold text-ink">
          내가 작성한 동행글
        </h3>
        {myPostsWithRequestCount.length === 0 ? (
          <div className="flex flex-col items-center gap-sm rounded-md border border-hairline bg-canvas p-lg text-center">
            <p className="text-body-sm text-body">
              아직 작성한 동행글이 없습니다.
            </p>
            <Link
              href="/travel-tools"
              className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
            >
              동행글 작성하기
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-sm">
            {myPostsWithRequestCount.map(({ post, requestCount }) => (
              <li key={post.post_id}>
                <Link
                  href={`/mates?postId=${post.post_id}`}
                  className="flex flex-col gap-xs rounded-md border border-hairline bg-canvas p-md hover:shadow-raised"
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
                  <p className="text-body-md text-ink">{post.title}</p>
                  <p className="text-body-sm text-muted">
                    받은 요청 {requestCount}건
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-md text-title font-semibold text-ink">
          내가 보낸 참가 요청
        </h3>
        {myApplications.length === 0 ? (
          <div className="flex flex-col items-center gap-sm rounded-md border border-hairline bg-canvas p-lg text-center">
            <p className="text-body-sm text-body">
              아직 보낸 참가 요청이 없습니다.
            </p>
            <Link
              href="/mates"
              className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
            >
              동행 찾아보기
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-sm">
            {myApplications.map((application) => (
              <li key={application.application_id}>
                <Link
                  href={`/mates?postId=${application.post_id}`}
                  className="flex flex-col gap-xs rounded-md border border-hairline bg-canvas p-md hover:shadow-raised"
                >
                  <span className="w-fit rounded-full bg-surface-soft px-sm py-xs text-body-sm font-semibold text-ink">
                    {APPLICATION_STATUS_LABEL[application.status] ??
                      application.status}
                  </span>
                  <p className="text-body-sm text-body">
                    {application.message}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
