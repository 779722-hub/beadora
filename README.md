# Beadora.kz — новый сайт

Авторские украшения из натуральных камней в Астане. Статический сайт на Astro, деплой через GitHub Pages.

## Что сделано

- **Стек:** Astro 5, TypeScript, vanilla CSS с переменными, Zod для валидации данных
- **Тёмная + светлая темы** с переключением вручную (☀/☾/авто) и **автоматическим переходом в 08:00/20:00 по времени Астаны** (UTC+5)
- **14 секций на главной:** hero (казахский культурный), trust bar, видео-блок, новинки, квиз-промо, категории, сила камня, о бренде, лукбук, отзывы, Instagram, FAQ, подписка, контакты + карта
- **Каталог с фильтрами** по категории, камню, знаку зодиака, цене, новинкам — с URL-синхронизацией
- **~100 страниц товаров** генерируются из `src/data/products.json` по артикулу (`/product/0083` и т.д.)
- **15 страниц камней** с подборками товаров по каждому
- **12 страниц по знакам зодиака**
- **Квиз-подборщик** из 5 шагов
- **Корзина + избранное** (localStorage), заказ уходит готовым сообщением в **WhatsApp** на +7 (778) 780-65-40
- **SEO:** sitemap, Schema.org Product, Open Graph, canonical, PWA-манифест
- **Плавающая WhatsApp-кнопка**, микроанимации, reveal-on-scroll

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # статическая сборка в dist/
npm run preview    # просмотр собранного
```

## Структура

```
src/
├── layouts/Base.astro      — обёртка с темой (init-скрипт inline, без FOUC)
├── components/
│   ├── layout/             — Header, Footer, ThemeToggle, WhatsAppFab
│   ├── product/            — ProductCard, CatalogFilters
│   ├── home/               — 14 секций главной
│   └── ui/                 — Accordion и общие UI
├── lib/
│   ├── theme.ts            — auto/light/dark + Астана
│   ├── cart.ts             — корзина в localStorage
│   ├── favorites.ts        — избранное
│   ├── whatsapp.ts         — билдер заказа для WhatsApp
│   ├── schemas.ts          — Zod схемы
│   └── data.ts             — загрузка + валидация JSON-данных
├── data/
│   ├── products.json       — каталог товаров (~12 сейчас, добавлять сюда)
│   ├── stones.json         — 15 камней
│   ├── zodiac.json         — 12 знаков
│   └── categories.json     — 4 категории
├── pages/
│   ├── index.astro         — главная
│   ├── catalog/            — каталог + подкатегории + зодиак
│   ├── product/[sku].astro — карточка товара (SSG по артикулу)
│   ├── stones/             — камни
│   ├── quiz.astro
│   ├── cart.astro
│   ├── favorites.astro
│   ├── about.astro
│   ├── contacts.astro
│   ├── reference.astro
│   └── 404.astro
└── styles/
    ├── global.css          — базовая типографика, кнопки, утилиты
    └── themes.css          — токены тёмной и светлой тем
```

## Как добавить товар

Редактируем `src/data/products.json`, добавляем объект по схеме:

```json
{
  "sku": "0099",
  "category": "bracelet",
  "categoryTitle": "Браслет",
  "name": "Новое название",
  "slug": "novoe-nazvanie",
  "price": 12000,
  "stones": ["ametist", "agat"],
  "zodiac": ["strelec"],
  "properties": ["harmony"],
  "colors": ["purple"],
  "available": true,
  "new": true,
  "featured": false,
  "images": ["/images/products/0099/01.jpg"],
  "description": "…"
}
```

Кладём фото в `public/images/products/NNNN/01.jpg`. Push в main — и GitHub Actions пересобирает.

Zod-схема (`src/lib/schemas.ts`) проверит формат при сборке — ошибки сломают build, чтобы битые данные не попали на прод.

## Деплой

1. Репозиторий: `github.com/779722-hub/beadora`
2. Push в `main` → `.github/workflows/deploy.yml` собирает и деплоит на GitHub Pages
3. `public/CNAME` уже содержит `beadora.kz`
4. **DNS** у регистратора домена:
   - `A` записи → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` для `www` → `779722-hub.github.io`
5. В Settings → Pages → Custom domain: добавить `beadora.kz`, дождаться верификации, включить **Enforce HTTPS**

## Что нужно доделать

### Контент
- [ ] Добавить остальные ~88 товаров в `products.json` (распарсить скриншоты админки через OCR или заполнить вручную)
- [ ] Снять и загрузить **настоящие** фото товаров в `/images/products/NNNN/` — сейчас там заглушки из админ-экспорта
- [ ] Фото камней в `/images/stones/` (сейчас рисуем свотчами)
- [ ] Снять видео «История Beadora» или заменить `youtubeId` в `src/components/home/VideoBlock.astro` → `<VideoBlock youtubeId="XXXXX" />`
- [ ] Написать тексты политики конфиденциальности и оферты (ссылки в футере ведут на `/privacy` и `/offer` — страниц пока нет)
- [ ] Реальные отзывы вместо демо в `src/components/home/Testimonials.astro`
- [ ] Instagram-тайлы: либо статически заменить `/images/instagram/01.jpg`…`06.jpg`, либо подключить feed-API

### Технические
- [ ] Заменить e-mail в форме подписки на боевой (`src/components/home/NewsletterCta.astro`, сейчас `779722@gmail.com`)
- [ ] Подключить счётчики: Яндекс.Метрика, Google Analytics
- [ ] Настроить `favicon-192.png` и `favicon-512.png` для PWA (сейчас только SVG)
- [ ] Заменить координаты в Яндекс.Карте на точный адрес (сейчас примерные координаты центра Астаны)
```
