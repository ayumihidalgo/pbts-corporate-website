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

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-28 pb-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
            <ShieldCheck className="size-4 text-orange" />
            Trusted by manufacturers since 2006
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineering Innovation That Powers Modern Manufacturing
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">
            PBTS delivers Industrial Electronics Repair, Automation Engineering, PCB Solutions,
            Fabrication, Construction, and Technical Services trusted by leading manufacturers
            across the Philippines.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-4 text-base font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all hover:brightness-105"
            >
              Request a Consultation
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Play className="size-4 text-orange" />
              View Our Services
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:mt-20 lg:grid-cols-4 lg:max-w-4xl">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy/20 p-6 text-center lg:text-left">
              <div className="font-display text-3xl font-bold text-white lg:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
