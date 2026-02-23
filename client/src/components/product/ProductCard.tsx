import { Link } from "wouter";
import { Product } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className="group flex flex-col gap-4 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card/50 border border-border/40">
          <img 
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
        </div>
        
        <div className="flex flex-col space-y-1 px-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-foreground line-clamp-1">{product.title}</h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
              )}
              <span className="font-semibold text-foreground">${product.price}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{product.category}</p>
        </div>
      </div>
    </Link>
  );
}
