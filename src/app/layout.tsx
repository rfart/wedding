import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Italianno } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan | Radifan & Syifa",
  description:
    "Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Anda untuk hadir di hari pernikahan Radifan Aji Karami & Syifa Rahmatika, Minggu 6 Desember 2026.",
  icons: {
    icon: "/invitations/images/flowerbg.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} ${italianno.variable}`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
