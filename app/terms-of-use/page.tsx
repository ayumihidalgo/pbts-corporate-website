import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Use | PBTS Technology',
  description:
    'The terms governing your use of the Pro Board Technology Services Corporation (PBTS Technology) website.',
}

const offices = [
  {
    label: 'Main Office (Cavite)',
    address:
      'B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite',
    phones: ['+63-2-8552-5131 to 32', '+63-46-430-2890'],
  },
  {
    label: 'Branch Office (Bataan)',
    address: 'B2 L2 Parkway Drive, Hermosa Ecozone Industrial Park, Palihan, Hermosa, Bataan',
    phones: ['+63-917-179-7377'],
  },
  {
    label: 'Branch Office (Cebu)',
    address: 'Blk 3 Section 11, AcaSys Homes, Kagudoy, Basak Lapu-Lapu City, Cebu, Philippines',
    phones: ['+63-917-535-0179'],
  },
]

const sections = [
  {
    heading: '1. Acceptance of these terms',
    body: [
      'These Terms of Use govern your access to and use of this website, operated by Pro Board Technology Services Corporation ("PBTS Technology," "we," "us," or "our"). By browsing or using this website, you agree to these terms. If you do not agree, please discontinue use of the site.',
    ],
  },
  {
    heading: '2. Purpose of this website',
    body: [
      'This website is provided for general informational purposes \u2014 to describe PBTS Technology\u2019s services, industries served, and company background, and to allow prospective clients to get in touch with the office nearest them.',
      'Nothing on this website constitutes an offer to enter into a contract, a quotation, or a binding proposal. Project scope, pricing, and terms of engagement are established separately and directly between PBTS Technology and a client, typically following the submission of an inquiry through this site.',
    ],
  },
  {
    heading: '3. Intellectual property',
    body: [
      'All content on this website \u2014 including text, graphics, logos, layout, photography, and video \u2014 is owned by PBTS Technology or used under license, and is protected by applicable Philippine intellectual property law, unless otherwise noted.',
      'You may view and print pages from this website for your own personal or internal business reference. You may not reproduce, distribute, modify, or otherwise use any content from this site for commercial purposes without our prior written consent.',
    ],
  },
  {
    heading: '4. Accuracy of information',
    body: [
      'We make reasonable efforts to keep the information on this website accurate and up to date, including descriptions of our services, industries, and offices. However, we do not warrant that all content is complete, current, or error-free, and information may be updated or corrected without prior notice.',
    ],
  },
  {
    heading: '5. Third-party links and embedded content',
    body: [
      'This website may contain links to third-party websites and embedded third-party content, such as the Google Maps widget on our Contact page. We do not control and are not responsible for the content, accuracy, availability, or data practices of any third-party site or embedded service. Interacting with a linked site or embedded widget is at your own discretion and risk, and subject to that provider\u2019s own terms and privacy policy.',
    ],
  },
  {
    heading: '6. No warranties',
    body: [
      'This website is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, PBTS Technology makes no warranties, express or implied, regarding the operation, availability, or content of this website.',
    ],
  },
  {
    heading: '7. Limitation of liability',
    body: [
      'To the fullest extent permitted by applicable law, PBTS Technology shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this website.',
    ],
  },
  {
    heading: '8. Governing law',
    body: [
      'These Terms of Use are governed by the laws of the Republic of the Philippines. Any disputes arising from your use of this website shall be subject to the exclusive jurisdiction of the appropriate courts of the Philippines.',
    ],
  },
  {
    heading: '9. Changes to these terms',
    body: [
      'We may revise these Terms of Use from time to time. The "Last updated" date below reflects the most recent revision. Continued use of this website after changes are posted constitutes acceptance of the updated terms.',
    ],
  },
  {
    heading: '10. Contact us',
    body: ['If you have questions about these Terms of Use, contact us at any of our offices below.'],
    offices: true,
  },
]

export default function TermsOfUsePage() {
  return (
    <main className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <span className="mt-8 block text-sm font-semibold uppercase tracking-[0.2em] text-orange">
          Legal
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: September 9, 2026</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg font-bold text-navy sm:text-xl">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.offices && (
                  <div className="mt-2 space-y-3">
                    {offices.map((o) => (
                      <div
                        key={o.label}
                        className="rounded-2xl border border-border bg-secondary/40 p-4 text-foreground"
                      >
                        <p className="font-semibold text-navy">{o.label}</p>
                        <p>{o.address}</p>
                        <p>{o.phones.join(' \u00b7 ')}</p>
                      </div>
                    ))}
                    <p>
                      Email:{' '}
                      <a
                        href="mailto:sales@pbts-tech.com"
                        className="text-navy hover:text-orange"
                      >
                        sales@pbts-tech.com
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
