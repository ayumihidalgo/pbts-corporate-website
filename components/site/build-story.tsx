'use client'

/**
 * "How we build" — the cinematic, scroll-driven section.
 *
 * The section is tall (one screen per chapter); inside it a full-screen stage
 * stays pinned while you scroll, and scroll position drives the 3D building
 * from setting-out lines to a working production line, then a render sweep
 * turns the blueprint into the finished, sunlit facility (Handover). Each chapter names the
 * PBTS service behind that stage and opens it in the Services section.
 *
 * Fallbacks: Reduce Motion, Data Saver or no WebGL get a plain numbered list
 * of the same chapters (no pinning, no 3D download). The chapter text is also
 * in the page as a screen-reader list either way.
 */

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BlueprintGrid } from './blueprint-grid'
import { SectionHeader } from './section-header'
import { scrollToY } from './smooth-scroll'

const StoryCanvas = dynamic(() => import('./build-story-canvas'), { ssr: false })

type Chapter = {
  title: string
  body: string
  links?: { label: string; slug: string }[]
  /** "View completed projects" (scrolls to the Projects section) */
  projects?: boolean
  cta?: boolean
}

// Copy is drawn from services-data.ts so it matches the Services section.
const chapters: Chapter[] = [
  {
    title: 'Groundwork',
    body: 'Setting-out, excavation and foundation pads come first: the civil and structural works that form the backbone of an industrial facility.',
    links: [{ label: 'Civil/Structural', slug: 'civil-structural' }],
  },
  {
    title: 'Steel frame',
    body: 'Columns, rafters, purlins and bracing go up bay by bay. Structural steel erection and roof framing, built from the ground up.',
    links: [{ label: 'Warehouses', slug: 'warehouses' }],
  },
  {
    title: 'Enclosure',
    body: 'Metal roofing and wall cladding close the building in, ready for interior fit-out for warehouse and office use.',
    links: [{ label: 'Steel structures & PEB', slug: 'civil-structural' }],
  },
  {
    title: 'Power & services',
    body: 'Distribution panels and cabling, insulated HVAC ductwork, and fire sprinkler mains and branch lines, installed and tested.',
    links: [
      { label: 'Electrical', slug: 'electrical' },
      { label: 'Mechanical', slug: 'mechanical' },
    ],
  },
  {
    title: 'Production line',
    body: 'Custom machines, assembly presses, inspection systems and material-handling automation, built for the line inside.',
    links: [{ label: 'Automation & Engineering', slug: 'automation-engineering' }],
  },
  {
    title: 'Handover',
    body: 'Tested, commissioned and handed over: the drawings become a working facility, ready to run from day one.',
    projects: true,
  },
  {
    title: 'Support',
    body: 'After handover we stay on: maintenance, spare parts and technical assistance from our offices in Cavite, Bataan and Cebu.',
    cta: true,
  },
]

const N = chapters.length
const num = (i: number) => String(i + 1).padStart(2, '0')

const openService = (slug: string) =>
  window.dispatchEvent(new CustomEvent('pbts:open-service-category', { detail: { slug } }))

/** cinematic unless the visitor (or their device) asks for less */
function useCinematic() {
  const [ok, setOk] = useState(true) // SSR + most visitors: cinematic layout
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    let webgl = false
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      webgl = false
    }
    if (reduce || saveData || !webgl) setOk(false)
  }, [])
  return ok
}

function ChapterLinks({ chapter, dark = true }: { chapter: Chapter; dark?: boolean }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      {chapter.links?.map((l) => (
        <button
          key={l.label}
          type="button"
          onClick={() => openService(l.slug)}
          className={cn(
            'group/link inline-flex items-center gap-2 text-sm font-semibold',
            dark ? 'text-white' : 'text-navy',
          )}
        >
          {l.label}
          <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
        </button>
      ))}
      {chapter.projects && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('pbts:show-projects', { detail: {} }))}
          className={cn('group/link inline-flex items-center gap-2 text-sm font-semibold', dark ? 'text-white' : 'text-navy')}
        >
          View completed projects
          <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
        </button>
      )}
      {chapter.cta && (
        <a
          href="#contact"
          className="group/cta inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          Discuss your project
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
        </a>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* static fallback                                                     */
/* ------------------------------------------------------------------ */

function StaticStory() {
  return (
    <section id="how-we-build" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="How we build"
          title="From groundwork to production line"
          intro="One team for every stage of an industrial facility."
        />
        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => (
            <li key={c.title} className="border-t border-border pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange">
                {num(i)} / {num(N - 1)}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <ChapterLinks chapter={c} dark={false} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* cinematic                                                           */
/* ------------------------------------------------------------------ */

function CinematicStory() {
  const container = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const [index, setIndex] = useState(0)
  const [near, setNear] = useState(false) // start loading 3D a screen early
  const [active, setActive] = useState(false) // render only while on screen
  const [ready, setReady] = useState(false)

  const [started, setStarted] = useState(false) // hides the scroll hint
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(N - 1, Math.max(0, Math.floor(v * N))))
    setStarted(v > 0.03)
  })

  useEffect(() => {
    const el = container.current
    if (!el) return
    const pre = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '100% 0px' })
    const on = new IntersectionObserver(([e]) => setActive(e.isIntersecting))
    pre.observe(el)
    on.observe(el)
    return () => {
      pre.disconnect()
      on.disconnect()
    }
  }, [])

  // jump to the middle of a chapter (rail buttons)
  const goTo = (i: number) => {
    const el = container.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    scrollToY(top + span * ((i + 0.6) / N))
  }

  const chapter = chapters[index]
  const daylight = index >= chapters.findIndex((c) => c.title === 'Handover')

  return (
    <section
      id="how-we-build"
      ref={container}
      aria-labelledby="how-we-build-title"
      className="relative bg-navy"
      style={{ height: `${N * 95 + 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* stage */}
        <BlueprintGrid className={cn('transition-opacity duration-1000', ready ? 'opacity-20' : 'opacity-70')} />
        <div className={cn('absolute inset-0 transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0')}>
          {near && <StoryCanvas progress={scrollYProgress} active={active} onReady={() => setReady(true)} />}
        </div>
        {/* readability: darken only where the caption sits (left on desktop,
            bottom on phones); lighter once the render turns to daylight */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-navy via-navy/75 to-transparent lg:hidden" />
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-navy to-transparent transition-opacity duration-700 lg:block',
            daylight ? 'via-navy/45 opacity-90' : 'via-navy/60',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-navy to-transparent transition-[height] duration-700',
            daylight ? 'h-64 via-navy/80 lg:h-48' : 'h-36 via-navy/60',
          )}
        />
        {/* behind the chapter rail */}
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 hidden w-64 bg-gradient-to-l to-transparent transition-opacity duration-700 sm:block',
            daylight ? 'from-navy/55' : 'from-navy/85',
          )}
        />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pb-28 pt-24 sm:pb-10 lg:px-8 lg:pt-28">
          {/* persistent title */}
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              <span aria-hidden="true" className="h-px w-6 bg-orange/70" />
              How we build
            </span>
            <h2
              id="how-we-build-title"
              className="mt-3 max-w-xl font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl"
            >
              From groundwork to production line
            </h2>
          </div>

          {/* chapter caption */}
          <div className="mt-auto lg:mb-auto lg:mt-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(4px)', transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md"
                aria-live="polite"
              >
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                  <span className="text-orange">{num(index)}</span> / {num(N - 1)}
                </p>
                <h3 className="mt-3 font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{chapter.body}</p>
                <ChapterLinks chapter={chapter} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* chapter rail */}
        <nav
          aria-label="How we build chapters"
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block lg:right-8"
        >
          <div className="relative flex flex-col gap-4 pl-5">
            <div className="absolute bottom-1 left-0 top-1 w-px bg-white/15" />
            <motion.div
              className="absolute left-0 top-1 w-px origin-top bg-orange"
              style={{ scaleY: scrollYProgress, height: 'calc(100% - 0.5rem)' }}
            />
            {chapters.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index ? 'step' : undefined}
                className={cn(
                  'group flex items-center gap-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                  i === index ? 'text-white' : 'text-white/35 hover:text-white/70',
                )}
              >
                <span className={cn('tabular-nums', i <= index && 'text-orange')}>{num(i)}</span>
                <span className="hidden lg:inline">{c.title}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* scroll hint */}
        <motion.div
          animate={{ opacity: started ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50"
        >
          Scroll to build
          <ChevronDown className="size-4 animate-bounce text-orange" />
        </motion.div>
      </div>

      {/* full text for screen readers and search engines */}
      <ol className="sr-only">
        {chapters.map((c) => (
          <li key={c.title}>
            {c.title}: {c.body}
          </li>
        ))}
      </ol>
    </section>
  )
}

export function BuildStory() {
  const cinematic = useCinematic()
  return cinematic ? <CinematicStory /> : <StaticStory />
}
