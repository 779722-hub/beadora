/*
 * Inline-inserted before first paint — runs synchronously to avoid flash.
 * Keep minimal, no imports; logic mirrors theme.ts but inlined.
 */
(() => {
  const KEY = 'beadora_theme_mode';
  const stored = localStorage.getItem(KEY);
  const mode = stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';

  const computeAuto = () => {
    const h = Number(
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Almaty',
        hour: 'numeric',
        hour12: false,
      }).format(new Date())
    );
    return h >= 8 && h < 20 ? 'light' : 'dark';
  };

  const theme = mode === 'auto' ? computeAuto() : mode;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
