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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-foreground/[0.03] bg-background/60 transition-colors">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/20 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="container-luxury h-24 flex items-center justify-between">

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5 stroke-[1.5]" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background border-r-foreground/[0.03] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-12 mt-4">
                <span className="font-heading font-light text-2xl tracking-tight text-foreground/80">Bhonubaba.</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.path}>
                    <span
                      className={`text-2xl font-light tracking-tight transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-foreground/70'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/">
          <span className="font-heading font-light text-2xl md:text-3xl tracking-tight text-foreground/90 cursor-pointer" data-testid="link-logo">
            Bhonubaba.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <span
                className={`text-[13px] font-medium tracking-[0.15em] uppercase transition-colors hover:text-primary cursor-pointer relative group ${location === link.path ? 'text-primary' : 'text-foreground/50'}`}
                data-testid={`link-desktop-${link.name.toLowerCase()}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-primary transition-all duration-500 ${location === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <Button variant="ghost" size="icon" className="hidden md:flex text-foreground/60 hover:text-foreground hover:bg-transparent transition-transform hover:scale-110" data-testid="button-search">
            <Search className="h-5 w-5 stroke-[1.5]" />
          </Button>

          <Link href="/account">
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground/60 hover:text-foreground hover:bg-transparent transition-transform hover:scale-110" data-testid="button-account">
              <User className="h-5 w-5 stroke-[1.5]" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/60 hover:text-foreground relative hover:bg-transparent transition-transform hover:scale-110"
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingBag className="h-5 w-5 md:h-5 md:w-5 stroke-[1.5]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="h-4 w-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-[9px]">
                    {cartCount}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </header>
  );
}
