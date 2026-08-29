(function () {
  // YouTube injects horizontal "shelves" into the subscriptions feed:
  //   - "Most relevant"
  //   - a second, near-identical "Most relevant" it sometimes adds on a fresh
  //     boot (the "extra layer")
  //   - "Shorts", "For you", ...
  // Their heading text and markup vary by language, A/B test and page load, so
  // matching on the heading string alone is unreliable.
  //
  // What every one of these shelves has in common on /feed/subscriptions is a
  // <ytd-rich-shelf-renderer> inside a <ytd-rich-section-renderer>. The real
  // chronological videos are bare <ytd-rich-item-renderer> in the grid, and the
  // "Latest / All subscriptions" switch is a <ytd-rich-section-renderer> that
  // holds a <ytd-shelf-renderer> (not a *rich* shelf) — so this rule leaves
  // both untouched.
  const HIDE_ALL_SHELVES = true;

  // Only used when HIDE_ALL_SHELVES is false: hide shelves whose heading
  // matches one of these strings (add more languages / labels as needed).
  const TARGET_TEXTS = [
    'Most relevant',
    'Mest relevanta',
    'For you',
    'Åt dig',
    'Shorts',
  ];

  function onSubscriptionsPage() {
    return location.pathname === '/feed/subscriptions';
  }

  function isShelf(section) {
    if (HIDE_ALL_SHELVES) {
      return !!section.querySelector('ytd-rich-shelf-renderer');
    }
    const heading = section.querySelector('#title, h2, yt-formatted-string');
    if (!heading) return false;
    const text = heading.textContent.trim().toLowerCase();
    return TARGET_TEXTS.some((t) => text.includes(t.toLowerCase()));
  }

  function hideShelf(section) {
    if (section.dataset.hiddenByExtension) return;
    if (!isShelf(section)) return;
    section.style.display = 'none';
    section.dataset.hiddenByExtension = 'true';
  }

  function scan() {
    if (!onSubscriptionsPage()) return;
    document.querySelectorAll('ytd-rich-section-renderer').forEach(hideShelf);
  }

  scan();

  const observer = new MutationObserver(scan);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // YouTube is a single-page app; catch in-app navigation to the feed too.
  window.addEventListener('yt-navigate-finish', scan);
})();
