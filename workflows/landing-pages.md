# Landing Pages & Video Management

## Overview
Manage hero content (titles, descriptions, and per-language explainer video/audio links) for both customer subscriptions and talent partner programs on UpSquad.

---

## Architecture & Data Flow

1. **Admin Panel** (`/admin/landing-pages`):
   - Admin manages hero copy and per-language media in SQLite table `landing_pages` and `landing_page_languages`.
   - Media URLs accept direct MP4 links, YouTube, Vimeo, Loom, or Squad Clips (`clips.squadhub.in/share/<id>` or `/embed/<id>`).
2. **Public API** (`/api/v1/landing-pages/:slug`):
   - Returns JSON containing slug, title, description, default language code, and language array with resolved URLs.
3. **Client Frontend** (`client/src/pages/`):
   - Uses `fetch('/api/v1/landing-pages/<slug>')` on mount.
   - Uses `useLanguageGate({ slug, languages, defaultLanguageCode })` to manage language preference in localStorage and play gating.
   - Renders `<HeroMedia videoUrl={selected?.videoUrl} autoPlay={pendingPlay} onRequestGate={requestPlay} />`.
   - Renders `<LanguageGate>` modal whenever more than one language exists.

---

## Canonical Slug & Route Mapping

Always keep this mapping in sync across `client/src/pages/`, `server/index.js` (`LP_REDIRECTS`), and `server/lib/db.js` (`seed()`):

| Admin Slug | Audience | Page Component | Public URL |
|---|---|---|---|
| `get-started` | Customers | `LandingPage.jsx` | `/customers/designers-and-video-editors/` |
| `accountant-subscription` | Customers | `AccountantSubscription.jsx` | `/customers/accountant-subscription/` |
| `accountant-subscription-explainer` | Customers (Accountant explainer) | `AccountantSubscriptionExplainer.jsx` | `/customers/accountant-subscription-explainer/` |
| `designer-editor-subscription-explainer` | Customers (Creative explainer) | `DesignerEditorSubscriptionExplainer.jsx` | `/customers/designer-editor-subscription-explainer/` |
| `customer-general` / `customers` | Customers (All Services) | `CustomerLandingPage.jsx` | `/customers/` |
| `partner-program` | Talent (Creatives) | `PartnerProgram.jsx` | `/partner-program/designer-and-video-editor/` |
| `partnerprogram-accountant` / `partner-program-accountant` | Talent (Accountants) | `AccountantPartnerProgram.jsx` | `/partner-program/accountant/` |
| `partner-program-sales` / `sales` | Talent (Sales) | `SalesPartnerProgram.jsx` | `/partner-program/sales/` |
| `partner-program-social-media-creators` / `social-media-creators` | Talent (Social Media Creators) | `SocialMediaCreatorProgram.jsx` | `/partner-program/social-media-creators/` |
| `partner-program-general` / `general` | Talent (General) | `GeneralPartnerProgram.jsx` | `/partner-program/general/` |
| `partner-program-agency` / `agency` | Agencies | `AgencyPartnerProgram.jsx` | `/partner-program/agency/` |

---

## Gotchas & Rules

1. **Never hardcode placeholder videos in page components**:
   - Components must never hardcode sample video URLs (e.g. `mov_bbb.mp4`). Always fetch from `/api/v1/landing-pages/:slug` and render via `selected?.videoUrl`.
   - For new landing pages, provide fallback slug resolution if naming differences are possible (e.g. `partnerprogram-accountant` vs `partner-program-accountant`).
2. **Squad Clips (`clips.squadhub.in`) Embeds**:
   - Squad Clips share URLs are iframe players, not direct MP4s.
   - `HeroMedia` normalizes both `/share/<id>` and `/embed/<id>` to `/embed/<id>`.
   - Because Squad Clips does not have a static unauthenticated poster CDN URL, `HeroMedia` mounts the iframe in preview mode (`autoplay=false`, `pointer-events-none`) so the player's native thumbnail renders rather than an empty black box.
   - The custom Play button and `onRequestGate` overlay sit on top with `pointer-events-auto`, so clicking Play checks the multi-language gate before starting playback.
3. **Admin "Preview" Links**:
   - In `server/index.js`, `LP_REDIRECTS` intercepts `/lp/:slug` and 301-redirects to the canonical public URL. Any new landing page slug must be registered in `LP_REDIRECTS` so the admin "Preview" link never falls through to the homepage.
4. **Deploying Changes**:
   - The marketing frontend is a Next.js static export compiled inside Docker during `npm run build --prefix client`.
   - Any client-side component or routing changes require CMPD:
     1. Commit to `main`
     2. Push to `origin/main`
     3. Run `bash tools/deploy.sh`
     4. Provide a Test Handoff summary per `workflows/test-handoff.md`.

## Accountant Subscription Explainer Page

- Canonical page: `/customers/accountant-subscription-explainer/`; API/admin slug: `accountant-subscription-explainer`. Presents the accountant-subscription explainer script section by section; the main `/customers/accountant-subscription/` page is separate and unaffected.
- Hero copy and per-language videos are edited under this slug in the admin. Until videos are uploaded under this slug, the page reuses the `accountant-subscription` slug's per-language videos client-side, so the hero player works on day one.

## Designer & Video Editor Subscription Explainer Page

- Canonical page: `/customers/designer-editor-subscription-explainer/`; API/admin slug: `designer-editor-subscription-explainer`. Presents the fixed-plans subscription explainer script section by section; it is separate from the availability-plans page at `/customers/designers-and-video-editors/`.
- Hero copy and per-language videos are edited under this slug in the admin. There is deliberately no video fallback: until a video is uploaded under this slug, the hero shows the SquadHub process summary card instead of a player. Plan names and prices come from the explainer script (`client/src/data/designerEditorExplainer.js`), not from the availability plans in `data/pricing.js`.
- The page's single CTA is WhatsApp to the business line, prefilled message tagged `(Fixed Plans)`.

## Social Media Creator Page

- Canonical page: `/partner-program/social-media-creators/`; API/admin slug: `partner-program-social-media-creators`.
- Edit the hero title, description, and per-language videos in the existing landing page admin. The page is seeded on server startup without overwriting existing edits.
- Only languages with a video URL appear in the player language picker. Until videos are configured, the page shows a non-interactive introduction placeholder.
- Signup uses the dedicated SquadHire creator form at `https://squadhire.upsquadconnect.com/signup/social-media-creators`, through the `social-media-creators` partner CTA mapping.
- Brand Promotion Video and Creative Brand Promotion Video are available now. Channel Sponsor and Content Creator are marked coming soon.
