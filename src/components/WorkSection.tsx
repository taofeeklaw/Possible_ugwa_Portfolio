import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import {
  getFallbackThumbnail,
  WORK_CATEGORIES,
  WORK_ITEMS,
  WorkItem,
} from '../data/portfolio';
import { resolveVideoPoster } from '../utils/videoUrl';
import { VideoLightboxModal } from './VideoLightboxModal';

function getCardsPerView(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState<number>(() =>
    typeof window !== 'undefined' ? getCardsPerView(window.innerWidth) : 3
  );
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return WORK_ITEMS;
    return WORK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const maxStartIndex = Math.max(0, filteredItems.length - cardsPerView);

  useEffect(() => {
    setStartIndex((prev) => Math.min(prev, maxStartIndex));
  }, [maxStartIndex]);

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setStartIndex(0);
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || maxStartIndex === 0) return;
    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const selectedIndex = useMemo(
    () => filteredItems.findIndex((item) => item.id === selectedItemId),
    [filteredItems, selectedItemId]
  );

  const selectedItem: WorkItem | null =
    selectedIndex >= 0 ? filteredItems[selectedIndex] : null;

  const handleModalPrev = () => {
    if (filteredItems.length <= 1 || selectedIndex < 0) return;
    const prevIdx =
      (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItemId(filteredItems[prevIdx].id);
  };

  const handleModalNext = () => {
    if (filteredItems.length <= 1 || selectedIndex < 0) return;
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedItemId(filteredItems[nextIdx].id);
  };

  const totalStops = maxStartIndex + 1;

  return (
    <section
      id="work"
      className="border-b border-[#27272A] bg-[#09090B] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter Pills */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#27272A] pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
              <span className="font-mono tabular-nums text-[#F59E0B]">02</span>
              <span aria-hidden="true">/</span>
              <span>Selected Edits &amp; Reels</span>
            </div>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
              Work Samples
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter work samples by category"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#121216] p-1"
          >
            {WORK_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(category)}
                  className={`min-h-[38px] whitespace-nowrap shrink-0 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                    isActive
                      ? 'bg-[#F59E0B] text-[#09090B] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Toolbar: Counter + Prev/Next */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#FAFAFA]">
              {String(startIndex + 1).padStart(2, '0')}–
              {String(Math.min(startIndex + cardsPerView, filteredItems.length)).padStart(2, '0')}
            </span>
            <span>of</span>
            <span className="font-mono tabular-nums text-[#F59E0B]">
              {String(filteredItems.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline">· Swipe or use arrows</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous work reels"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#FAFAFA] transition-colors duration-150 hover:border-[#F59E0B] hover:text-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={startIndex >= maxStartIndex}
              aria-label="Next work reels"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#FAFAFA] transition-colors duration-150 hover:border-[#F59E0B] hover:text-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* One Responsive Swipeable Motion Carousel */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="touch-pan-y mt-6 mx-auto max-w-[300px] overflow-hidden sm:mx-0 sm:max-w-none"
        >
          <div className="sm:-mx-3">
            <motion.div
              animate={{ x: `-${(startIndex * 100) / cardsPerView}%` }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              {filteredItems.map((item) => {
                const isLandscape = item.format === '16:9';
                const mediaFitClass = isLandscape
                  ? 'h-full w-full bg-black object-contain'
                  : 'h-full w-full object-cover';
                const posterSrc = resolveVideoPoster(
                  item.videoUrl,
                  item.thumbnailUrl,
                  getFallbackThumbnail(item.category)
                );

                return (
                  <div
                    key={item.id}
                    className="w-full shrink-0 sm:w-1/2 sm:px-3 lg:w-1/3"
                  >
                    <article className="group overflow-hidden rounded-xl border border-[#27272A] bg-[#121216] transition-colors duration-200 hover:border-[#3F3F46]">
                      <button
                        type="button"
                        onClick={() => setSelectedItemId(item.id)}
                        aria-label={`Play ${item.title} (${item.category}, ${item.duration})`}
                        className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F59E0B]"
                      >
                        {/* Card Video Stage */}
                        <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                          {item.videoUrl ? (
                            <video
                              src={item.videoUrl}
                              poster={posterSrc}
                              preload="metadata"
                              muted
                              playsInline
                              controlsList="nodownload"
                              disablePictureInPicture
                              onContextMenu={(e) => e.preventDefault()}
                              className={`${mediaFitClass} transition-transform duration-300 group-hover:scale-[1.02]`}
                            />
                          ) : (
                            <img
                              src={posterSrc}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className={`${mediaFitClass} transition-transform duration-300 group-hover:scale-[1.02]`}
                            />
                          )}

                          {/* Measured Contrast Scrim */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/20 to-[#09090B]/40"
                          />

                          {/* Top Frame Aspect & Duration */}
                          <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between font-mono text-[11px] tabular-nums">
                            <span className="rounded-xs bg-[#09090B]/85 px-2 py-0.5 text-[#A1A1AA]">
                              {item.format}
                            </span>
                            <span className="rounded-xs bg-[#09090B]/85 px-2 py-0.5 text-[#F59E0B]">
                              {item.duration}
                            </span>
                          </div>

                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F59E0B]/70 bg-[#09090B]/80 text-[#F59E0B] backdrop-blur-xs transition-all duration-200 group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-[#09090B]">
                              <Play className="h-5 w-5 fill-current translate-x-0.5" />
                            </span>
                          </div>

                          {/* Bottom Title & Metadata */}
                          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                              <span className="font-semibold text-[#F59E0B]">
                                {item.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {item.duration}
                              </span>
                            </div>
                            <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-[#FAFAFA] transition-colors duration-150 group-hover:text-[#F59E0B]">
                              {item.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#A1A1AA]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </article>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Dot Indicators */}
        {totalStops > 1 && (
          <div
            role="tablist"
            aria-label="Carousel slide indicators"
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {Array.from({ length: totalStops }).map((_, idx) => {
              const isCurrent = idx === startIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setStartIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                    isCurrent
                      ? 'w-7 bg-[#F59E0B]'
                      : 'w-2.5 bg-[#27272A] hover:bg-[#52525B]'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      <VideoLightboxModal
        item={selectedItem}
        onClose={() => setSelectedItemId(null)}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
        hasMultiple={filteredItems.length > 1}
      />
    </section>
  );
}
