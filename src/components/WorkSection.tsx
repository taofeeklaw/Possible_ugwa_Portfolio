import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Film, Play } from 'lucide-react';
import {
  WORK_CATEGORIES,
  WORK_SAMPLES,
  WorkCategory,
  WorkSample,
} from '../data/portfolioData';
import { VideoLightboxModal } from './VideoLightboxModal';

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredSamples = useMemo(() => {
    if (activeCategory === 'All') return WORK_SAMPLES;
    return WORK_SAMPLES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedIndex = useMemo(
    () => filteredSamples.findIndex((item) => item.id === selectedSampleId),
    [filteredSamples, selectedSampleId]
  );

  const selectedSample: WorkSample | null =
    selectedIndex >= 0 ? filteredSamples[selectedIndex] : null;

  const handlePrev = () => {
    if (filteredSamples.length <= 1 || selectedIndex < 0) return;
    const prevIdx =
      (selectedIndex - 1 + filteredSamples.length) % filteredSamples.length;
    setSelectedSampleId(filteredSamples[prevIdx].id);
  };

  const handleNext = () => {
    if (filteredSamples.length <= 1 || selectedIndex < 0) return;
    const nextIdx = (selectedIndex + 1) % filteredSamples.length;
    setSelectedSampleId(filteredSamples[nextIdx].id);
  };

  return (
    <section
      id="work"
      className="border-b border-[#27272A] bg-[#09090B] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#27272A] pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
              <span className="font-mono tabular-nums text-[#F59E0B]">02</span>
              <span aria-hidden="true">/</span>
              <span>Selected Edits &amp; Slots</span>
            </div>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
              Work Samples
            </h2>
          </div>

          {/* Interactive Category Filter Controls */}
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
                  onClick={() => setActiveCategory(category)}
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

        {/* 6 Video Sample Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSamples.map((sample, index) => {
            const isVertical = sample.aspectRatio === '9:16';
            const hasImgError = Boolean(imageErrors[sample.id]);

            return (
              <motion.article
                key={sample.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#27272A] bg-[#121216] transition-colors duration-200 hover:border-[#3F3F46]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedSampleId(sample.id)}
                  aria-label={`Preview ${sample.title} (${sample.category}, ${sample.duration})`}
                  className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F59E0B]"
                >
                  {/* Studio Monitor Viewport Stage */}
                  <div className="relative flex h-72 w-full items-center justify-center overflow-hidden border-b border-[#27272A] bg-[#0B0B0E] p-4">
                    {/* Aspect-Ratio Accurate Frame (16:9 Horizontal vs 9:16 Vertical Reel) */}
                    <div
                      className={`relative overflow-hidden rounded-md border border-[#27272A] bg-[#121216] transition-transform duration-200 group-hover:scale-[1.02] ${
                        isVertical
                          ? 'h-full aspect-[9/16]'
                          : 'w-full aspect-video'
                      }`}
                    >
                      {!hasImgError ? (
                        <img
                          src={sample.thumbnail}
                          alt={sample.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setImageErrors((prev) => ({
                              ...prev,
                              [sample.id]: true,
                            }))
                          }
                          className="h-full w-full object-cover opacity-50 transition-opacity duration-200 group-hover:opacity-70"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16161B] to-[#09090B]">
                          <Film className="h-7 w-7 text-[#F59E0B]/70" />
                        </div>
                      )}

                      {/* Contrast Scrim */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/45 to-[#09090B]/30"
                      />

                      {/* Duration & Aspect Timecode Overlay */}
                      <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between text-[11px] font-mono tabular-nums">
                        <span className="rounded-xs bg-[#09090B]/85 px-1.5 py-0.5 text-[#A1A1AA]">
                          {sample.aspectRatio}
                        </span>
                        <span className="rounded-xs bg-[#09090B]/85 px-1.5 py-0.5 text-[#F59E0B]">
                          {sample.duration}
                        </span>
                      </div>

                      {/* Center Play Overlay + Placeholder Label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F59E0B]/60 bg-[#09090B]/85 text-[#F59E0B] transition-all duration-200 group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-[#09090B]">
                          <Play className="h-4 w-4 fill-current translate-x-0.5" />
                        </span>
                        <span className="mt-2.5 max-w-[190px] text-[11px] font-medium leading-snug text-[#FAFAFA]/90">
                          {sample.placeholderLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Metadata & Title (Zero Pill Sandwich) */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                        <span className="font-medium text-[#F59E0B]">
                          {sample.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{sample.formatLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {sample.duration}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-[#FAFAFA] transition-colors duration-150 group-hover:text-[#F59E0B]">
                        {sample.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#A1A1AA]">
                      {sample.notes}
                    </p>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <VideoLightboxModal
        sample={selectedSample}
        onClose={() => setSelectedSampleId(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasMultiple={filteredSamples.length > 1}
      />
    </section>
  );
}
