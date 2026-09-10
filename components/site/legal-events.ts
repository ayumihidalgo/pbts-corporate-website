// Cross-component event for opening the Privacy Policy / Terms of Use
// modal from anywhere on the page (e.g. the contact form's consent
// checkbox), without those components sharing state directly. Same
// pattern navbar.tsx and services.tsx already use for
// `pbts:open-service-category` — footer.tsx (which owns the modal state)
// listens for this event.
export type LegalModalType = 'privacy' | 'terms'

export function openLegalModal(type: LegalModalType) {
  window.dispatchEvent(new CustomEvent('pbts:open-legal', { detail: { type } }))
}
