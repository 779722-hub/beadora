import { z } from 'zod';

export const ProductCategorySchema = z.enum(['bracelet', 'necklace', 'earrings', 'set', 'new']);
export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const ProductSchema = z.object({
  sku: z.string().regex(/^\d{4}$/, 'Артикул должен быть 4-значным числом'),
  category: ProductCategorySchema,
  categoryTitle: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number().int().positive(),
  currency: z.literal('KZT').default('KZT'),
  stones: z.array(z.string()).min(1),
  stonesRaw: z.array(z.string()).optional(),
  zodiac: z.array(z.string()).default([]),
  properties: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  available: z.boolean().default(true),
  new: z.boolean().default(false),
  featured: z.boolean().default(false),
  images: z.array(z.string()).min(1),
  videos: z.array(z.string()).optional(),
  description: z.string().default(''),
  care: z.string().default(''),
  length_cm: z.number().optional(),
});
export type Product = z.infer<typeof ProductSchema>;

export const StoneSchema = z.object({
  slug: z.string(),
  title: z.string(),
  color: z.string(),
  short: z.string(),
  properties: z.array(z.string()),
  zodiac_affinity: z.array(z.string()),
  description: z.string(),
  image: z.string(),
});
export type Stone = z.infer<typeof StoneSchema>;

export const ZodiacSignSchema = z.object({
  slug: z.string(),
  title: z.string(),
  symbol: z.string(),
  dates: z.string(),
  element: z.enum(['fire', 'earth', 'air', 'water']),
  recommended_stones: z.array(z.string()),
  traits: z.array(z.string()),
  description: z.string(),
});
export type ZodiacSign = z.infer<typeof ZodiacSignSchema>;

export const CategorySchema = z.object({
  slug: z.string(),
  title: z.string(),
  titlePlural: z.string(),
  description: z.string(),
  image: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export function parseProducts(raw: unknown): Product[] {
  return z.array(ProductSchema).parse(raw);
}

export function parseStones(raw: unknown): Stone[] {
  return z.array(StoneSchema).parse(raw);
}

export function parseZodiac(raw: unknown): ZodiacSign[] {
  return z.array(ZodiacSignSchema).parse(raw);
}

export function parseCategories(raw: unknown): Category[] {
  return z.array(CategorySchema).parse(raw);
}
