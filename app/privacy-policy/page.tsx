import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | PBTS Technology',
  description:
    'How Pro Board Technology Services Corporation (PBTS Technology) collects, uses, and protects personal data.',
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
    heading: '1. Who we are',
    body: [
      'This website is operated by Pro Board Technology Services Corporation ("PBTS Technology," "we," "us," or "our"), an engineering and automation company established in 2006, with its main office in Carmona, Cavite and branch offices in Hermosa, Bataan and Lapu-Lapu City, Cebu, Philippines.',
      'This Privacy Policy explains what personal data we collect through this website, why we collect it, how we use and protect it, and the rights you have over it under the Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and Regulations, as enforced by the National Privacy Commission (NPC).',
    ],
  },
  {
    heading: '2. Information we collect',
    body: [
      'This is a corporate informational website. We do not operate an online store, and we do not require visitors to create an account to browse it.',
      'We collect personal data in the following ways:',
    ],
    list: [
      'Contact form — when you submit an inquiry, we collect your full name, company name, work email address, phone number, the service you\u2019re interested in, and the message you provide',
      'Newsletter sign-up — if you subscribe using the newsletter field in our website footer, we collect your email address to send you company updates',
    ],
    body2: [
      'We do not currently use analytics, advertising, or general-purpose tracking cookies on this website. If that changes in the future \u2014 for example, if we add website analytics to understand traffic \u2014 we will update this Policy and, where required, request your consent before any non-essential cookies are set.',
      'Our Contact page embeds a Google Maps widget to show our office location. When that map loads, Google may set its own cookies and collect technical data (such as your IP address) in accordance with Google\u2019s own Privacy Policy, independent of this website. We do not control this data collection and encourage you to review Google\u2019s privacy practices directly.',
      'Some images on this website are served from third-party content delivery networks. Loading these images may cause your device to send standard technical information (such as IP address) to that provider as part of normal web delivery; we do not use this to identify you.',
    ],
  },
  {
    heading: '3. How we use your information',
    body: [
      'We use the information you provide to:',
    ],
    list: [
      'Respond to your inquiry, quote request, or project discussion',
      'Route your message internally to the appropriate PBTS office or engineer',
      'Send you an acknowledgement confirming we received your message',
      'Send newsletter updates, if you\u2019ve subscribed \u2014 you may unsubscribe at any time',
      'Keep an internal record of business inquiries for follow-up',
    ],
  },
  {
    heading: '4. How your information is stored and protected',
    body: [
      'Information submitted through our contact form and newsletter sign-up is stored in a secured system accessible only to authorized PBTS personnel, and is used to send notification and acknowledgement emails through our email service provider.',
      'We retain your information only for as long as reasonably necessary to respond to your inquiry, provide the service you signed up for, and maintain business records, after which it may be archived or deleted in accordance with our internal data retention practices.',
      'We apply reasonable organizational, physical, and technical safeguards to protect your information from unauthorized access, alteration, disclosure, or destruction. No method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '5. Sharing of information',
    body: [
      'We do not sell, rent, or trade your personal data to third parties.',
      'Your information may be shared with:',
    ],
    list: [
      'PBTS employees or engineers at any of our offices who need it to respond to your inquiry',
      'Our email service provider, solely to deliver notification and acknowledgement emails',
      'Google, only through the embedded Maps widget on our Contact page, as described in Section 2',
      'Government authorities, where required by Philippine law or a valid legal process',
    ],
  },
  {
    heading: '6. Your rights under the Data Privacy Act',
    body: [
      'As a data subject under RA 10173, you have the right to:',
    ],
    list: [
      'Be informed that your personal data is being processed',
      'Access the personal data we hold about you',
      'Request correction of inaccurate or outdated data',
      'Object to or withdraw consent for processing, where applicable \u2014 including unsubscribing from our newsletter at any time',
      'Request erasure or blocking of your data, subject to legal or legitimate business retention requirements',
      'Lodge a complaint with the National Privacy Commission (NPC)',
    ],
    footer:
      'To exercise any of these rights, contact us using the details in Section 8 below.',
  },
  {
    heading: '7. Changes to this Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date below reflects the most recent revision. Continued use of this website after changes are posted constitutes acknowledgement of the updated Policy.',
    ],
  },
  {
    heading: '8. Contact us',
    body: [
      'If you have questions about this Privacy Policy or wish to exercise your data privacy rights, contact us at any of our offices below.',
    ],
    offices: true,
  },
]

export default function PrivacyPolicyPage() {
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
          Privacy Policy
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
                {s.list && (
                  <ul className="ml-5 list-disc space-y-1.5">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.body2 &&
                  s.body2.map((p, i) => <p key={`b2-${i}`}>{p}</p>)}
                {s.footer && <p>{s.footer}</p>}
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
