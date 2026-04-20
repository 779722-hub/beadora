import products from '../data/products.json';
import stones from '../data/stones.json';
import zodiac from '../data/zodiac.json';
import categories from '../data/categories.json';
import {
  parseProducts,
  parseStones,
  parseZodiac,
  parseCategories,
  type Product,
  type Stone,
  type ZodiacSign,
  type Category,
} from './schemas';

export const PRODUCTS: Product[] = parseProducts(products);
export const STONES: Stone[] = parseStones(stones);
export const ZODIAC: ZodiacSign[] = parseZodiac(zodiac);
export const CATEGORIES: Category[] = parseCategories(categories);

export function productBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function stoneBySlug(slug: string): Stone | undefined {
  return STONES.find((s) => s.slug === slug);
}

export function zodiacBySlug(slug: string): ZodiacSign | undefined {
  return ZODIAC.find((z) => z.slug === slug);
}

export function productsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function productsByStone(stoneSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.stones.includes(stoneSlug));
}

export function productsByZodiac(zodiacSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.zodiac.includes(zodiacSlug));
}

export function featuredProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function newArrivals(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.new).slice(0, limit);
}

export function similarProducts(sku: string, limit = 4): Product[] {
  const product = productBySku(sku);
  if (!product) return [];
  return PRODUCTS.filter((p) => p.sku !== sku)
    .map((p) => {
      const stoneOverlap = p.stones.filter((s) => product.stones.includes(s)).length;
      const categoryMatch = p.category === product.category ? 2 : 0;
      return { product: p, score: stoneOverlap + categoryMatch };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product);
}

export function formatPrice(price: number, currency = 'KZT'): string {
  const formatted = price.toLocaleString('ru-RU');
  return currency === 'KZT' ? `${formatted} ₸` : `${formatted} ${currency}`;
}

export function stoneTitles(stoneSlugs: string[]): string {
  return stoneSlugs
    .map((s) => stoneBySlug(s)?.title ?? s)
    .join(', ');
}
