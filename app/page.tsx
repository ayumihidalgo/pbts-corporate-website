import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
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

// Structured data for Google + the mobile Call/Enquire bar are both
// added once in app/layout.tsx.
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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