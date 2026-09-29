import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Tasting Menu', href: '#menu' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Reserve', href: '#reservation' },
    { name: 'Location', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Zone 1: Single Wordmark Brand */}
        <a
          href="#hero"
          className="font-serif text-2xl md:text-3xl font-light tracking-[0.25em] text-white hover:text-amber-300 transition-colors uppercase"
        >
          A U R E L I A
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-stone-300 hover:text-amber-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Phone Indicator */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+12125550198"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span className="tabular-nums">+1 (212) 555-0198</span>
          </a>

          <a
            href="#reservation"
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] whitespace-nowrap active:scale-95"
          >
            Book a Table
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c10]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest text-stone-300 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-amber-400 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#reservation"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full text-center py-3 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs uppercase tracking-wider shadow-lg"
            >
              Book a Table
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>+1 (212) 555-0198</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
