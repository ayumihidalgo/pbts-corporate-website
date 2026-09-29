import { BRANCHES, DESCRIPTION, EMAIL, FOUNDED, LEGAL_NAME, SITE_NAME, SITE_URL } from '@/lib/site'
import { serviceCategories } from './services-data'

/**
 * schema.org Organization data for Google (company name, logo, founding year,
 * branches, phones, services). Rendered once in layout.tsx. Invisible on the
 * page. Check it at https://search.google.com/test/rich-results after deploy.
 */
const address = (b: (typeof BRANCHES)[number]) => ({
  '@type': 'PostalAddress',
  streetAddress: b.street,
  addressLocality: b.locality,
  addressRegion: b.region,
  addressCountry: 'PH',
})

const [main, ...others] = BRANCHES

const data = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: 'PBTS',
  url: SITE_URL,
  logo: `${SITE_URL}/pbts-logo.png`,
  description: DESCRIPTION,
  foundingDate: FOUNDED,
  email: EMAIL,
  telephone: main.phones[0],
  address: address(main),
  areaServed: { '@type': 'Country', name: 'Philippines' },
  knowsAbout: serviceCategories.map((c) => c.title),
  department: others.map((b) => ({
    '@type': 'LocalBusiness',
    name: `${SITE_NAME} — ${b.name}`,
    address: address(b),
    telephone: b.phones[0],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  })),
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // static, trusted object above — safe to inline
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
