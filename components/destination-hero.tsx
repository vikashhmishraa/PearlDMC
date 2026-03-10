'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin, Users, Calendar } from 'lucide-react';

interface DestinationHeroProps {
  destination: {
    name: string;
    image: string;
    description: string;
    overview: string;
  };
  onInquiry: () => void;
}

export function DestinationHero({ destination, onInquiry }: DestinationHeroProps) {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden">
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover"
        priority
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md max-w-3xl mx-auto">
            {destination.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={onInquiry}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
          >
            Inquire Now
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            View Packages
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </div>
  );
}
