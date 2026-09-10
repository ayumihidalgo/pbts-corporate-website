import { NextRequest, NextResponse } from 'next/server'
import { client, ensureSchema } from '@/lib/db'
import { sendContactNotification, sendAcknowledgementEmail } from '@/lib/mailer'
import { emails, rateLimit } from '@/lib/config'

export async function POST(req: NextRequest) {
    try {
        await ensureSchema()

        const body = await req.json()
        const { name, company, email, phone, service, message } = body

        if (!name || !company || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const recent = await client.execute({
            sql: `SELECT COUNT(*) as count FROM submissions
            WHERE email = ? AND created_at > datetime('now', ?)`,
            args: [email, `-${rateLimit.windowHours} hours`],
        })
        const recentCount = Number(recent.rows[0]?.count ?? 0)

        if (recentCount >= rateLimit.maxSubmissionsPerEmail) {
            return NextResponse.json(
                {
                    error: `You've reached the limit of ${rateLimit.maxSubmissionsPerEmail} inquiries per ${rateLimit.windowHours} hours. Please call our hotline for urgent matters.`,
                },
                { status: 429 },
            )
        }

        await client.execute({
            sql: `INSERT INTO submissions (name, company, email, phone, service, message)
            VALUES (?, ?, ?, ?, ?, ?)`,
            args: [name, company, email, phone ?? null, service ?? null, message],
        })

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
