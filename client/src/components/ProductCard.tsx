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
    <div className="glass-card overflow-hidden card-hover flex flex-col h-full group">
      <Link href={`/products/${product._id}`} className="block relative h-64 w-full bg-[#1a1a1a] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80'} 
          alt={product.name}
          className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-60"></div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[#ff9a8b] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-[#b3b3b3] text-sm line-clamp-2 mb-6 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-[#ffffff]">${product.price.toFixed(2)}</span>
          <Button size="sm">View</Button>
        </div>
      </div>
    </div>
  );
}
