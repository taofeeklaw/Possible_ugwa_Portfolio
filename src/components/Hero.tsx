import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { SITE_ASSETS } from '../data/portfolioData';

export function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="top"
      className="relative border-b border-[#27272A] bg-[#09090B] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            {/* Availability Badge (Clean Rectilinear Studio Label, Zero Pill) */}
            <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-wider text-[#F59E0B]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-[#F59E0B]"
              />
              <span className="uppercase">Available for editing projects</span>
              <span aria-hidden="true" className="text-[#52525B]">/</span>
              <span className="font-mono tabular-nums text-[#A1A1AA]">00:00:01</span>
            </div>

            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-[#FAFAFA] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
              Meet Possible Ugwa
              <span className="mt-2 block text-[#A1A1AA] font-semibold">
                Video Editor
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              &ldquo;I edit videos that stop the scroll and keep viewers watching from the first second to the last.&rdquo;
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-md bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FBBF24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <span>Work with me today</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#work"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#27272A] bg-[#121216] px-6 py-3 text-sm font-medium text-[#FAFAFA] transition-all duration-150 hover:border-[#3F3F46] hover:bg-[#18181D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <Play className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                <span>Watch Work Samples</span>
              </a>
            </div>
          </motion.div>

          {/* Right Editing Suite Visual Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-[#27272A] bg-[#121216]">
              {/* Top Monitor Frame Bar */}
              <div className="flex items-center justify-between border-b border-[#27272A] bg-[#0D0D10] px-4 py-2.5 text-xs text-[#A1A1AA]">
                <span className="font-mono tabular-nums text-[#FAFAFA]">
                  SEQ_01 · RETENTION_CUT
                </span>
                <span className="font-mono tabular-nums text-[#F59E0B]">
                  16:9 · 24FPS
                </span>
              </div>

              {/* Studio Suite Still */}
              <div className="relative aspect-video w-full flex-1 bg-[#09090B] lg:aspect-auto lg:min-h-[320px]">
                {!imageError ? (
                  <img
                    src={SITE_ASSETS.heroSuite}
                    alt="Dark cinema editing desk with color-grading reference monitor and warm tungsten lighting"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#121216] via-[#09090B] to-[#18181D] p-8">
                    <div className="text-center">
                      <Play className="mx-auto h-10 w-10 text-[#F59E0B]" />
                      <p className="mt-3 text-sm text-[#A1A1AA]">Post-Production Suite</p>
                    </div>
                  </div>
                )}

                {/* Measured Gradient Scrim + Timecode Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/85 via-transparent to-transparent"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                  <span className="text-xs font-medium text-[#FAFAFA]">
                    Cut for Retention · First Second to Last
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[#F59E0B]">
                    TC 00:00:01:00
                  </span>
                </div>
              </div>

              {/* Subtle Timeline Ruler Track */}
              <div
                aria-hidden="true"
                className="flex items-center gap-1 border-t border-[#27272A] bg-[#0D0D10] px-4 py-2"
              >
                <span className="h-1.5 w-16 rounded-xs bg-[#F59E0B]" />
                <span className="h-1.5 w-28 rounded-xs bg-[#27272A]" />
                <span className="h-1.5 w-20 rounded-xs bg-[#3F3F46]" />
                <span className="h-1.5 flex-1 rounded-xs bg-[#1C1C22]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
