'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getDestinationById, type TourPackage } from '@/lib/destinations-data'
import { InquiryModal } from '@/components/inquiry-modal'
import { ArrowLeft, Star, Clock, DollarSign, Users, MapPin, ChevronDown, Filter, X } from 'lucide-react'

const categoryLabels: Record<string, { label: string; color: string }> = {
  cultural: { label: 'Cultural', color: 'bg-blue-100 text-blue-700' },
  adventure: { label: 'Adventure', color: 'bg-orange-100 text-orange-700' },
  beach: { label: 'Beach & Relax', color: 'bg-cyan-100 text-cyan-700' },
  luxury: { label: 'Luxury', color: 'bg-amber-100 text-amber-700' },
  honeymoon: { label: 'Honeymoon', color: 'bg-pink-100 text-pink-700' },
  group: { label: 'Group/Family', color: 'bg-green-100 text-green-700' },
}

export default function PackagesPage() {
  const params = useParams()
  const slug = params.slug as string
  const destination = getDestinationById(slug)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'duration'>('price-low')
  const [showFilters, setShowFilters] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null)

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Destination Not Found</h1>
            <Link href="/destinations">
              <Button>Back to Destinations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let filtered = [...destination.packages]

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(pkg => selectedCategories.includes(pkg.category))
    }

    // Price filter
    filtered = filtered.filter(pkg => pkg.startingPrice >= priceRange[0] && pkg.startingPrice <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.startingPrice - b.startingPrice)
        break
      case 'price-high':
        filtered.sort((a, b) => b.startingPrice - a.startingPrice)
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 4) - (a.rating || 4))
        break
      case 'duration':
        filtered.sort((a, b) => {
          const aDays = parseInt(a.duration.split(' ')[0])
          const bDays = parseInt(b.duration.split(' ')[0])
          return aDays - bDays
        })
        break
    }

    return filtered
  }, [destination.packages, selectedCategories, priceRange, sortBy])

  const categories = Object.keys(categoryLabels)
  const maxPrice = Math.max(...destination.packages.map(p => p.startingPrice))

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleInquiry = (pkg: TourPackage) => {
    setSelectedPackage(pkg)
    setInquiryOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href={`/destinations/${slug}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to {destination.name}
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
              Tour Packages
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover {filteredPackages.length} curated packages in {destination.name}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4">Type</h4>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <span className="text-sm text-foreground">
                          {categoryLabels[category].label}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({destination.packages.filter(p => p.category === category).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Min: ${priceRange[0]}</label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (value <= priceRange[1]) {
                            setPriceRange([value, priceRange[1]])
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Max: ${priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (value >= priceRange[0]) {
                            setPriceRange([priceRange[0], value])
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Shortest Duration</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPackages.length} of {destination.packages.length} packages
                </p>
              </div>

              {/* Packages Grid */}
              {filteredPackages.length > 0 ? (
                <div className="space-y-6">
                  {filteredPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="grid md:grid-cols-[300px_1fr] gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-auto min-h-[200px] overflow-hidden">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className={`${categoryLabels[pkg.category].color}`}>
                              {categoryLabels[pkg.category].label}
                            </Badge>
                          </div>
                          {pkg.rating && (
                            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-1">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span className="text-sm font-semibold">{pkg.rating}/5</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-xl font-serif font-bold text-foreground mb-2">{pkg.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

                            {/* Quick Info */}
                            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-border">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{pkg.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-primary" />
                                <span>2-20 pax</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{destination.name}</span>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Highlights</p>
                              <div className="flex flex-wrap gap-2">
                                {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                                  <span key={idx} className="text-xs bg-muted rounded-full px-3 py-1 text-foreground">
                                    {highlight}
                                  </span>
                                ))}
                                {pkg.highlights.length > 3 && (
                                  <span className="text-xs text-primary font-medium">+{pkg.highlights.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-end justify-between pt-4 border-t border-border">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                              <p className="text-3xl font-bold text-primary">${pkg.startingPrice}</p>
                              <p className="text-xs text-muted-foreground">per person</p>
                            </div>
                            <div className="flex gap-3">
                              <Link href={`/destinations/${slug}/packages/${pkg.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                onClick={() => handleInquiry(pkg)}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                              >
                                Inquire
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">No packages match your filters</p>
                  <Button
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, maxPrice])
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Inquiry Modal */}
      {selectedPackage && (
        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          destinationName={destination.name}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.startingPrice}
        />
      )}
    </div>
  )
}
