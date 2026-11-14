import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { CONTACT_CHANNELS, ContactChannel } from '../data/portfolio';

function XLogoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 text-[#FAFAFA]"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 text-[#F59E0B]"
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.461 3.484 1.336 5l-1.398 5.109 5.234-1.375a9.93 9.93 0 0 0 4.797 1.234h.004c5.516 0 9.965-4.453 9.965-9.969S17.547 2 12.031 2zm5.805 14.125c-.246.691-1.434 1.324-1.977 1.406-.5.074-1.137.105-1.832-.117-.426-.137-.973-.316-1.672-.617-2.941-1.27-4.863-4.234-5.008-4.43-.148-.195-1.195-1.59-1.195-3.035s.754-2.156 1.023-2.449c.27-.293.586-.367.781-.367.195 0 .391.004.563.012.18.008.422-.07.66.504.246.59.832 2.031.906 2.18.074.148.121.32.023.516-.098.195-.148.32-.293.492-.148.172-.309.383-.441.516-.148.148-.301.309-.129.602.172.293.766 1.262 1.645 2.043 1.129 1.008 2.082 1.32 2.375 1.469.293.148.465.125.637-.074.172-.195.734-.855.93-1.148.195-.293.391-.246.66-.148.27.098 1.711.809 2.004.953.293.148.488.223.563.344.074.121.074.707-.172 1.398z" />
    </svg>
  );
}

function ChannelIcon({ id }: { id: ContactChannel['id'] }) {
  if (id === 'whatsapp') return <WhatsAppIcon />;
  if (id === 'x') return <XLogoIcon />;
  return <Mail className="h-4 w-4 text-[#FAFAFA]" aria-hidden="true" />;
}

export function ContactFooter() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const orderedChannels = useMemo(() => {
    const priority: Record<ContactChannel['id'], number> = {
      whatsapp: 0,
      x: 1,
      email: 2,
    };
    return [...CONTACT_CHANNELS].sort((a, b) => priority[a.id] - priority[b.id]);
  }, []);

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
        {/* 2-Column Studio Split Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Column: Heading & Availability */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
              <span className="font-mono tabular-nums text-[#F59E0B]">05</span>
              <span aria-hidden="true">/</span>
              <span>Ready to boost your retention?</span>
            </div>

            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl lg:text-5xl">
              Work with me today
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-[#A1A1AA]">
              Have raw footage ready to cut? Reach out directly through your preferred channel and let&apos;s turn your next upload into a scroll-stopper.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#27272A] bg-[#121216] px-3.5 py-1.5 text-xs font-medium text-[#FAFAFA]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#F59E0B]"
              />
              <span>Currently accepting editing projects</span>
            </div>
          </div>

          {/* Right Column: 3 Stacked Horizontal Action Rows */}
          <div className="flex flex-col gap-3.5 lg:col-span-7">
            {orderedChannels.map((channel) => {
              const isCopied = copiedId === channel.id;
              const isWhatsApp = channel.id === 'whatsapp';

              return (
                <div
                  key={channel.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-[#27272A] bg-[#121216] p-4 transition-colors duration-150 hover:border-amber-500/60 sm:flex-row sm:items-center sm:p-5"
                >
                  {/* Icon + Title & Monospace Handle */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#09090B]">
                      <ChannelIcon id={channel.id} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-semibold text-[#FAFAFA] sm:text-base">
                          {channel.label}
                        </span>
                        {isWhatsApp && (
                          <span className="rounded-sm border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#F59E0B]">
                            Fastest
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 truncate font-mono text-xs text-[#A1A1AA]">
                        {channel.handle}
                      </p>
                    </div>
                  </div>

                  {/* Separate Copy + Action Arrow Controls */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(channel.id, channel.copyValue)}
                      aria-label={`Copy ${channel.label} (${channel.copyValue})`}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-xs font-medium text-[#A1A1AA] transition-colors duration-150 hover:border-[#3F3F46] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                          <span className="text-[#F59E0B]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={channel.href}
                      target={channel.id === 'email' ? undefined : '_blank'}
                      rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={`${channel.actionLabel} (${channel.handle})`}
                      className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                        isWhatsApp
                          ? 'bg-[#F59E0B] text-[#09090B] hover:bg-[#FBBF24]'
                          : 'border border-[#27272A] bg-[#09090B] text-[#FAFAFA] hover:border-[#F59E0B] hover:text-[#F59E0B]'
                      }`}
                    >
                      <span>{isWhatsApp ? 'Chat' : channel.id === 'x' ? 'DM' : 'Email'}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
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
