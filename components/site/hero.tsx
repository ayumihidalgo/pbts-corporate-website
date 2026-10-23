'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { ArrowRight, LayoutGrid, ShieldCheck } from 'lucide-react'
import { CountUp } from './count-up'
import { BlueprintGrid } from './blueprint-grid'
import { cn } from '@/lib/utils'

// The 3D steel-frame model (hero-building.tsx) is loaded only when useCan3D()
// says yes, so phones never download three.js.
const HeroBuilding = dynamic(() => import('./hero-building'), { ssr: false })

/**
 * 3D only on desktop-width screens with WebGL, when the visitor hasn't asked
 * for reduced motion or data saving. Everyone else keeps the photo hero.
 */
function useCan3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const check = () => {
      if (!mq.matches || saveData) return setOk(false)
      try {
        const c = document.createElement('canvas')
        setOk(!!(c.getContext('webgl2') || c.getContext('webgl')))
      } catch {
        setOk(false)
      }
    }
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [])
  return ok
}

// PLACEHOLDER figures — replace with confirmed numbers before launch.
const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 1000, suffix: '+', label: 'Projects Delivered' },
  { value: 500, suffix: '+', label: 'Corporate Clients' },
  { value: 24, suffix: '/7', label: 'Technical Support' },
]

const headline = [
  { text: 'Industrial Engineering,' },
  { text: 'Automation &' },
  { text: 'Construction.', accent: true },
]

const ease = [0.22, 1, 0.36, 1] as const

// one orchestrated entrance: badge → headline lines → copy → buttons → stats
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export function Hero() {
  const show3d = useCan3D()

  return (
    // 100svh = the visible height on phones (excludes the browser's address
    // bar), so the stats row is never pushed under the fold
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        {/* photo settles from a slight zoom on load (one-time, not looping) */}
        <motion.div
          className={cn('absolute inset-0 transition-opacity duration-1000', show3d && 'opacity-30')}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src="/images/hero-automation.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        {show3d ? (
          // fades out under the headline so the text always stays readable
          <HeroBuilding className="absolute inset-y-0 right-0 w-[62%] [mask-image:linear-gradient(to_right,transparent_5%,black_45%)]" />
        ) : (
          <BlueprintGrid fade="right" className="opacity-70" />
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:px-8"
      >
        <div className="pointer-events-auto max-w-5xl xl:max-w-6xl">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm sm:text-xs"
          >
            <ShieldCheck className="size-3.5 shrink-0 text-orange sm:size-4" />
            <span>Trusted by manufacturers since 2006</span>
          </motion.div>

          {/* each phrase is its own line and rises in turn; long phrases
              still wrap inside their line on narrow phones */}
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl xl:text-7xl">
            {headline.map((line) => (
              <motion.span
                key={line.text}
                variants={item}
                className={line.accent ? 'block text-orange' : 'block'}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* orange "construction line" that draws in under the headline */}
          <motion.span
            aria-hidden="true"
            className="mt-6 block h-1 w-24 origin-left rounded-full bg-orange"
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.8, ease } },
            }}
          />

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 text-pretty sm:text-base lg:text-lg"
          >
            Pro Board Technology Services Corporation provides Industrial Electronics Repair,
            Automation Solutions, PCB Services, Fabrication, Technical services, and Construction
            support for Manufacturing and Industrial Operations.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all hover:-translate-y-0.5 hover:brightness-105 sm:px-7 sm:py-4 sm:text-base"
            >
              Request a Consultation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:px-7 sm:py-4 sm:text-base"
            >
              <LayoutGrid className="size-4 text-orange" />
              View Our Services
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="pointer-events-auto mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-10 sm:gap-x-6 sm:gap-y-6 lg:max-w-2xl lg:grid-cols-4 lg:divide-x lg:divide-white/10"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:pl-6 lg:text-left lg:first:pl-0">
              <div className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
