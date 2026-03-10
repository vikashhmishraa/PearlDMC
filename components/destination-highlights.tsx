'use client';

import { Building2, Users, Clock, Utensils, MapPin, Camera } from 'lucide-react';

interface DestinationHighlightsProps {
  highlights: string[];
  bestTimeToVisit: string;
  region: string;
}

export function DestinationHighlights({
  highlights,
  bestTimeToVisit,
  region,
}: DestinationHighlightsProps) {
  const icons = [Building2, Users, Clock, Utensils, MapPin, Camera];

  return (
    <section className="py-16 bg-secondary/5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
          Why Choose {region}?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium">{highlight}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Best Time to Visit</h3>
          <p className="text-lg text-primary font-bold">{bestTimeToVisit}</p>
        </div>
      </div>
    </section>
  );
}
