export type LegalSection = {
  heading: string
  body: string[]
  list?: string[]
  body2?: string[]
  footer?: string
  offices?: boolean
}

export const privacySections: LegalSection[] = [
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
      'Contact form \u2014 when you submit an inquiry, we collect your full name, company name, work email address, phone number, the service you\u2019re interested in, and the message you provide',
      'Newsletter sign-up \u2014 if you subscribe using the newsletter field in our website footer, we collect your email address to send you company updates',
    ],
    body2: [
      'We do not currently use analytics, advertising, or general-purpose tracking cookies on this website. If that changes in the future \u2014 for example, if we add website analytics to understand traffic \u2014 we will update this Policy and, where required, request your consent before any non-essential cookies are set.',
      'Our Contact section embeds a Google Maps widget to show our office location. When that map loads, Google may set its own cookies and collect technical data (such as your IP address) in accordance with Google\u2019s own Privacy Policy, independent of this website. We do not control this data collection and encourage you to review Google\u2019s privacy practices directly.',
      'Some images on this website are served from third-party content delivery networks. Loading these images may cause your device to send standard technical information (such as IP address) to that provider as part of normal web delivery; we do not use this to identify you.',
    ],
  },
  {
    heading: '3. How we use your information',
    body: ['We use the information you provide to:'],
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
    body: ['We do not sell, rent, or trade your personal data to third parties.', 'Your information may be shared with:'],
    list: [
      'PBTS employees or engineers at any of our offices who need it to respond to your inquiry',
      'Our email service provider, solely to deliver notification and acknowledgement emails',
      'Google, only through the embedded Maps widget on our Contact section, as described in Section 2',
      'Government authorities, where required by Philippine law or a valid legal process',
    ],
  },
  {
    heading: '6. Your rights under the Data Privacy Act',
    body: ['As a data subject under RA 10173, you have the right to:'],
    list: [
      'Be informed that your personal data is being processed',
      'Access the personal data we hold about you',
      'Request correction of inaccurate or outdated data',
      'Object to or withdraw consent for processing, where applicable \u2014 including unsubscribing from our newsletter at any time',
      'Request erasure or blocking of your data, subject to legal or legitimate business retention requirements',
      'Lodge a complaint with the National Privacy Commission (NPC)',
    ],
    footer: 'To exercise any of these rights, contact us using the details in Section 8 below.',
  },
  {
    heading: '7. Changes to this Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date above reflects the most recent revision. Continued use of this website after changes are posted constitutes acknowledgement of the updated Policy.',
    ],
  },
  {
    heading: '8. Contact us',
    body: ['If you have questions about this Privacy Policy or wish to exercise your data privacy rights, contact us at any of our offices below.'],
    offices: true,
  },
]

export const termsSections: LegalSection[] = [
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
      'This website may contain links to third-party websites and embedded third-party content, such as the Google Maps widget on our Contact section. We do not control and are not responsible for the content, accuracy, availability, or data practices of any third-party site or embedded service. Interacting with a linked site or embedded widget is at your own discretion and risk, and subject to that provider\u2019s own terms and privacy policy.',
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
      'We may revise these Terms of Use from time to time. The "Last updated" date above reflects the most recent revision. Continued use of this website after changes are posted constitutes acceptance of the updated terms.',
    ],
  },
  {
    heading: '10. Contact us',
    body: ['If you have questions about these Terms of Use, contact us at any of our offices below.'],
    offices: true,
  },
]
