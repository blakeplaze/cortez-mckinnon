import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop | BFN Tezz est. 1996",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[0.72rem] tracking-[0.24em] text-muted uppercase">Merch</p>
      <h1 className="display mt-2 text-6xl sm:text-7xl">The 1996 line</h1>
      <p className="mt-4 max-w-xl text-sm text-cream/70">
        Black tees. Official BFN Tezz merch. Pick a size and check out on
        this site.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
