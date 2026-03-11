import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  asiaPacific: [
    { label: "Philippines", href: "/destinations/philippines" },
    { label: "Bali, Indonesia", href: "/destinations/bali" },
    { label: "Japan", href: "/destinations/japan" },
    { label: "South Korea", href: "/destinations/south-korea" },
  ],
  indianOcean: [
    { label: "Maldives", href: "/destinations/maldives" },
    { label: "Mauritius", href: "/destinations/mauritius" },
    { label: "Seychelles", href: "/destinations/seychelles" },
  ],
  africaCaribbean: [
    { label: "South Africa", href: "/destinations/south-africa" },
    { label: "Zanzibar, Tanzania", href: "/destinations/zanzibar" },
    { label: "Jamaica", href: "/destinations/jamaica" },
  ],
  services: [
    { label: "FIT & Tailor-Made Tours", href: "/services/fit-tours" },
    { label: "Group Series", href: "/services/group-series" },
    { label: "MICE Solutions", href: "/services/mice" },
    { label: "Cruise Shore Excursions", href: "/services/cruise" },
    { label: "Luxury & Honeymoon", href: "/services/luxury" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "News & Updates", href: "/news" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Travel Trade Portal", href: "/portal" },
    { label: "Agent Registration", href: "/register" },
    { label: "Rate Sheets", href: "/rates" },
    { label: "Brochures", href: "/brochures" },
    { label: "FAQs", href: "/faq" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-2">
              <Image
                src="/images/logo/pearldmc-icon-white.png"
                alt="PearlDMC Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  Pearl<span className="font-light">DMC</span>
                </span>

                <span className="text-[10px] uppercase tracking-[0.3em] text-white">
                  Global Destination Expert
                </span>
              </div>
            </Link>

            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted global B2B destination management partner across
              Asia, Indian Ocean, Africa & Caribbean. Delivering exceptional
              travel experiences since 2007.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-background" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="bg-background/5 rounded-xl p-5 border border-background/10">
              <p className="font-medium text-background mb-2 text-sm">
                Trade Newsletter
              </p>
              <p className="text-background/60 text-xs mb-4">
                Get updates on new destinations, packages & industry news.
              </p>
              <form className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-background/40" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-background/10 border border-background/20 rounded-lg text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/40"
                  />
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-4">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Asia Pacific */}
          <div>
            <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">
              Asia Pacific
            </h4>
            <ul className="space-y-3">
              {footerLinks.asiaPacific.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Indian Ocean & Africa */}
          <div>
            <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">
              Indian Ocean
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.indianOcean.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">
              Africa & Caribbean
            </h4>
            <ul className="space-y-3">
              {footerLinks.africaCaribbean.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
              <p className="text-background/50">
                © {new Date().getFullYear()} PearlDMC. All rights reserved.
              </p>
              <span className="text-background/30 hidden md:inline">|</span>
              <p className="text-background/50">
                PHILTOA | ASTA | PATA | IATA Member
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-background/50 hover:text-background text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-background/50 hover:text-background text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-background/50 hover:text-background text-sm transition-colors"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
