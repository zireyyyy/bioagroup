-- BIO-A lead database; create and migrate before enabling form endpoint.
CREATE TABLE IF NOT EXISTS bioa_leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  interest TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'vi',
  page_path TEXT NOT NULL DEFAULT '/',
  consent_at TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  sheet_status TEXT NOT NULL DEFAULT 'pending',
  email_status TEXT NOT NULL DEFAULT 'pending'
);
CREATE INDEX IF NOT EXISTS idx_bioa_leads_recent ON bioa_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_bioa_leads_ip_recent ON bioa_leads(ip_hash,created_at);
