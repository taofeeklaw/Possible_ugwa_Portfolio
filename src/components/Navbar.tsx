import { useState } from 'react';
import { Menu, Play, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Why Me', href: '#why-me' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 font-display text-lg font-semibold tracking-tight text-[#FAFAFA] transition-colors duration-150 hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] rounded-sm"
        >
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#27272A] bg-[#121216] text-[#F59E0B]"
          >
            <Play className="h-3 w-3 fill-current" />
          </span>
          <span>Possible Ugwa</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1A1AA]"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#FAFAFA] hover:underline hover:decoration-[#F59E0B] hover:underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FBBF24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            Work With Me
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#27272A] bg-[#121216] text-[#FAFAFA] transition-colors duration-150 hover:border-[#3F3F46] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#27272A] bg-[#09090B] px-4 py-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-[#A1A1AA] transition-colors hover:bg-[#121216] hover:text-[#FAFAFA]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-md bg-[#F59E0B] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#FBBF24]"
            >
              Work With Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
