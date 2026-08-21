#!/bin/sh
set -eu

# This script is mounted into the local MinIO bootstrap container.
# Production credentials and policies must come from a secret manager.
mc alias set local http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"
mc mb --ignore-existing "local/checkme-source"
mc anonymous set none "local/checkme-source"
printf '%s\n' 'CheckMe source bucket initialized.'
