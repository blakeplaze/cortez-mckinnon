import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { VideoGallery } from "@/components/VideoGallery";
import { getPopularProducts } from "@/lib/products";

export default function HomePage() {
  const popular = getPopularProducts();

  return (
    <div>
      <section className="tech-grid relative border-b border-ice/15">
        <div className="relative mx-auto grid min-h-[86vh] max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <p className="mono flex flex-wrap items-center gap-3 text-[0.68rem] tracking-[0.28em] text-ice uppercase">
              <span className="live-dot" />
              Signal live · tuscaloosa · est. 1996
            </p>
            <h1 className="display glow-text mt-4 text-[clamp(3.4rem,8.4vw,6.4rem)] leading-[0.86] tracking-[0.02em]">
              BFN
              <br />
              TEZZ
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-cream/70">
              Shirts and visuals. Nothing extra. Shop the 1996 line or play the
              latest videos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-solid">
                Shop merch
              </Link>
              <Link href="/videos" className="btn btn-ghost">
                Watch videos
              </Link>
            </div>
          </div>
          <Link href="/product/1996-shirt" className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="hud hud-live overflow-hidden border border-ice/25 bg-[#0a1012]">
              <Image
                src="/merch/1996-shirt.jpg"
                alt="1996 Shirt"
                width={900}
                height={900}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mono mt-3 text-center text-[0.68rem] tracking-[0.2em] text-ice/80 uppercase">
              Featured · 1996 Shirt · $34
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="display text-5xl sm:text-6xl">Most popular</h2>
          <Link href="/shop" className="mono hidden text-[0.68rem] tracking-[0.18em] uppercase text-ice/80 hover:text-ice sm:block">
            Shop all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-ice/10 bg-ice/3 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="display text-5xl sm:text-6xl">Latest visuals</h2>
            <Link href="/videos" className="mono hidden text-[0.68rem] tracking-[0.18em] uppercase text-ice/80 hover:text-ice sm:block">
              All videos
            </Link>
          </div>
          <VideoGallery limit={4} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="display text-5xl">The artist</h2>
        <p className="mt-6 text-sm leading-7 text-cream/75">
          BFN Tezz is a hip-hop artist from Tuscaloosa, Alabama. Music
          became the way out — raw stories, independent releases, and his own
          label, Hard Hittaz Entertainment. This site is for the shirts and the
          videos. Everything else lives on YouTube and Instagram.
        </p>
      </section>
    </div>
  );
}
