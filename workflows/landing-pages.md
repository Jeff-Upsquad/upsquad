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
| `partner-program` | Talent (Creatives) | `PartnerProgram.jsx` | `/partner-program/designer-and-video-editor/` |
| `partnerprogram-accountant` / `partner-program-accountant` | Talent (Accountants) | `AccountantPartnerProgram.jsx` | `/partner-program/accountant/` |
| `partner-program-sales` / `sales` | Talent (Sales) | `SalesPartnerProgram.jsx` | `/partner-program/sales/` |
| `partner-program-general` / `general` | Talent (General) | `GeneralPartnerProgram.jsx` | `/partner-program/general/` |

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
