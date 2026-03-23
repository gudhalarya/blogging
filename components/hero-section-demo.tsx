'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
        logo={{
          url: "https://images.unsplash.com/photo-1611532736000-07ac7e49fe7e?w=100&h=100&fit=crop&q=80",
          alt: "company Logo",
          text: "Your Company"
        }}
        slogan="ELEVATE YOUR PERSPECTIVE"
        title={
          <>
            Each Peak <br />
            <span className="text-primary">Teaches Something</span>
          </>
        }
        subtitle="Discover breathtaking landscapes and challenge yourself with our guided mountain expeditions. Join a community of adventurers."
        callToAction={{
          text: "JOIN US TO EXPLORE",
          href: "#explore",
        }}
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80"
        contactInfo={{
          website: "yourwebsite.com",
          phone: "+1 (555) 123-4567",
          address: "20 Adventure Dr, Mountain View, CA"
        }}
      />
    </div>
  );
}
