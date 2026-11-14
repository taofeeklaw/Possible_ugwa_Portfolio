import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_CHANNELS, ContactChannel } from '../data/portfolioData';

function ChannelIcon({ id }: { id: ContactChannel['id'] }) {
  if (id === 'email') {
    return <Mail className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />;
  }
  if (id === 'whatsapp') {
    return <MessageCircle className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />;
  }
  return (
    <span
      aria-hidden="true"
      className="font-mono text-sm font-bold leading-none text-[#F59E0B]"
    >
      X
    </span>
  );
}

export function ContactFooter() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <footer id="contact" className="bg-[#09090B] pt-16 pb-12 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Contact Header */}
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
            <span className="font-mono tabular-nums text-[#F59E0B]">04</span>
            <span aria-hidden="true">/</span>
            <span>Ready to boost your retention?</span>
          </div>

          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl lg:text-5xl">
            Work with me today
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            Have raw footage ready to cut? Reach out directly through your preferred channel and let&apos;s turn your next upload into a scroll-stopper.
          </p>
        </div>

        {/* Contact Action Cards: X DM, Email, WhatsApp (Single-Elevation Surface) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => {
            const isCopied = copiedId === channel.id;
            return (
              <div
                key={channel.id}
                className="flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#121216] p-6 transition-colors duration-150 hover:border-[#3F3F46]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <ChannelIcon id={channel.id} />
                    <span className="text-sm font-semibold text-[#FAFAFA]">
                      {channel.label}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(channel.id, channel.copyValue)}
                    aria-label={`Copy ${channel.label} (${channel.copyValue})`}
                    className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-[#A1A1AA] transition-colors hover:bg-[#1C1C22] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F59E0B]" />
                        <span className="text-[#F59E0B]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 truncate font-mono text-xs text-[#A1A1AA]">
                  {channel.handle}
                </p>

                <a
                  href={channel.href}
                  target={channel.id === 'email' ? undefined : '_blank'}
                  rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                  className="mt-6 inline-flex min-h-[44px] items-center justify-between rounded-md bg-[#F59E0B] px-4 py-2.5 text-xs font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#FBBF24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  <span>{channel.actionLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Subtle Footer Credit Slot */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#27272A] pt-8 text-xs text-[#A1A1AA] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-[#FAFAFA]">Possible Ugwa</span>
            <span aria-hidden="true">·</span>
            <span>Retention Video Editor</span>
            <span aria-hidden="true">·</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <a
            href="#top"
            className="whitespace-nowrap shrink-0 font-mono text-xs text-[#A1A1AA] transition-colors hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
