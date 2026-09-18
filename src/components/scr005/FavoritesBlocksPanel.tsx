"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { getFavoriteDestinationIds } from "@/lib/client/favorites";
import { unblockUserAction } from "@/app/mates/actions/block";
import { showToast } from "@/components/ui/Toast";
import { destinations } from "@/data/destinations";

function describeFavorite(id: string): string {
  return destinations.find((destination) => destination.id === id)?.name ?? id;
}

export type FavoritesBlocksPanelProps = {
  blockedUserIds: string[];
};

export function FavoritesBlocksPanel({
  blockedUserIds,
}: FavoritesBlocksPanelProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [blocked, setBlocked] = useState(blockedUserIds);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // localStorage는 클라이언트 전용 저장소라 마운트 후 동기화한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoriteIds(getFavoriteDestinationIds());
  }, []);

  function handleUnblock(blockedId: string) {
    startTransition(async () => {
      const result = await unblockUserAction(blockedId);
      if (result.ok) {
        setBlocked((current) => current.filter((id) => id !== blockedId));
        showToast("차단을 해제했습니다.");
      } else {
        showToast(result.error);
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
      <section>
        <h3 className="mb-md text-title font-semibold text-ink">즐겨찾기</h3>
        {favoriteIds.length === 0 ? (
          <div className="flex flex-col items-center gap-sm rounded-md border border-hairline bg-canvas p-lg text-center">
            <p className="text-body-sm text-body">
              아직 즐겨찾기한 여행지가 없습니다.
            </p>
            <Link
              href="/"
              className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
            >
              홈에서 여행지 둘러보기
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-sm">
            {favoriteIds.map((id) => (
              <li
                key={id}
                className="rounded-md border border-hairline bg-canvas p-md text-body-sm text-ink"
              >
                <Link href="/" className="hover:text-primary">
                  {describeFavorite(id)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-md text-title font-semibold text-ink">차단 목록</h3>
        {blocked.length === 0 ? (
          <p className="text-body-sm text-muted">차단한 사용자가 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-sm">
            {blocked.map((blockedId) => (
              <li
                key={blockedId}
                className="flex items-center justify-between rounded-md border border-hairline bg-canvas p-md"
              >
                <span className="text-body-sm text-ink">{blockedId}</span>
                <button
                  type="button"
                  onClick={() => handleUnblock(blockedId)}
                  disabled={isPending}
                  className="text-body-sm font-semibold text-primary disabled:opacity-60"
                >
                  차단 해제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
