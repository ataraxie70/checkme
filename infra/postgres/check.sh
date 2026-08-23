#!/bin/sh
set -eu

: "${POSTGRES_HOST:=127.0.0.1}"
: "${POSTGRES_PORT:=5432}"
: "${POSTGRES_USER:=checkme}"
: "${POSTGRES_DB:=checkme}"

PGPASSWORD="${POSTGRES_PASSWORD:-checkme}" \
  psql \
    --host "$POSTGRES_HOST" \
    --port "$POSTGRES_PORT" \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DB" \
    --command 'SELECT 1;' \
    --no-psqlrc \
    --quiet >/dev/null

printf '%s\n' 'PostgreSQL: ready'
