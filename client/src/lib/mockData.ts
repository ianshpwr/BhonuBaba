export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  category: string;
  variants: ProductVariant[];
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  isNew?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Chunky Cloud Sweater",
    price: 85,
    originalPrice: 110,
    discount: 22,
    stock: 45,
    category: "Apparel",
    isNew: true,
    variants: [
      { id: "v1", name: "Color", options: ["Cream", "Blush", "Charcoal"] },
      { id: "v2", name: "Size", options: ["S", "M", "L", "XL"] }
    ],
    images: ["/src/assets/product-1.png"],
    rating: 4.8,
    reviews: 124,
    description: "Wrap yourself in pure comfort. Our Chunky Cloud Sweater is knit from ultra-soft, sustainably sourced cotton blend that feels like a warm hug."
  },
  {
    id: "p2",
    title: "Morning Ritual Mug",
    price: 24,
    stock: 120,
    category: "Home",
    variants: [
      { id: "v1", name: "Color", options: ["Blush", "Cream", "Sage"] }
    ],
    images: ["/src/assets/product-2.png"],
    rating: 4.9,
    reviews: 86,
    description: "Start your day right. This handmade ceramic mug features a smooth, rounded handle designed to rest perfectly in your hands."
  },
  {
    id: "p3",
    title: "Sunday Morning Candle",
    price: 36,
    stock: 30,
    category: "Home",
    variants: [
      { id: "v1", name: "Scent", options: ["Vanilla & Fig", "Lavender Cedar", "Warm Amber"] }
    ],
    images: ["/src/assets/product-3.png"],
    rating: 4.7,
    reviews: 52,
    description: "Fill your space with warmth. Hand-poured soy wax with notes of sweet vanilla, fresh fig, and a hint of warm sandalwood."
  },
  {
    id: "p4",
    title: "Waffle Knit Throw",
    price: 68,
    originalPrice: 85,
    discount: 20,
    stock: 15,
    category: "Home",
    variants: [
      { id: "v1", name: "Color", options: ["Warm Gray", "Cream", "Oatmeal"] }
    ],
    images: ["/src/assets/product-4.png"],
    rating: 4.9,
    reviews: 215,
    description: "The ultimate couch companion. Lightweight yet incredibly warm, our signature waffle knit throw adds texture and coziness to any room."
  },
  {
    id: "p5",
    title: "Pebble Ceramic Vase",
    price: 42,
    stock: 8,
    category: "Decor",
    isNew: true,
    variants: [
      { id: "v1", name: "Color", options: ["Warm Peach", "Cream"] }
    ],
    images: ["/src/assets/product-5.png"],
    rating: 4.6,
    reviews: 34,
    description: "A gentle, rounded silhouette perfect for fresh blooms or beautiful on its own as a sculptural piece."
  }
];

export const categories = [
  "All",
  "Apparel",
  "Home",
  "Decor",
  "Wellness"
];