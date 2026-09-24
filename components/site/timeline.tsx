import { Reveal } from './reveal'

const milestones = [
  { year: '2006', title: 'Founded', desc: 'PBTS began operations in 2006, initially focusing on the repair of industrial electronic printed circuit boards.' },
  { year: '2014', title: 'Service Expansion', desc: 'Expanded into General and Specialty Construction, offering Pre-Engineered Buildings (PEBs).' },
  { year: '2019', title: 'Cebu Branch Established', desc: 'Expanded operations and technical support to Cebu.' },
  { year: '2020', title: 'Warehouse Established', desc: 'Established a warehouse to support increased storage and operational requirements.' },
  { year: '2023', title: 'PBCON Established', desc: 'Expanded construction and project capabilities through the establishment of PBCON.' },
]

export function Timeline() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Company Capabilities
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            Two decades of steady growth
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line: vertical on mobile, horizontal on desktop */}
          <div className="absolute left-4 top-0 h-full w-px bg-border lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto" />

          <ol className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-4">
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                delay={i * 80}
                // `group` lets the marker/year/card all react together to a
                // single hover on any part of the item, via group-hover:
                className="group relative flex pl-14 lg:flex-1 lg:flex-col lg:items-center lg:pl-0 lg:text-center"
              >
                {/* marker */}
                <span className="absolute left-4 top-1.5 z-10 flex size-3 -translate-x-1/2 items-center justify-center rounded-full bg-orange/50 ring-4 ring-transparent transition-all duration-300 group-hover:bg-orange group-hover:ring-orange/20 lg:static lg:size-10 lg:translate-x-0 lg:bg-white lg:text-sm lg:font-bold lg:text-navy lg:ring-border lg:group-hover:scale-110 lg:group-hover:bg-orange lg:group-hover:text-orange-foreground lg:group-hover:ring-orange/20">
                  <span className="hidden lg:inline">{i + 1}</span>
                </span>

                {/* year + card, stacked and centered under the marker on desktop */}
                <div className="flex flex-1 flex-col lg:mt-4 lg:items-center">
                  <div className="font-display text-xl font-bold text-navy transition-colors duration-300 group-hover:text-orange">
                    {m.year}
                  </div>

                  <div className="mt-3 flex-1 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-orange/40 group-hover:shadow-lg group-hover:shadow-orange/10 lg:mt-4 lg:flex lg:w-full lg:flex-col">
                    <h3 className="text-base font-semibold text-foreground">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
