"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  function tilt(event: React.MouseEvent<HTMLAnchorElement>) {
    const node = cardRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  }

  function reset() {
    const node = cardRef.current;
    if (!node) return;
    node.style.transform = "";
  }

  return (
    <Link
      ref={cardRef}
      href={`/product/${product.slug}`}
      onMouseMove={tilt}
      onMouseLeave={reset}
      className="card-hover group block border border-ice/15 bg-white/2 p-3"
    >
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
