'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { LegalModal } from './legal-modal'
import { privacySections } from './legal-content'

const CONSENT_KEY = 'pbts-cookie-consent'

export type CookieConsentValue = {
  necessary: true
  analytics: boolean
  timestamp: string
}

// Exported so any future analytics script (in layout.tsx, a script tag,
// etc.) can check this before loading — e.g.
//   const consent = getCookieConsent()
//   if (consent?.analytics) { /* load GA */ }
export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    return raw ? (JSON.parse(raw) as CookieConsentValue) : null
  } catch {
    return null
  }
}

function saveCookieConsent(analytics: boolean) {
  const value: CookieConsentValue = {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
  }
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value))
}

// Lets any component (e.g. a "Cookie Preferences" link in the footer)
// reopen this banner in edit mode after the visitor already made a choice
// — same CustomEvent pattern navbar.tsx uses for `pbts:open-service-category`.
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('pbts:open-cookie-preferences'))
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true)

    const onReopen = () => {
      const existing = getCookieConsent()
      setAnalytics(existing?.analytics ?? false)
      setExpanded(true)
      setVisible(true)
    }
    window.addEventListener('pbts:open-cookie-preferences', onReopen)
    return () => window.removeEventListener('pbts:open-cookie-preferences', onReopen)
  }, [])

  if (!visible) return null

  const acceptAll = () => {
    saveCookieConsent(true)
    setVisible(false)
    setExpanded(false)
  }

  const rejectNonEssential = () => {
    saveCookieConsent(false)
    setVisible(false)
    setExpanded(false)
  }

  const savePreferences = () => {
    saveCookieConsent(analytics)
    setVisible(false)
    setExpanded(false)
  }

  return (
    <>
      {/* White surface + orange accent stripe deliberately, instead of the
          navy the rest of the chrome uses — the hero and several other
          sections are navy too, so a navy banner disappeared against them
          on first load. White reads as a distinct "system" layer no matter
          what section is behind it. */}
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        className="fixed inset-x-0 bottom-0 z-[90] border-t-4 border-orange bg-white px-5 py-5 text-foreground shadow-[0_-8px_30px_-8px_rgba(19,32,59,0.35)] lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 id="cookie-consent-title" className="font-display text-sm font-semibold text-navy">
                  Cookie preferences
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  We use strictly necessary cookies to run this site, plus a cookieless traffic
                  analytics tool that doesn&apos;t identify you. We don&apos;t set any cookie-based
                  analytics or advertising cookies without your consent. See our{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyOpen(true)}
                    className="font-semibold text-navy underline underline-offset-2 transition-colors hover:text-orange"
                  >
                    Privacy Policy
                  </button>{' '}
                  for details.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:pl-4">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-secondary"
              >
                Manage
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-secondary"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:brightness-105"
              >
                Accept All
              </button>
            </div>
          </div>

          {expanded && (
            <div className="mt-5 space-y-3 rounded-2xl border border-border bg-secondary/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Strictly necessary</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Required for the contact form and core site functionality. Always on.
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 rounded-full bg-navy/5 px-3 py-1 text-[11px] font-semibold text-navy/70">
                  Always active
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                <div>
                  <label htmlFor="cookie-analytics" className="text-sm font-semibold text-foreground">
                    Analytics
                  </label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Controls optional cookie-based analytics or advertising tools, which are not
                    currently enabled. Our existing cookieless traffic analytics (see our Privacy
                    Policy) isn&apos;t affected by this toggle, since it doesn&apos;t use cookies.
                  </p>
                </div>
                <input
                  id="cookie-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 rounded border-border bg-white text-orange accent-orange outline-none focus:ring-4 focus:ring-steel/20"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:brightness-105"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <LegalModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
        lastUpdated="September 9, 2026"
        sections={privacySections}
      />
    </>
  )
}
