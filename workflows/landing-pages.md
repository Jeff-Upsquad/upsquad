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
| `creative-services-explainer` | Customers (Subscribe, Assign, Hire) | `CreativeServicesExplainer.jsx` | `/customers/creative-services-explainer/` |
| `business-collaboration-program` | Customers (Free collaboration offer) | `BusinessCollaboration.jsx` | `/customers/business-collaboration-program/` |
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
   - The Squad Clips player ignores `autoplay` query params and exposes no player API, so the wrapper can never remote-start it — a click only starts the video when it lands on the player's own play button.
   - Single-video pages (`needsGate={false}`): `HeroMedia` mounts the embed fully interactive with no overlay, so one click on the player's own play button starts playback.
   - Multi-language pages (`needsGate={true}`): the custom Play button and `onRequestGate` overlay sit on top with `pointer-events-auto`, so clicking Play checks the language gate first; after a language is picked the embed mounts interactive (paused — Squad Clips cannot autoplay) and the visitor starts it with the player's own button.
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

### Accountant explainer payment flow

- Hero and closing “Choose your subscription plan” links scroll to `#buy-subscription`.
- The form collects only contact person name, business name, email, and phone, horizontally on desktop. The plan selector offers Starter (₹5,000/month, 2 hours per day) and Basic (₹10,000/month, fixed monthly plan with no hour limit). Its buy button opens a Cashfree hosted payment link for the selected plan’s first month.
- `POST /api/v1/accountant-subscription-checkout` creates the contact request and payment record, then creates/reuses a Cashfree link. Prices are resolved server-side from the selected plan; client amounts are ignored. Retries with the same checkout ID reuse the same payment and reject a changed plan. Existing ₹5,000 checkouts remain valid.
- Cashfree uses the UpSquad merchant credentials shared with SquadBooks (`CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`, `CASHFREE_ENV=live`, server-only). No credentials belong in the browser or repository.
- Return URL: `/api/v1/accountant-subscription-payments/:id/return`. The browser returns to this explainer and checks `/api/v1/accountant-subscription-payments/:id`. Only a server-verified Cashfree `PAID` link for the matching ID, INR currency and full saved checkout amount marks the record paid. Browser query parameters are never payment proof.
- Signed webhook endpoint: `/api/webhooks/cashfree-accountant`. The link includes this notify URL, and valid events trigger server-side reconciliation. A customer who closes checkout can later continue the same payment from the return page.
- The existing `/offer/accountant/` page retains its Razorpay payment flow.
- Admin submissions: sign in at `/admin/login`, then open **Subscriptions** (`/admin/subscription-requests`). Existing and future accountant contact requests appear automatically, including checkouts that were not completed. Search covers contact person, business, email and phone; payment filters and 50-row pagination are available. The filtered summary shows submission count, paid count and payments received.
- Each request has a detail page with all four contact fields, payment status, amount, Cashfree link reference and paid date (IST). **Check Cashfree payment status** reconciles the saved payment against Cashfree without creating a payment or charging the customer. This action requires the admin session and a session-bound CSRF token; there is no manual “mark paid” action.
- Admin view checks: `node --test tests/admin-accountant-submissions.test.mjs` uses isolated fixture data to cover authentication, private-page caching, escaped contact text, search/filter/pagination, payment refresh and gateway failures.
- Payment checks: `node --test tests/accountant-payments.test.mjs` uses an isolated database and a mocked gateway. Live checks may create a temporary link with test contact details and cancel it; do not complete a real payment on the user's behalf.

## Designer & Video Editor Subscription Explainer Page

- Canonical page: `/customers/designer-editor-subscription-explainer/`; API/admin slug: `designer-editor-subscription-explainer`. Presents the fixed-plans subscription explainer script section by section; it is separate from the availability-plans page at `/customers/designers-and-video-editors/`.
- Hero copy and per-language videos are edited under this slug in the admin. There is deliberately no video fallback: until a video is uploaded under this slug, the hero shows the SquadHub process summary card instead of a player. Plan names and prices come from the explainer script (`client/src/data/designerEditorExplainer.js`), not from the availability plans in `data/pricing.js`.
- The page's single CTA is WhatsApp to the business line, prefilled message tagged `(Fixed Plans)`.

## Creative Services Explainer Page

- Canonical page: `/customers/creative-services-explainer/`; API/admin slug: `creative-services-explainer`. Covers Subscribe, Assign, Hire, hourly plans (1, 2, 4, 6, or 8 hours/day), output-based subscriptions, and SquadHub/Squad Manager support.
- Hero copy and per-language videos remain admin-managed under this slug. There is no fallback to another page's videos. Until a video is added, the hero shows an explainer-video coming-soon placeholder. Video settings belong only to this page and are not inherited from the original creative page. On localhost, the selected video opens in a new tab because Squad Clips blocks localhost embeds; production uses the embedded player and existing language gate.
- The information-only enquiry form posts to `POST /api/v1/creative-enquiries`. It validates contact details, role, service, daily hours when relevant, and requirements. No payment gateway is invoked.
- Enquiries are saved in `subscription_requests` with a `creative-` plan prefix and are visible in the authenticated **Creative enquiries** inbox at `/admin/creative-enquiries`. The accountant inbox is separate.

## Business Collaboration Program Page

- Canonical page: `/customers/business-collaboration-program/`; API/admin slug: `business-collaboration-program` (aliases `business-collaboration`, `collaboration`). Offer page: the accountant subscription, SquadBooks, Squad Payroll, and SquadBooks Inventory free for 1–3 months in exchange for one Instagram Reel published as a collaboration post with UpSquad.
- Hero title, description, and per-language videos are admin-managed under this slug. The hero's receipt graphic is fixed; a video section below the hero uses `HeroMedia` and `useLanguageGate`. Until a video is configured, it shows a coming-soon placeholder. Only languages with a video URL appear in the picker. Copy for the rest of the page lives in `client/src/data/collaboration.js`.
- All CTAs point to WhatsApp `919995266385`. The closing form composes a prefilled WhatsApp message client-side — nothing is submitted to the server.
- Because the offer is time-bound, update or retire the page (and this row) when the program closes.

## Social Media Creator Page

- Canonical page: `/partner-program/social-media-creators/`; API/admin slug: `partner-program-social-media-creators`.
- Edit the hero title, description, and per-language videos in the existing landing page admin. The page is seeded on server startup without overwriting existing edits.
- Only languages with a video URL appear in the player language picker. Until videos are configured, the page shows a non-interactive introduction placeholder.
- Signup uses the dedicated SquadHire creator form at `https://squadhire.upsquadconnect.com/signup/social-media-creators`, through the `social-media-creators` partner CTA mapping.
- Brand Promotion Video and Creative Brand Promotion Video are available now. Channel Sponsor and Content Creator are marked coming soon.
