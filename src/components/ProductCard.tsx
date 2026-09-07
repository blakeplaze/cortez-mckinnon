import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="card-hover group block border border-ice/15 bg-white/2 p-3">
      <div className="overflow-hidden bg-[#0a1012]">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-1 pb-2 pt-4">
        <p className="text-sm">{product.name}</p>
        <p className="mono mt-1 text-sm text-ice/80">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
