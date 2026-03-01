import Link from 'next/link';
import Button from './Button';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden soft-shadow card-hover flex flex-col h-full border border-peach-50">
      <Link href={`/products/${product._id}`} className="block relative h-64 w-full bg-peach-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80'} 
          alt={product.name}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-foreground/70 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-peach-500">${product.price.toFixed(2)}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
