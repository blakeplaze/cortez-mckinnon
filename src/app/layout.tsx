import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Tezz McKinnon est. 1996",
  description:
    "Official merch and visuals from Cortez McKinnon — Tezz McKinnon, Tuscaloosa hip-hop, est. 1996.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} antialiased`}>
        <CartProvider>
          <div className="grain" />
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
