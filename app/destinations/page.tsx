"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight, Globe, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InquiryModal } from "@/components/inquiry-modal"
import { useDestinations } from "@/hooks/use-destinations"
import { getAllRegions } from "@/lib/destinations-data"
import type { Destination } from "@/lib/destinations-data"

export default function DestinationsPage() {
  const { destinations, loading } = useDestinations()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string>("")

  const regions = getAllRegions()
  
  const filteredDestinations = selectedRegion 
    ? destinations.filter(d => d.region === selectedRegion)
    : destinations

  const handleInquiry = (destName: string) => {
    setSelectedDestination(destName)
    setInquiryOpen(true)
  }

  const regionLabels: Record<string, string> = {
    "asia-pacific": "Asia Pacific",
    "indian-ocean": "Indian Ocean",
    "africa": "Africa",
    "caribbean": "Caribbean"
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/philippines-hero.jpg"
            alt="Global Destinations"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="bg-accent text-accent-foreground mb-4">
            <Globe className="h-3 w-3 mr-1" />
            Global DMC Network
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 text-balance">
            Our Destinations
          </h1>
          <p className="text-background/90 text-lg md:text-xl max-w-2xl mx-auto">
            Explore 10+ handpicked destinations across Asia, Indian Ocean, Africa & Caribbean. 
            Premium B2B rates and dedicated local support.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[80px] z-30 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by region:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedRegion === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(null)}
                className={selectedRegion === null ? "bg-primary text-primary-foreground" : ""}
              >
                All Destinations ({destinations.length})
              </Button>
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region.id)}
                  className={selectedRegion === region.id ? "bg-primary text-primary-foreground" : ""}
                >
                  {region.name} ({region.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Region Header if filtered */}
          {selectedRegion && (
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {regionLabels[selectedRegion]}
              </h2>
              <p className="text-muted-foreground mt-2">
                {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}

          <div className="grid gap-8">
            {filteredDestinations.map((destination: Destination) => (
              <div 
                key={destination.id}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="grid md:grid-cols-[400px_1fr] lg:grid-cols-[500px_1fr]">
                  {/* Image */}
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <Image
                      src={destination.heroImage}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-foreground/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 md:bottom-auto md:top-4">
                      <Badge className="bg-background/90 text-foreground">
                        {regionLabels[destination.region]}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
                            {destination.name}
                          </h3>
                          <p className="text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {destination.country}
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {destination.packages.length} Packages
                        </Badge>
                      </div>

                      <p className="text-primary font-medium mb-3">{destination.tagline}</p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {destination.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.slice(0, 4).map((highlight) => (
                          <span 
                            key={highlight}
                            className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 4 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                            +{destination.highlights.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Best Time:</span>
                          <p className="text-foreground font-medium">{destination.bestTimeToVisit}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Starting from:</span>
                          <p className="text-foreground font-medium">
                            ${Math.min(...destination.packages.map(p => p.startingPrice)).toLocaleString()} USD
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                      <Link href={`/destinations/${destination.id}`} className="flex-1">
                        <Button variant="outline" className="w-full group">
                          View Packages
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleInquiry(destination.name)}
                      >
                        Send Inquiry
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Don't See Your Destination?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            We're constantly expanding our network. Contact us for destinations not listed here, 
            including Vietnam, Thailand, Sri Lanka, Kenya, Dubai, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={() => {
                setSelectedDestination("")
                setInquiryOpen(true)
              }}
            >
              Request Custom Destination
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Download Destination Guide
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <InquiryModal 
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        destinationName={selectedDestination}
      />
    </main>
  )
}
