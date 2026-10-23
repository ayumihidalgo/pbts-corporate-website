'use client'

/**
 * Site header.
 *  - shrinks slightly and turns solid navy once you scroll
 *  - a pill slides to whichever section is on screen (scroll-spy)
 *  - Services mega-menu: hover, click, or keyboard; Esc / outside click closes
 *  - thin orange scroll-progress line along the bottom edge
 *  - mobile menu slides open; hamburger morphs to X
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useScroll, useSpring } from 'motion/react'
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
  { label: 'About', href: '#about' },
  { label: 'How We Build', href: '#how-we-build' },
  { label: 'Services', href: '#services', mega: true },
  { label: 'Projects', href: '#projects' },
  { label: 'Industries', href: '#industries' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

// section ids the scroll-spy watches (everything in navItems)
const sectionIds = navItems.map((n) => n.href.slice(1))

/** Which section is under the middle of the viewport (null on the hero). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
          else setActive((cur) => (cur === e.target.id ? null : cur))
        }
      },
      // a thin band across the middle of the screen
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/** Sliding pill behind the current section's link (shared layoutId = it glides between links). */
function ActivePill() {
  return (
    <motion.span
      layoutId="nav-active"
      className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const megaRef = useRef<HTMLDivElement>(null)

  // thin orange progress line along the bottom of the bar
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

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

  // Escape closes either menu; clicking outside closes the mega-menu
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    const onDown = (e: PointerEvent) => {
      if (megaOpen && megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [megaOpen, mobileOpen])

  // Closes the mega-menu/mobile menu and tells the Services section (via a
  // plain DOM CustomEvent — the two components don't share any React state)
  // which category to open. The Services section owns the actual scrolling:
  // it scrolls the opened panel itself to the top of the viewport once
  // mounted, which lands correctly whether that panel ends up in row 1 or
  // row 2 — scrolling to the section here instead would often stop short of
  // the actual panel for row-2 categories.
  const goToServiceCategory = (slug: string) => {
    setMegaOpen(false)
    setMobileOpen(false)
    window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))
  }

  const linkClass = (isActive: boolean) =>
    cn(
      'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-white' : 'text-white/75 hover:text-white',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20'
          : 'bg-gradient-to-b from-navy/70 to-transparent',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 lg:px-8',
          scrolled ? 'h-16 sm:h-[4.5rem]' : 'h-20',
        )}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="PBTS Technology home">
          <span
            className={cn(
              'flex items-center justify-center overflow-hidden transition-all duration-300',
              scrolled ? 'size-12 sm:size-14' : 'size-14 sm:size-16',
            )}
          >
            <Image
              src="/pbts-logo.png"
              alt="PBTS Technology"
              width={160}
              height={160}
              className="size-full object-contain"
              priority
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[17px] font-bold tracking-tight text-white">Pro Board Technology Services</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 pt-1.5">
              Corporation
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <LayoutGroup id="desktop-nav">
          <div className="isolate hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return item.mega ? (
                <div
                  key={item.label}
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(linkClass(isActive), 'flex items-center gap-1')}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    // mouse/touch: hover already opened it, so a click keeps it open
                    // (no open-then-instantly-close); keyboard Enter/Space toggles
                    onClick={(e) => setMegaOpen((v) => (e.detail === 0 ? !v : true))}
                  >
                    {isActive && <ActivePill />}
                    {item.label}
                    <ChevronDown
                      className={cn('size-4 transition-transform duration-300', megaOpen && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.25, ease }}
                        className="absolute left-1/2 top-full w-[720px] origin-top pt-3"
                        style={{ x: '-50%' }}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-navy/20">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {serviceLinks.map((s, i) => (
                              <motion.a
                                key={s.slug}
                                href="#services"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.03 * i, duration: 0.25, ease }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  goToServiceCategory(s.slug)
                                }}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                                  <s.icon className="size-5" />
                                </span>
                                <span className="flex flex-col">
                                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                                  <span className="text-xs text-muted-foreground">{s.desc}</span>
                                </span>
                              </motion.a>
                            ))}
                          </div>
                          {/* footer strip */}
                          <div className="flex items-center justify-between border-t border-border bg-secondary/50 px-6 py-3">
                            <span className="text-xs text-muted-foreground">
                              Not sure which service fits your project?
                            </span>
                            <a
                              href="#contact"
                              onClick={() => setMegaOpen(false)}
                              className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-navy"
                            >
                              Talk to an engineer
                              <ArrowRight className="size-3.5 text-orange transition-transform group-hover/cta:translate-x-0.5" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={linkClass(isActive)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && <ActivePill />}
                  {item.label}
                </a>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Request a Quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile toggle — icon cross-fades between menu and close */}
        <button
          type="button"
          className="relative inline-flex size-10 items-center justify-center rounded-lg text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={mobileOpen ? 'x' : 'menu'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="inline-flex"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* scroll progress */}
      <motion.div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
        style={{ scaleX: progress }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <div className="flex max-h-[calc(100svh-4rem)] flex-col gap-1 overflow-y-auto px-5 py-4">
              {navItems.map((item) =>
                item.mega ? (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="px-3 py-2 text-base font-medium text-white/85">{item.label}</span>
                    <div className="grid grid-cols-1 gap-0.5 pb-1 pl-2 min-[420px]:grid-cols-2">
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
                          <s.icon className="size-4 shrink-0 text-orange/80" />
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
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-white/5',
                      active === item.href.slice(1) ? 'bg-white/5 text-white' : 'text-white/85',
                    )}
                  >
                    {item.label}
                    {active === item.href.slice(1) && <span className="size-1.5 rounded-full bg-orange" />}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
