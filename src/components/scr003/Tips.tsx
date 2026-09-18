const TIPS = [
  {
    title: "입력값 비전달",
    description:
      "항공·숙소 조건은 브라우저에만 남고 서버·DB·URL로 전달되지 않습니다.",
  },
  {
    title: "가격·재고는 외부에서 확인",
    description:
      "실제 항공편·숙소 가격과 예약 가능 여부는 이동한 외부 사이트에서 확인해 주세요.",
  },
  {
    title: "탭 이동해도 입력값 유지",
    description:
      "항공/숙소/동행 탭을 오가도 각 탭에 입력한 내용은 그대로 남아 있습니다.",
  },
];

export function Tips() {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max bg-surface-soft px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        여행 준비 Tip
      </h2>
      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        {TIPS.map((tip) => (
          <div
            key={tip.title}
            className="flex flex-col gap-sm rounded-md border border-hairline bg-canvas p-lg"
          >
            <p className="text-title font-semibold text-ink">{tip.title}</p>
            <p className="text-body-sm text-body">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
