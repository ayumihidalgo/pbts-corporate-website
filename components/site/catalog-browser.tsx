'use client'

/**
 * Shared catalog UI used by the Services panels and the Products section:
 *   - toolbar: search, group chips, Cards / Compact toggle (remembered per browser)
 *   - Cards: one horizontal row (arrows / swipe, progress bar, "1–4 of 21")
 *   - Compact: pages of dense rows, flipped sideways with the same controls
 *   - clicking an item opens the photo viewer
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  LayoutGrid,
  List,
  MapPin,
  Search,
} from 'lucide-react'
import { ServiceViewerPortal, thumbSrc, type ViewerCategory } from './service-viewer'
import { cn } from '@/lib/utils'
import type { ServiceItem } from './services-data'

export type View = 'cards' | 'compact'
export const VIEW_KEY = 'pbts:services-view'

export function useMediaQuery(query: string, initial: boolean) {
  const [matches, setMatches] = useState(initial)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

/** Cards/Compact preference, remembered in localStorage when available. */
export function useViewPreference(): [View, (v: View) => void] {
  const [view, setView] = useState<View>('cards')
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(VIEW_KEY)
      if (saved === 'cards' || saved === 'compact') setView(saved)
    } catch {
      /* storage blocked — keep default */
    }
  }, [])
  const update = useCallback((v: View) => {
    setView(v)
    try {
      window.localStorage.setItem(VIEW_KEY, v)
    } catch {
      /* ignore */
    }
  }, [])
  return [view, update]
}

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

export function Thumb({
  item,
  category,
  className,
  iconSize = 'size-8',
}: {
  item: ServiceItem
  category: ViewerCategory
  className?: string
  iconSize?: string
}) {
  const src = item.images[0]
  if (!src) {
    // no photo yet — branded fallback instead of a stock image
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-navy to-navy/80 text-white/70',
          className,
        )}
        aria-hidden="true"
      >
        <category.icon className={iconSize} />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP in /public
    <img
      src={thumbSrc(src)}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn('object-cover', className)}
    />
  )
}

export function ServiceCard({
  item,
  category,
  onOpen,
  className,
}: {
  item: ServiceItem
  category: ViewerCategory
  onOpen: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group/card flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-steel/30 hover:shadow-md hover:shadow-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange',
        className,
      )}
    >
      {/* overflow-hidden parent stays untransformed; zoom lives on the inner
          wrapper (WebKit clipping workaround) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <div className="absolute inset-0 transition-transform duration-500 group-hover/card:scale-105 motion-reduce:transition-none">
          <Thumb item={item} category={category} className="size-full" />
        </div>
        {item.images.length > 1 && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-navy/75 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            <Images className="size-3" />
            {item.images.length}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        {item.location && (
          <p className="mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-orange">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{item.location}</span>
          </p>
        )}
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {item.title}
        </p>
        {/* clamp lives on the inner <p>; the flex-1 wrapper absorbs extra
            height so stretched cards never reveal a 4th line */}
        <div className="mt-1 flex-1">
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>
        <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
          View details
          <ArrowRight className="size-3 text-orange transition-transform group-hover/card:translate-x-1" />
        </span>
      </div>
    </button>
  )
}

/** Dense row — Reddit-style "compact" view. */
export function ServiceRow({
  item,
  category,
  onOpen,
}: {
  item: ServiceItem
  category: ViewerCategory
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/row flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition-colors hover:border-border hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-16">
        <Thumb item={item} category={category} className="size-full" iconSize="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:line-clamp-1">{item.title}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {item.location ? (
            <>
              <MapPin className="mr-0.5 inline size-3 -translate-y-px text-orange" />
              {item.location}
              <span className="mx-1.5 text-border">•</span>
            </>
          ) : null}
          {item.desc}
        </p>
      </div>
      {item.images.length > 1 && (
        <span className="hidden shrink-0 items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex">
          <Images className="size-3" />
          {item.images.length}
        </span>
      )}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover/row:translate-x-0.5 group-hover/row:text-orange" />
    </button>
  )
}

/** Mobile card strip: native scroll-snap = smooth, momentum swipe for free. */
/**
 * Generic horizontal rail: one row of children with scroll-snap, swipe /
 * trackpad scrolling, arrow buttons that move one visible "page" at a time,
 * a "5–8 of 80" counter and a progress bar. Never grows the page vertically.
 *   itemClass — width of each child (e.g. 4 per row on desktop)
 *   tone      — 'light' (white sections) or 'dark' (navy sections)
 *   unit      — optional word after the counter, e.g. "pages"
 */
export function HRail({
  children,
  itemClass,
  tone = 'light',
  resetKey,
}: {
  children: ReactNode[]
  itemClass: string
  tone?: 'light' | 'dark'
  /** scroll back to the start when this changes (e.g. a filter) */
  resetKey?: unknown
}) {
  const ref = useRef<HTMLDivElement>(null)
  const count = children.length
  const [range, setRange] = useState({ first: 0, last: 0 })
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = ref.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const step = first.offsetWidth + 12 // + gap-3
    const idx = Math.round(el.scrollLeft / step)
    const perView = Math.max(1, Math.round((el.clientWidth + 12) / step))
    setRange({ first: idx, last: Math.min(count, idx + perView) - 1 })
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [count])

  useEffect(() => {
    ref.current?.scrollTo({ left: 0 })
    measure()
  }, [resetKey, measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  const dark = tone === 'dark'
  const progress = count ? (range.last + 1) / count : 1
  const btn = cn(
    'inline-flex size-9 items-center justify-center rounded-full border shadow-sm transition-colors disabled:opacity-30',
    dark ? 'border-white/20 bg-white/5 text-white hover:bg-white/15' : 'border-border bg-white text-navy hover:bg-secondary',
  )

  return (
    <div>
      <div
        ref={ref}
        onScroll={measure}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className={cn('shrink-0 snap-start', itemClass)}>
            {child}
          </div>
        ))}
      </div>

      {count > 1 && !(edges.start && edges.end) && (
        <div className="mt-3 flex items-center gap-3">
          <span className={cn('shrink-0 text-xs tabular-nums', dark ? 'text-white/60' : 'text-muted-foreground')}>
            {range.first + 1}
            {range.last > range.first ? `–${range.last + 1}` : ''} of {count}
          </span>
          <div className={cn('h-1 flex-1 overflow-hidden rounded-full', dark ? 'bg-white/10' : 'bg-secondary')}>
            <div
              className="h-full rounded-full bg-orange transition-[width] duration-300"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
            />
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" onClick={() => page(-1)} disabled={edges.start} aria-label="Previous" className={btn}>
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => page(1)} disabled={edges.end} aria-label="Next" className={btn}>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** 1 card ≈ 80% wide on phones, 2 on tablets, 3 on laptops, 4 on wide screens */
export const CARD_WIDTHS =
  'w-[78%] sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)] xl:w-[calc((100%-2.25rem)/4)]'

/* ------------------------------------------------------------------ */
/* category panel                                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* CatalogBrowser                                                      */
/* ------------------------------------------------------------------ */

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
  return out
}

export function CatalogBrowser({
  items,
  category,
  categoryFor,
  view,
  onViewChange,
  noun = 'items',
  group: controlledGroup,
  onGroupChange,
  footerStart,
  alwaysShowToolbar = false,
  hideGroupChips = false,
}: {
  items: ServiceItem[]
  /** used for icons/fallbacks/"Enquire" when `categoryFor` isn't given */
  category: ViewerCategory
  /** per-item category (Products mixes several groups) */
  categoryFor?: (item: ServiceItem) => ViewerCategory
  view: View
  onViewChange: (v: View) => void
  /** word used in the search placeholder, e.g. "products" */
  noun?: string
  /** optional controlled group filter (Products listens for "show me X" links) */
  group?: string | null
  onGroupChange?: (g: string | null) => void
  /** shown at the left of the footer row (e.g. "Discuss your project") */
  footerStart?: ReactNode
  /** @deprecated kept so existing callers still compile; no longer used */
  scrollTargetRef?: RefObject<HTMLElement | null>
  alwaysShowToolbar?: boolean
  /** when the page shows its own group picker (Products tiles) */
  hideGroupChips?: boolean
}) {
  const [query, setQuery] = useState('')
  const [ownGroup, setOwnGroup] = useState<string | null>(null)
  const group = controlledGroup !== undefined ? controlledGroup : ownGroup
  const setGroup = (g: string | null) => (onGroupChange ? onGroupChange(g) : setOwnGroup(g))
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const catOf = (item: ServiceItem) => (categoryFor ? categoryFor(item) : category)

  const groups = useMemo(() => {
    const counts = new Map<string, number>()
    for (const it of items) if (it.group) counts.set(it.group, (counts.get(it.group) ?? 0) + 1)
    return Array.from(counts)
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (it) =>
        (!group || it.group === group) &&
        (!q ||
          it.title.toLowerCase().includes(q) ||
          it.desc.toLowerCase().includes(q) ||
          it.location?.toLowerCase().includes(q)),
    )
  }, [items, query, group])

  const isFiltering = query.trim() !== '' || group !== null
  const rowsPerPage = useMediaQuery('(min-width: 1024px)', true) ? 10 : 6
  const showToolbar = alwaysShowToolbar || items.length > 6

  return (
    <>
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {showToolbar && (
          <label className="relative min-w-[12rem] flex-1 sm:max-w-xs">
            <span className="sr-only">Search {noun}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${items.length} ${noun}…`}
              className="w-full rounded-xl border border-border bg-white py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-steel focus:ring-4 focus:ring-steel/15"
            />
          </label>
        )}

        {groups.length > 1 && !hideGroupChips && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
            {[['All', items.length] as const, ...groups].map(([name, count]) => {
              const active = name === 'All' ? group === null : group === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setGroup(name === 'All' ? null : name)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                    active ? 'border-navy bg-navy text-white' : 'border-border bg-white text-navy hover:border-steel/40',
                  )}
                >
                  {name}
                  <span className={cn('ml-1.5 tabular-nums', active ? 'text-white/60' : 'text-muted-foreground')}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        <div className="ml-auto inline-flex rounded-xl border border-border bg-secondary/40 p-0.5" role="group" aria-label="Layout">
          {(
            [
              ['cards', LayoutGrid, 'Cards'],
              ['compact', List, 'Compact'],
            ] as const
          ).map(([v, Icon, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => onViewChange(v)}
              aria-pressed={view === v}
              title={`${label} view`}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-xs font-semibold transition-colors',
                view === v ? 'bg-white text-navy shadow-sm' : 'text-muted-foreground hover:text-navy',
              )}
            >
              <Icon className="size-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {isFiltering && (
        <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
          {filtered.length} of {items.length} shown
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setGroup(null)
            }}
            className="ml-2 font-semibold text-navy underline-offset-2 hover:underline"
          >
            Clear
          </button>
        </p>
      )}

      {/* items — always horizontal; nothing expands the page downwards */}
      <div className="mt-4">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            Nothing matches “{query}”.
          </p>
        ) : view === 'compact' ? (
          // Compact: pages of rows (2 columns × 5 on desktop, 6 rows on phones)
          <HRail itemClass="w-full" resetKey={filtered}>
            {chunk(filtered, rowsPerPage).map((pageItems, p) => (
              <div key={p} className="grid grid-cols-1 gap-x-4 gap-y-0.5 lg:grid-cols-2">
                {pageItems.map((item) => (
                  <ServiceRow
                    key={item.title}
                    item={item}
                    category={catOf(item)}
                    onOpen={() => setViewerIndex(filtered.indexOf(item))}
                  />
                ))}
              </div>
            ))}
          </HRail>
        ) : (
          <HRail itemClass={CARD_WIDTHS} resetKey={filtered}>
            {filtered.map((item, i) => (
              <ServiceCard
                key={item.title}
                item={item}
                category={catOf(item)}
                onOpen={() => setViewerIndex(i)}
                className="h-full w-full"
              />
            ))}
          </HRail>
        )}
      </div>

      {/* footer */}
      {footerStart && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">{footerStart}</div>
      )}

      <ServiceViewerPortal
        entries={filtered.map((item) => ({ item, category: catOf(item) }))}
        index={viewerIndex}
        onIndex={(i) => setViewerIndex(Math.max(0, Math.min(filtered.length - 1, i)))}
        onClose={() => setViewerIndex(null)}
      />
    </>
  )
}

/** Small link that jumps to the Projects section with a filter applied. */
export function CatalogLink({ group, count }: { group: string; count: number }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent('pbts:show-projects', { detail: { group } }))
      }
      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-navy"
    >
      View {group} ({count})
      <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
    </button>
  )
}
