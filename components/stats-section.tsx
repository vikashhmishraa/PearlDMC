"use client"

import { useEffect, useState, useRef } from "react"
import { Globe, Users, MapPin, Calendar, Award, Headphones } from "lucide-react"

const stats = [
  { icon: Globe, value: 10, suffix: "+", label: "Destinations", description: "Across 4 continents" },
  { icon: Users, value: 1000, suffix: "+", label: "Partner Agencies", description: "Worldwide network" },
  { icon: Calendar, value: 18, suffix: "", label: "Years Experience", description: "Since 2007" },
  { icon: MapPin, value: 75, suffix: "K+", label: "Travelers Served", description: "Annually" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction Rate", description: "Partner rating" },
  { icon: Headphones, value: 24, suffix: "/7", label: "Support", description: "Always available" },
]

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-card rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-card rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary-foreground/70 text-sm uppercase tracking-[0.2em] mb-2">Why Partner With Us</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">Trusted by Travel Professionals Worldwide</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card/10 mb-4">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary-foreground mb-1">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                </p>
                <p className="text-primary-foreground font-medium text-sm">{stat.label}</p>
                <p className="text-primary-foreground/60 text-xs">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
