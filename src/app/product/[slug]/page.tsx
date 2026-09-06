import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { formatPrice, getProduct, getProductSizes, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} | Tezz McKinnon` : "Merch" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
        <Image
          src={product.image}
          alt={product.name}
          width={1200}
          height={1200}
          className="aspect-square w-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <Link href="/shop" className="text-[0.68rem] tracking-[0.18em] text-muted uppercase hover:text-cream">
          Back to shop
        </Link>
        <h1 className="display mt-4 text-6xl">{product.name}</h1>
        <p className="mt-3 text-xl">{formatPrice(product.price)}</p>
        <p className="mt-5 max-w-md text-sm leading-6 text-cream/70">{product.description}</p>
        <div className="mt-8">
          <AddToCart slug={product.slug} sizes={getProductSizes(product)} />
        </div>
        <p className="mt-8 text-xs leading-5 text-muted">
          Ships in 5–10 business days in the USA. No returns. All sales final.
        </p>
      </div>
    </div>
  );
}
