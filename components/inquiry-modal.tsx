"use client"

import { useState } from "react"
import { X, Send, CheckCircle, Calendar, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  destinationName?: string
  packageName?: string
  packagePrice?: number
}

export function InquiryModal({ 
  isOpen, 
  onClose, 
  destinationName, 
  packageName,
  packagePrice 
}: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    destination: destinationName || "",
    packageSelected: packageName || "",
    travelDate: "",
    pax: "",
    roomType: "",
    requirements: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      destination: destinationName || "",
      packageSelected: packageName || "",
      travelDate: "",
      pax: "",
      roomType: "",
      requirements: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold">Send B2B Inquiry</h2>
              {packageName && (
                <p className="text-primary-foreground/80 text-sm mt-1">
                  {packageName} {packagePrice && `- From $${packagePrice.toLocaleString()}`}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                Inquiry Submitted Successfully!
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Thank you for your inquiry. Our team will review your request and respond with competitive B2B rates within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
                <Button onClick={() => setSubmitted(false)} className="bg-primary text-primary-foreground">
                  Send Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Info */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Company Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company / Agency Name *</Label>
                    <Input
                      id="companyName"
                      required
                      placeholder="Your travel agency"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person *</Label>
                    <Input
                      id="contactName"
                      required
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Travel Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      required
                      placeholder="e.g., Philippines, Maldives"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Package (if selected)</Label>
                    <Input
                      id="package"
                      placeholder="Package name"
                      value={formData.packageSelected}
                      onChange={(e) => setFormData({...formData, packageSelected: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelDate">Estimated Travel Date *</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pax">Number of Pax *</Label>
                    <Input
                      id="pax"
                      type="number"
                      required
                      min="1"
                      placeholder="e.g., 2"
                      value={formData.pax}
                      onChange={(e) => setFormData({...formData, pax: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Room Type & Requirements */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  Accommodation & Special Requests
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Room Type Preference</Label>
                    <Select 
                      value={formData.roomType} 
                      onValueChange={(value) => setFormData({...formData, roomType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="villa">Villa / Bungalow</SelectItem>
                        <SelectItem value="family">Family Room</SelectItem>
                        <SelectItem value="mixed">Mixed (Specify Below)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements / Notes</Label>
                    <Textarea
                      id="requirements"
                      rows={4}
                      placeholder="Include any special requests, dietary requirements, accessibility needs, or specific tour requests..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="sm:flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="sm:flex-[2] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Inquiry
                </Button>
              </div>

              {/* Note */}
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to receive B2B communications from PearlDMC. 
                We respond to all inquiries within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
