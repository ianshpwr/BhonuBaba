import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-peach-100 soft-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <span className="text-3xl">🍑</span>
            <span className="font-bold text-2xl tracking-tight text-peach-500">PeachStore</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/products" className="text-foreground hover:text-peach-400 transition-colors font-medium">
              Shop
            </Link>
            <Link href="/cart" className="text-foreground hover:text-peach-400 transition-all hover:scale-110">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <Link href="/auth/login" className="text-foreground hover:text-peach-400 transition-all hover:scale-110 bg-peach-50 p-2 rounded-full">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
