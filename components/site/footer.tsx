'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Globe, Share2, Rss, Mail, ArrowRight, MapPin, Phone } from 'lucide-react'

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

const columns = [
  {
    title: 'Industries',
    links: [
      { label: 'Semiconductor', href: '#' },
      { label: 'Manufacturing', href: '#' },
      { label: 'Automotive', href: '#' },
      { label: 'Medical', href: '#' },
      { label: 'Energy', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About PBTS', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Careers', href: '#careers' },
      { label: 'News', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

// lucide-react (as pinned in this project, v1.17.0) no longer ships
// brand/logo icons (Facebook, Linkedin, Instagram, Youtube, Twitter, etc.) —
// they were removed for trademark reasons. These are generic stand-ins;
// swap in real brand marks via the `react-icons` package (e.g.
// `react-icons/fa6` → FaFacebook, FaLinkedin, FaInstagram, FaYoutube) if
// you want actual platform logos here — ask and I can wire that up.
const socialLinks = [
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Share2, label: 'Share', href: '#' },
  { icon: Rss, label: 'Blog / RSS', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Same cross-component pattern navbar.tsx uses: dispatch a plain DOM
  // CustomEvent that the Services section listens for, then let it own the
  // actual scrolling (it scrolls the clicked category's row into view).
  const goToServiceCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))
  }

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
                <Image
                  src="/pbts-logo.png"
                  alt="PBTS Technology"
                  width={96}
                  height={96}
                  className="size-12 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-white">PBTS</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  Technology
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Pro Board Technology Services Corporation — engineering innovation that powers modern
              manufacturing since 2006.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-orange" /> Peoples Technology Complex, Carmona, Cavite
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-orange" /> +63-2-8552-5131 to 32
              </p>
              <a
                href="mailto:info@pbts-tech.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-orange" /> sales@pbts-tech.com
              </a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubscribed(true)
              }}
              className="mt-6"
            >
              <label htmlFor="newsletter" className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Newsletter
              </label>
              {subscribed ? (
                <p className="mt-2 text-sm text-steel">Thanks for subscribing.</p>
              ) : (
                <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex items-center justify-center bg-orange px-4 text-orange-foreground"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Services (all 10 categories, opens the matching category on the
              Services section instead of a plain anchor jump) */}
          <div className="lg:col-span-3">
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

          {/* Industries / Company link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm transition-colors hover:text-orange">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
