'use client'

/**
 * Services section — the services PBTS offers, by category.
 *
 * Content lives in ./services-data.ts. Built machines/systems and completed
 * jobs are in the Projects section (projects-data.ts); each category links
 * to its matching Projects filter ("View Mechanical (8)").
 *   - 10 category tiles; clicking one expands a panel under its row
 *   - panel = shared CatalogBrowser (catalog-browser.tsx): search, chips,
 *     Cards / Compact, show all, photo viewer
 *   - Tooling also shows an "Our in-house equipment" strip
 */

import { Fragment, forwardRef, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Wrench } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeader } from './section-header'
import { ServiceViewerPortal, enquireAbout, thumbSrc } from './service-viewer'
import { CatalogBrowser, CatalogLink, useMediaQuery, useViewPreference, type View } from './catalog-browser'
import { cn } from '@/lib/utils'
import { serviceCategories as categories, type ServiceCategory } from './services-data'
import { projectGroups } from './projects-data'

export { SERVICE_CATEGORY_SLUGS } from './services-data'

/** how many products/projects a "See N …" link points to */
function relatedCount(group: string) {
  return projectGroups.find((g) => g.title === group)?.items.length ?? 0
}

function CategoryTile({
  category,
  active,
  onClick,
}: {
  category: ServiceCategory
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={cn(
        'group relative flex h-full w-full flex-col items-center gap-2.5 rounded-2xl border p-3.5 text-center transition-all duration-300 sm:p-4',
        active
          ? 'border-orange bg-navy shadow-lg shadow-navy/20'
          : 'border-border bg-secondary/40 hover:border-steel/30 hover:bg-white',
      )}
    >
      <span
        className={cn(
          'absolute right-2 top-2 rounded-full px-1.5 text-[10px] font-semibold tabular-nums leading-4',
          active ? 'bg-white/15 text-white' : 'bg-navy/5 text-muted-foreground',
        )}
        aria-label={`${category.items.length} items`}
      >
        {category.items.length}
      </span>
      <span
        className={cn(
          'inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors',
          active
            ? 'bg-orange text-orange-foreground'
            : 'bg-navy/5 text-navy group-hover:bg-orange group-hover:text-orange-foreground',
        )}
      >
        <category.icon className="size-5" />
      </span>
      <span
        className={cn(
          'text-xs font-semibold leading-tight transition-colors sm:text-sm',
          active ? 'text-white' : 'text-foreground',
        )}
      >
        {category.title}
      </span>
      <ChevronDown
        className={cn(
          'size-3.5 shrink-0 transition-transform duration-300',
          active ? 'rotate-180 text-orange' : 'text-muted-foreground/50',
        )}
      />
    </button>
  )
}

/** Large card — grid on desktop, swipe strip on mobile. */
/** Compact strip of the machines PBTS runs in-house (Tooling category). */
function EquipmentStrip({ category }: { category: ServiceCategory }) {
  const [index, setIndex] = useState<number | null>(null)
  const items = category.equipment ?? []
  if (!items.length) return null
  return (
    <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Wrench className="size-3.5 text-orange" />
        Our in-house equipment
      </p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 pr-8 [mask-image:linear-gradient(to_right,black_88%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <button
            key={it.title}
            type="button"
            onClick={() => setIndex(i)}
            className="group/eq w-32 shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange sm:w-36"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-white">
              {it.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbSrc(it.images[0])}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover/eq:scale-105"
                />
              )}
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-navy">{it.title}</p>
          </button>
        ))}
      </div>
      <ServiceViewerPortal
        entries={items.map((item) => ({ item, category }))}
        index={index}
        onIndex={(i) => setIndex(Math.max(0, Math.min(items.length - 1, i)))}
        onClose={() => setIndex(null)}
      />
    </div>
  )
}

const CategoryPanel = forwardRef<
  HTMLDivElement,
  {
    category: ServiceCategory
    open: boolean
    view: View
    onViewChange: (v: View) => void
    onTransitionEnd?: () => void
  }
>(function CategoryPanel({ category, open, view, onViewChange, onTransitionEnd }, ref) {
  const panelTopRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={cn(
        'col-span-full grid scroll-mt-24 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
      aria-hidden={!open}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === 'grid-template-rows') onTransitionEnd?.()
      }}
    >
      <div className="-mx-3 overflow-hidden px-3 pb-1">
        <div
          ref={panelTopRef}
          className={cn(
            'mt-1 scroll-mt-24 rounded-3xl border border-border bg-white p-5 shadow-md shadow-navy/10 transition-[opacity,transform] duration-300 ease-out sm:p-8',
            open ? 'translate-y-0 opacity-100 delay-150' : '-translate-y-1 opacity-0',
          )}
        >
          {/* header */}
          <div className="mb-6 flex items-start gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <category.icon className="size-6" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">{category.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {category.intro}
              </p>
            </div>
          </div>

          <CatalogBrowser
            items={category.items}
            category={category}
            view={view}
            onViewChange={onViewChange}
            noun="services"
            scrollTargetRef={panelTopRef}
            footerStart={
              <>
                {category.related?.map((r) => (
                  <CatalogLink key={r.group} group={r.group} count={relatedCount(r.group)} />
                ))}
                <button
                  type="button"
                  onClick={() => enquireAbout(category)}
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-navy"
                >
                  Discuss your project with us
                  <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
                </button>
              </>
            }
          />

          <EquipmentStrip category={category} />
        </div>
      </div>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

// We need to track the active column count so the panel is inserted after
// the correct row end on both desktop (5 cols) and mobile (2 cols).
function useGridCols() {
  const narrow = useMediaQuery('(max-width: 480px)', false)
  return narrow ? 2 : 5
}

export function Services() {
  // `activeIndex` is the selected category; `renderIndex` is which panel is
  // actually mounted. Only the active panel is ever mounted, so it's the sole
  // full-width item in the tile grid and only rows below it get pushed down.
  // Nothing is open by default; categories open on tile click or via the
  // navbar's Services dropdown (`pbts:open-service-category` event).
  const gridCols = useGridCols()
  const [view, setView] = useViewPreference()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [renderIndex, setRenderIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  // switching straight between categories collapses the current panel first;
  // the target waits here until onPanelCollapsed fires
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const tileRowRefs = useRef<Array<HTMLDivElement | null>>([])
  const scrollToPanelRef = useRef(false)

  const openPanel = (i: number) => {
    setActiveIndex(i)
    setRenderIndex(i)
    // mount closed, then open next frame so grid-template-rows can animate
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }

  const toggle = (i: number) => {
    if (activeIndex === i) {
      setOpen(false)
      setActiveIndex(null)
      return
    }
    if (activeIndex !== null) {
      setPendingIndex(i)
      setOpen(false)
      setActiveIndex(null)
      return
    }
    openPanel(i)
  }

  const onPanelCollapsed = (i: number) => {
    if (open || renderIndex !== i) return
    setRenderIndex((cur) => (cur === i ? null : cur))
    if (pendingIndex !== null) {
      const next = pendingIndex
      setPendingIndex(null)
      openPanel(next)
    }
  }

  const scrollToRow = (i: number) => {
    const rowStart = Math.floor(i / gridCols) * gridCols
    tileRowRefs.current[rowStart]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openCategoryBySlug = (slug: string) => {
    const i = categories.findIndex((c) => c.slug === slug)
    if (i === -1) return
    if (activeIndex === i) {
      scrollToRow(i)
      return
    }
    scrollToPanelRef.current = true
    if (activeIndex !== null) {
      setPendingIndex(i)
      setOpen(false)
      setActiveIndex(null)
      return
    }
    openPanel(i)
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<{ slug: string }>).detail?.slug
      if (slug) openCategoryBySlug(slug)
    }
    window.addEventListener('pbts:open-service-category', handler)
    return () => window.removeEventListener('pbts:open-service-category', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, pendingIndex, gridCols])

  useEffect(() => {
    if (!scrollToPanelRef.current || renderIndex === null || renderIndex !== activeIndex) return
    scrollToPanelRef.current = false
    const target = renderIndex
    requestAnimationFrame(() => scrollToRow(target))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderIndex, activeIndex])

  return (
    <section id="services" className="scroll-mt-24 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Core Services"
          title="End-to-end engineering, under one roof"
          intro="From a single failed board to a fully built facility, our capabilities cover the entire industrial lifecycle. Select a category to explore."
        />

        {/* The panel is inserted after the LAST tile of the active tile's row
            so the whole row stays together above it. */}
        <div className="mt-14 grid grid-cols-5 gap-2.5 sm:gap-3 max-[480px]:grid-cols-2">
          {categories.map((category, i) => {
            const rowEndIndex =
              renderIndex === null
                ? -1
                : Math.min(Math.floor(renderIndex / gridCols) * gridCols + gridCols - 1, categories.length - 1)
            return (
              <Fragment key={category.slug}>
                <div
                  ref={(el) => {
                    tileRowRefs.current[i] = el
                  }}
                  className="h-full scroll-mt-24"
                >
                  <Reveal className="h-full" delay={(i % 5) * 60}>
                    <CategoryTile category={category} active={activeIndex === i} onClick={() => toggle(i)} />
                  </Reveal>
                </div>
                {i === rowEndIndex && (
                  <CategoryPanel
                    key={categories[renderIndex as number].slug}
                    category={categories[renderIndex as number]}
                    open={open && activeIndex === renderIndex}
                    view={view}
                    onViewChange={setView}
                    onTransitionEnd={() => onPanelCollapsed(renderIndex as number)}
                  />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
