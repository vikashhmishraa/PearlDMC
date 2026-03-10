"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDestinations } from "@/hooks/use-destinations"

const regions = [
  {
    name: "Asia Pacific",
    destinations: [
      { label: "Philippines", href: "/destinations/philippines" },
      { label: "Bali, Indonesia", href: "/destinations/bali" },
      { label: "Japan", href: "/destinations/japan" },
      { label: "South Korea", href: "/destinations/south-korea" },
    ],
  },
  {
    name: "Indian Ocean",
    destinations: [
      { label: "Maldives", href: "/destinations/maldives" },
      { label: "Mauritius", href: "/destinations/mauritius" },
      { label: "Seychelles", href: "/destinations/seychelles" },
    ],
  },
  {
    name: "Africa",
    destinations: [
      { label: "South Africa", href: "/destinations/south-africa" },
      { label: "Zanzibar, Tanzania", href: "/destinations/zanzibar" },
    ],
  },
  {
    name: "Caribbean",
    destinations: [
      { label: "Jamaica", href: "/destinations/jamaica" },
    ],
  },
]

const services = [
  { label: "FIT & Tailor-Made Tours", href: "/services/fit-tours" },
  { label: "Group Series", href: "/services/group-series" },
  { label: "MICE Solutions", href: "/services/mice" },
  { label: "Cruise Shore Excursions", href: "/services/cruise" },
  { label: "Luxury & Honeymoon", href: "/services/luxury" },
  { label: "Airport Services", href: "/services/airport" },
]

export function Header() {
  const { destinations } = useDestinations()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Group destinations by region
  const regionMap: Record<string, { name: string; destinations: { label: string; href: string }[] }> = {}

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
    regionMap[region].destinations.push({
      label: dest.name,
      href: `/destinations/${dest.id}`
    })
  })

  const regions = Object.values(regionMap)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:partners@pearldmc.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              partners@pearldmc.com
            </a>
            <a href="tel:+63289123456" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              +63 2 8912 3456
            </a>
          </div>
          <div className="flex items-center gap-4 text-primary-foreground/80">
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Global B2B DMC Network
            </span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
            <span>10+ Destinations</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card shadow-lg" : "bg-card/95 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo/pearldmc-logo.png"
                alt="PearlDMC Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground tracking-tight">PearlDMC</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Global Destination Experts</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              
              {/* Destinations Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("destinations")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Destinations
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "destinations" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "destinations" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-card border border-border rounded-xl shadow-2xl py-6 mt-1">
                    <div className="grid grid-cols-4 gap-6 px-6">
                      {regions.map((region) => (
                        <div key={region.name}>
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{region.name}</p>
                          <ul className="space-y-2">
                            {region.destinations.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="text-sm text-foreground hover:text-primary transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-border mx-6">
                      <Link href="/destinations" className="text-sm text-primary hover:underline">
                        View All Destinations
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 w-56 bg-card border border-border rounded-lg shadow-xl py-2 mt-1">
                    {services.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="#about" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="#contact" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Agent Login
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get B2B Rates
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border max-h-[80vh] overflow-y-auto">
              <nav className="flex flex-col gap-1">
                <Link href="/" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg">
                  Home
                </Link>
                
                {/* Mobile Destinations */}
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-foreground mb-3">Destinations</p>
                  <div className="space-y-4 pl-2">
                    {regions.map((region) => (
                      <div key={region.name}>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{region.name}</p>
                        {region.destinations.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-1.5 text-sm text-foreground hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="#services" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg">
                  Services
                </Link>
                <Link href="#about" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg">
                  About Us
                </Link>
                <Link href="#contact" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg">
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Button variant="outline" className="w-full border-primary text-primary">
                    Agent Login
                  </Button>
                  <Button className="w-full bg-primary text-primary-foreground">
                    Get B2B Rates
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
