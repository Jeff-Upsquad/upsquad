import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_DIR = path.join(__dirname, '..', 'data')
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true })

const db = new Database(path.join(DB_DIR, 'upsquad.db'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS languages (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS landing_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    hero_title TEXT NOT NULL DEFAULT '',
    hero_description TEXT NOT NULL DEFAULT '',
    default_language_code TEXT,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (default_language_code) REFERENCES languages(code) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS landing_page_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    landing_page_id INTEGER NOT NULL,
    language_code TEXT NOT NULL,
    video_url TEXT NOT NULL DEFAULT '',
    audio_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE(landing_page_id, language_code),
    FOREIGN KEY (landing_page_id) REFERENCES landing_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS subscription_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_type TEXT NOT NULL,
    tier TEXT NOT NULL,
    plan TEXT NOT NULL,
    proposed_price INTEGER NOT NULL,
    working_days TEXT DEFAULT '',
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT DEFAULT '',
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS career_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT '',
    employment_type TEXT NOT NULL DEFAULT 'Full-time',
    description TEXT NOT NULL DEFAULT '',
    is_open INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS career_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (position_id) REFERENCES career_positions(id) ON DELETE CASCADE
  );
`)

function migrate() {
  const cols = db.prepare("PRAGMA table_info(subscription_requests)").all()
  const colNames = new Set(cols.map(c => c.name))
  const adds = [
    ['working_days',       "TEXT DEFAULT ''"],
    ['country',            "TEXT DEFAULT ''"],
    ['states_csv',         "TEXT DEFAULT ''"],
    ['languages_csv',      "TEXT DEFAULT ''"],
    ['brand_name',         "TEXT DEFAULT ''"],
    ['nature_of_business', "TEXT DEFAULT ''"],
    ['short_note',         "TEXT DEFAULT ''"],
    ['location_of_business', "TEXT DEFAULT ''"],
    ['requirement_note',   "TEXT DEFAULT ''"],
  ]
  for (const [name, type] of adds) {
    if (!colNames.has(name)) {
      db.exec(`ALTER TABLE subscription_requests ADD COLUMN ${name} ${type}`)
    }
  }
}
migrate()

function seed() {
  const langCount = db.prepare('SELECT COUNT(*) as c FROM languages').get().c
  if (langCount === 0) {
    const insertLang = db.prepare('INSERT INTO languages (code, name) VALUES (?, ?)')
    insertLang.run('en', 'English')
    insertLang.run('hi', 'Hindi')
  }

  const pages = [
    {
      slug: 'get-started',
      heroTitle: 'Designers and video editors on subscription.',
      heroDescription: 'Get unlimited design and video-editing work from a dedicated squad. Flat monthly pricing. Cancel anytime.',
      defaultLanguageCode: 'en',
      langs: [{ code: 'en' }, { code: 'hi' }],
    },
    {
      slug: 'accountant-subscription',
      heroTitle: 'Accountants on subscription.',
      heroDescription: 'Keep your books clean and your business compliant — without building a finance team from scratch. Subscribe to a dedicated accounting squad, or hire vetted accountants directly.',
      defaultLanguageCode: 'en',
      // Only seed languages that the base seed guarantees exist. On a DB whose
      // `languages` table is missing a code (e.g. `hi` was removed via admin),
      // referencing it here trips the FK constraint and crashes boot. Extra
      // languages are added per-page in /admin, not seeded.
      langs: [{ code: 'en' }],
    },
    {
      slug: 'partner-program',
      heroTitle: 'UpSquad Partner Program',
      heroDescription: 'Are you a freelance designer or video editor? Partner with UpSquad and focus only on what you do best — we handle the sales, marketing, client support, and payments.',
      defaultLanguageCode: 'en',
      langs: [{ code: 'en' }],
    },
  ]

  const findPage = db.prepare('SELECT id FROM landing_pages WHERE slug = ?')
  const insertPage = db.prepare(`
    INSERT INTO landing_pages (slug, hero_title, hero_description, default_language_code)
    VALUES (?, ?, ?, ?)
  `)
  const insertLpl = db.prepare(`
    INSERT INTO landing_page_languages (landing_page_id, language_code, video_url, audio_url, sort_order)
    VALUES (?, ?, '', '', ?)
  `)

  for (const p of pages) {
    if (findPage.get(p.slug)) continue
    const info = insertPage.run(p.slug, p.heroTitle, p.heroDescription, p.defaultLanguageCode)
    p.langs.forEach((l, i) => insertLpl.run(info.lastInsertRowid, l.code, i))
  }

  const positionCount = db.prepare('SELECT COUNT(*) as c FROM career_positions').get().c
  if (positionCount === 0) {
    const insertPosition = db.prepare(`
      INSERT INTO career_positions (title, department, location, employment_type, description, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    const positions = [
      {
        title: 'Graphic Designer',
        department: 'Content Squad',
        location: 'Remote (India)',
        employmentType: 'Full-time',
        description: 'Create social creatives, ad assets, and brand visuals for subscription clients. Strong Figma skills and a sharp portfolio required.',
        sortOrder: 0,
      },
      {
        title: 'Video Editor',
        department: 'Content Squad',
        location: 'Remote (India)',
        employmentType: 'Full-time',
        description: 'Edit short-form and long-form video for brands on subscription. Proficiency in Premiere Pro or DaVinci Resolve and fast turnaround mindset.',
        sortOrder: 1,
      },
      {
        title: 'Client Success Manager',
        department: 'Operations',
        location: 'Kochi, Kerala (Hybrid)',
        employmentType: 'Full-time',
        description: 'Own client relationships, coordinate squad delivery, and ensure subscribers get consistent value. Prior agency or SaaS experience is a plus.',
        sortOrder: 2,
      },
    ]
    for (const p of positions) {
      insertPosition.run(p.title, p.department, p.location, p.employmentType, p.description, p.sortOrder)
    }
  }
}
seed()

export default db

export function listLandingPages() {
  return db.prepare(`
    SELECT lp.*, (SELECT COUNT(*) FROM landing_page_languages WHERE landing_page_id = lp.id) as language_count
    FROM landing_pages lp
    ORDER BY lp.updated_at DESC
  `).all()
}

export function getLandingPageBySlug(slug) {
  const page = db.prepare('SELECT * FROM landing_pages WHERE slug = ?').get(slug)
  if (!page) return null
  const languages = db.prepare(`
    SELECT lpl.language_code as code, l.name, lpl.video_url, lpl.audio_url, lpl.sort_order
    FROM landing_page_languages lpl
    JOIN languages l ON l.code = lpl.language_code
    WHERE lpl.landing_page_id = ?
    ORDER BY lpl.sort_order, lpl.id
  `).all(page.id)
  return { ...page, languages }
}

export function createLandingPage({ slug, heroTitle, heroDescription, defaultLanguageCode }) {
  const info = db.prepare(`
    INSERT INTO landing_pages (slug, hero_title, hero_description, default_language_code)
    VALUES (?, ?, ?, ?)
  `).run(slug, heroTitle, heroDescription, defaultLanguageCode || null)
  return info.lastInsertRowid
}

export function updateLandingPage(id, { slug, heroTitle, heroDescription, defaultLanguageCode }) {
  db.prepare(`
    UPDATE landing_pages
    SET slug = ?, hero_title = ?, hero_description = ?, default_language_code = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(slug, heroTitle, heroDescription, defaultLanguageCode || null, id)
}

export function deleteLandingPage(id) {
  db.prepare('DELETE FROM landing_pages WHERE id = ?').run(id)
}

export function replaceLandingPageLanguages(landingPageId, entries) {
  const tx = db.transaction((rows) => {
    db.prepare('DELETE FROM landing_page_languages WHERE landing_page_id = ?').run(landingPageId)
    const insert = db.prepare(`
      INSERT INTO landing_page_languages (landing_page_id, language_code, video_url, audio_url, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `)
    rows.forEach((r, i) => {
      insert.run(landingPageId, r.languageCode, r.videoUrl || '', r.audioUrl || '', i)
    })
  })
  tx(entries)
}

export function listLanguages() {
  return db.prepare('SELECT code, name FROM languages ORDER BY name').all()
}

export function createLanguage({ code, name }) {
  db.prepare('INSERT INTO languages (code, name) VALUES (?, ?)').run(code, name)
}

export function deleteLanguage(code) {
  db.prepare('DELETE FROM languages WHERE code = ?').run(code)
}

export function createSubscriptionRequest({
  serviceType, tier, plan, proposedPrice, workingDays,
  name, email, company, phone,
  country, statesCsv, languagesCsv,
  brandName, natureOfBusiness, shortNote, locationOfBusiness, requirementNote,
}) {
  const info = db.prepare(`
    INSERT INTO subscription_requests
      (service_type, tier, plan, proposed_price, working_days,
       name, email, company, phone,
       country, states_csv, languages_csv,
       brand_name, nature_of_business, short_note, location_of_business, requirement_note)
    VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?,  ?, ?, ?,  ?, ?, ?, ?, ?)
  `).run(
    serviceType, tier, plan, proposedPrice, workingDays || '',
    name, email, company || '', phone,
    country || '', statesCsv || '', languagesCsv || '',
    brandName || '', natureOfBusiness || '', shortNote || '', locationOfBusiness || '', requirementNote || '',
  )
  return info.lastInsertRowid
}

export function listSubscriptionRequests({ status, search, limit = 50, offset = 0 } = {}) {
  const conditions = []
  const params = []

  if (status) {
    conditions.push('status = ?')
    params.push(status)
  }
  if (search) {
    conditions.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)')
    const term = `%${search}%`
    params.push(term, term, term)
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const total = db.prepare(`SELECT COUNT(*) as c FROM subscription_requests ${where}`).get(...params).c
  const items = db.prepare(`
    SELECT * FROM subscription_requests ${where}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset)

  return { items, total }
}

export function getSubscriptionRequestById(id) {
  return db.prepare('SELECT * FROM subscription_requests WHERE id = ?').get(id) || null
}

export function updateSubscriptionRequestStatus(id, status) {
  const allowed = ['pending', 'in_review', 'published', 'cancelled', 'declined']
  if (!allowed.includes(status)) return null

  const existing = db.prepare('SELECT * FROM subscription_requests WHERE id = ?').get(id)
  if (!existing) return null

  db.prepare('UPDATE subscription_requests SET status = ? WHERE id = ?').run(status, id)
  return { ...existing, status }
}

export function listOpenCareerPositions() {
  return db.prepare(`
    SELECT id, title, department, location, employment_type, description, created_at
    FROM career_positions
    WHERE is_open = 1
    ORDER BY sort_order ASC, id ASC
  `).all().map((row) => ({
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    employmentType: row.employment_type,
    description: row.description,
    createdAt: row.created_at,
  }))
}

export function getOpenCareerPositionById(id) {
  const row = db.prepare(`
    SELECT id, title, department, location, employment_type, description, created_at
    FROM career_positions
    WHERE id = ? AND is_open = 1
  `).get(id)
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    employmentType: row.employment_type,
    description: row.description,
    createdAt: row.created_at,
  }
}

export function createCareerApplication({ positionId, name, email, phone }) {
  const info = db.prepare(`
    INSERT INTO career_applications (position_id, name, email, phone)
    VALUES (?, ?, ?, ?)
  `).run(positionId, name, email, phone)
  return info.lastInsertRowid
}

db.exec(`
  CREATE TABLE IF NOT EXISTS offer_reservations (
    id TEXT PRIMARY KEY,
    role_ids TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preference TEXT NOT NULL DEFAULT '',
    payment_link_id TEXT NOT NULL DEFAULT '',
    payment_link_url TEXT NOT NULL DEFAULT '',
    payment_id TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'created',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    paid_at TEXT
  );
`)

export function createOfferReservation(row) {
  db.prepare(`
    INSERT INTO offer_reservations (
      id, role_ids, plan_id, amount, name, email, phone, preference,
      payment_link_id, payment_link_url, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'created')
  `).run(
    row.id,
    row.roleIds,
    row.planId,
    row.amount,
    row.name,
    row.email,
    row.phone,
    row.preference || '',
    row.paymentLinkId || '',
    row.paymentLinkUrl || '',
  )
  return getOfferReservationById(row.id)
}

export function getOfferReservationById(id) {
  return db.prepare('SELECT * FROM offer_reservations WHERE id = ?').get(id) || null
}

export function getOfferReservationByPaymentLinkId(linkId) {
  return db.prepare('SELECT * FROM offer_reservations WHERE payment_link_id = ?').get(linkId) || null
}

export function markOfferReservationPaid(id, paymentId) {
  db.prepare(`
    UPDATE offer_reservations
    SET status = 'paid',
        payment_id = COALESCE(NULLIF(?, ''), payment_id),
        paid_at = COALESCE(paid_at, CURRENT_TIMESTAMP)
    WHERE id = ? AND status != 'paid'
  `).run(paymentId || '', id)
  return getOfferReservationById(id)
}

export function attachOfferPaymentLink(id, { paymentLinkId, paymentLinkUrl }) {
  db.prepare(`
    UPDATE offer_reservations
    SET payment_link_id = ?, payment_link_url = ?
    WHERE id = ?
  `).run(paymentLinkId, paymentLinkUrl, id)
  return getOfferReservationById(id)
}
