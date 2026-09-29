'use client'

/**
 * Featured Projects — bento grid of real PBTS work.
 *
 * Most cards are pulled straight from services-data.ts (same photos, text and
 * galleries as the Services section). The four "custom" entries at the
 * bottom of `featured` are the original cards with their own images in
 * /public/images — their copy is still PLACEHOLDER (see `placeholder: true`).
 *
 * - filter chips by type · first 6 shown, "View all" reveals the rest
 * - title/location/summary are always visible (the old hover-only text was
 *   invisible on phones)
 * - clicking a card opens the shared photo viewer (service-viewer.tsx)
 */

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowUpRight, Building2, ChevronsDown, ChevronsUp, Code2, Cpu, Images, MapPin } from 'lucide-react'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'
import { findService, photoUrls } from './service-lookup'
import { ServiceViewerPortal, type ViewerEntry } from './service-viewer'

type Featured = ViewerEntry & {
  /** chip label + badge on the card */
  tag: string
  /** short orange line on the card (falls back to the item's location) */
  highlight?: string
  placeholder?: boolean
}

const INITIAL = 6

// --- real projects, straight from services-data.ts ----------------------
const fromServices: [slug: string, title: string, tag: string][] = [
  ['warehouses', 'PBTS Warehouse', 'Construction'],
  ['civil-structural', 'Administration Building', 'Construction'],
  ['mechanical', 'ED Oven Rehabilitation', 'Mechanical'],
  ['mechanical', 'Mantra Sprinkler System Works', 'Fire Protection'],
  ['electrical', 'Electrical Installation of 75kVA Genset', 'Electrical'],
  ['board-engineering', 'Board Repair', 'Board Engineering'],
  ['mechanical', 'Replacement of CHW Pipe Rubber Insulation & Cladding', 'Mechanical'],
  ['civil-structural', 'Security and Maintenance Building', 'Construction'],
]

// --- original cards (own images in /public/images) — PLACEHOLDER copy ----
const custom: Featured[] = [
  {
    tag: 'Software',
    placeholder: true,
    highlight: 'Unified finance, sales, and warehouse operations in one dashboard',
    category: { icon: Code2, title: 'Software Development', contactService: 'Business Support and System' },
    item: {
      title: 'Enterprise Resource Planning System',
      desc: 'Growing manufacturers often run finance, purchasing, and warehouse operations on disconnected spreadsheets and manual approvals, creating blind spots and slowing decisions.',
      images: ['/images/project-erp.png'],
    },
  },
  {
    tag: 'Automation',
    placeholder: true,
    highlight: 'Synchronized multi-axis motion across the production line',
    category: { icon: Cpu, title: 'Automation & Engineering Services', contactService: 'Automation & Engineering Services' },
    item: {
      title: 'Omron Industrial Automation',
      desc: 'Legacy standalone controllers made it difficult to coordinate timing across multiple machines, causing misalignment and slower changeovers.',
      images: ['/images/project-omron.png'],
    },
  },
  {
    tag: 'Construction',
    placeholder: true,
    highlight: 'Delivered 2 weeks ahead of schedule',
    category: { icon: Building2, title: 'Civil/Structural', contactService: 'Civil, Structural & Architectural' },
    item: {
      title: 'Underground 180cum Water Tank Construction',
      // PLACEHOLDER — this text describes a production hall, not a water tank
      desc: 'A growing manufacturer needed a new production hall with full electrical and mechanical fit-out.',
      images: ['/images/project-construction.png'],
    },
  },
  {
    tag: 'Software',
    placeholder: true,
    highlight: 'Streamlined applicant intake, status tracking, and visa-petition workflow',
    category: { icon: Code2, title: 'Software Development', contactService: 'Business Support and System' },
    item: {
      title: 'New Era HRIS — Applicant & Employee Management System',
      desc: 'HR teams often juggle applicant intake, interview scheduling, visa-petition stages, and employee records across disconnected spreadsheets and email threads — a bottleneck the HRIS is built to eliminate.',
      images: ['/images/project-NewEra.png'],
    },
  },
]

const featured: Featured[] = [
  ...fromServices.flatMap(([slug, title, tag]) => {
    const found = findService(slug, title)
    return found ? [{ ...found, tag }] : []
  }),
  ...custom,
]

export function Projects() {
  const [tag, setTag] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const f of featured) counts.set(f.tag, (counts.get(f.tag) ?? 0) + 1)
    return Array.from(counts)
  }, [])

  const filtered = tag ? featured.filter((f) => f.tag === tag) : featured
  const canCollapse = filtered.length > INITIAL
  const visible = canCollapse && !expanded ? filtered.slice(0, INITIAL) : filtered

  return (
    <section id="projects" className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Featured Projects
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Real outcomes for demanding operations
          </h2>
          <p className="mt-5 text-lg text-white/60 text-pretty">
            A selection of engineering challenges we&apos;ve solved for manufacturers and industrial
            plants.
          </p>
        </Reveal>

        {/* filter chips */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {[['All', featured.length] as const, ...tags].map(([name, count]) => {
            const active = name === 'All' ? tag === null : tag === name
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTag(name === 'All' ? null : name)
                  setExpanded(false)
                }}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  active
                    ? 'border-orange bg-orange text-orange-foreground'
                    : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white',
                )}
              >
                {name}
                <span className={cn('ml-1.5 tabular-nums', active ? 'text-white/70' : 'text-white/40')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* bento grid: every 1st and 4th card of each group of four spans 2 cols */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((f, i) => {
            const wide = i % 4 === 0 || i % 4 === 3
            const src = f.item.images[0]
            return (
              <button
                key={f.item.title}
                type="button"
                onClick={() => setViewerIndex(i)}
                className={cn(
                  'group relative h-80 overflow-hidden rounded-3xl border border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange',
                  wide && 'lg:col-span-2',
                )}
              >
                {/* zoom lives on an inner wrapper (WebKit rounded-clip workaround) */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none">
                  {src && (
                    <Image
                      src={photoUrls(src).lg}
                      alt=""
                      fill
                      className="object-cover"
                      sizes={wide ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/5" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
                  <span className="inline-flex w-fit items-center rounded-full bg-orange/90 px-3 py-1 text-xs font-semibold text-orange-foreground">
                    {f.tag}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-white">
                    {f.item.title}
                  </h3>
                  {f.highlight ? (
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-orange">{f.highlight}</p>
                  ) : f.item.location ? (
                    <p className="mt-1 flex items-center gap-1 text-sm font-medium text-orange">
                      <MapPin className="size-3.5" />
                      {f.item.location}
                    </p>
                  ) : null}
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">{f.item.desc}</p>
                </div>
                <span className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-orange">
                  <ArrowUpRight className="size-5" />
                </span>
                {f.item.images.length > 1 && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-md bg-navy/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                    <Images className="size-3.5" />
                    {f.item.images.length} photos
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {canCollapse && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (expanded) {
                  setExpanded(false)
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else setExpanded(true)
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {expanded ? (
                <>
                  Show fewer <ChevronsUp className="size-4 text-orange" />
                </>
              ) : (
                <>
                  View all {filtered.length} projects <ChevronsDown className="size-4 text-orange" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <ServiceViewerPortal
        entries={filtered}
        index={viewerIndex}
        onIndex={(i) => setViewerIndex(Math.max(0, Math.min(filtered.length - 1, i)))}
        onClose={() => setViewerIndex(null)}
      />
    </section>
  )
}
