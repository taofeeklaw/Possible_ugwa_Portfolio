import { motion } from 'motion/react';
import { WHY_ME_PROMISES } from '../data/portfolio';

export function WhyMeSection() {
  return (
    <section
      id="why-me"
      className="border-b border-[#27272A] bg-[#09090B] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#F59E0B]">03</span>
            <span aria-hidden="true">/</span>
            <span>Working Together</span>
          </div>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
            Why Work With Me?
          </h2>
        </div>

        {/* 2x2 Dark Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {WHY_ME_PROMISES.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#121216] p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center rounded-sm border border-[#27272A] bg-[#09090B] px-2.5 py-1 font-mono text-xs font-medium tabular-nums text-[#F59E0B]">
                  {item.number}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-[#27272A]"
                />
              </div>

              <p className="mt-8 font-display text-xl font-medium leading-snug text-[#FAFAFA] sm:text-2xl">
                &ldquo;{item.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
