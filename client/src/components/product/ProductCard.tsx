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
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        onMouseMove={handleMouseMove}
        className="group flex flex-col gap-4 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card/50 border border-border/40 shadow-sm group-hover:shadow-md transition-shadow duration-300">
          <motion.img 
            src={product.images[0]} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
          />
          {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground hover:bg-secondary border-none shadow-none rounded-full px-3 py-1 font-medium">
              New
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground hover:bg-destructive border-none shadow-none rounded-full px-3 py-1 font-medium">
              -{product.discount}%
            </Badge>
          )}
          
          {/* Advanced Radial Gradient Highlight */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 184, 158, 0.15), transparent 40%)`
            }}
          />
          
          {/* Soft Glow Border */}
          <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
        </div>
        
        <div className="flex flex-col space-y-1 px-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">{product.title}</h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
              )}
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">${product.price}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{product.category}</p>
        </div>
      </motion.div>
    </Link>
  );
}
