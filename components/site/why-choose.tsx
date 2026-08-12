import {
  Users,
  Timer,
  Settings2,
  Cpu,
  MapPin,
  LifeBuoy,
  BadgeCheck,
  HardHat,
} from 'lucide-react'
import { Reveal } from './reveal'

const reasons = [
  { icon: Users, title: 'Expert Engineers', desc: 'A multidisciplinary team with deep field experience across electronics, controls, and mechanical systems.' },
  { icon: Timer, title: 'Fast Turnaround', desc: 'Rapid diagnostics and repair to minimize costly downtime and get your lines running again.' },
  { icon: Settings2, title: 'Customized Solutions', desc: 'Every system is engineered around your process, footprint, and production targets.' },
  { icon: Cpu, title: 'Advanced Technology', desc: 'Modern test benches, automation platforms, and diagnostic tooling for precise results.' },
  { icon: MapPin, title: 'Nationwide Support', desc: 'On-site service teams ready to deploy to plants and facilities across the country.' },
  { icon: LifeBuoy, title: 'Reliable After-Sales', desc: 'Long-term maintenance, spare parts, and responsive technical support you can depend on.' },
  { icon: BadgeCheck, title: 'Quality Assurance', desc: 'Rigorous testing and documentation on every deliverable, aligned to ISO standards.' },
  { icon: HardHat, title: 'Safety First', desc: 'A safety-led culture that protects your people, assets, and continuity of operations.' },
]

export function WhyChoose() {
  return (
    <section className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Why Choose PBTS
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            The engineering partner manufacturers rely on
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            We combine speed, precision, and accountability to keep your operations productive and
            future-ready.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 90}>
              <div className="group h-full rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-steel/30 hover:shadow-xl hover:shadow-navy/10">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                  <r.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
