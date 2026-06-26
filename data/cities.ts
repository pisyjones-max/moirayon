/**
 * Справочник городов Богородского района.
 * Каждая запись содержит slug + полный набор падежей для шаблонизатора.
 */
export interface City {
  /** URL-slug: используется в пути /[category] */
  slug: string;
  /** Именительный: «Гжель» */
  nominative: string;
  /** Родительный: «в Гжели» */
  genitive: string;
  /** Дательный: «Гжели» (для «по Гжели») */
  dative: string;
  /** Предложный: «в Гжели» */
  prepositional: string;
  /** Прилагательное: «гжельский» */
  adjective: string;
}

export const cities: City[] = [
  {
    slug: "gzhel",
    nominative: "Гжель",
    genitive: "Гжели",
    dative: "Гжели",
    prepositional: "Гжели",
    adjective: "гжельский",
  },
  {
    slug: "ramenskoe",
    nominative: "Раменское",
    genitive: "Раменского",
    dative: "Раменскому",
    prepositional: "Раменском",
    adjective: "раменский",
  },
  {
    slug: "noginsk",
    nominative: "Ногинск",
    genitive: "Ногинска",
    dative: "Ногинску",
    prepositional: "Ногинске",
    adjective: "ногинский",
  },
  {
    slug: "elektrostal",
    nominative: "Электросталь",
    genitive: "Электростали",
    dative: "Электростали",
    prepositional: "Электростали",
    adjective: "электростальский",
  },
  {
    slug: "zhukovsky",
    nominative: "Жуковский",
    genitive: "Жуковского",
    dative: "Жуковскому",
    prepositional: "Жуковском",
    adjective: "жуковский",
  },
  {
    slug: "bronnitsy",
    nominative: "Бронницы",
    genitive: "Бронниц",
    dative: "Бронницам",
    prepositional: "Бронницах",
    adjective: "бронницкий",
  },
  {
    slug: "lytkarino",
    nominative: "Лыткарино",
    genitive: "Лыткарино",
    dative: "Лыткарину",
    prepositional: "Лыткарине",
    adjective: "лыткаринский",
  },
  {
    slug: "staraya-kupavna",
    nominative: "Старая Купавна",
    genitive: "Старой Купавны",
    dative: "Старой Купавне",
    prepositional: "Старой Купавне",
    adjective: "купавинский",
  },
];

/** Быстрый поиск города по slug */
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
