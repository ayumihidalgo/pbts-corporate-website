import Image from 'next/image'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

const highlights = [
  'Established in 2006',
  'Engineering Excellence',
  'Innovation-Driven',
  'Safety First Culture',
  'ISO-Aligned Standards',
  'Regional Reach',
]

export function About() {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[720/820] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-navy/10">
            <video
              src="/videos/PBTS-Bataan-Hermosa.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-white p-6 shadow-xl sm:block lg:-right-6">
            <div className="font-display text-4xl font-bold text-navy">2006</div>
            <div className="mt-1 max-w-[9rem] text-sm text-muted-foreground">
              Engineering excellence, delivered ever since
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              About PBTS
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
              Two decades of solving the toughest engineering problems
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Pro Board Technology Services Corporation started in 2006 as a circuit board repair shop and has grown into a provider of custom electro-mechanical equipment and full-scale construction services. Backed by financial strength and a 100% completion record, PBTS delivers residential, industrial, and infrastructure projects across Bataan under a strict "zero-time accident" safety culture.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="size-5 shrink-0 text-steel" />
                  <span className="font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-navy"
            >
              Download Company Profile
              <ArrowRight className="size-4 text-orange transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
