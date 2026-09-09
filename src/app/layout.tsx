import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PointerGlow } from "@/components/PointerGlow";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const plex = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "BFN Tezz est. 1996",
  description:
    "Official merch and visuals from BFN Tezz, Tuscaloosa hip-hop, est. 1996.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} ${plex.variable} antialiased`}>
        <CartProvider>
          <div className="scan" />
          <div className="grain" />
          <PointerGlow />
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
