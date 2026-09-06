"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/videos", label: "Videos" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="leading-none" onClick={() => setMenuOpen(false)}>
          <span className="display block text-[1.7rem] text-cream">TEZZ McKINNON</span>
          <span className="block text-[0.62rem] tracking-[0.28em] text-muted">EST. 1996</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.72rem] tracking-[0.18em] text-cream/80 uppercase hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative text-[0.72rem] tracking-[0.18em] uppercase"
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-cream px-1.5 text-[0.62rem] font-semibold text-ink">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden text-[0.72rem] tracking-[0.18em] uppercase"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 bg-ink px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm tracking-[0.16em] uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
