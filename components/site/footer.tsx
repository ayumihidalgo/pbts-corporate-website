'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa6'
import { LegalModal } from './legal-modal'
import { privacySections, termsSections } from './legal-content'
import type { LegalModalType } from './legal-events'
import { useIsMobile } from './use-is-mobile'

// Keep these `slug`s in sync with `SERVICE_CATEGORY_SLUGS` / each category's
// `slug` in services.tsx and `serviceLinks` in navbar.tsx — clicking one
// dispatches the same `pbts:open-service-category` event the navbar uses,
// so the Services section opens that exact category.
const serviceLinks = [
  { label: 'Business System & Support', slug: 'business-system-support' },
  { label: 'Automation & Engineering Services', slug: 'automation-engineering' },
  { label: 'Board Engineering Solution', slug: 'board-engineering' },
  { label: 'Tooling and Metal Sheet Fabrication', slug: 'tooling-metal-fabrication' },
  { label: 'Warehouses', slug: 'warehouses' },
  { label: 'Civil/Structural', slug: 'civil-structural' },
  { label: 'Electrical', slug: 'electrical' },
  { label: 'Architecture', slug: 'architecture' },
  { label: 'Mechanical', slug: 'mechanical' },
  { label: 'Landscaping', slug: 'landscaping' },
]

// One-page site: every link jumps to a section on the page. (The old
// Industries column and the Careers / News links went nowhere, so they're gone.
// The Industries section on the page already links each industry to its services.)
const companyLinks = [
  { label: 'About PBTS', href: '#about' },
  { label: 'How We Build', href: '#how-we-build' },
  { label: 'Projects', href: '#projects' },
  { label: 'Industries', href: '#industries' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

// PBTS only maintains a Facebook page currently, so this is the single
// real platform icon (from react-icons/fa6, since lucide-react dropped
// brand/logo icons for trademark reasons — see the earlier version of
// this file's comment if that changes).
const socialLinks = [
  { icon: FaFacebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61556984545465' },
]

export function Footer() {
  // Which legal modal (if any) is open — Privacy Policy and Terms of Use
  // render as pop-up modals rather than separate routes, since this is a
  // one-page site.
  const [legalOpen, setLegalOpen] = useState<LegalModalType | null>(null)
  const isMobile = useIsMobile()

  // Same cross-component pattern navbar.tsx uses: dispatch a plain DOM
  // CustomEvent that the Services section listens for, then let it own the
  // actual scrolling (it scrolls the clicked category's row into view).
  const goToServiceCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))
  }

  // Lets other components (e.g. the contact form's consent checkbox) open
  // the Privacy Policy / Terms of Use modal without sharing state directly
  // — see legal-events.ts.
  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e as CustomEvent<{ type: LegalModalType }>).detail?.type
      if (type) setLegalOpen(type)
    }
    window.addEventListener('pbts:open-legal', handler)
    return () => window.removeEventListener('pbts:open-legal', handler)
  }, [])

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + contact details */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-20 items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src="/pbts-logo.png"
                  alt="PBTS Technology"
                  width={120}
                  height={120}
                  className="size-20 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-bold text-white">Pro Board Technology Services</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 pt-2">
                  Corporation
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Pro Board Technology Services Corporation — Delivering engineering and technical solutions since 2006.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-orange" /> Peoples Technology Complex, Carmona, Cavite
              </p>
              {/* Only rendered as a tel: link on mobile — on desktop it's
                  plain, non-interactive text, since there's no telephony
                  to hand this off to. */}
              {isMobile ? (
                <a
                  href="tel:+63285525131"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-orange" /> +63-2-8552-5131 to 32
                </a>
              ) : (
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-orange" /> +63-2-8552-5131 to 32
                </p>
              )}
              <a
                href="mailto:sales@pbts-tech.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-orange" /> sales@pbts-tech.com
              </a>
            </div>

          </div>

          {/* Services (all 10 categories, opens the matching category on the
              Services section instead of a plain anchor jump) */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault()
                      goToServiceCategory(s.slug)
                    }}
                    className="text-sm transition-colors hover:text-orange"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company: jumps to sections on this page */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors hover:text-orange">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Follow
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-orange hover:bg-orange hover:text-orange-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} PBTS Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setLegalOpen('privacy')}
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen('terms')}
              className="transition-colors hover:text-white"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        open={legalOpen === 'privacy'}
        onClose={() => setLegalOpen(null)}
        title="Privacy Policy"
        lastUpdated="October 26, 2026"
        sections={privacySections}
      />
      <LegalModal
        open={legalOpen === 'terms'}
        onClose={() => setLegalOpen(null)}
        title="Terms of Use"
        lastUpdated="October 26, 2026"
        sections={termsSections}
      />
    </footer>
  )
}
