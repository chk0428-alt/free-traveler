import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdultUser } from "@/lib/auth/guards";
import { createMatePostAction } from "@/app/travel-tools/actions/mate-post";

const TRAVEL_STYLE_OPTIONS = ["자연", "역사", "미식", "해변", "도심", "휴양"];

async function submitMatePost(formData: FormData): Promise<void> {
  "use server";

  const travelStyles = TRAVEL_STYLE_OPTIONS.filter(
    (style) => formData.get(`style-${style}`) === "on",
  );

  const result = await createMatePostAction({
    countryId: String(formData.get("countryId") ?? ""),
    regionId: String(formData.get("regionId") ?? "") || undefined,
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    capacity: Number(formData.get("capacity") ?? 0),
    travelStyles,
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    preferences: String(formData.get("preferences") ?? "") || undefined,
  });

  if (!result.ok) {
    redirect(`/travel-tools?mateError=${encodeURIComponent(result.error)}`);
  }

  redirect("/mates");
}

function LoginGuidanceCard() {
  return (
    <div className="flex flex-col items-center gap-md rounded-md border border-hairline bg-canvas p-lg text-center">
      <p className="text-body-md text-body">
        동행 구하기는 로그인 후 성인확인을 완료한 회원만 이용할 수 있습니다.
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

export type MateWriteFormProps = {
  /** Page Owner가 `?mateError=` 쿼리를 읽어 전달하면 폼 위에 인라인 오류로 표시한다. */
  errorMessage?: string;
};

export async function MateWriteForm({ errorMessage }: MateWriteFormProps) {
  const guard = await requireAdultUser();

  if (!guard.ok) {
    return <LoginGuidanceCard />;
  }

  return (
    <form action={submitMatePost} className="flex flex-col gap-md">
      {errorMessage ? (
        <div className="rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
          {errorMessage}
        </div>
      ) : null}

      <label className="flex flex-col gap-xs text-body-sm text-body">
        모집글 제목
        <input
          name="title"
          required
          className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
        />
      </label>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <label className="flex flex-col gap-xs text-body-sm text-body">
          국가
          <input
            name="countryId"
            required
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
        <label className="flex flex-col gap-xs text-body-sm text-body">
          지역
          <input
            name="regionId"
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
        <label className="flex flex-col gap-xs text-body-sm text-body">
          시작일
          <input
            type="date"
            name="startDate"
            required
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
        <label className="flex flex-col gap-xs text-body-sm text-body">
          종료일
          <input
            type="date"
            name="endDate"
            required
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
        <label className="flex flex-col gap-xs text-body-sm text-body">
          모집 인원
          <input
            type="number"
            name="capacity"
            min={1}
            required
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-sm">
        <legend className="text-body-sm text-body">여행 스타일</legend>
        <div className="flex flex-wrap gap-sm">
          {TRAVEL_STYLE_OPTIONS.map((style) => (
            <label
              key={style}
              className="flex items-center gap-xs rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink"
            >
              <input type="checkbox" name={`style-${style}`} />
              {style}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-xs text-body-sm text-body">
        원하는 동행 조건
        <input
          name="preferences"
          className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
        />
      </label>

      <label className="flex flex-col gap-xs text-body-sm text-body">
        상세 설명
        <textarea
          name="description"
          required
          rows={4}
          className="rounded-sm border border-hairline p-md text-body-md text-ink"
        />
      </label>

      <p className="text-body-sm text-muted">
        전화번호·이메일·카카오톡/텔레그램 ID 등 개인 연락처는 입력하지 마세요.
        탐지 시 제출이 차단됩니다. 참가 요청은 비공개 메시지로만 이루어집니다.
      </p>

      <label className="flex items-center gap-sm text-body-sm text-body">
        <input type="checkbox" required />
        동행 안전수칙에 동의합니다.
      </label>

      <button
        type="submit"
        className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active md:w-fit"
      >
        모집글 등록하기
      </button>
    </form>
  );
}
