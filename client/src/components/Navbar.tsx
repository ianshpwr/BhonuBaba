"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#2a2a2a] bhonu-shadow transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <span className="text-3xl">🍑</span>
            <span className="font-bold text-2xl tracking-tight text-white hidden sm:block">Bhonu<span className="bhonu-gradient-text">Baba</span></span>
          </Link>
          
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative group">
            <input 
              type="text" 
              placeholder="Search premium goods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-full py-2 pl-5 pr-12 focus:outline-none focus:border-[#ff9a8b] transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-hover:text-[#ff9a8b] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-[#b3b3b3] hover:text-[#ffffff] transition-colors font-medium text-sm tracking-wide">
              SHOP
            </Link>
            
            <Link href="/cart" className="relative text-[#b3b3b3] hover:text-[#ff9a8b] transition-all hover:scale-110">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6a88] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#0f0f0f]">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-[#2a2a2a] pl-6">
                <Link href="/orders" className="text-sm font-semibold hover:text-[#ff9a8b] transition-colors line-clamp-1 max-w-[100px] text-[#b3b3b3]">
                  Hi, {user.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="rounded-full">Log In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="relative text-[#b3b3b3] hover:text-[#ff9a8b]">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6a88] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#0f0f0f]">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none p-2 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-b border-[#2a2a2a] p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-[#ff9a8b]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]">
              <Search className="w-5 h-5" />
            </button>
          </form>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white font-medium hover:text-[#ff9a8b]">Shop All</Link>
          {user ? (
            <>
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#b3b3b3] hover:text-white">My Orders</Link>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-[#ff6a88] font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button fullWidth variant="outline">Sign In / Register</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
