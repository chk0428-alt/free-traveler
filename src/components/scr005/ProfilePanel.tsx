"use client";

import { useState, useTransition } from "react";
import { updateProfileAction } from "@/app/account/actions/profile";
import { showToast } from "@/components/ui/Toast";
import type { UserProfileRow } from "@/lib/data/types";

const AGE_BAND_OPTIONS = ["20대", "30대", "40대", "50대+"];
const GENDER_OPTIONS = ["", "여성", "남성"];
const TRAVEL_STYLE_OPTIONS = ["자연", "역사", "미식", "해변", "도심", "휴양"];

export type ProfilePanelProps = {
  profile: UserProfileRow;
};

export function ProfilePanel({ profile }: ProfilePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);
  const [ageBand, setAgeBand] = useState(profile.age_band ?? "");
  const [gender, setGender] = useState(profile.gender ?? "");
  const [travelStyles, setTravelStyles] = useState<string[]>(
    profile.travel_styles,
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleStyle(style: string) {
    setTravelStyles((current) =>
      current.includes(style)
        ? current.filter((item) => item !== style)
        : [...current, style],
    );
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await updateProfileAction({
        nickname,
        ageBand,
        gender: gender || undefined,
        travelStyles,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      showToast("프로필을 저장했습니다.");
      setIsEditing(false);
    });
  }

  return (
    <section className="flex flex-col gap-lg rounded-md border border-hairline bg-canvas p-lg md:flex-row md:justify-between">
      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-sm">
          <p className="text-title font-semibold text-ink">
            {profile.nickname}
          </p>
          {profile.is_adult ? (
            <span className="rounded-full bg-success-bg px-sm py-xs text-body-sm font-semibold text-success">
              성인확인 완료
            </span>
          ) : (
            <span className="rounded-full bg-warning-bg px-sm py-xs text-body-sm font-semibold text-warning">
              성인확인 필요
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-sm">
            <label className="flex flex-col gap-xs text-body-sm text-body">
              닉네임
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
              />
            </label>
            <label className="flex flex-col gap-xs text-body-sm text-body">
              연령대
              <select
                value={ageBand}
                onChange={(event) => setAgeBand(event.target.value)}
                className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
              >
                <option value="">선택</option>
                {AGE_BAND_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-xs text-body-sm text-body">
              성별(선택)
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
              >
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option || "선택 안 함"}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-sm">
              {TRAVEL_STYLE_OPTIONS.map((style) => {
                const selected = travelStyles.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleStyle(style)}
                    aria-pressed={selected}
                    className={
                      selected
                        ? "rounded-full bg-primary-tint px-md py-xs text-body-sm font-semibold text-primary"
                        : "rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink"
                    }
                  >
                    {style}
                  </button>
                );
              })}
            </div>
            {error ? <p className="text-body-sm text-danger">{error}</p> : null}
          </div>
        ) : (
          <div className="text-body-sm text-body">
            <p>연령대: {profile.age_band ?? "미입력"}</p>
            <p>성별: {profile.gender ?? "미입력"}</p>
            <p>
              여행 스타일:{" "}
              {profile.travel_styles.length > 0
                ? profile.travel_styles.join(", ")
                : "미입력"}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-start">
        {isEditing ? (
          <div className="flex gap-sm">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active disabled:opacity-60"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
          >
            프로필 수정
          </button>
        )}
      </div>
    </section>
  );
}
