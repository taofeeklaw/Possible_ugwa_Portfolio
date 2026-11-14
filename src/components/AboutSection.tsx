import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ABOUT_PORTRAIT_URL,
  SITE_ASSETS,
  SPECIALTIES,
} from '../data/portfolio';
import { toDriveImageUrl } from '../utils/videoUrl';

export function AboutSection() {
  const [imageError, setImageError] = useState(false);
  const portraitSrc = imageError
    ? SITE_ASSETS.aboutEditorDefault
    : toDriveImageUrl(ABOUT_PORTRAIT_URL, SITE_ASSETS.aboutEditorDefault);

  return (
    <section
      id="about"
      className="border-b border-[#27272A] bg-[#09090B] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait / Editing Desk Visual */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-xl border border-[#27272A] bg-[#121216]">
              <div className="aspect-[4/5] w-full bg-[#121216]">
                <img
                  src={portraitSrc}
                  alt="Possible Ugwa working in a dark post-production editing suite"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (!imageError) setImageError(true);
                  }}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-xs">
                <span className="font-medium text-[#FAFAFA]">Possible Ugwa</span>
                <span className="font-mono tabular-nums text-[#F59E0B]">00:00:14:12</span>
              </div>
            </div>
          </motion.div>

          {/* Editorial Copy & Specialties */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
              <span className="font-mono tabular-nums text-[#F59E0B]">01</span>
              <span aria-hidden="true">/</span>
              <span>About the Editor</span>
            </div>

            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
              Who is Possible?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg sm:leading-relaxed">
              &ldquo;I&apos;m a video editor focused on one thing: editing videos that stop the scroll and keep viewers watching from the first second to the last. I don&apos;t just cut clips, I edit for retention and results. If you need a video editor, that&apos;s where I come in.&rdquo;
            </p>

            {/* 3 Clean Specialty Items */}
            <div className="mt-8 border-t border-[#27272A] pt-6">
              <p className="mb-4 text-xs font-medium text-[#A1A1AA]">
                Core Editing Specialties
              </p>
              <div className="flex flex-wrap gap-3">
                {SPECIALTIES.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#27272A] bg-[#121216] px-4 py-2 text-sm font-medium text-[#FAFAFA]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 bg-[#F59E0B]"
                    />
                    <span>{specialty}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
