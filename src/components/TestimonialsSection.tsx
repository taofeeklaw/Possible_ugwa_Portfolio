import { motion } from 'motion/react';
import { MessageCircle, Quote } from 'lucide-react';

interface ClientReview {
  id: string;
  quote: string;
  name: string;
  role: string;
}

interface DirectClientMessage {
  id: string;
  message: string;
  context?: string;
}

const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'review-johnson',
    quote:
      "When Possible sent the first edit, I showed it to my director and he was like, 'Who did this?' The pacing, the cuts, everything was perfect. She's also very fast, I will send brief at 10am and have the video by evening. I highly recommend her.",
    name: 'Johnson',
    role: 'Content Manager',
  },
  {
    id: 'review-amara',
    quote:
      "I was posting content but nothing was sticking. Possible didn't just edit my videos, she fixed them. My watch time went from 40% to 75% in two weeks. She knows what she's doing and worth every dollar.",
    name: 'Amara_vlogs',
    role: 'Creator',
  },
  {
    id: 'review-goodluck',
    quote:
      "Most editors just follow instructions. Possible actually asked questions about our target audience, what we wanted people to do after watching. The final videos performed way better than we expected. She's a strategist disguised as an editor.",
    name: 'Goodluck',
    role: 'Marketing Lead',
  },
];

const DIRECT_MESSAGES: DirectClientMessage[] = [
  {
    id: 'dm-1',
    message: 'This is so good. 🥳 Thank you so much. 🥰',
    context: '',
  },
  {
    id: 'dm-2',
    message:
      'I saw the files you sent. You did a very good job. I love love them.',
  },
  {
    id: 'dm-3',
    message: 'Thanks 🙏. I will hit you up for the next job.',
    context: '',
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="border-b border-[#27272A] bg-[#09090B] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#F59E0B]">04</span>
            <span aria-hidden="true">/</span>
            <span>Client Reviews</span>
          </div>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
            Results &amp; Client Feedback
          </h2>
        </div>

        {/* Responsive 3-Card Quote Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CLIENT_REVIEWS.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#121216] p-6 sm:p-7"
            >
              <div>
                <Quote
                  className="h-5 w-5 text-[#F59E0B]"
                  aria-hidden="true"
                />
                <blockquote className="mt-5 text-sm leading-relaxed text-[#FAFAFA]/90 sm:text-[15px]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <footer className="mt-6 flex items-center justify-between gap-3 border-t border-[#27272A] pt-4">
                <div>
                  <p className="font-display text-sm font-semibold text-[#FAFAFA]">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#A1A1AA]">{review.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Compact Direct Client Messages Strip */}
        <div className="mt-10 border-t border-[#27272A] pt-8">
          <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
            <MessageCircle
              className="h-3.5 w-3.5 text-[#F59E0B]"
              aria-hidden="true"
            />
            <h3 className="font-display text-sm font-semibold text-[#FAFAFA]">
              Direct Client Messages
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {DIRECT_MESSAGES.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#121216] p-5"
              >
                <p className="text-sm leading-relaxed text-[#FAFAFA]">
                  &ldquo;{item.message}&rdquo;
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#A1A1AA]">
                  <span className="text-[#F59E0B]">WhatsApp</span>
                  {item.context && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.context}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
