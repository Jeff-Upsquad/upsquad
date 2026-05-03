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
  brandName, natureOfBusiness, shortNote, locationOfBusiness,
}) {
  const info = db.prepare(`
    INSERT INTO subscription_requests
      (service_type, tier, plan, proposed_price, working_days,
       name, email, company, phone,
       country, states_csv, languages_csv,
       brand_name, nature_of_business, short_note, location_of_business)
    VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?,  ?, ?, ?,  ?, ?, ?, ?)
  `).run(
    serviceType, tier, plan, proposedPrice, workingDays || '',
    name, email, company || '', phone,
    country || '', statesCsv || '', languagesCsv || '',
    brandName || '', natureOfBusiness || '', shortNote || '', locationOfBusiness || '',
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
