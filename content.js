(function () {
  // Add more heading strings here (e.g. 'Shorts') to hide additional shelves.
  const TARGET_TEXTS = ['Most relevant', 'Mest relevanta'];

  function hideShelf(section) {
    if (section.dataset.hiddenByExtension) return;
    const heading = section.querySelector('h2');
    if (!heading) return;
    const text = heading.textContent.trim();
    if (TARGET_TEXTS.includes(text)) {
      section.style.display = 'none';
      section.dataset.hiddenByExtension = 'true';
    }
  }

  function scan() {
    document.querySelectorAll('ytd-rich-section-renderer').forEach(hideShelf);
  }

  scan();

  const observer = new MutationObserver(scan);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
