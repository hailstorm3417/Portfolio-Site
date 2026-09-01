#!/bin/sh
# Stamp a version onto the CSS and JS references in every page.
#
# GitHub Pages serves assets with Cache-Control: max-age=600, so for ten
# minutes after a deploy a browser will keep using the copy it already has —
# without even asking whether it changed. That can leave new HTML running
# against old JS, which looks like a broken build rather than a stale cache.
# A changed query string is a different URL, so the browser has to fetch it.
#
# Run this after changing styles.css or any .js, before committing:
#   ./bump-assets.sh
V=$(date +%Y%m%d%H%M)
for f in *.html; do
  sed -i -E "s/(href=\"styles\.css)(\?v=[0-9]+)?\"/\1?v=$V\"/g; s/(src=\"[a-z-]+\.js)(\?v=[0-9]+)?\"/\1?v=$V\"/g" "$f"
done
echo "assets stamped v=$V"
