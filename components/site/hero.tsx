import Image from 'next/image'
import { ArrowRight, Play, ShieldCheck } from 'lucide-react'
import { CountUp } from './count-up'

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 1000, suffix: '+', label: 'Projects Delivered' },
  { value: 500, suffix: '+', label: 'Corporate Clients' },
  { value: 24, suffix: '/7', label: 'Technical Support' },
]

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-automation.png"
          alt="Industrial automation factory floor with robotic machinery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
            <ShieldCheck className="size-3.5 sm:size-4 text-orange shrink-0" />
            <span>Trusted by manufacturers since 2006</span>
          </div>

          <h1 className="mt-5 sm:mt-6 font-display text-[clamp(1.3rem,6.5vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            <span className="block whitespace-nowrap">Engineering Innovation</span>
            <span className="block whitespace-nowrap">That Powers Modern</span>
            <span className="block whitespace-nowrap">Manufacturing</span>
          </h1>

          <p className="mt-5 max-w-3xl text-[15px] sm:text-base lg:text-lg leading-relaxed text-white/75 text-pretty">
            Pro Board Technology Services Corporation delivers Industrial Electronics Repair,
            Automation Engineering, PCB Solutions, Fabrication, Technical Services and
            Construction trusted by leading manufacturers across the Philippines.
          </p>

          <div className="mt-8 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all hover:brightness-105"
            >
              Request a Consultation
              <ArrowRight className="size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Play className="size-4 text-orange" />
              View Our Services
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-10 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-4 lg:max-w-2xl">
          {stats.map((s) => (
            <div key={s.label} className="p-0 text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
