export interface CartItem {
  sku: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

const KEY = 'beadora_cart';

export function readCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1): void {
  const items = readCart();
  const existing = items.find((i) => i.sku === item.sku);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...item, qty });
  }
  writeCart(items);
}

export function removeFromCart(sku: string): void {
  writeCart(readCart().filter((i) => i.sku !== sku));
}

export function updateQty(sku: string, qty: number): void {
  const items = readCart();
  const item = items.find((i) => i.sku === sku);
  if (!item) return;
  if (qty <= 0) {
    writeCart(items.filter((i) => i.sku !== sku));
  } else {
    item.qty = qty;
    writeCart(items);
  }
}

export function clearCart(): void {
  writeCart([]);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
