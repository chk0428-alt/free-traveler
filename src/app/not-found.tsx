import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-content-desktop-max flex-1 flex-col items-center justify-center gap-md px-gutter-mobile py-section-mobile-min text-center md:px-gutter-desktop md:py-section-desktop-min">
      <p className="text-body-sm font-semibold text-primary">404</p>
      <h1 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="max-w-md text-body-md text-body">
        주소가 변경되었거나 삭제된 페이지일 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-md flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
