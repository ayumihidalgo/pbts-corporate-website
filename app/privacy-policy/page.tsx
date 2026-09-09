import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | PBTS Technology',
  description:
    'How Pro Board Technology Services Corporation (PBTS Technology) collects, uses, and protects personal data.',
}

const sections = [
  {
    heading: '1. Who we are',
    body: [
      'This website is operated by Pro Board Technology Services Corporation ("PBTS Technology," "we," "us," or "our"), an engineering and automation company based at Laguna Technopark, Biñan, Laguna, Philippines.',
      'This Privacy Policy explains what personal data we collect through this website, why we collect it, how we use and protect it, and the rights you have over it under the Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and Regulations, as enforced by the National Privacy Commission (NPC).',
    ],
  },
  {
    heading: '2. Information we collect',
    body: [
      'This is a corporate informational website. We do not operate an online store, and we do not require visitors to create an account to browse it.',
      'The only personal data we collect directly is what you choose to submit through our contact form: your name, email address, phone number, company name (if provided), and the message content you send us.',
      'We do not currently use analytics, advertising, or tracking cookies on this website. If that changes in the future — for example, if we add website analytics to understand traffic — we will update this Policy and, where required, request your consent before any non-essential cookies are set.',
    ],
  },
  {
    heading: '3. How we use your information',
    body: [
      'We use the information submitted through our contact form solely to:',
    ],
    list: [
      'Respond to your inquiry, quote request, or project discussion',
      'Route your message internally to the appropriate PBTS engineer or department',
      'Send you an acknowledgement confirming we received your message',
      'Keep an internal record of business inquiries for follow-up',
    ],
  },
  {
    heading: '4. How your information is stored and protected',
    body: [
      'Contact form submissions are stored in a secured database that is accessible only to authorized PBTS personnel, and are used to send notification emails through our email service provider.',
      'We retain contact form submissions only for as long as reasonably necessary to respond to your inquiry and maintain business records, after which they may be archived or deleted in accordance with our internal data retention practices.',
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
      'PBTS employees or engineers who need it to respond to your inquiry',
      'Our email service provider, solely to deliver notification and acknowledgement emails',
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
      'Object to or withdraw consent for processing, where applicable',
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
      'If you have questions about this Privacy Policy or wish to exercise your data privacy rights, contact us at:',
    ],
    contact: true,
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
                {s.footer && <p>{s.footer}</p>}
                {s.contact && (
                  <div className="mt-2 rounded-2xl border border-border bg-secondary/40 p-4 text-foreground">
                    <p className="font-semibold text-navy">
                      Pro Board Technology Services Corporation
                    </p>
                    <p>Laguna Technopark, Biñan, Laguna, Philippines</p>
                    <p>
                      Email:{' '}
                      <a href="mailto:info@pbts-tech.com" className="text-navy hover:text-orange">
                        info@pbts-tech.com
                      </a>
                    </p>
                    <p>Phone: +63 (2) 000 0000</p>
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
