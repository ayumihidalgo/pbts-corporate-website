import { Cog, ShieldCheck, Award } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeader } from './section-header'
import { VerifiedCertificates } from './verified-certificates'

/**
 * Credentials section, shown right after the Hero (see app/page.tsx).
 * The two documented credentials (PCAB license, ISO 9001) lead as large
 * cards. The three supporting statements sit below as a quieter row, so they
 * never compete with the documents. Re-word or remove any of them that you
 * cannot back up with a document or a real practice.
 */
const standards = [
  { icon: ShieldCheck, title: 'Safety Compliance', desc: 'OSH-aligned safety protocols on every site' },
  { icon: Award, title: 'Quality Management', desc: 'ISO-aligned quality assurance processes' },
  { icon: Cog, title: 'Engineering Standards', desc: 'Certified engineering methodologies' },
]

export function Certifications() {
  return (
    <section id="certifications" className="bg-secondary/50 py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          size="sm"
          eyebrow="Credentials"
          title="Licensed and certified"
          intro="Our contractor license and quality certificate, available to view for your procurement file."
        />

        <div className="mt-7">
          <VerifiedCertificates />
        </div>

        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Standards we work to
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {standards.map((s, i) => (
            <Reveal key={s.title} delay={i * 70} className="h-full">
              <div className="group flex h-full items-start gap-3 rounded-xl border border-border bg-white/70 p-4 transition-colors duration-300 hover:border-orange/30 hover:bg-white">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange group-hover:text-orange-foreground">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
