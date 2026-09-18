import Link from "next/link";

export function Intro() {
  return (
    <section className="mx-auto flex w-full max-w-content-desktop-max flex-col items-center gap-md px-gutter-mobile py-section-mobile-min text-center md:flex-row md:justify-between md:px-gutter-desktop md:py-section-desktop-min md:text-left">
      <div>
        <h1 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
          동행 찾기
        </h1>
        <p className="mt-sm text-body-md text-body">
          성인 인증을 완료한 회원이라면 누구나 동행 모집글을 등록할 수 있습니다.
        </p>
      </div>
      <Link
        href="/travel-tools"
        className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
      >
        동행글 작성하기
      </Link>
    </section>
  );
}
