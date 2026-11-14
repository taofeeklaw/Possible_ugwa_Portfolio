import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  formatTimecode,
  getFallbackThumbnail,
  WorkItem,
} from '../data/portfolio';
import { resolveVideoPoster } from '../utils/videoUrl';

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  useEffect(() => {
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

  const isVertical = item.format === '9:16';
  const timecode = formatTimecode(item.duration);
  const posterSrc = resolveVideoPoster(
    item.videoUrl,
    item.thumbnailUrl,
    getFallbackThumbnail(item.category)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/92 p-3 backdrop-blur-md sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-[92vh] w-[95vw] max-w-3xl flex-col overflow-y-auto rounded-2xl border border-[#27272A] bg-[#121216] shadow-2xl"
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

        {/* Modal Body: Native Video Player + Compact Details */}
        <div className="flex flex-col p-3 sm:p-5">
          <div
            className={
              isVertical
                ? 'mx-auto aspect-[9/16] h-[58vh] max-h-[540px] w-auto overflow-hidden rounded-xl bg-black'
                : 'aspect-video w-full max-h-[65vh] overflow-hidden rounded-xl bg-black'
            }
          >
            {item.videoUrl ? (
              <video
                ref={videoRef}
                key={item.id}
                src={item.videoUrl}
                poster={posterSrc}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full bg-black object-contain"
              />
            ) : (
              <img
                src={posterSrc}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full bg-black object-contain"
              />
            )}
          </div>

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
