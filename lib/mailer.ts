import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

const NAVY = '#0c1f3b'
const STEEL = '#145ec1'
const ORANGE = '#db1b26'
const LIGHT_BG = '#f4f6f9'
const BORDER = '#e2e6ec'
const MUTED = '#5b6472'

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function fieldRow(label: string, value: string) {
    return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};" width="140">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">
          ${label}
        </span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${NAVY};">
          ${value}
        </span>
      </td>
    </tr>
  `
}

/**
 * Shared card shell used by both the internal notification and the
 * customer acknowledgement email, so both stay visually consistent
 * with the site theme.
 */
function wrapEmailShell({
    eyebrow,
    heading,
    bodyHtml,
    footerText,
}: {
    eyebrow: string
    heading: string
    bodyHtml: string
    footerText: string
}) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>${eyebrow}</title>
<style>
  @media only screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .stack-padding { padding-left: 20px !important; padding-right: 20px !important; }
    .header-padding { padding: 24px 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${LIGHT_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${LIGHT_BG};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BORDER};">

          <!-- Header -->
          <tr>
            <td class="header-padding" style="background-color:${NAVY};padding:28px 32px;" align="left">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">
                      PBTS
                    </span>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#9fb0c9;text-transform:uppercase;letter-spacing:0.18em;display:block;margin-top:2px;">
                      Technology
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Orange accent bar -->
          <tr>
            <td style="background-color:${ORANGE};height:4px;line-height:4px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Title -->
          <tr>
            <td class="stack-padding" style="padding:28px 32px 8px 32px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${ORANGE};">
                ${eyebrow}
              </span>
              <h1 style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:${NAVY};">
                ${heading}
              </h1>
            </td>
          </tr>

          ${bodyHtml}

          <!-- Footer -->
          <tr>
            <td class="stack-padding" style="padding:28px 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};padding-top:18px;">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};">
                      ${footerText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Internal notification — sent to the engineer/team inbox whenever
 * someone submits the contact form.
 */
function buildNotificationEmail({
    name,
    company,
    email,
    phone,
    service,
    message,
}: {
    name: string
    company: string
    email: string
    phone?: string
    service?: string
    message: string
}) {
    const safe = {
        name: escapeHtml(name),
        company: escapeHtml(company),
        email: escapeHtml(email),
        phone: escapeHtml(phone ?? 'Not provided'),
        service: escapeHtml(service ?? 'Not specified'),
        message: escapeHtml(message).replace(/\n/g, '<br />'),
    }

    const bodyHtml = `
    <!-- Details table -->
    <tr>
      <td class="stack-padding" style="padding:8px 32px 4px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldRow('Name', safe.name)}
          ${fieldRow('Company', safe.company)}
          ${fieldRow('Email', `<a href="mailto:${safe.email}" style="color:${STEEL};text-decoration:none;">${safe.email}</a>`)}
          ${fieldRow('Phone', safe.phone)}
          ${fieldRow('Service', safe.service)}
        </table>
      </td>
    </tr>

    <!-- Message -->
    <tr>
      <td class="stack-padding" style="padding:20px 32px 24px 32px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">
          Message
        </span>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
          <tr>
            <td style="background-color:${LIGHT_BG};border-radius:10px;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${NAVY};">
              ${safe.message}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

    return wrapEmailShell({
        eyebrow: 'New Website Inquiry',
        heading: safe.company,
        bodyHtml,
        footerText: `This inquiry was submitted through the contact form on the PBTS Technology website. Use Reply (not a forward) to respond directly to ${safe.name} at their submitted email address.`,
    })
}

/**
 * Acknowledgement receipt — sent back to the person who submitted the
 * form, confirming what they sent and roughly when to expect a reply.
 */
function buildAcknowledgementEmail({
    name,
    company,
    email,
    phone,
    service,
    message,
}: {
    name: string
    company: string
    email: string
    phone?: string
    service?: string
    message: string
}) {
    const safe = {
        name: escapeHtml(name),
        company: escapeHtml(company),
        email: escapeHtml(email),
        phone: escapeHtml(phone ?? 'Not provided'),
        service: escapeHtml(service ?? 'Not specified'),
        message: escapeHtml(message).replace(/\n/g, '<br />'),
    }

    const firstName = safe.name.split(' ')[0]

    const bodyHtml = `
    <!-- Intro -->
    <tr>
      <td class="stack-padding" style="padding:4px 32px 20px 32px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${NAVY};">
          Hi ${firstName}, thanks for reaching out to PBTS Technology. We've received your inquiry below and an engineer will get back to you within one business day.
        </p>
      </td>
    </tr>

    <!-- Details table -->
    <tr>
      <td class="stack-padding" style="padding:8px 32px 4px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldRow('Name', safe.name)}
          ${fieldRow('Company', safe.company)}
          ${fieldRow('Phone', safe.phone)}
          ${fieldRow('Service', safe.service)}
        </table>
      </td>
    </tr>

    <!-- Message -->
    <tr>
      <td class="stack-padding" style="padding:20px 32px 8px 32px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">
          Your message
        </span>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
          <tr>
            <td style="background-color:${LIGHT_BG};border-radius:10px;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${NAVY};">
              ${safe.message}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Emergency note -->
    <tr>
      <td class="stack-padding" style="padding:20px 32px 24px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${LIGHT_BG};border-radius:10px;">
          <tr>
            <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${MUTED};">
              For production-down emergencies, call our 24/7 hotline for immediate dispatch instead of waiting on this reply.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

    return wrapEmailShell({
        eyebrow: 'Inquiry Received',
        heading: "We've got your message",
        bodyHtml,
        footerText: `This is an automated confirmation of your submission to PBTS Technology. If you didn't submit this inquiry, you can safely ignore this email.`,
    })
}

export async function sendContactNotification({
    to,
    name,
    company,
    email,
    phone,
    service,
    message,
}: {
    to: string
    name: string
    company: string
    email: string
    phone?: string
    service?: string
    message: string
}) {
    await transporter.sendMail({
        from: `"PBTS Website" <${process.env.GMAIL_USER}>`,
        to,
        replyTo: email,
        subject: `New Inquiry: ${company} — ${service ?? 'General'}`,
        text: `
New contact form submission

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone ?? 'Not provided'}
Service: ${service ?? 'Not specified'}

Message:
${message}
    `.trim(),
        html: buildNotificationEmail({ name, company, email, phone, service, message }),
    })
}

export async function sendAcknowledgementEmail({
    name,
    company,
    email,
    phone,
    service,
    message,
}: {
    name: string
    company: string
    email: string
    phone?: string
    service?: string
    message: string
}) {
    await transporter.sendMail({
        from: `"PBTS Technology" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `We've received your inquiry — PBTS Technology`,
        text: `
Hi ${name},

Thanks for reaching out to PBTS Technology. We've received your inquiry and an engineer will get back to you within one business day.

Here's what you submitted:

Name: ${name}
Company: ${company}
Phone: ${phone ?? 'Not provided'}
Service: ${service ?? 'Not specified'}

Message:
${message}

For production-down emergencies, call our 24/7 hotline for immediate dispatch.
    `.trim(),
        html: buildAcknowledgementEmail({ name, company, email, phone, service, message }),
    })
}

export default transporter