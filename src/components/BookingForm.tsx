import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Wine,
  CalendarCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingData } from '../types/index.ts';

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now default
    time: '19:30',
    experience: 'tasting-menu',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState<{
    code: string;
    data: BookingData;
  } | null>(null);

  const timeSlots = [
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const experienceLabels: Record<string, string> = {
    'tasting-menu': '12-Course Grand Tasting ($385)',
    'chef-counter': "Chef's Crucible Counter ($450)",
    'main-dining': 'À La Carte Main Sanctuary ($220 min)',
    'private-salon': 'Private Cellar Salon ($2,500 min)',
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full legal name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid contact telephone.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date.';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Reservation date must be today or in the future.';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a dining seating time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate backend network latency
    setTimeout(() => {
      setIsSubmitting(false);
      const reservationCode = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setReservationConfirmed({
        code: reservationCode,
        data: { ...formData },
      });

      // Celebration effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#ffffff', '#d97706'],
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1200);
  };

  const resetForm = () => {
    setReservationConfirmed(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: 2,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      time: '19:30',
      experience: 'tasting-menu',
      notes: '',
    });
    setErrors({});
  };

  return (
    <section id="reservation" className="py-28 relative bg-[#09090c] border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide text-balance">
            Reserve Your Gastronomic Journey
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Seating is intimate to preserve theatrical intimacy and culinary timing. Bookings open 60 days in advance.
          </p>
        </div>

        {/* Glassmorphic Reservation Container */}
        <div className="rounded-3xl glass-card border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!reservationConfirmed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Experience Selector */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium">
                    1. Select Dining Atmosphere
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { id: 'tasting-menu', title: '12-Course Tasting', subtitle: '$385 / person' },
                      { id: 'chef-counter', title: "Chef's Crucible", subtitle: '$450 / person' },
                      { id: 'main-dining', title: 'Main Sanctuary', subtitle: 'À la Carte' },
                      { id: 'private-salon', title: 'Private Cellar', subtitle: '6-14 Guests' },
                    ].map((exp) => (
                      <button
                        type="button"
                        key={exp.id}
                        onClick={() => setFormData({ ...formData, experience: exp.id as any })}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                          formData.experience === exp.id
                            ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                            : 'bg-white/5 border-white/5 text-stone-400 hover:text-stone-200 hover:border-white/15'
                        }`}
                      >
                        <div className="text-sm font-medium text-white">{exp.title}</div>
                        <div className="text-xs text-amber-400/80 mt-1">{exp.subtitle}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date, Time, and Guest Count */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-300 font-medium">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Party Size</span>
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <option key={num} value={num} className="bg-[#14141c] text-white">
                          {num} {num === 1 ? 'Guest (Solo Tasting)' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-300 font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    />
                    {errors.date && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Seating Time */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-300 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Seating Time</span>
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#14141c] text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium">
                    2. Primary Guest Information
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>Full Name</span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Julian Montgomery"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#14141c] border rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-white/10 focus:border-amber-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Email Confirmation</span>
                      </div>
                      <input
                        type="email"
                        placeholder="julian@luxury.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#14141c] border rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-white/10 focus:border-amber-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Telephone</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="+1 (212) 555-0149"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-[#14141c] border rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-white/10 focus:border-amber-400'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dietary & Special Notes */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium">
                    Dietary Restrictions, Allergies, or Celebration Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Anniversary celebration, pescatarian preference, shellfish allergy..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                {/* Policies & Submission */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Free cancellation up to 48 hours prior to reservation time.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                        Securing Table...
                      </span>
                    ) : (
                      'Confirm Table Reservation'
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 text-center max-w-xl mx-auto space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
                    Table Confirmed
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                    We Await Your Presence, {reservationConfirmed.data.name}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    A formal confirmation invitation and sensory tasting preview has been dispatched to{' '}
                    <span className="text-white font-medium">{reservationConfirmed.data.email}</span>.
                  </p>
                </div>

                {/* Booking Recap Details */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-stone-400">Reservation Reference</span>
                    <span className="font-mono text-amber-400 font-bold text-sm">
                      {reservationConfirmed.code}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Atmosphere</span>
                    <span className="text-white font-medium">
                      {experienceLabels[reservationConfirmed.data.experience]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Party Size</span>
                    <span className="text-white font-medium">
                      {reservationConfirmed.data.guests} Guests
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Date & Seating</span>
                    <span className="text-white font-medium tabular-nums">
                      {reservationConfirmed.data.date} at {reservationConfirmed.data.time}
                    </span>
                  </div>
                  {reservationConfirmed.data.notes && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-stone-400">Noted Preferences:</span>
                      <p className="text-stone-300 mt-1 italic">
                        "{reservationConfirmed.data.notes}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Reserve Another Table
                  </button>
                  <a
                    href="#menu"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Review Menu Offerings
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
