import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import {
  formatTimecode,
  getFallbackThumbnail,
  WorkItem,
} from '../data/portfolio';
import { resolveWorkMedia, resolveWorkThumbnail } from '../utils/videoUrl';

interface VideoLightboxModalProps {
  item: WorkItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasMultiple: boolean;
}

export function VideoLightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasMultiple,
}: VideoLightboxModalProps) {
  const [thumbError, setThumbError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  useEffect(() => {
    setThumbError(false);
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
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
  }, [item, onPrev, onNext, hasMultiple]);

  if (!item) return null;

  const resolvedMedia = resolveWorkMedia(item);
  const fallbackThumb = getFallbackThumbnail(item.category);
  const thumbnailSrc = thumbError
    ? fallbackThumb
    : resolveWorkThumbnail(item, fallbackThumb);
  const timecode = formatTimecode(item.duration);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/92 p-3 backdrop-blur-md sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-[92vh] w-[95vw] max-w-4xl flex-col overflow-y-auto rounded-2xl border border-[#27272A] bg-[#121216] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#27272A] bg-[#0D0D10] p-3 sm:px-5 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-2 text-xs text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#F59E0B]">{timecode}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate font-medium text-[#FAFAFA]">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{item.format}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous work sample"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next work sample"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close preview modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#FAFAFA] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Full-Width Player + Compact Details */}
        <div className="flex flex-col p-3 sm:p-5">
          {resolvedMedia?.type === 'iframe' ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[68vh] overflow-hidden rounded-xl bg-black">
              <iframe
                src={resolvedMedia.src}
                title={item.title}
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
              <div
                aria-hidden="true"
                className="absolute top-2.5 right-2.5 z-10 flex min-h-[48px] min-w-[52px] select-none items-center gap-2 rounded-lg border border-[#27272A] bg-[#121216] px-3.5 py-2 text-xs font-medium text-[#FAFAFA] shadow-lg"
              >
                <span className="h-1.5 w-1.5 bg-[#F59E0B]" />
                <span>Possible Ugwa</span>
              </div>
            </div>
          ) : resolvedMedia?.type === 'video' ? (
            <div className="w-full max-h-[65vh] overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                src={resolvedMedia.src}
                controls
                autoPlay
                playsInline
                className="h-full max-h-[65vh] w-full bg-black object-contain"
              />
            </div>
          ) : resolvedMedia?.type === 'image' ? (
            <div className="w-full aspect-[4/3] sm:aspect-video max-h-[65vh] overflow-hidden rounded-xl bg-black">
              <img
                src={resolvedMedia.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full bg-black object-contain"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[65vh] overflow-hidden rounded-xl bg-black">
              <img
                src={thumbnailSrc}
                alt={`${item.title} preview frame`}
                referrerPolicy="no-referrer"
                onError={() => {
                  if (!thumbError) setThumbError(true);
                }}
                className="h-full w-full object-cover opacity-55"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/55 to-[#09090B]/40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F59E0B]/50 bg-[#121216]/90 text-[#F59E0B]">
                  <Play className="h-5 w-5 fill-current translate-x-0.5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#FAFAFA]">
                  Sample Reel Preview
                </p>
              </div>
            </div>
          )}

          {/* Title & Description Below Player */}
          <div className="shrink-0 pt-3 sm:pt-4">
            <h3
              id="lightbox-title"
              className="font-display text-base font-semibold text-[#FAFAFA] sm:text-lg"
            >
              {item.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA] sm:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
