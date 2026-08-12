import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { TrustBar } from '@/components/site/trust-bar'
import { About } from '@/components/site/about'
import { WhyChoose } from '@/components/site/why-choose'
import { Services } from '@/components/site/services'
import { Projects } from '@/components/site/projects'
import { Industries } from '@/components/site/industries'
import { Timeline } from '@/components/site/timeline'
import { Testimonials } from '@/components/site/testimonials'
import { Certifications } from '@/components/site/certifications'
import { CtaBanner } from '@/components/site/cta-banner'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PBTS Technology',
  legalName: 'Pro Board Technology Services Corporation',
  description:
    'Industrial Electronics Repair, PCB Solutions, Automation Engineering, Fabrication, Construction, and Technical Services trusted by leading manufacturers since 2006.',
  foundingDate: '2006',
  areaServed: 'Philippines',
  knowsAbout: [
    'Industrial Electronics Repair',
    'PCB Repair',
    'Automation Engineering',
    'System Integration',
    'Machine Rehabilitation',
    'Industrial Construction',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Biñan',
    addressRegion: 'Laguna',
    addressCountry: 'PH',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <WhyChoose />
        <Services />
        <Projects />
        <Industries />
        <Timeline />
        <Testimonials />
        <Certifications />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
