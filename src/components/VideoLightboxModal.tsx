import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Film, Play, X } from 'lucide-react';
import { WorkSample } from '../data/portfolioData';

interface VideoLightboxModalProps {
  sample: WorkSample | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasMultiple: boolean;
}

function getEmbedUrl(rawUrl: string): { type: 'mp4' | 'iframe' | 'external'; src: string } | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(trimmed)) {
    return { type: 'mp4', src: trimmed };
  }

  // YouTube watch / share / shorts
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  if (ytMatch?.[1]) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
  }

  // Google Drive file link
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (driveMatch?.[1]) {
    return { type: 'iframe', src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  }

  return { type: 'external', src: trimmed };
}

export function VideoLightboxModal({
  sample,
  onClose,
  onPrev,
  onNext,
  hasMultiple,
}: VideoLightboxModalProps) {
  const [previewInput, setPreviewInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [thumbError, setThumbError] = useState(false);

  useEffect(() => {
    if (!sample) return;
    setPreviewInput(sample.videoUrl || '');
    setActiveUrl(sample.videoUrl || '');
    setThumbError(false);
  }, [sample]);

  useEffect(() => {
    if (!sample) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasMultiple) {
        onPrev();
      } else if (event.key === 'ArrowRight' && hasMultiple) {
        onNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sample, onClose, onPrev, onNext, hasMultiple]);

  if (!sample) return null;

  const resolvedMedia = getEmbedUrl(activeUrl);
  const isVertical = sample.aspectRatio === '9:16';

  const handleApplyPreviewUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveUrl(previewInput.trim());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/92 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#27272A] bg-[#121216] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#27272A] bg-[#0D0D10] px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3 text-xs text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#F59E0B]">{sample.timecode}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate font-medium text-[#FAFAFA]">{sample.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{sample.aspectRatio}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous video sample"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next video sample"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#FAFAFA] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Preview Stage */}
        <div className="flex flex-1 flex-col overflow-y-auto p-5 sm:p-6">
          <div className="flex w-full items-center justify-center rounded-lg border border-[#27272A] bg-[#09090B] p-4 sm:p-6">
            <div
              className={`relative overflow-hidden rounded-md border border-[#27272A] bg-[#121216] ${
                isVertical
                  ? 'aspect-[9/16] w-full max-w-[290px]'
                  : 'aspect-video w-full max-w-3xl'
              }`}
            >
              {resolvedMedia?.type === 'mp4' ? (
                <video
                  src={resolvedMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full bg-black object-contain"
                />
              ) : resolvedMedia?.type === 'iframe' ? (
                <iframe
                  src={resolvedMedia.src}
                  title={sample.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <>
                  {!thumbError ? (
                    <img
                      src={sample.thumbnail}
                      alt={`${sample.title} preview frame`}
                      referrerPolicy="no-referrer"
                      onError={() => setThumbError(true)}
                      className="h-full w-full object-cover opacity-55"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#121216] to-[#09090B]">
                      <Film className="h-10 w-10 text-[#F59E0B]" />
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/60 to-[#09090B]/40"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F59E0B]/50 bg-[#121216]/90 text-[#F59E0B]">
                      <Play className="h-6 w-6 fill-current translate-x-0.5" />
                    </div>

                    <p className="mt-4 max-w-xs text-sm font-semibold text-[#FAFAFA]">
                      {sample.placeholderLabel}
                    </p>
                    <p className="mt-1.5 font-mono text-xs tabular-nums text-[#A1A1AA]">
                      {sample.formatLabel} · {sample.aspectRatio} · {sample.duration}
                    </p>

                    {resolvedMedia?.type === 'external' && (
                      <a
                        href={resolvedMedia.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#F59E0B] px-3.5 py-2 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#FBBF24]"
                      >
                        <span>Open Video Link</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sample Details & Optional Quick Link Tester */}
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h3
                id="lightbox-title"
                className="font-display text-xl font-semibold text-[#FAFAFA]"
              >
                {sample.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">
                {sample.notes}
              </p>
            </div>

            <form
              onSubmit={handleApplyPreviewUrl}
              className="flex w-full max-w-sm items-center gap-2"
            >
              <label htmlFor="sample-url-test" className="sr-only">
                Test MP4, YouTube, or Drive Link
              </label>
              <input
                id="sample-url-test"
                type="url"
                value={previewInput}
                onChange={(e) => setPreviewInput(e.target.value)}
                placeholder="Paste MP4 / YouTube / Drive link..."
                className="min-h-[40px] flex-1 rounded-md border border-[#27272A] bg-[#09090B] px-3 py-2 text-xs text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#F59E0B] focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[40px] whitespace-nowrap shrink-0 rounded-md border border-[#27272A] bg-[#18181D] px-3.5 py-2 text-xs font-medium text-[#FAFAFA] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
              >
                Load Clip
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
