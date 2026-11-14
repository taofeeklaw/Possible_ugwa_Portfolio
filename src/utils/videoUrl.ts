export type ResolvedMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string }
  | { type: 'iframe'; src: string };

export function extractYouTubeId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  return match?.[1] ?? null;
}

export function extractGoogleDriveId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const pathMatch = trimmed.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/i);
  if (pathMatch?.[1]) return pathMatch[1];

  const queryMatch = trimmed.match(
    /drive\.google\.com\/(?:open|uc|thumbnail)\?(?:.*&)?id=([A-Za-z0-9_-]+)/i
  );
  return queryMatch?.[1] ?? null;
}

export function isDirectVideoUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;

  return (
    /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(trimmed) ||
    trimmed.startsWith('/videos/') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video/')
  );
}

/**
 * Converts any pasted Google Drive image/video share link into a direct thumbnail URL.
 */
export function toDriveImageUrl(rawUrl: string, fallback = ''): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return fallback;

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`;
  }

  return trimmed;
}

/**
 * Resolves card thumbnail:
 * 1) Custom thumbnailDriveUrl (auto-converted if Google Drive link)
 * 2) If driveUrl is a Google Drive link, uses Drive's auto-generated video frame thumbnail
 * 3) If driveUrl is a YouTube link, uses YouTube thumbnail
 * 4) Falls back to built-in studio still
 */
export function resolveWorkThumbnail(
  item: {
    type: 'video' | 'image';
    driveUrl: string;
    thumbnailDriveUrl: string;
  },
  fallbackThumbnail: string
): string {
  if (item.thumbnailDriveUrl.trim()) {
    return toDriveImageUrl(item.thumbnailDriveUrl, fallbackThumbnail);
  }

  const driveId = extractGoogleDriveId(item.driveUrl);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`;
  }

  const youtubeId = extractYouTubeId(item.driveUrl);
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  return fallbackThumbnail;
}

/**
 * Resolves the Lightbox Modal playable/viewable media for a WorkItem.
 */
export function resolveWorkMedia(item: {
  type: 'video' | 'image';
  driveUrl: string;
}): ResolvedMedia | null {
  const trimmed = item.driveUrl.trim();
  if (!trimmed) return null;

  if (item.type === 'image') {
    return {
      type: 'image',
      src: toDriveImageUrl(trimmed),
    };
  }

  if (isDirectVideoUrl(trimmed)) {
    return { type: 'video', src: trimmed };
  }

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    return {
      type: 'iframe',
      src: `https://drive.google.com/file/d/${driveId}/preview`,
    };
  }

  const youtubeId = extractYouTubeId(trimmed);
  if (youtubeId) {
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`,
    };
  }

  return null;
}
