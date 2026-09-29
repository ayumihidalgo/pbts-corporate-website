'use client'

/**
 * Services section.
 *
 * Content lives in ./services-data.ts. This file is UI only:
 *   - 10 category tiles; clicking one expands a panel under its row
 *   - panel toolbar: search, group chips, Cards / Compact view toggle
 *     (the view choice is remembered per browser)
 *   - Cards view: 2–4 column grid with clamped text on desktop, a swipeable
 *     strip on mobile. Compact view: dense list rows with small thumbnails.
 *   - long categories show the first few items + a "Show all N" toggle
 *   - clicking any item opens a detail viewer: swipeable photo gallery, full
 *     description + lists, prev/next item, and "Enquire" (pre-fills the
 *     contact form's service + message, then scrolls there)
 *   - viewer keys: ← → photos · J / K previous / next item · Esc closes
 */

import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Images,
  LayoutGrid,
  List,
  MapPin,
  Search,
  X,
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'
import { serviceCategories as categories, type ServiceCategory, type ServiceItem } from './services-data'

export { SERVICE_CATEGORY_SLUGS } from './services-data'

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

type View = 'cards' | 'compact'
const VIEW_KEY = 'pbts:services-view'
// how many items show before "Show all" (search/filter results always show all)
const INITIAL_LIMIT: Record<View, number> = { cards: 8, compact: 10 }

const isExternal = (src: string) => /^https?:\/\//.test(src)
const thumbSrc = (src: string) => (isExternal(src) ? src : `${src}-sm.webp`)
const fullSrc = (src: string) => (isExternal(src) ? src : `${src}.webp`)

function useMediaQuery(query: string, initial: boolean) {
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
function useViewPreference(): [View, (v: View) => void] {
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

/** Horizontal swipe on touch/pen (mouse drags are ignored so text stays selectable). */
function useSwipe(onLeft: () => void, onRight: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onPointerDown: (e: ReactPointerEvent) => {
      if (e.pointerType === 'mouse') return
      start.current = { x: e.clientX, y: e.clientY }
    },
    onPointerUp: (e: ReactPointerEvent) => {
      const s = start.current
      start.current = null
      if (!s) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return
      if (dx < 0) onLeft()
      else onRight()
    },
    onPointerCancel: () => {
      start.current = null
    },
  }
}

/** Pre-fill contact.tsx's (uncontrolled) form fields, then scroll to it. */
function enquireAbout(category: ServiceCategory, item?: ServiceItem) {
  const option = item?.contactService ?? category.contactService
  const select = document.getElementById('service') as HTMLSelectElement | null
  if (select && option && Array.from(select.options).some((o) => o.text === option)) {
    select.value = option
  }
  const message = document.getElementById('message') as HTMLTextAreaElement | null
  if (message && item && !message.value.trim()) {
    message.value = `Hi PBTS, I'd like to know more about: ${item.title}${
      item.location ? ` (${item.location})` : ''
    }.\n\n`
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.setTimeout(() => message?.focus({ preventScroll: true }), 700)
}

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function Thumb({
  item,
  category,
  className,
  iconSize = 'size-8',
}: {
  item: ServiceItem
  category: ServiceCategory
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
function ServiceCard({
  item,
  category,
  onOpen,
  className,
}: {
  item: ServiceItem
  category: ServiceCategory
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
function ServiceRow({
  item,
  category,
  onOpen,
}: {
  item: ServiceItem
  category: ServiceCategory
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
function SwipeStrip({
  items,
  category,
  onOpen,
}: {
  items: ServiceItem[]
  category: ServiceCategory
  onOpen: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    ref.current?.scrollTo({ left: 0 })
    setPos(0)
  }, [items])

  const onScroll = () => {
    const el = ref.current
    if (!el || !el.firstElementChild) return
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 12 // + gap-3
    setPos(Math.min(items.length - 1, Math.round(el.scrollLeft / w)))
  }

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <ServiceCard
            key={item.title}
            item={item}
            category={category}
            onOpen={() => onOpen(i)}
            className="w-[78%] shrink-0 snap-start"
          />
        ))}
      </div>
      {items.length > 1 && (
        <p className="mt-2 text-center text-xs tabular-nums text-muted-foreground">
          {pos + 1} / {items.length} · swipe for more
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* detail viewer                                                       */
/* ------------------------------------------------------------------ */

function ServiceViewer({
  category,
  items,
  index,
  onIndex,
  onClose,
}: {
  category: ServiceCategory
  items: ServiceItem[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const item = items[index]
  const [photo, setPhoto] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const photos = item.images
  const hasPrevItem = index > 0
  const hasNextItem = index < items.length - 1

  // reset photo + scroll when the item changes
  useEffect(() => {
    setPhoto(0)
    textRef.current?.scrollTo({ top: 0 })
  }, [index])

  const prevPhoto = useCallback(
    () => setPhoto((p) => (photos.length ? (p - 1 + photos.length) % photos.length : 0)),
    [photos.length],
  )
  const nextPhoto = useCallback(
    () => setPhoto((p) => (photos.length ? (p + 1) % photos.length : 0)),
    [photos.length],
  )

  // lock page scroll, focus close button, restore focus on unmount
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prevPhoto()
      else if (e.key === 'ArrowRight') nextPhoto()
      else if ((e.key === 'j' || e.key === 'J') && hasNextItem) onIndex(index + 1)
      else if ((e.key === 'k' || e.key === 'K') && hasPrevItem) onIndex(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prevPhoto, nextPhoto, onIndex, index, hasNextItem, hasPrevItem])

  // warm the cache for the next photo so swiping feels instant
  useEffect(() => {
    if (photos.length > 1) {
      const img = new Image()
      img.src = fullSrc(photos[(photo + 1) % photos.length])
    }
  }, [photo, photos])

  const swipe = useSwipe(nextPhoto, prevPhoto)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-viewer-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:h-[min(85vh,720px)] md:flex-row"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-md hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          <X className="size-4" />
        </button>

        {/* gallery */}
        <div className="relative flex shrink-0 flex-col bg-navy md:w-[58%]">
          <div
            className="relative aspect-[4/3] w-full touch-pan-y select-none md:aspect-auto md:flex-1"
            {...swipe}
          >
            {photos.length ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photos[photo]}
                src={fullSrc(photos[photo])}
                alt={`${item.title}${photos.length > 1 ? ` — photo ${photo + 1} of ${photos.length}` : ''}`}
                className="absolute inset-0 size-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
                <category.icon className="size-12" />
                <span className="text-xs">Photos coming soon</span>
              </div>
            )}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow hover:bg-white"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow hover:bg-white"
                >
                  <ChevronRight className="size-4" />
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-navy/70 px-1.5 py-0.5 text-[11px] tabular-nums text-white">
                  {photo + 1} / {photos.length}
                </span>
              </>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === photo}
                  className={cn(
                    'size-12 shrink-0 overflow-hidden rounded-md ring-2 transition-opacity',
                    i === photo ? 'opacity-100 ring-orange' : 'opacity-60 ring-transparent hover:opacity-100',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbSrc(src)} alt="" className="size-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* text */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div ref={textRef} className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-orange">
              <span>{category.title}</span>
              {item.group && (
                <>
                  <span className="text-border">/</span>
                  <span>{item.group}</span>
                </>
              )}
            </p>
            <h3
              id="service-viewer-title"
              className="mt-2 pr-8 font-display text-xl font-bold leading-tight text-navy sm:text-2xl"
            >
              {item.title}
            </h3>
            {item.location && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5 text-orange" />
                {item.location}
              </p>
            )}
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{item.desc}</p>
              {item.more?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {item.lists?.map((list) => (
              <div key={list.title} className="mt-5">
                <p className="text-sm font-semibold text-navy">{list.title}</p>
                <ul className="mt-2 space-y-1.5">
                  {list.items.map((li) => (
                    <li key={li} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3 sm:px-5">
            <button
              type="button"
              onClick={() => {
                onClose()
                // wait for the viewer to unmount (restores page scrolling) before scrolling
                window.setTimeout(() => enquireAbout(category, item), 50)
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-orange-foreground transition-opacity hover:opacity-90 sm:flex-none"
            >
              Enquire about this
              <ArrowRight className="size-4" />
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => onIndex(index - 1)}
                disabled={!hasPrevItem}
                aria-label="Previous item (K)"
                title="Previous (K)"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-navy hover:bg-secondary disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="min-w-[3.5rem] text-center text-xs tabular-nums text-muted-foreground">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => onIndex(index + 1)}
                disabled={!hasNextItem}
                aria-label="Next item (J)"
                title="Next (J)"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-navy hover:bg-secondary disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* category panel                                                      */
/* ------------------------------------------------------------------ */

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
  const isDesktop = useMediaQuery('(min-width: 640px)', true)
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const panelTopRef = useRef<HTMLDivElement>(null)

  const groups = useMemo(() => {
    const counts = new Map<string, number>()
    for (const it of category.items) if (it.group) counts.set(it.group, (counts.get(it.group) ?? 0) + 1)
    return Array.from(counts)
  }, [category])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return category.items.filter(
      (it) =>
        (!group || it.group === group) &&
        (!q ||
          it.title.toLowerCase().includes(q) ||
          it.desc.toLowerCase().includes(q) ||
          it.location?.toLowerCase().includes(q)),
    )
  }, [category, query, group])

  const isFiltering = query.trim() !== '' || group !== null
  const limit = INITIAL_LIMIT[view]
  const useStrip = view === 'cards' && !isDesktop
  const canCollapse = !isFiltering && !useStrip && filtered.length > limit
  const visible = canCollapse && !expanded ? filtered.slice(0, limit) : filtered
  const showToolbar = category.items.length > 6

  const collapse = () => {
    setExpanded(false)
    // keep the reader oriented after the list shrinks
    requestAnimationFrame(() => panelTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

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
          <div className="flex items-start gap-4">
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

          {/* toolbar */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {showToolbar && (
              <label className="relative min-w-[12rem] flex-1 sm:max-w-xs">
                <span className="sr-only">Search {category.title}</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${category.items.length} items…`}
                  className="w-full rounded-xl border border-border bg-secondary/40 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-steel focus:bg-white focus:ring-4 focus:ring-steel/15"
                />
              </label>
            )}

            {groups.length > 1 && (
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
                {[['All', category.items.length] as const, ...groups].map(([name, count]) => {
                  const active = name === 'All' ? group === null : group === name
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setGroup(name === 'All' ? null : name)}
                      aria-pressed={active}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                        active
                          ? 'border-navy bg-navy text-white'
                          : 'border-border bg-white text-navy hover:border-steel/40',
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

            <div
              className="ml-auto inline-flex rounded-xl border border-border bg-secondary/40 p-0.5"
              role="group"
              aria-label="Layout"
            >
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
              {filtered.length} of {category.items.length} shown
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

          {/* items */}
          <div className="mt-4">
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
                Nothing matches “{query}”.
              </p>
            ) : view === 'compact' ? (
              <div className="grid grid-cols-1 gap-x-4 gap-y-0.5 lg:grid-cols-2">
                {visible.map((item) => (
                  <ServiceRow
                    key={item.title}
                    item={item}
                    category={category}
                    onOpen={() => setViewerIndex(filtered.indexOf(item))}
                  />
                ))}
              </div>
            ) : useStrip ? (
              <SwipeStrip items={filtered} category={category} onOpen={setViewerIndex} />
            ) : (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((item) => (
                  <ServiceCard
                    key={item.title}
                    item={item}
                    category={category}
                    onOpen={() => setViewerIndex(filtered.indexOf(item))}
                  />
                ))}
              </div>
            )}
          </div>

          {/* footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => enquireAbout(category)}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              Discuss your project with us
              <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
            </button>
            {canCollapse && (
              <button
                type="button"
                onClick={() => (expanded ? collapse() : setExpanded(true))}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-secondary"
              >
                {expanded ? (
                  <>
                    Show less <ChevronsUp className="size-4" />
                  </>
                ) : (
                  <>
                    Show all {filtered.length} <ChevronsDown className="size-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {viewerIndex !== null &&
        filtered[viewerIndex] &&
        // portal to <body> so no transformed/overflow-hidden ancestor can clip it
        createPortal(
          <ServiceViewer
            category={category}
            items={filtered}
            index={viewerIndex}
            onIndex={(i) => setViewerIndex(Math.max(0, Math.min(filtered.length - 1, i)))}
            onClose={() => setViewerIndex(null)}
          />,
          document.body,
        )}
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
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Core Services
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            End-to-end engineering, under one roof
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            From a single failed board to a fully built facility, our capabilities cover the
            entire industrial lifecycle. Select a category to explore.
          </p>
        </Reveal>

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
