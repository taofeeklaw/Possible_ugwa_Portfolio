import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { HERO_VIDEO_ITEM } from '../data/portfolio';
import { resolveWorkMedia } from '../utils/videoUrl';

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroMedia = resolveWorkMedia(HERO_VIDEO_ITEM);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  return (
    <section
      id="top"
      className="relative border-b border-[#27272A] bg-[#09090B] pt-24 pb-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            {/* Availability Label */}
            <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-wider text-[#F59E0B]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-[#F59E0B]"
              />
              <span className="uppercase">Available for editing projects</span>
              <span aria-hidden="true" className="text-[#52525B]">/</span>
              <span className="font-mono tabular-nums text-[#A1A1AA]">00:00:01</span>
            </div>

            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-[#FAFAFA] sm:text-5xl lg:text-6xl lg:leading-[1.06]">
              Meet Possible Ugwa
              <span className="mt-2 block font-semibold text-[#A1A1AA]">
                Video Editor
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              &ldquo;I edit videos that stop the scroll and keep viewers watching from the first second to the last.&rdquo;
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* Right Hero Video Showcase (work-01 16:9) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#27272A] bg-black shadow-2xl">
              {heroMedia?.type === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={heroMedia.src}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Unmute showcase video' : 'Mute showcase video'}
                    className="absolute right-3 bottom-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[#27272A] bg-[#09090B]/85 px-3 py-1.5 text-xs font-medium text-[#FAFAFA] backdrop-blur-sm transition-colors duration-150 hover:border-[#F59E0B] hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        <span>Mute</span>
                      </>
                    )}
                  </button>
                </>
              ) : heroMedia?.type === 'iframe' ? (
                <>
                  <iframe
                    src={heroMedia.src}
                    title={HERO_VIDEO_ITEM.title}
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-3 right-3 z-10 flex min-h-[48px] min-w-[52px] select-none items-center gap-2 rounded-lg border border-[#27272A] bg-[#121216] px-3.5 py-2 text-xs font-medium text-[#FAFAFA] shadow-lg"
                  >
                    <span className="h-1.5 w-1.5 bg-[#F59E0B]" />
                    <span>Possible Ugwa</span>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
