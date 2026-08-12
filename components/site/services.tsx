import Image from 'next/image'
import {
  CircuitBoard,
  Cpu,
  Wrench,
  Factory,
  Boxes,
  Code2,
  MonitorCog,
  ScanEye,
  Cog,
  Building2,
  CalendarCheck,
  Lightbulb,
  ArrowRight,
} from 'lucide-react'
import { Reveal } from './reveal'

const featured = [
  {
    icon: CircuitBoard,
    title: 'Industrial PCB Repair',
    image: '/images/service-pcb.png',
    desc: 'Board-level diagnostics and component-level repair for drives, controllers, and industrial electronics.',
  },
  {
    icon: Cpu,
    title: 'Automation Engineering',
    image: '/images/service-automation.png',
    desc: 'PLC programming, control panels, and robotic cells that lift throughput and consistency.',
  },
  {
    icon: Factory,
    title: 'Industrial Fabrication',
    image: '/images/service-fabrication.png',
    desc: 'Precision metal fabrication, machining, and assembly built to exacting specifications.',
  },
]

const more = [
  { icon: Wrench, title: 'Machine Rehabilitation' },
  { icon: Boxes, title: 'System Integration' },
  { icon: Code2, title: 'Software Development' },
  { icon: MonitorCog, title: 'SCADA Systems' },
  { icon: ScanEye, title: 'Vision Systems' },
  { icon: Cog, title: 'Motor Repair' },
  { icon: Building2, title: 'Industrial Construction' },
  { icon: CalendarCheck, title: 'Preventive Maintenance' },
  { icon: Lightbulb, title: 'Engineering Consultancy' },
]

export function Services() {
  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Core Services
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            End-to-end engineering, under one roof
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            From a single failed board to a fully integrated production line, our capabilities cover
            the entire industrial lifecycle.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/15">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex size-11 items-center justify-center rounded-xl bg-white/95 text-navy shadow-lg backdrop-blur">
                    <s.icon className="size-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <a
                    href="#contact"
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy"
                  >
                    Learn more
                    <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {more.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 80}>
              <a
                href="#contact"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-4 transition-colors hover:border-steel/30 hover:bg-white"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                  <m.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{m.title}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
