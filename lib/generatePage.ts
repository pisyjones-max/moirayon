import type { City } from "@/data/cities";

// ---------------------------------------------------------------------------
// Типы
// ---------------------------------------------------------------------------

export interface ServiceDefinition {
  serviceSlug: string;
  h1Variants: string[];
  introVariants: string[];
  whyUsVariants: string[][];
  metaTitleVariants: string[];
  metaDescriptionVariants: string[];
}

export interface GeneratedPage {
  /** Полный slug страницы, напр. "kosilka-travy-gzhel" */
  pageSlug: string;
  h1: string;
  intro: string;
  whyUs: string[];
  metaTitle: string;
  metaDescription: string;
  city: City;
  serviceSlug: string;
}

// ---------------------------------------------------------------------------
// Детерминированный хэш
// ---------------------------------------------------------------------------

/**
 * Простой djb2-хэш строки → неотрицательное число.
 * Одна и та же строка всегда даёт одно и то же число —
 * это гарантирует идентичный результат при SSG и при клиентском рендере.
 */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; // >>> 0 → uint32
  }
  return h;
}

/**
 * Детерминированный выбор элемента из массива.
 * seed — уникальная строка (обычно pageSlug + ключ поля),
 * чтобы разные поля одной страницы выбирали независимые варианты.
 */
export function pick<T>(variants: T[], seed: string): T {
  if (variants.length === 0) throw new Error("pick: пустой массив вариантов");
  return variants[hash(seed) % variants.length];
}

// ---------------------------------------------------------------------------
// Подстановка переменных
// ---------------------------------------------------------------------------

type CityTokenMap = {
  [K in keyof City as `{city.${string & K}}`]?: string;
};

/** Заменяет {city.nominative}, {city.adjective} и т.д. в строке шаблона */
function interpolate(template: string, city: City): string {
  return template
    .replace(/\{city\.nominative\}/g, city.nominative)
    .replace(/\{city\.genitive\}/g, city.genitive)
    .replace(/\{city\.dative\}/g, city.dative)
    .replace(/\{city\.prepositional\}/g, city.prepositional)
    .replace(/\{city\.adjective\}/g, city.adjective);
}

// ---------------------------------------------------------------------------
// Генератор страницы
// ---------------------------------------------------------------------------

/**
 * Генерирует всё содержимое страницы для пары (сервис × город).
 * Функция чистая и детерминированная: одни и те же аргументы → один результат.
 */
export function generatePage(service: ServiceDefinition, city: City): GeneratedPage {
  const pageSlug = `${service.serviceSlug}-${city.slug}`;

  // Для каждого поля используем свой seed = pageSlug + "#имяПоля"
  // чтобы H1, intro и meta не выбирали одинаковый индекс.
  const h1Raw      = pick(service.h1Variants,              `${pageSlug}#h1`);
  const introRaw   = pick(service.introVariants,           `${pageSlug}#intro`);
  const whyUsRaw   = pick(service.whyUsVariants,           `${pageSlug}#whyUs`);
  const metaTRaw   = pick(service.metaTitleVariants,       `${pageSlug}#metaTitle`);
  const metaDRaw   = pick(service.metaDescriptionVariants, `${pageSlug}#metaDesc`);

  return {
    pageSlug,
    city,
    serviceSlug: service.serviceSlug,
    h1:              interpolate(h1Raw,    city),
    intro:           interpolate(introRaw, city),
    whyUs:           whyUsRaw.map((item) => interpolate(item, city)),
    metaTitle:       interpolate(metaTRaw,  city),
    metaDescription: interpolate(metaDRaw,  city),
  };
}
