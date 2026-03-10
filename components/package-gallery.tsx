'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GalleryImage {
  id: string
  url: string
  title: string
  description?: string
}

interface PackageGalleryProps {
  images: GalleryImage[]
  title: string
}

export function PackageGallery({ images, title }: PackageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Image
              src={selectedImage.url}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => {
                    if (selectedIndex !== null) {
                      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
                    }
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => {
                    if (selectedIndex !== null) {
                      setSelectedIndex((selectedIndex + 1) % images.length)
                    }
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white font-medium">{selectedImage.title}</p>
              {selectedImage.description && (
                <p className="text-gray-200 text-sm mt-2">{selectedImage.description}</p>
              )}
              <p className="text-gray-400 text-xs mt-2">
                {(selectedIndex ?? 0) + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
