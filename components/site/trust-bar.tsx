import { Cpu, CircuitBoard, Factory, Building2, Car, Zap, Wrench } from 'lucide-react'

const industries = [
  { icon: Cpu, label: 'Semiconductor' },
  { icon: CircuitBoard, label: 'Electronics' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Building2, label: 'Construction' },
  { icon: Wrench, label: 'Maintenance' },
  { icon: Car, label: 'Automotive' },
  { icon: Zap, label: 'Energy' },
]

export function TrustBar() {
  const row = [...industries, ...industries]
  return (
    <section className="border-y border-border bg-secondary/60 py-8" aria-label="Industries served">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Powering operations across critical industries
        </p>
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap text-navy/70">
              <item.icon className="size-6 text-steel" />
              <span className="font-display text-lg font-semibold tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
