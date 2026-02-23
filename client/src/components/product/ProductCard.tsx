import { Link } from "wouter";
import { Product } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        className="group flex flex-col gap-6 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-card/10 shadow-sm group-hover:shadow-md transition-all duration-500">
          <motion.img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 mix-blend-multiply"
          />
          {product.isNew && (
            <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground hover:bg-background/80 border-none shadow-none rounded-full px-3 py-1 text-[10px] tracking-[0.1em] uppercase font-medium">
              New
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground hover:bg-primary border-none shadow-none rounded-full px-3 py-1 text-[10px] tracking-[0.11em] uppercase font-medium">
              -{product.discount}%
            </Badge>
          )}

          {/* Refined Radial Gradient Highlight (Warmer) */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(201, 124, 93, 0.06), transparent 50%)`
            }}
          />
        </div>

        <div className="flex flex-col space-y-2 px-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="font-heading font-light text-base md:text-lg text-foreground/90 line-clamp-1 group-hover:text-primary transition-colors duration-300">{product.title}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-xs font-light">${product.originalPrice}</span>
              )}
              <span className="text-sm md:text-base font-medium text-foreground">${product.price}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs tracking-wider uppercase opacity-70">{product.category}</p>
        </div>
      </motion.div>
    </Link>
  );
}
