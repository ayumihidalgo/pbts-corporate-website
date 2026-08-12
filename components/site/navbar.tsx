'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Cpu,
  CircuitBoard,
  Factory,
  Warehouse,
  Building2,
  Zap,
  Compass,
  Cog,
  Trees,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Keep these `slug`s in sync with `SERVICE_CATEGORY_SLUGS` / each category's
// `slug` in services.tsx — clicking a link here dispatches
// `pbts:open-service-category` with this slug, which the Services section
// listens for to open the matching category panel.
const serviceLinks = [
  {
    icon: LayoutDashboard,
    label: 'Business System & Support',
    desc: 'Software, IT & business systems',
    slug: 'business-system-support',
  },
  {
    icon: Cpu,
    label: 'Automation & Engineering Services',
    desc: 'PLC, SCADA & control systems',
    slug: 'automation-engineering',
  },
  {
    icon: CircuitBoard,
    label: 'Board Engineering Solution',
    desc: 'Board-level diagnostics & repair',
    slug: 'board-engineering',
  },
  {
    icon: Factory,
    label: 'Tooling and Metal Sheet Fabrication',
    desc: 'Precision fabrication & tooling',
    slug: 'tooling-metal-fabrication',
  },
  {
    icon: Warehouse,
    label: 'Warehouses',
    desc: 'Design, racking & material handling',
    slug: 'warehouses',
  },
  {
    icon: Building2,
    label: 'Civil/Structural',
    desc: 'Construction & structural works',
    slug: 'civil-structural',
  },
  {
    icon: Zap,
    label: 'Electrical',
    desc: 'Installation & power distribution',
    slug: 'electrical',
  },
  {
    icon: Compass,
    label: 'Architecture',
    desc: 'Facility design & planning',
    slug: 'architecture',
  },
  {
    icon: Cog,
    label: 'Mechanical',
    desc: 'Installation & equipment repair',
    slug: 'mechanical',
  },
  {
    icon: Trees,
    label: 'Landscaping',
    desc: 'Site development & grounds work',
    slug: 'landscaping',
  },
]

const navItems = [
  { label: 'Services', href: '#services', mega: true },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Closes the mega-menu/mobile menu, scrolls to the Services section, and
  // tells it (via a plain DOM CustomEvent — the two components don't share
  // any React state) which category to open.
  const goToServiceCategory = (slug: string) => {
    setMegaOpen(false)
    setMobileOpen(false)
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20'
          : 'bg-gradient-to-b from-navy/70 to-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="PBTS Technology home">
          <span className="flex size-12 items-center justify-center overflow-hidden">
            <Image
              src="/pbts-logo.png"
              alt="PBTS Technology"
              width={112}
              height={112}
              className="size-12 object-contain"
              priority
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-bold tracking-tight text-white">PBTS</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
              Technology
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.mega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                  aria-expanded={megaOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('size-4 transition-transform', megaOpen && 'rotate-180')}
                  />
                </button>
                {megaOpen && (
                  <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-2xl shadow-navy/20">
                      {serviceLinks.map((s) => (
                        <a
                          key={s.slug}
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault()
                            goToServiceCategory(s.slug)
                          }}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                            <s.icon className="size-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {s.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{s.desc}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:brightness-105"
          >
            Request a Quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex size-10 items-center justify-center rounded-lg text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-navy lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navItems.map((item) =>
              item.mega ? (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="px-3 py-2 text-base font-medium text-white/85">
                    {item.label}
                  </span>
                  <div className="flex flex-col gap-0.5 pb-1 pl-2">
                    {serviceLinks.map((s) => (
                      <a
                        key={s.slug}
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault()
                          goToServiceCategory(s.slug)
                        }}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        <s.icon className="size-4 shrink-0" />
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-orange-foreground"
            >
              Request a Quote
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
