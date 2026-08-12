'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  CircuitBoard,
  Cpu,
  Wrench,
  Factory,
  Boxes,
  Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceLinks = [
  { icon: CircuitBoard, label: 'Industrial PCB Repair', desc: 'Board-level diagnostics & repair' },
  { icon: Cpu, label: 'Automation Engineering', desc: 'PLC, SCADA & control systems' },
  { icon: Wrench, label: 'Machine Rehabilitation', desc: 'Restore legacy equipment' },
  { icon: Factory, label: 'Industrial Fabrication', desc: 'Precision metal & assembly' },
  { icon: Boxes, label: 'System Integration', desc: 'End-to-end line integration' },
  { icon: Code2, label: 'Software Development', desc: 'Custom industrial software' },
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
                  <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-2xl shadow-navy/20">
                      {serviceLinks.map((s) => (
                        <a
                          key={s.label}
                          href="#services"
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                            <s.icon className="size-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">{s.label}</span>
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
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
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
