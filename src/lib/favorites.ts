const KEY = 'beadora_favorites';

export function readFavorites(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function writeFavorites(skus: string[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(skus));
  window.dispatchEvent(new CustomEvent('favorites:change', { detail: skus }));
}

export function toggleFavorite(sku: string): boolean {
  const list = readFavorites();
  const idx = list.indexOf(sku);
  if (idx === -1) {
    list.push(sku);
  } else {
    list.splice(idx, 1);
  }
  writeFavorites(list);
  return idx === -1;
}

export function isFavorite(sku: string): boolean {
  return readFavorites().includes(sku);
}
