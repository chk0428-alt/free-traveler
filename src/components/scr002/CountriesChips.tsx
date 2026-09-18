import { representativeProfile } from "@/data/profile";

export function CountriesChips() {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        방문 국가
      </h2>
      <div className="flex flex-col gap-lg">
        {representativeProfile.visitedCountries.map((group) => (
          <div key={group.region}>
            <h3 className="mb-sm text-title font-semibold text-ink">
              {group.region}
            </h3>
            <div className="flex flex-wrap gap-sm">
              {group.countries.map((country) => (
                <span
                  key={country}
                  className="rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
