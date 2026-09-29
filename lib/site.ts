/**
 * One place for the site's public identity — used by layout.tsx metadata,
 * the sitemap, robots.txt, the share image and the Google structured data.
 *
 * ⚠ CONFIRM SITE_URL: layout.tsx had https://pbts.com.ph, but every email on
 * the site uses @pbts-tech.com. Put the domain the site will actually be
 * served from here (no trailing slash).
 */
export const SITE_URL = 'https://pbts.com.ph'

export const SITE_NAME = 'PBTS Technology'
export const LEGAL_NAME = 'Pro Board Technology Services Corporation'
export const FOUNDED = '2006'
export const EMAIL = 'sales@pbts-tech.com'

export const TAGLINE = 'Industrial Engineering, Automation & Construction'

export const DESCRIPTION =
  'Pro Board Technology Services Corporation (PBTS) provides industrial electronics repair, automation solutions, PCB services, fabrication, technical services, and construction support for manufacturing and industrial operations in the Philippines since 2006.'

// Same data as contact.tsx — keep the two in sync if an address/phone changes.
export const BRANCHES = [
  {
    name: 'Main Office (Cavite)',
    street: 'B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay',
    locality: 'Carmona',
    region: 'Cavite',
    phones: ['+63-2-8552-5131', '+63-46-430-2890'],
  },
  {
    name: 'Branch Office (Bataan)',
    street: 'B2 L2 Parkway Drive, Hermosa Ecozone Industrial Park, Palihan',
    locality: 'Hermosa',
    region: 'Bataan',
    phones: ['+63-917-179-7377'],
  },
  {
    name: 'Branch Office (Cebu)',
    street: 'Blk 3 Section 11, AcaSys Homes, Kagudoy, Basak',
    locality: 'Lapu-Lapu City',
    region: 'Cebu',
    phones: ['+63-917-535-0179'],
  },
] as const
