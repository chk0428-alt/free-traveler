import Image from "next/image";
import { representativeProfile } from "@/data/profile";

export function Story() {
  return (
    <section className="mx-auto flex w-full max-w-content-desktop-max flex-col gap-lg px-gutter-mobile py-section-mobile-min md:flex-row md:items-start md:gap-xl md:px-gutter-desktop md:py-section-desktop-min">
      <div className="relative h-56 w-full overflow-hidden rounded-md md:h-auto md:w-1/2 md:self-stretch">
        <Image
          src={representativeProfile.heroImageUrl}
          alt={representativeProfile.heroImageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col gap-md">
        <h2 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
          자기소개·철학
        </h2>
        {representativeProfile.introParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-body-md text-body">
            {paragraph}
          </p>
        ))}
        <p className="text-body-md font-semibold text-ink">
          {representativeProfile.philosophy}
        </p>
      </div>
    </section>
  );
}
