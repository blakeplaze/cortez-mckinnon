import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { VideoGallery } from "@/components/VideoGallery";
import { getPopularProducts } from "@/lib/products";

export default function HomePage() {
  const popular = getPopularProducts();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto grid min-h-[86vh] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">
              Tuscaloosa hip-hop · est. 1996
            </p>
            <h1 className="display mt-4 text-[5.4rem] leading-[0.82] sm:text-[7.5rem]">
              TEZZ
              <br />
              McKINNON
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
          <Link href="/product/1996-shirt" className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
              <Image
                src="/merch/1996-shirt.jpg"
                alt="1996 Shirt"
                width={900}
                height={900}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xs tracking-[0.2em] text-muted uppercase">
              Featured · 1996 Shirt · $34
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="display text-5xl sm:text-6xl">Most popular</h2>
          <Link href="/shop" className="hidden text-xs tracking-[0.18em] uppercase text-muted hover:text-cream sm:block">
            Shop all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/2 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="display text-5xl sm:text-6xl">Latest visuals</h2>
            <Link href="/videos" className="hidden text-xs tracking-[0.18em] uppercase text-muted hover:text-cream sm:block">
              All videos
            </Link>
          </div>
          <VideoGallery limit={4} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="display text-5xl">The artist</h2>
        <p className="mt-6 text-sm leading-7 text-cream/75">
          Demetrius Cortez McKinnon, professionally known as Cortez McKinnon and
          Tezz McKinnon, is a hip-hop artist from Tuscaloosa, Alabama. Music
          became the way out — raw stories, independent releases, and his own
          label, Hard Hittaz Entertainment. This site is for the shirts and the
          videos. Everything else lives on YouTube and Instagram.
        </p>
      </section>
    </div>
  );
}
