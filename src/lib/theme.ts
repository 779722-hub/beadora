export type ThemeMode = 'auto' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

export const THEME_KEY = 'beadora_theme_mode';
export const ASTANA_TZ = 'Asia/Almaty';
export const LIGHT_HOUR_START = 8;
export const LIGHT_HOUR_END = 20;

export function getAstanaHour(now: Date = new Date()): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: ASTANA_TZ,
    hour: 'numeric',
    hour12: false,
  });
  return Number(formatter.format(now));
}

export function computeAutoTheme(now: Date = new Date()): Theme {
  const h = getAstanaHour(now);
  return h >= LIGHT_HOUR_START && h < LIGHT_HOUR_END ? 'light' : 'dark';
}

export function resolveTheme(mode: ThemeMode, now: Date = new Date()): Theme {
  if (mode === 'light' || mode === 'dark') return mode;
  return computeAutoTheme(now);
}

export function readMode(): ThemeMode {
  if (typeof localStorage === 'undefined') return 'auto';
  const v = localStorage.getItem(THEME_KEY);
  return v === 'light' || v === 'dark' || v === 'auto' ? v : 'auto';
}

export function writeMode(mode: ThemeMode): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_KEY, mode);
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
