/** JSON-LD builders for structured data. */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[], siteOrigin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, siteOrigin).toString(),
    })),
  };
}

export function organizationJsonLd(siteOrigin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Beadora',
    alternateName: 'Beadora.kz',
    url: siteOrigin,
    logo: new URL('/images/logo.png', siteOrigin).toString(),
    description:
      'Авторские украшения из натуральных камней ручной работы в Астане. Браслеты, серьги, ожерелья и комплекты с подбором по знаку зодиака.',
    sameAs: ['https://www.instagram.com/beadora.kz/', 'https://wa.me/77787806540'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+77787806540',
      contactType: 'sales',
      areaServed: 'KZ',
      availableLanguage: ['Russian', 'Kazakh'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Брусиловского, 5',
      addressLocality: 'Астана',
      addressCountry: 'KZ',
    },
  };
}

export function websiteJsonLd(siteOrigin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Beadora.kz',
    url: siteOrigin,
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteOrigin}/catalog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessJsonLd(siteOrigin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': `${siteOrigin}/#store`,
    name: 'Beadora — магазин «ADORA»',
    image: new URL('/og-default.jpg', siteOrigin).toString(),
    url: siteOrigin,
    telephone: '+77787806540',
    email: '779722@gmail.com',
    priceRange: '5000–25000 ₸',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Брусиловского, 5',
      addressLocality: 'Астана',
      addressCountry: 'KZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.1605,
      longitude: 71.4704,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '20:00',
      },
    ],
    sameAs: ['https://www.instagram.com/beadora.kz/'],
    currenciesAccepted: 'KZT',
    paymentAccepted: 'Cash, Credit Card, Kaspi',
    areaServed: {
      '@type': 'Country',
      name: 'Казахстан',
    },
  };
}

export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a.replace(/<[^>]+>/g, ''),
      },
    })),
  };
}
