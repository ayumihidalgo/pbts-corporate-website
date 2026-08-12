import {
  Cpu,
  Factory,
  CircuitBoard,
  HeartPulse,
  Car,
  Utensils,
  Boxes,
  Zap,
  Building2,
} from 'lucide-react'
import { Reveal } from './reveal'

const industries = [
  { icon: Cpu, label: 'Semiconductor' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: CircuitBoard, label: 'Electronics' },
  { icon: HeartPulse, label: 'Medical' },
  { icon: Car, label: 'Automotive' },
  { icon: Utensils, label: 'Food & Beverage' },
  { icon: Boxes, label: 'Industrial Plants' },
  { icon: Zap, label: 'Energy' },
  { icon: Building2, label: 'Construction' },
]

export function Industries() {
  return (
    <section id="industries" className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Industries We Serve
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            Specialized expertise, sector by sector
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.label} delay={(i % 3) * 90}>
              <div className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-steel/30 hover:shadow-xl hover:shadow-navy/10">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <ind.icon className="size-7" />
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {ind.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
