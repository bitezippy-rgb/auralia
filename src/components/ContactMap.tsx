import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ExternalLink,
  Instagram,
  Twitter,
  Facebook,
  Award,
  Send,
  Check
} from 'lucide-react';

export default function ContactMap() {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryText, setInquiryText] = useState('');

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryText('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 relative bg-[#08080a] border-t border-white/5">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
            <Navigation className="w-3.5 h-3.5" />
            <span>Sanctuary & Coordinates</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide text-balance">
            Find Aurelia
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Nestled on the iconic corridor of Manhattan, between modern architectural lines and the historic theater quarter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Information & Concierge Panel (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl glass-card border border-white/10 p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-[0.2em] font-medium">
                <Award className="w-4 h-4" />
                <span>Private Dining & Concierge</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Direct Inquiries & Access
              </h3>

              <div className="space-y-5 text-sm text-stone-300">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">745 7th Avenue, Suite 12</div>
                    <div className="text-stone-400 text-xs mt-0.5">Times Square Cultural Quarter, New York, NY 10019</div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <a href="tel:+12125550198" className="text-white font-medium hover:text-amber-400 transition-colors">
                      +1 (212) 555-0198
                    </a>
                    <div className="text-stone-400 text-xs mt-0.5">Sommelier & Maître d’ Desk (12:00 – 23:00 EST)</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <a href="mailto:concierge@aurelia-gastronomy.com" className="text-white font-medium hover:text-amber-400 transition-colors">
                      concierge@aurelia-gastronomy.com
                    </a>
                    <div className="text-stone-400 text-xs mt-0.5">Press, Private Buyouts & Sommelier Queries</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Tuesday — Sunday</div>
                    <div className="text-stone-400 text-xs mt-0.5">
                      Dinner Seating: 17:30 — 23:30<br />
                      Closed on Mondays for Botanical Foraging
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Concierge Message box */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">
                Quick Concierge Note / Dietary Query
              </span>
              <form onSubmit={handleInquiry} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask our Maître d' a question..."
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="flex-1 bg-stone-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                >
                  {inquirySent ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
              {inquirySent && (
                <p className="text-xs text-amber-300 font-light">
                  Message delivered to our front-of-house concierge team.
                </p>
              )}
            </div>

            {/* Social Channels */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs text-stone-400">
              <span>Follow the Cellar Journal</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-400 transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Embedded Google Map Iframe Container (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl glass-card border border-white/10 overflow-hidden relative min-h-[460px] flex flex-col">
            
            {/* Top Bar for Map */}
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-stone-950/60 backdrop-blur-md z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>40.7580° N, 73.9855° W · Manhattan, NY</span>
              </div>
              <a
                href="https://maps.google.com/?q=Times+Square+New+York"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Iframe */}
            <div className="relative flex-1 w-full h-full min-h-[400px]">
              <iframe
                title="Aurelia Restaurant Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573211513!2d-73.98785842347209!3d40.75797467138676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Floating Overlay Badge on Map */}
              <div className="absolute bottom-6 left-6 z-10 p-4 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-white/15 max-w-xs shadow-2xl pointer-events-none">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">Valet Parking Available</div>
                <div className="text-stone-300 text-xs mt-1">
                  Complimentary white-glove valet service on West 49th Street entrance.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
