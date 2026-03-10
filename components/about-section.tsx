import Image from "next/image";
import { Check, Award, Users, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Competitive B2B rates guaranteed",
  "Dedicated account managers",
  "Flexible payment terms",
  "Real-time booking system",
  "24/7 emergency hotline",
  "Local expertise in every destination",
];

const certifications = [
  { name: "PHILTOA", description: "Philippine Tour Operators" },
  { name: "ASTA", description: "American Society of Travel" },
  { name: "PATA", description: "Pacific Asia Travel Assoc." },
  { name: "IATA", description: "IATA Registered Agent" },
];

const offices = [
  { city: "Manila", country: "Philippines", role: "HQ" },
  { city: "Bali", country: "Indonesia", role: "Regional" },
  { city: "Tokyo", country: "Japan", role: "Regional" },
  { city: "Male", country: "Maldives", role: "Regional" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Image */}
              <div className="col-span-7 relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/team-meeting.jpg"
                  alt="PearlDMC Team"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Side Images */}
              <div className="col-span-5 flex flex-col gap-4">
                <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/bali.jpg"
                    alt="Bali"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/maldives.jpg"
                    alt="Maldives"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Images */}
              <div className="col-span-5 relative h-44 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/japan.jpg"
                  alt="Japan"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="col-span-7 relative h-44 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/south-africa.jpg"
                  alt="South Africa"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-card p-6 rounded-xl shadow-2xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <Star className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">
                    4.9/5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Partner Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-lg">
              <p className="font-serif text-2xl font-bold">18+</p>
              <p className="text-xs text-primary-foreground/80">Years Global</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              About PearlDMC
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Your Global DMC Partner Since 2007
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in Manila, PearlDMC has grown to become a leading
              destination management company operating across Asia, Indian
              Ocean, Africa & Caribbean. We combine deep local knowledge with
              international service standards.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of 100+ travel professionals across 10+ destinations is
              dedicated to delivering exceptional service to travel agents, tour
              operators, cruise lines, and MICE organizers worldwide.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Global Offices */}
            <div className="bg-muted rounded-xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Our Global Offices
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {offices.map((office) => (
                  <div key={office.city} className="text-center">
                    <p className="font-bold text-foreground">{office.city}</p>
                    <p className="text-xs text-muted-foreground">
                      {office.country}
                    </p>
                    <span className="text-[10px] text-primary font-medium">
                      {office.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-muted rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Accreditations & Memberships
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="text-center">
                    <p className="font-bold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Users className="mr-2 h-4 w-4" />
                Meet Our Team
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Globe className="mr-2 h-4 w-4" />
                Company Profile PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
