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
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT DEFAULT '',
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`)

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

export function createSubscriptionRequest({ serviceType, tier, plan, proposedPrice, name, email, company, phone }) {
  const info = db.prepare(`
    INSERT INTO subscription_requests (service_type, tier, plan, proposed_price, name, email, company, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(serviceType, tier, plan, proposedPrice, name, email, company || '', phone)
  return info.lastInsertRowid
}
