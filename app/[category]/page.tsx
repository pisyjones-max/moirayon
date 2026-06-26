import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { generatePage } from "@/lib/generatePage";

// ---------------------------------------------------------------------------
// Типы параметров
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ category: string }>;
}

// ---------------------------------------------------------------------------
// generateStaticParams — генерирует все комбинации services × cities
// ---------------------------------------------------------------------------

export function generateStaticParams(): { category: string }[] {
  const params: { category: string }[] = [];

  for (const service of services) {
    for (const city of cities) {
      params.push({ category: `${service.serviceSlug}-${city.slug}` });
    }
  }

  return params;
}

// ---------------------------------------------------------------------------
// Парсинг slug → serviceSlug + citySlug
// ---------------------------------------------------------------------------

function parseCategory(category: string) {
  // Перебираем все услуги: ищем ту, чей serviceSlug является префиксом
  for (const service of services) {
    const prefix = service.serviceSlug + "-";
    if (category.startsWith(prefix)) {
      const citySlug = category.slice(prefix.length);
      const city = cities.find((c) => c.slug === citySlug);
      if (city) return { service, city };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Metadata (SEO)
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const parsed = parseCategory(category);
  if (!parsed) return { title: "Страница не найдена" };

  const page = generatePage(parsed.service, parsed.city);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${category}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${category}`,
      locale: "ru_RU",
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Страница
// ---------------------------------------------------------------------------

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const parsed = parseCategory(category);

  if (!parsed) notFound();

  const page = generatePage(parsed.service, parsed.city);

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", fontFamily: "sans-serif" }}>
      {/* H1 — уникальный для каждого города */}
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{page.h1}</h1>

      {/* Вводный абзац */}
      <p style={{ lineHeight: 1.7, color: "#444", marginBottom: "2rem" }}>{page.intro}</p>

      {/* Блок «Почему мы» */}
      <section>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>Почему выбирают нас</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8 }}>
          {page.whyUs.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Debug-строка (убрать в проде) */}
      <p
        style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#aaa" }}
        data-testid="debug-slug"
      >
        slug: {page.pageSlug}
      </p>
    </main>
  );
}
