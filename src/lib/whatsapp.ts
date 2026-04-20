import type { CartItem } from './cart';

export const WHATSAPP_PHONE = '77787806540';

export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function buildOrderMessage(items: CartItem[]): string {
  if (items.length === 0) return '';
  const lines: string[] = ['Здравствуйте! Хочу оформить заказ:', ''];
  let total = 0;
  for (const i of items) {
    const sum = i.price * i.qty;
    total += sum;
    lines.push(`• ${i.name} (арт. ${i.sku}) × ${i.qty} — ${sum.toLocaleString('ru-RU')} ₸`);
  }
  lines.push('');
  lines.push(`Итого: ${total.toLocaleString('ru-RU')} ₸`);
  lines.push('');
  lines.push('Подскажите по срокам и оплате, пожалуйста.');
  return lines.join('\n');
}

export function buildProductInquiry(sku: string, name: string, price: number): string {
  return [
    `Здравствуйте! Интересует ${name} (арт. ${sku}) за ${price.toLocaleString('ru-RU')} ₸.`,
    'Есть ли в наличии и какие сроки доставки в Астану?',
  ].join('\n');
}
