import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, Search, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [bgClass, setBgClass] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 17) {
      setBgClass("bg-[hsl(var(--bg-shift-peach)/0.05)]");
    } else {
      setBgClass("bg-[hsl(var(--bg-shift-blush)/0.05)]");
    }
  }, []);

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Drop Launch", path: "/drop" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b border-border/40 transition-all duration-[3000ms] ${bgClass || 'bg-background/80'}`}>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-r-border/40 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8 mt-4">
                <span className="font-heading font-bold text-2xl tracking-tight text-foreground">Bhonubaba.</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.path}>
                    <span 
                      className={`text-xl font-medium tracking-tight transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-foreground'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                <Link href="/account">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-14 text-base font-medium">
                    <User className="mr-3 h-5 w-5" />
                    My Account
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/">
          <span className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-foreground cursor-pointer" data-testid="link-logo">
            Bhonubaba.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <span 
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary cursor-pointer relative group ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}
                data-testid={`link-desktop-${link.name.toLowerCase()}`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${location === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:bg-muted rounded-full transition-transform hover:scale-105" data-testid="button-search">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link href="/account">
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:bg-muted rounded-full transition-transform hover:scale-105" data-testid="button-account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-muted relative rounded-full transition-transform hover:scale-105" 
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="h-5 w-5 flex items-center justify-center p-0 rounded-full bg-primary text-primary-foreground border-2 border-background font-bold text-xs" data-testid="text-cart-count">
                    {cartCount}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
