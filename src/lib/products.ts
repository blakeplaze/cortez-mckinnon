export const SIZES = ["S", "M", "L", "XL", "2XL"] as const;
export type Size = string;

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  popular: boolean;
  description: string;
  sizes?: readonly string[];
};

export const products: Product[] = [
  {
    slug: "1996-shirt",
    name: "1996 Shirt",
    price: 3400,
    image: "/merch/1996-shirt.jpg",
    popular: true,
    description:
      "Black tee with the Tezz McKinnon bottle mark. Original taste. Est. 1996.",
  },
  {
    slug: "life-without-limits-1996",
    name: "Life Without Limits 1996",
    price: 2700,
    image: "/merch/life-without-limits.jpg",
    popular: true,
    description:
      "Tuscaloosa, AL. Genuine Cortez McKinnon merchandise, licensed since 1996.",
  },
  {
    slug: "denim-eagle-96",
    name: "Denim Eagle 96",
    price: 2700,
    image: "/merch/denim-eagle.png",
    popular: true,
    description:
      "The Denim Eagle Co. Spirit of the sky. Tezz McKinnon authentic, since 1996.",
  },
  {
    slug: "roadie-96",
    name: "Roadie 96",
    price: 2700,
    image: "/merch/roadie.png",
    popular: true,
    description: "On the road. Skull graphic, Tezz McKinnon authentic, est. 1996.",
  },
  {
    slug: "strong-man-96",
    name: "Strong Man 96",
    price: 2700,
    image: "/merch/strong-man.jpg",
    popular: true,
    description: "No excuses, work hard. Red-and-white gym graphic on black.",
  },
  {
    slug: "americana-1996",
    name: "Americana 1996",
    price: 2700,
    image: "/merch/americana-1996.jpg",
    popular: false,
    description: "Retro Americana graphic. Tezz McKinnon, palms, and the 1996 line.",
  },
  {
    slug: "the-future-is-now-1996",
    name: "THE FUTURE IS NOW 1996",
    price: 2700,
    image: "/merch/the-future-is-now.jpg",
    popular: false,
    description: "The future is right now. Tezz McKinnon authentic, est. 1996.",
  },
  {
    slug: "tuscaloosa-sportswear-original",
    name: "Tuscaloosa Sportswear Original",
    price: 2700,
    image: "/merch/tuscaloosa-sportswear.jpg",
    popular: false,
    description: "Original Tuscaloosa sportswear. Tezz McKinnon authentic, 1996.",
  },
  {
    slug: "dream-big-1996",
    name: "DREAM BIG 1996",
    price: 2700,
    image: "/merch/dream-big.jpg",
    popular: false,
    description: "Dream big. Start small. Tuscaloosa / Alabama.",
  },
  {
    slug: "stronger",
    name: "Stronger",
    price: 2700,
    image: "/merch/stronger.jpg",
    popular: false,
    description: "Vintage gym graphic. Genuine Tezz McKinnon.",
  },
  {
    slug: "1996-womens-sportwear-tank",
    name: "1996 Womens Sportwear Tank",
    price: 6500,
    image: "/merch/womens-tank.png",
    popular: false,
    description: "Camo racerback tank. Original Tuscaloosa sportswear, 1996.",
  },
  {
    slug: "original-sportswear-hoodie",
    name: "Original Sportswear Hoodie",
    price: 5500,
    image: "/merch/sportswear-hoodie.jpg",
    popular: false,
    description: "Tuscaloosa sportswear hoodie. Tezz McKinnon authentic, 1996.",
  },
  {
    slug: "96-heart-breakers",
    name: "'96 Heart Breakers",
    price: 2700,
    image: "/merch/heart-breakers.png",
    popular: false,
    description: "Heart Breaker Club. Skull, snake, and swords. Est. 1996.",
  },
  {
    slug: "rebound-96",
    name: "Rebound '96",
    price: 2700,
    image: "/merch/rebound-96.png",
    popular: false,
    description: "Together we fight, we hustle, we rebound. Tezz McKinnon authentic.",
  },
  {
    slug: "game-plan-1996",
    name: "Game Plan 1996",
    price: 2700,
    image: "/merch/game-plan.png",
    popular: false,
    description: "Set your game plan. Try your luck. Tezz McKinnon authentic.",
  },
  {
    slug: "diamond-raiders-1996",
    name: "Diamond Raiders 1996",
    price: 2700,
    image: "/merch/diamond-raiders.jpg",
    popular: false,
    description: "Diamond Raiders. Tuscaloosa, AL. Est. 1996.",
  },
  {
    slug: "life-without-limits-hat",
    name: "Life Without Limits Hat",
    price: 5000,
    image: "/merch/life-without-limits-hat.png",
    popular: false,
    description: "Charcoal cap. Life Without Limits embroidery. Est. 1996.",
    sizes: ["One Size"],
  },
  {
    slug: "stay-true-to-1996-shirt",
    name: "Stay True to 1996 shirt",
    price: 2700,
    image: "/merch/stay-true.jpg",
    popular: false,
    description: "Authentic roots. Stay true. Genuine Tezz McKinnon.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductSizes(product: Product) {
  return product.sizes ?? SIZES;
}

export function getPopularProducts() {
  return products.filter((product) => product.popular);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
