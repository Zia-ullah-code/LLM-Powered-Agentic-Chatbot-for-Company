#!/bin/sh

echo "[n8n startup] Importing workflows from /workflows..."
for file in /workflows/*.json; do
  if [ -f "$file" ]; then
    echo "[n8n startup] Importing $file"
    n8n import:workflow --input="$file" || echo "[n8n startup] Failed to import $file (might already exist)"
  fi
done

echo "[n8n startup] Starting n8n..."
exec n8n
