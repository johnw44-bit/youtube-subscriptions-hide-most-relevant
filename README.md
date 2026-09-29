# YouTube Subscriptions - Hide Most Relevant

A tiny Chrome extension (Manifest V3) that hides the algorithmic "Most relevant" shelf on YouTube's subscriptions feed page, so you only see your subscriptions in chronological order.

## Install

1. Download or clone this repo.
2. Open `chrome://extensions` in Chrome.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this folder.
5. Visit [youtube.com/feed/subscriptions](https://www.youtube.com/feed/subscriptions) — the "Most relevant" shelf will be hidden automatically.

## How it works

`content.js` runs on YouTube and, while you are on `/feed/subscriptions`, hides
every algorithmic shelf — any `ytd-rich-section-renderer` that contains a
`ytd-rich-shelf-renderer`. This catches "Most relevant", "Shorts", "For you",
*and* the second, near-identical "Most relevant" YouTube sometimes injects on a
fresh boot — regardless of heading text or language.

Left untouched: your chronological subscription videos (`ytd-rich-item-renderer`)
and the "Latest / All subscriptions" switch (a `ytd-rich-section-renderer` that
holds a plain `ytd-shelf-renderer`, not a *rich* shelf).

A `MutationObserver` plus a `yt-navigate-finish` listener keep it working as
YouTube loads content dynamically and as you navigate within the app.

### Tuning

In `content.js`:

- `HIDE_ALL_SHELVES = true` (default) — hide every rich shelf on the feed.
- Set it to `false` to only hide shelves whose heading matches a string in
  `TARGET_TEXTS` (add more languages / labels there as needed).

## Licens

MIT — se [LICENSE](LICENSE).
