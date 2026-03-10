import { Compass, Building2, Ship, Plane, Heart, Users, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Compass,
    title: "FIT & Tailor-Made Tours",
    description: "Customized itineraries for individual travelers with 24/7 support across all our global destinations.",
    features: ["Custom Itineraries", "Local Guides", "Flexible Booking"],
  },
  {
    icon: Users,
    title: "Group Series",
    description: "Scheduled departures and fixed itineraries with guaranteed departures and competitive group rates.",
    features: ["Fixed Departures", "Group Rates", "Tour Leaders"],
  },
  {
    icon: Building2,
    title: "MICE Solutions",
    description: "Complete meetings, incentives, conferences, and exhibitions services from venue sourcing to full event management.",
    features: ["Venue Sourcing", "Event Planning", "Team Building"],
  },
  {
    icon: Ship,
    title: "Cruise Shore Excursions",
    description: "Reliable shore excursion packages for cruise lines with punctual ground handling and authentic local experiences.",
    features: ["Port Logistics", "Group Handling", "Time Guarantees"],
  },
  {
    icon: Heart,
    title: "Luxury & Honeymoon",
    description: "High-end bespoke experiences and romantic getaways with VIP services and exclusive access.",
    features: ["VIP Services", "Exclusive Access", "Romance Packages"],
  },
  {
    icon: Plane,
    title: "Airport Services",
    description: "VIP meet and greet, fast-track immigration assistance, private lounges, and seamless transfers worldwide.",
    features: ["Meet & Greet", "Fast Track", "VIP Lounges"],
  },
]

const processSteps = [
  { number: "01", title: "Inquiry", description: "Send your requirements" },
  { number: "02", title: "Quote", description: "Receive competitive B2B rates" },
  { number: "03", title: "Confirm", description: "Secure your booking" },
  { number: "04", title: "Operate", description: "We handle everything" },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Complete DMC Solutions Across 10+ Destinations
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From initial inquiry to post-trip support, we provide end-to-end destination management services across Asia, Indian Ocean, Africa & Caribbean for travel agents, tour operators, and MICE organizers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Process Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12">
            <div className="lg:w-1/3">
              <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
                Simple Process, Global Results
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Working with PearlDMC is straightforward no matter which destination you need. Our streamlined process ensures quick responses and seamless operations worldwide.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-card/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium">24-Hour Response</p>
                  <p className="text-primary-foreground/70 text-sm">On all inquiries</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-card/20" />
                  )}
                  <div className="bg-card/10 rounded-xl p-6 text-center">
                    <span className="text-accent font-bold text-2xl">{step.number}</span>
                    <h4 className="text-primary-foreground font-semibold mt-2 mb-1">{step.title}</h4>
                    <p className="text-primary-foreground/70 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* B2B Badge */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-4 bg-card rounded-full px-6 py-4 border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Exclusively B2B</p>
              <p className="text-sm text-muted-foreground">We work only with licensed travel trade partners</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 ml-4">
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
