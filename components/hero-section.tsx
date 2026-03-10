"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Clock, Users, Globe } from "lucide-react"

const heroSlides = [
  {
    image: "/images/philippines-hero.jpg",
    destination: "Philippines",
    title: "7,641 Islands of Paradise",
    subtitle: "From Palawan to Boracay"
  },
  {
    image: "/images/bali.jpg",
    destination: "Bali, Indonesia",
    title: "Island of the Gods",
    subtitle: "Temples, Rice Terraces & Culture"
  },
  {
    image: "/images/japan.jpg",
    destination: "Japan",
    title: "Where Tradition Meets Tomorrow",
    subtitle: "Tokyo to Kyoto & Beyond"
  },
  {
    image: "/images/maldives.jpg",
    destination: "Maldives",
    title: "Paradise Perfected",
    subtitle: "Luxury Overwater Living"
  },
  {
    image: "/images/south-africa.jpg",
    destination: "South Africa",
    title: "A World in One Country",
    subtitle: "Safari, Wine & Culture"
  },
]

const trustBadges = [
  { icon: Globe, label: "10+ Destinations" },
  { icon: Shield, label: "Fully Licensed" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Users, label: "1000+ Partners" },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.destination}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.destination}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-card/20 rounded-full px-4 py-2 mb-8">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-card text-sm font-medium">Your Global B2B DMC Partner</span>
            </div>

            {/* Dynamic Destination Label */}
            <div className="mb-4">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">
                Now featuring: {heroSlides[currentSlide].destination}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-card leading-[1.1] mb-4 text-balance">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-card/80 text-xl mb-2">
              {heroSlides[currentSlide].subtitle}
            </p>

            <p className="text-card/70 text-lg leading-relaxed mb-8 max-w-xl">
              PearlDMC delivers comprehensive destination management services across Asia, Indian Ocean, Africa & Caribbean. Competitive B2B rates, reliable operations, and local expertise since 2007.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base h-14 px-8"
              >
                Request B2B Rates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-card/50 text-card bg-transparent hover:bg-card/10 text-base h-14 px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Company Video
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div key={badge.label} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="h-5 w-5 text-card" />
                    </div>
                    <span className="text-card/90 text-sm font-medium">{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.destination}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-card" : "w-1.5 bg-card/40"
              }`}
              aria-label={`Go to ${slide.destination}`}
            />
          ))}
        </div>

        {/* Current Slide Info */}
        <div className="absolute bottom-8 right-8 hidden md:flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.destination}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                index === currentSlide
                  ? "bg-accent text-accent-foreground"
                  : "bg-card/20 text-card hover:bg-card/30"
              }`}
            >
              {slide.destination}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
