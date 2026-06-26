import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "МойРайон — услуги в Богородском районе",
  description: "Находим проверенных мастеров рядом с вами",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
