import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="display text-4xl text-cream">TEZZ McKINNON</p>
          <p className="mt-2 text-xs tracking-[0.22em] text-muted">EST. 1996 · TUSCALOOSA</p>
        </div>
        <div className="space-y-2 text-sm text-cream/75">
          <Link href="/shop" className="block hover:text-cream">
            Shop
          </Link>
          <Link href="/videos" className="block hover:text-cream">
            Videos
          </Link>
          <a
            href="https://www.instagram.com/cortez_mckinnon/"
            className="block hover:text-cream"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/c/CortezMckinnon"
            className="block hover:text-cream"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <a
            href="https://whymusicmatters.com/"
            className="block hover:text-cream"
            target="_blank"
            rel="noreferrer"
          >
            Why Music Matters
          </a>
        </div>
        <div className="space-y-3 text-sm text-muted">
          <p>
            Ships in 5–10 business days in the USA, 10–30 internationally. No
            returns. All sales final.
          </p>
          <a href="mailto:mixedbytezz@gmail.com" className="block text-cream/80 hover:text-cream">
            mixedbytezz@gmail.com
          </a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs tracking-[0.16em] text-muted/70 uppercase">
        © {new Date().getFullYear()} Cortez McKinnon
      </p>
    </footer>
  );
}
