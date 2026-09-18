import { representativeProfile } from "@/data/profile";

export function Timeline() {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max bg-surface-soft px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        여행 Timeline
      </h2>
      <ol className="flex flex-col gap-lg border-l-2 border-hairline pl-lg">
        {representativeProfile.timeline.map((entry) => (
          <li key={entry.year} className="relative">
            <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary" />
            <p className="text-body-sm font-semibold text-primary">
              {entry.year}
            </p>
            <p className="text-title font-semibold text-ink">{entry.title}</p>
            <p className="text-body-sm text-body">{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
