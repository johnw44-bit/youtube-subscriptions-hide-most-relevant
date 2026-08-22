# YouTube Subscriptions - Hide Most Relevant

A tiny Chrome extension (Manifest V3) that hides the algorithmic "Most relevant" shelf on YouTube's subscriptions feed page, so you only see your subscriptions in chronological order.

## Install

1. Download or clone this repo.
2. Open `chrome://extensions` in Chrome.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this folder.
5. Visit [youtube.com/feed/subscriptions](https://www.youtube.com/feed/subscriptions) — the "Most relevant" shelf will be hidden automatically.

## How it works

`content.js` watches the subscriptions page for shelves (`ytd-rich-section-renderer`) whose heading matches a target string (e.g. "Most relevant") and hides them. A `MutationObserver` keeps re-scanning as YouTube loads content dynamically.

To hide additional shelves, add their heading text to the `TARGET_TEXTS` array in `content.js`.
