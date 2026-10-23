'use client'

/**
 * Featured Projects — a horizontal row of real PBTS work.
 *
 * Content: ./projects-data.ts (completed jobs, grouped by type). Titles in
 * `featuredOrder` come first. Services panels link here with "See N …
 * projects" buttons (`pbts:show-projects` { group }), which scroll here and
 * apply that filter.
 *
 * - filter chips by type · one horizontal row (arrows / swipe, "1–3 of 23"),
 *   so the section never grows vertically
 * - title/location/summary are always visible (the old hover-only text was
 *   invisible on phones)
 * - clicking a card opens the shared photo viewer (service-viewer.tsx)
 * - the active chip's orange pill slides between chips; cards rise in
 *   one after another whenever the filter changes
 */

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { ArrowUpRight, Images, MapPin } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeader } from './section-header'
import { BlueprintGrid } from './blueprint-grid'
import { cn } from '@/lib/utils'
import { photoUrls } from './service-lookup'
import { HRail } from './catalog-browser'
import { featuredOrder, projectGroups } from './projects-data'
import { ServiceViewerPortal, type ViewerEntry } from './service-viewer'

type Featured = ViewerEntry & {
  /** chip label + badge on the card (= the project's group) */
  tag: string
  /** short orange line on the card (falls back to the item's location) */
  highlight?: string
}


const all: Featured[] = projectGroups.flatMap((g) =>
  g.items.map((item) => ({
    item,
    tag: g.title,
    highlight: item.highlight,
    category: { icon: g.icon, title: g.title, contactService: item.contactService ?? g.contactService },
  })),
)
// featured titles first (in that order), then everything else in group order
const rank = (f: Featured) => {
  const i = featuredOrder.indexOf(f.item.title)
  return i === -1 ? featuredOrder.length : i
}
const featured: Featured[] = [...all].sort((a, b) => rank(a) - rank(b))

export function Projects() {
  const [tag, setTag] = useState<string | null>(null)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  // "See N Mechanical projects" links from the Services panels
  useEffect(() => {
    const onShow = (e: Event) => {
      const g = (e as CustomEvent<{ group?: string }>).detail?.group ?? null
      setTag(g && featured.some((f) => f.tag === g) ? g : null)
      requestAnimationFrame(() =>
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
    }
    window.addEventListener('pbts:show-projects', onShow)
    return () => window.removeEventListener('pbts:show-projects', onShow)
  }, [])

  // chips follow the group order in projects-data.ts (not the featured order)
  const tags = useMemo(() => projectGroups.map((g) => [g.title, g.items.length] as const), [])

  const filtered = tag ? featured.filter((f) => f.tag === tag) : featured

  return (
    <section id="projects" className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <BlueprintGrid className="opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          tone="dark"
          align="left"
          eyebrow="Featured Projects"
          title="Real outcomes for demanding operations"
          intro="Machines, systems, and on-site projects we've delivered for manufacturers and industrial plants."
        />

        {/* filter chips — the orange pill glides to the active chip */}
        <Reveal delay={100}>
          <LayoutGroup id="project-chips">
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
                    }}
                    className={cn(
                      'relative isolate rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                      active
                        ? 'border-orange text-orange-foreground'
                        : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-chip"
                        className="absolute inset-0 -z-10 rounded-full bg-orange"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {name}
                    <span className={cn('ml-1.5 tabular-nums', active ? 'text-white/70' : 'text-white/40')}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        {/* one horizontal row — arrows / swipe; never grows the section downwards */}
        <div className="mt-6">
          <HRail tone="dark" resetKey={tag} itemClass="w-[85%] sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)]">
          {filtered.map((f, i) => {
            const src = f.item.images[0]
            return (
              // keyed by filter, so changing the filter re-plays the rise-in
              <motion.div
                key={`${tag ?? 'all'}:${f.item.title}`}
                className="h-full"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 4) * 0.06 }}
              >
              <button
                type="button"
                onClick={() => setViewerIndex(i)}
                className="group relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 text-left transition-colors hover:border-orange/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                {/* zoom lives on an inner wrapper (WebKit rounded-clip workaround) */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none">
                  {src && (
                    <Image
                      src={photoUrls(src).lg}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
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
              </motion.div>
            )
          })}
          </HRail>
        </div>
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
