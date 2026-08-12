import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { sendContactNotification, sendAcknowledgementEmail } from '@/lib/mailer'
import { emails, rateLimit } from '@/lib/config'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, company, email, phone, service, message } = body

        if (!name || !company || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const recent = db
            .prepare(
                `SELECT COUNT(*) as count FROM submissions
         WHERE email = ? AND created_at > datetime('now', ?)`,
            )
            .get(email, `-${rateLimit.windowHours} hours`) as { count: number }

        if (recent.count >= rateLimit.maxSubmissionsPerEmail) {
            return NextResponse.json(
                {
                    error: `You've reached the limit of ${rateLimit.maxSubmissionsPerEmail} inquiries per ${rateLimit.windowHours} hours. Please call our hotline for urgent matters.`,
                },
                { status: 429 },
            )
        }

        const stmt = db.prepare(`
      INSERT INTO submissions (name, company, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
        stmt.run(name, company, email, phone ?? null, service ?? null, message)

        try {
            await sendContactNotification({
                to: emails.formNotificationRecipient,
                name,
                company,
                email,
                phone,
                service,
                message,
            })
        } catch (mailErr) {
            console.error('Email notification failed (submission still saved):', mailErr)
        }

        try {
            await sendAcknowledgementEmail({
                name,
                company,
                email,
                phone,
                service,
                message,
            })
        } catch (ackErr) {
            console.error('Acknowledgement email failed (submission still saved):', ackErr)
        }

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (err) {
        console.error('Contact form error:', err)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}