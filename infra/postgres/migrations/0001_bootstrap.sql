-- CheckMe! PostgreSQL bootstrap
-- No business tables are introduced in A0.4.1.
-- This migration establishes only infrastructure metadata.

CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO schema_migrations (version)
VALUES ('0001_bootstrap')
ON CONFLICT (version) DO NOTHING;
