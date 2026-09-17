const FAVORITES_STORAGE_KEY = "free-traveler:favorite-destination-ids";

function readFavoriteIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeFavoriteIds(ids: string[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}

export function getFavoriteDestinationIds(): string[] {
  return readFavoriteIds();
}

export function isFavoriteDestination(destinationId: string): boolean {
  return readFavoriteIds().includes(destinationId);
}

export function addFavoriteDestination(destinationId: string): string[] {
  const current = readFavoriteIds();
  if (current.includes(destinationId)) {
    return current;
  }
  const next = [...current, destinationId];
  writeFavoriteIds(next);
  return next;
}

export function removeFavoriteDestination(destinationId: string): string[] {
  const next = readFavoriteIds().filter((id) => id !== destinationId);
  writeFavoriteIds(next);
  return next;
}

export function toggleFavoriteDestination(destinationId: string): string[] {
  return isFavoriteDestination(destinationId)
    ? removeFavoriteDestination(destinationId)
    : addFavoriteDestination(destinationId);
}
