import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "МойРайон — услуги в Богородском районе Подмосковья",
  description:
    "Найдите проверенных мастеров рядом с домом: покос травы, уборка, строительство и другие услуги в Гжели, Ногинске, Раменском и соседних городах.",
};

const popularServices = [
  { label: "Покос травы", slug: "kosilka-travy" },
];

const cities = [
  { label: "Гжель", slug: "gzhel" },
  { label: "Раменское", slug: "ramenskoe" },
  { label: "Ногинск", slug: "noginsk" },
  { label: "Электросталь", slug: "elektrostal" },
  { label: "Жуковский", slug: "zhukovsky" },
  { label: "Бронницы", slug: "bronnitsy" },
  { label: "Лыткарино", slug: "lytkarino" },
  { label: "Старая Купавна", slug: "staraya-kupavna" },
];

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        minHeight: "100vh",
        background: "#f7f8fa",
        color: "#1a1a1a",
      }}
    >
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a56db 0%, #0e3fa8 100%)",
          color: "#fff",
          padding: "60px 20px 50px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 16px" }}>
          МойРайон
        </h1>
        <p style={{ fontSize: "1.15rem", opacity: 0.9, maxWidth: 520, margin: "0 auto 32px" }}>
          Проверенные мастера и услуги рядом с вашим домом в Богородском районе Подмосковья
        </p>
        <a
          href="tel:+79991234567"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#1a56db",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "14px 32px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Позвонить нам
        </a>
      </section>

      {/* УСЛУГИ × ГОРОДА */}
      <section style={{ maxWidth: 860, margin: "48px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 24 }}>
          Популярные услуги
        </h2>

        {popularServices.map((service) => (
          <div key={service.slug} style={{ marginBottom: 36 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 14, color: "#1a56db" }}>
              {service.label}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${service.slug}-${city.slug}`}
                  style={{
                    padding: "10px 18px",
                    background: "#fff",
                    border: "1px solid #dce1e9",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: "#333",
                    fontSize: "0.95rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "border-color 0.15s",
                  }}
                >
                  {service.label} — {city.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section
        style={{
          background: "#fff",
          padding: "48px 20px",
          borderTop: "1px solid #e8eaed",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 28, textAlign: "center" }}>
            Почему выбирают МойРайон
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              ["🏆", "Проверенные мастера", "Каждый исполнитель проходит проверку"],
              ["⚡", "Быстрый выезд", "Мастер приедет в день обращения"],
              ["💰", "Честные цены", "Фиксированная стоимость без скрытых доплат"],
              ["📍", "Рядом с вами", "Работаем в 8 городах Богородского района"],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  background: "#f7f8fa",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: "0.88rem", color: "#666" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px 20px",
          fontSize: "0.82rem",
          color: "#999",
          borderTop: "1px solid #e8eaed",
        }}
      >
        © {new Date().getFullYear()} МойРайон · Богородский район Московской области
      </footer>
    </main>
  );
}
