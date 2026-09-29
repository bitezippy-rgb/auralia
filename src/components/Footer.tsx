import React from 'react';
import { ArrowUp, Award, Utensils } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-white/10 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-white/5">
          
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-light tracking-[0.25em] text-white uppercase block">
              A U R E L I A
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An ongoing dialogue between kinetic spatial form and ephemeral taste. Michelin Three Stars, Relais & Châteaux, San Pellegrino World’s 50 Best Dining Institutions.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-amber-300/80">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Michelin Guide 2026 · Grand Award of Excellence Wine Spectator</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-xs">
            <div className="uppercase tracking-[0.2em] text-white font-medium">Navigation</div>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Hero 3D Canvas</a></li>
              <li><a href="#experience" className="hover:text-amber-400 transition-colors">Tasting Disciplines</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Seasonal Degustation</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Table Bookings</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Private Dining & Map</a></li>
            </ul>
          </div>

          {/* Col 3: Hours & Dress Code */}
          <div className="space-y-3 text-xs">
            <div className="uppercase tracking-[0.2em] text-white font-medium">Atmosphere & Code</div>
            <p className="text-stone-400 leading-relaxed">
              Attire is elegant & tailored. Jackets recommended for gentlemen. Athletic apparel is not permitted in the sanctuary.
            </p>
            <div className="pt-1 text-[11px] text-stone-500">
              Sommelier Inquiries: +1 (212) 555-0198
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Aurelia Gastronomy LLC. All culinary creations & 3D kinetic visuals reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Culinary Rights</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wider">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
