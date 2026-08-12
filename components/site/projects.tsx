import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

const projects = [
  {
    image: '/images/project-erp.png',
    industry: 'Software Develepment',
    title: 'Enterprise Resource Planning System',
    result: 'Unified finance, sales, and warehouse operations in one dashboard',
    challenge:
      'Growing manufacturers often run finance, purchasing, and warehouse operations on disconnected spreadsheets and manual approvals, creating blind spots and slowing decisions.',
    span: 'lg:col-span-2',
  },
  {
    image: '/images/project-omron.png',
    industry: 'Manufacturing',
    title: 'Omron Industrial Automation',
    result: 'Synchronized multi-axis motion across the production line',
    challenge:
      'Legacy standalone controllers made it difficult to coordinate timing across multiple machines, causing misalignment and slower changeovers.',
    span: '',
  },
  {
    image: '/images/project-construction.png',
    industry: 'Construction',
    title: 'Underground 180cum Water Tank Construction',
    result: 'Delivered 2 weeks ahead of schedule',
    challenge:
      'A growing manufacturer needed a new production hall with full electrical and mechanical fit-out.',
    span: '',
  },
  {
    image: '/images/project-PUDUT300.png',
    industry: 'Automation Engineering',
    title: 'PUDU T300: Industrial Delivery Robot',
    result: 'Autonomous line-side, WIP, and quality-inspection delivery',
    challenge:
      'Manufacturing facilities often rely on manual runners for line-side, WIP, and inspection material transport — a bottleneck the T300 is built to eliminate.',
    span: 'lg:col-span-2',
  }
]

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Featured Projects
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Real outcomes for demanding operations
          </h2>
          <p className="mt-5 text-lg text-white/60 text-pretty">
            A selection of engineering challenges we&apos;ve solved for manufacturers and industrial
            plants.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100} className={p.span}>
              <article className="group relative h-80 overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <span className="inline-flex w-fit items-center rounded-full bg-orange/90 px-3 py-1 text-xs font-semibold text-orange-foreground">
                    {p.industry}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium text-orange">{p.result}</p>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {p.challenge}
                  </p>
                </div>
                <span className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-orange">
                  <ArrowUpRight className="size-5" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
