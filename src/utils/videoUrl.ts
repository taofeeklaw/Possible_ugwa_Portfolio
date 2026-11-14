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

/**
 * Converts a Google Drive image share link (used for About portrait) into an embeddable thumbnail URL.
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
 * Resolves video poster/thumbnail:
 * 1) Explicit item.thumbnailUrl if provided
 * 2) Automatic ImageKit video thumbnail (`${videoUrl}/ik-thumbnail.jpg`)
 * 3) Fallback studio image
 */
export function resolveVideoPoster(
  videoUrl: string,
  thumbnailUrl: string,
  fallbackThumbnail: string
): string {
  const cleanThumb = thumbnailUrl.trim();
  if (cleanThumb) return cleanThumb;

  const cleanVideo = videoUrl.trim();
  if (cleanVideo.includes('ik.imagekit.io')) {
    return `${cleanVideo.replace(/\/$/, '')}/ik-thumbnail.jpg`;
  }

  return fallbackThumbnail;
}
