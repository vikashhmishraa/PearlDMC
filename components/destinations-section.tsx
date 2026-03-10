'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDestinations } from "@/hooks/use-destinations"

export function DestinationsSection() {
  const { destinations } = useDestinations()

  // Group destinations by region
  const regionMap: Record<string, { name: string; destinations: typeof destinations }> = {}

  destinations.forEach(dest => {
    const region = dest.region || 'other'
    const regionName = {
      'asia-pacific': 'Asia Pacific',
      'indian-ocean': 'Indian Ocean',
      'africa': 'Africa',
      'caribbean': 'Caribbean',
      'other': 'Other'
    }[region] || 'Other'

    if (!regionMap[region]) {
      regionMap[region] = { name: regionName, destinations: [] }
    }
    regionMap[region].destinations.push(dest)
  })

  // Get all destinations and mark featured ones, only include those with images
  const allDestinations = destinations
    .map(d => ({
      ...d,
      featured: d.featured !== undefined ? d.featured : false,
      // Use heroImage if available, fallback to image
      image: d.heroImage || d.image || '/images/default-destination.jpg'
    }))
    .filter(d => d.image && d.image !== '') // Only show destinations with images
  
  const featuredDestinations = allDestinations.filter(d => d.featured)
  const otherDestinations = allDestinations.filter(d => !d.featured)
  const regions = Object.values(regionMap)

  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              Our Destinations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Global Destinations, Local Expertise
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From tropical beaches to ancient cultures, we provide expert destination management across Asia, Indian Ocean, Africa & Caribbean with dedicated local teams.
            </p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-fit">
            View All Destinations
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Featured Destinations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredDestinations.map((destination) => (
            <Link
              key={destination.name}
              href="#"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={destination.featured}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                <Star className="h-3 w-3" />
                Featured
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-card/70 text-xs mb-2 uppercase tracking-wider">
                  <MapPin className="h-3 w-3" />
                  {destination.region}
                </div>
                <h3 className="font-serif text-xl font-bold text-card mb-1">
                  {destination.name}
                </h3>
                <p className="text-card/80 text-sm mb-3">{destination.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {destination.highlights.slice(0, 3).map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-0.5 bg-card/20 text-card/90 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {/* Other Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {otherDestinations.map((destination) => (
            <Link
              key={destination.name}
              href="#"
              className="group relative overflow-hidden rounded-xl aspect-[4/5] block"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-card/60 text-[10px] uppercase tracking-wider mb-1">{destination.region}</p>
                <h3 className="font-medium text-card text-sm leading-tight">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Regions Overview */}
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          <div className="grid md:grid-cols-4 gap-8">
            {regions.map((region) => (
              <div key={region.name}>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {region.name}
                </h3>
                <ul className="space-y-2">
                  {region.destinations.map((dest) => (
                    <li key={dest.name}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {dest.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              Coming soon: Vietnam, Thailand, Sri Lanka, Kenya, Morocco
            </p>
            <Button asChild>
              <Link href="/contact">
                Request New Destination
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
