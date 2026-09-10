import { createClient } from '@libsql/client'

// Vercel's serverless functions get a fresh, read-only filesystem on every
// invocation — there's no persistent disk to write a `.db` file to, which
// is why the old `better-sqlite3` + local file setup crashed in
// production. Turso is a hosted libSQL (SQLite-compatible) database, so
// every query elsewhere in this codebase keeps working unchanged — only
// the connection layer changes.
export const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
})

// Runs once per warm serverless instance (guarded by `initialized`), not
// on every request — cheap no-op after the first call within that
// instance's lifetime thanks to `IF NOT EXISTS`.
let initialized = false

export async function ensureSchema() {
    if (initialized) return

    await client.execute(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

    await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_submissions_email_created
    ON submissions (email, created_at)
  `)

    initialized = true
}
