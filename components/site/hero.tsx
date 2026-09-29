import Image from 'next/image'
import { ArrowRight, LayoutGrid, ShieldCheck } from 'lucide-react'
import { CountUp } from './count-up'

// PLACEHOLDER figures — replace with confirmed numbers before launch.
const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 1000, suffix: '+', label: 'Projects Delivered' },
  { value: 500, suffix: '+', label: 'Corporate Clients' },
  { value: 24, suffix: '/7', label: 'Technical Support' },
]

export function Hero() {
  return (
    // 100svh = the visible height on phones (excludes the browser's address
    // bar), so the stats row is never pushed under the fold
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-automation.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:px-8">
        <div className="max-w-5xl xl:max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm sm:text-xs">
            <ShieldCheck className="size-3.5 shrink-0 text-orange sm:size-4" />
            <span>Trusted by manufacturers since 2006</span>
          </div>

          {/* each phrase is its own line on wider screens; on narrow phones
              the lines wrap naturally instead of overflowing */}
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl xl:text-7xl">
            <span className="sm:block">Industrial Engineering,</span>{' '}
            <span className="sm:block">Automation &amp;</span>{' '}
            <span className="text-orange sm:block">Construction.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 text-pretty sm:text-base lg:text-lg">
            Pro Board Technology Services Corporation provides Industrial Electronics Repair,
            Automation Solutions, PCB Services, Fabrication, Technical services, and Construction
            support for Manufacturing and Industrial Operations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all hover:brightness-105 sm:px-7 sm:py-4 sm:text-base"
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
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-10 sm:gap-x-6 sm:gap-y-6 lg:max-w-2xl lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
