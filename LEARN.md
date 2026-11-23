# 🧭 Learn apex-legal

You scaffolded **Business site** with 3 feature add-ons:
`notify` · `consent` · `ui`.

Work through the checklist below — each item is a real next step.

## Toast notifications `(notify)`

Beautiful in-app toast notifications (@lacspace/notify) — a <Toaster/> plus success/error/promise toasts, accessible and zero-config. Frontend, any template.

- [ ] Render <Toaster/> once in app/layout.tsx: import { Toaster } from '@/components/toaster'.
- [ ] Then call toast.success('Saved!') (or .error/.info/.promise) from any client component.
- [ ] See it live at http://localhost:3000/notify-demo.

Learn more → https://developer.lacspace.com/packages/notify

## Cookie consent `(consent)`

GDPR-friendly cookie consent (@lacspace/consent) — a drop-in <ConsentBanner/>, per-category choices, cookie persistence and whenConsent() script-gating. Frontend, any template.

- [ ] Render <ConsentBanner/> once in app/layout.tsx: import { ConsentBanner } from '@/components/consent'.
- [ ] Gate analytics/marketing scripts: whenConsent(consent, 'analytics', () => { /* load tag */ }).
- [ ] The choice is stored in a cookie — gate server-side too with parseConsentCookie().

Learn more → https://developer.lacspace.com/packages/consent

## UI components `(ui)`

The @lacspace/components library wired into this template — 96 accessible components, a theme bridge so they inherit your accent and dark mode, and a working settings page. Frontend, any template.

- [ ] Run `npm run dev` and open http://localhost:3000/ui — a real form, a confirm dialog and toasts, already themed.
- [ ] Use the kit anywhere: import "@lacspace/components/styles.css" and "./lacspace-ui.css" in app/layout.tsx, then wrap <body> with <UIProvider> from @/components/ui-provider.
- [ ] Rebrand everything from app/lacspace-ui.css — it maps this template's accent, radius and font onto the kit's --lac-* variables, so dark mode follows your theme toggle.

Learn more → https://developer.lacspace.com/components

---

Every add-on is built from zero-dependency `@lacspace/*` packages. Browse them all → https://lacspace.com/packages
