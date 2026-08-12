import { Reveal } from './reveal'

const milestones = [
  { year: '2006', title: 'Founded', desc: 'PBTS opens its doors with a focus on industrial electronics repair.' },
  { year: '2010', title: 'Automation Division', desc: 'Expanded into PLC, controls, and full automation engineering.' },
  { year: '2014', title: 'Fabrication & Integration', desc: 'Added in-house fabrication and system integration capabilities.' },
  { year: '2020', title: 'Nationwide Reach', desc: 'Scaled field-service teams to support plants across the country.' },
  { year: '2025', title: 'Smart Manufacturing', desc: 'Delivering SCADA, vision systems, and Industry 4.0 solutions.' },
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
          <div className="absolute left-4 top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
          <ol className="space-y-10 lg:space-y-0">
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                delay={i * 80}
                className={`relative pl-14 lg:flex lg:min-h-32 lg:items-center lg:pl-0 ${
                  i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                }`}
              >
                <span className="absolute left-4 top-1.5 z-10 size-3 -translate-x-1/2 rounded-full bg-orange ring-4 ring-orange/20 lg:left-1/2" />
                <div
                  className={`rounded-2xl border border-border bg-white p-6 shadow-sm lg:w-[calc(50%-2.5rem)] ${
                    i % 2 === 0 ? '' : 'lg:text-right'
                  }`}
                >
                  <div className="font-display text-2xl font-bold text-navy">{m.year}</div>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
