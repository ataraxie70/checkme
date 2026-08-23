#!/bin/sh
set -eu

: "${POSTGRES_HOST:=127.0.0.1}"
: "${POSTGRES_PORT:=5432}"
: "${POSTGRES_DB:=checkme}"
: "${POSTGRES_USER:=checkme}"
: "${POSTGRES_PASSWORD:=checkme_local_only}"

export PGPASSWORD="$POSTGRES_PASSWORD"

for migration in /migrations/*.sql; do
  [ -f "$migration" ] || continue
  echo "Applying ${migration##*/}"
  psql \
    --host "$POSTGRES_HOST" \
    --port "$POSTGRES_PORT" \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DB" \
    --no-psqlrc \
    --file "$migration"
done
