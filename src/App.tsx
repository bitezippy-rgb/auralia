import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero3D from './components/Hero3D.tsx';
import StoryExperience from './components/StoryExperience.tsx';
import DynamicMenu from './components/DynamicMenu.tsx';
import BookingForm from './components/BookingForm.tsx';
import ContactMap from './components/ContactMap.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const handleScrollToBooking = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky, Transparent Navigation */}
      <Navbar onOpenBooking={handleScrollToBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. 3D Hero Section */}
        <Hero3D />

        {/* 2. Philosophy & Curated Dining Experiences */}
        <StoryExperience />

        {/* 3. Dynamic Filterable Tasting Menu */}
        <DynamicMenu />

        {/* 4. Interactive Glassmorphism Table Booking Section */}
        <BookingForm />

        {/* 5. Contact Coordinates & Embedded Interactive Map */}
        <ContactMap />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
