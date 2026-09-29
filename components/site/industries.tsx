'use client'

/**
 * Industries We Serve. This now replaces the scrolling Trust Bar, which
 * repeated the same list. Each industry opens the most relevant Services
 * category (same `pbts:open-service-category` event the navbar uses).
 * Edit `service` / `serviceLabel` to change where each one points.
 */

import {
  ArrowRight,
  Boxes,
  Building2,
  Car,
  CircuitBoard,
  Cpu,
  Factory,
  HeartPulse,
  Utensils,
  Zap,
} from 'lucide-react'
import { Reveal } from './reveal'

const industries = [
  { icon: Cpu, label: 'Semiconductor', service: 'board-engineering', serviceLabel: 'Board repair & PCB engineering' },
  { icon: Factory, label: 'Manufacturing', service: 'automation-engineering', serviceLabel: 'Automation & custom machines' },
  { icon: CircuitBoard, label: 'Electronics', service: 'board-engineering', serviceLabel: 'Board assembly & repair' },
  { icon: HeartPulse, label: 'Medical', service: 'automation-engineering', serviceLabel: 'Assembly & inspection machines' },
  { icon: Car, label: 'Automotive', service: 'automation-engineering', serviceLabel: 'Automation & press machines' },
  { icon: Utensils, label: 'Food & Beverage', service: 'tooling-metal-fabrication', serviceLabel: 'Stainless fabrication' },
  { icon: Boxes, label: 'Industrial Plants', service: 'mechanical', serviceLabel: 'Mechanical & HVAC works' },
  { icon: Zap, label: 'Energy', service: 'electrical', serviceLabel: 'Electrical & genset works' },
  { icon: Building2, label: 'Construction', service: 'civil-structural', serviceLabel: 'Civil & structural works' },
]

const openService = (slug: string) =>
  window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))

export function Industries() {
  return (
    <section id="industries" className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Industries We Serve
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            Specialized expertise, sector by sector
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Powering operations across critical industries. Pick yours to see the services that fit.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.label} delay={(i % 3) * 70}>
              <button
                type="button"
                onClick={() => openService(ind.service)}
                className="group flex h-full w-full items-center gap-4 rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-steel/30 hover:shadow-lg hover:shadow-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <ind.icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-foreground">
                    {ind.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                    {ind.serviceLabel}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-orange" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
