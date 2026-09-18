import Link from "next/link";
import { getMatePostById } from "@/lib/data/mate-posts";
import { listApplicationsForPost } from "@/lib/data/mate-applications";
import { getCurrentSessionUser } from "@/lib/auth/session";
import {
  acceptMateApplicationAction,
  rejectMateApplicationAction,
} from "@/app/mates/actions/mate-application";
import {
  closeMatePostAction,
  deleteMatePostAction,
} from "@/app/mates/actions/mate-post";

function LoginGuidanceCard() {
  return (
    <div className="flex flex-col items-center gap-md rounded-md border border-hairline bg-canvas p-lg text-center">
      <p className="text-body-md text-body">
        동행 모집글 상세는 로그인 후 이용할 수 있습니다.
      </p>
      <Link
        href="/account"
        className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
      >
        로그인 / 가입하기
      </Link>
    </div>
  );
}

async function acceptApplication(formData: FormData): Promise<void> {
  "use server";
  const postId = String(formData.get("postId") ?? "");
  const applicationId = String(formData.get("applicationId") ?? "");
  await acceptMateApplicationAction(postId, applicationId);
}

async function rejectApplication(formData: FormData): Promise<void> {
  "use server";
  const postId = String(formData.get("postId") ?? "");
  const applicationId = String(formData.get("applicationId") ?? "");
  await rejectMateApplicationAction(postId, applicationId);
}

async function closePost(formData: FormData): Promise<void> {
  "use server";
  const postId = String(formData.get("postId") ?? "");
  await closeMatePostAction(postId);
}

async function deletePost(formData: FormData): Promise<void> {
  "use server";
  const postId = String(formData.get("postId") ?? "");
  await deleteMatePostAction(postId);
}

export type MatePostDetailProps = {
  postId: string;
  /** 참가 요청 폼(COMP-SCR004-APPLY)을 이 자리에 조립한다(Page Owner 담당). */
  applyForm?: React.ReactNode;
  /** 신고·차단 액션(COMP-SCR004-SAFETY-ACTIONS)을 이 자리에 조립한다(Page Owner 담당). */
  safetyActions?: React.ReactNode;
};

export async function MatePostDetail({
  postId,
  applyForm,
  safetyActions,
}: MatePostDetailProps) {
  const currentUser = await getCurrentSessionUser();
  if (!currentUser) {
    return <LoginGuidanceCard />;
  }

  const post = await getMatePostById(postId);
  if (!post) {
    return (
      <div className="rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
        존재하지 않는 모집글입니다.
      </div>
    );
  }

  const isOwner = post.owner_id === currentUser.id;
  const applications = isOwner
    ? await listApplicationsForPost(postId).catch(() => [])
    : [];

  return (
    <div className="flex flex-col gap-lg rounded-md border border-hairline bg-canvas p-lg">
      <div className="flex items-center justify-between">
        <span
          className={
            post.computedStatus === "OPEN"
              ? "w-fit rounded-full bg-success-bg px-sm py-xs text-body-sm font-semibold text-success"
              : "w-fit rounded-full bg-surface-soft px-sm py-xs text-body-sm font-semibold text-muted"
          }
        >
          {post.computedStatus === "OPEN" ? "모집중" : "마감"}
        </span>
        {isOwner ? (
          <div className="flex gap-sm">
            <form action={closePost}>
              <input type="hidden" name="postId" value={post.post_id} />
              <button
                type="submit"
                className="text-body-sm font-semibold text-ink"
              >
                마감하기
              </button>
            </form>
            <form action={deletePost}>
              <input type="hidden" name="postId" value={post.post_id} />
              <button
                type="submit"
                className="text-body-sm font-semibold text-danger"
              >
                삭제하기
              </button>
            </form>
          </div>
        ) : null}
      </div>

      <h2 className="text-title font-semibold text-ink">{post.title}</h2>
      <p className="text-body-sm text-muted">
        {post.country_id} {post.region_id ? `· ${post.region_id}` : ""} ·{" "}
        {post.start_date} ~ {post.end_date} · 정원 {post.capacity}명
      </p>
      <p className="text-body-md text-body">{post.description}</p>

      {isOwner ? (
        <section>
          <h3 className="mb-sm text-title font-semibold text-ink">
            받은 참가 요청
          </h3>
          {applications.length === 0 ? (
            <p className="text-body-sm text-muted">
              아직 받은 참가 요청이 없습니다.
            </p>
          ) : (
            <ul className="flex flex-col gap-sm">
              {applications.map((application) => (
                <li
                  key={application.application_id}
                  className="flex flex-col gap-xs rounded-sm border border-hairline p-md"
                >
                  <p className="text-body-sm text-body">
                    {application.message}
                  </p>
                  <div className="flex items-center gap-sm">
                    <span className="text-body-sm font-semibold text-muted">
                      {application.status}
                    </span>
                    {application.status === "PENDING" ? (
                      <>
                        <form action={acceptApplication}>
                          <input
                            type="hidden"
                            name="postId"
                            value={post.post_id}
                          />
                          <input
                            type="hidden"
                            name="applicationId"
                            value={application.application_id}
                          />
                          <button
                            type="submit"
                            className="text-body-sm font-semibold text-success"
                          >
                            승인
                          </button>
                        </form>
                        <form action={rejectApplication}>
                          <input
                            type="hidden"
                            name="postId"
                            value={post.post_id}
                          />
                          <input
                            type="hidden"
                            name="applicationId"
                            value={application.application_id}
                          />
                          <button
                            type="submit"
                            className="text-body-sm font-semibold text-danger"
                          >
                            거절
                          </button>
                        </form>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        applyForm
      )}

      {safetyActions}
    </div>
  );
}
