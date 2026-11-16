#!/usr/bin/env bash
# One-time per session: install three.js + Playwright and make sure Chromium exists.
set -e; cd "$(dirname "$0")"
npm install --no-audit --no-fund >/dev/null
node -e "require('playwright')" 2>/dev/null || npm install playwright >/dev/null
[ -x /opt/pw-browsers/chromium-1243/chrome-linux64/chrome ] || npx playwright install chromium >/dev/null
python3 -c "import numpy, PIL" 2>/dev/null || pip install --break-system-packages -q numpy pillow
which ffmpeg >/dev/null && echo "setup ok"
