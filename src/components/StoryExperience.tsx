import React from 'react';
import { motion } from 'motion/react';
import { Wine, Flame, Sparkles, Clock, Compass } from 'lucide-react';

export default function StoryExperience() {
  const experiences = [
    {
      title: 'The Grand 12-Course Tasting',
      tagline: 'A seasonal sonic and gastronomic voyage across terrestrial & oceanic biomes',
      duration: '3.5 Hours',
      pairing: 'Grand Cru or Non-Alcoholic Botanical Extraction',
      price: '$385 / guest',
      icon: Sparkles,
      gradient: 'from-amber-500/10 via-amber-950/20 to-transparent',
      border: 'group-hover:border-amber-500/40',
    },
    {
      title: "The Chef's Crucible Counter",
      tagline: 'Ten seats encircling open charcoal hearths and precision cryogenic plating',
      duration: '3.0 Hours',
      pairing: 'Rare Library Cellar Pairings & Micro-Distillations',
      price: '$450 / guest',
      icon: Flame,
      gradient: 'from-orange-500/10 via-stone-900/40 to-transparent',
      border: 'group-hover:border-orange-500/40',
    },
    {
      title: 'The Vaulted Cellar Salon',
      tagline: 'Private architectural dining chamber for intimate celebrations and salons',
      duration: 'Custom Itinerary',
      pairing: 'Sommelier Curated Bespoke Horizontal Tastings',
      price: 'Custom Reserve',
      icon: Wine,
      gradient: 'from-amber-600/10 via-zinc-900/40 to-transparent',
      border: 'group-hover:border-amber-400/40',
    },
  ];

  return (
    <section id="experience" className="py-28 relative bg-[#09090c] border-t border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Gastronomic Disciplines</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide text-balance">
            The Geometry of Taste
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At Aurelia, dining transcends sustenance. We orchestrate kinetic sensory journeys combining rare biodynamic harvests, ancestral fire craft, and precision culinary physics.
          </p>
        </div>

        {/* 3 Experience Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group relative rounded-2xl glass-card p-8 transition-all duration-300 ${exp.border} flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal tracking-wide group-hover:text-amber-200 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-stone-400 text-sm leading-relaxed">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/5 text-xs text-stone-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="w-3.5 h-3.5 text-amber-500/80" />
                      <span className="line-clamp-1">{exp.pairing}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-4 flex items-center justify-between border-t border-white/10">
                  <span className="text-sm font-semibold text-white font-mono tracking-tight tabular-nums">
                    {exp.price}
                  </span>
                  <a
                    href="#reservation"
                    className="text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Reserve Seat</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Strip */}
        <div id="philosophy" className="mt-20 rounded-2xl glass-card p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">Culinary Integrity</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Zero Waste & 100% Regenerative Foraging
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Every botanical element is sourced within 120 nautical miles of the Hudson Valley and Long Island Sound. Fermented in our subterranean koji laboratory over 18 lunar cycles.
            </p>
          </div>
          <div className="flex flex-row md:flex-col sm:flex-row gap-6 shrink-0 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 min-w-[130px]">
              <div className="font-serif text-3xl font-light text-amber-300 tabular-nums">38</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">Local Micro-Farms</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 min-w-[130px]">
              <div className="font-serif text-3xl font-light text-amber-300 tabular-nums">1,400+</div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">Cellar Selections</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
