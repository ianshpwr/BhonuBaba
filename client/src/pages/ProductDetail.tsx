import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Star, Truck, ShieldCheck, Heart, Share, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/animations/motionConfigs";
import PageTransition from "@/components/ui/PageTransition";

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product?.variants) {
      product.variants.forEach(v => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });

  if (!product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="font-heading text-4xl mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find the cozy item you're looking for.</p>
          <Link href="/shop">
            <Button className="rounded-xl h-12 px-8">Return to Shop</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container px-4 md:px-6 py-8 md:py-16">
          
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
            <span className="mx-2">/</span>
            <Link href="/shop"><span className="hover:text-foreground cursor-pointer">Shop</span></Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium truncate">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
            
            <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28 h-fit">
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply bg-card/50" />
                  </button>
                ))}
              </div>
              
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-card/30 border border-border/40 relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage} 
                    alt={product.title} 
                    className="w-full h-full object-cover mix-blend-multiply" 
                  />
                </AnimatePresence>
                {/* Floating Steam/Micro Illustration for Specific Products */}
                {product.category === 'Home' && product.title.includes('Mug') && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, x: 0 }}
                        animate={{ 
                          opacity: [0, 0.4, 0], 
                          y: -60, 
                          x: [0, i % 2 === 0 ? 10 : -10, 0] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: i * 0.8,
                          ease: "easeInOut" 
                        }}
                        className="w-6 h-8 bg-white/20 blur-md rounded-full absolute"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn as any}
              className="flex flex-col"
            >
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="font-heading font-bold text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1]">{product.title}</h1>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="rounded-full hover:bg-muted text-muted-foreground transition-all"
                    >
                      <motion.div
                        animate={isWishlisted ? { scale: [1, 1.4, 0.8, 1.2, 1], color: "#ef4444" } : {}}
                        transition={{ duration: 0.4 }}
                        className="relative"
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                        {isWishlisted && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <div className="w-full h-full bg-primary/40 rounded-full" />
                          </motion.div>
                        )}
                      </motion.div>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground transition-colors">
                      <Share className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                    ))}
                    <span className="text-sm font-medium ml-2">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm underline decoration-border underline-offset-4 cursor-pointer hover:text-foreground">
                    Read {product.reviews} reviews
                  </span>
                </div>
                
                <div className="flex items-end gap-3 mb-8">
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-xl">${product.originalPrice}</span>
                  )}
                  <span className="font-semibold text-3xl">${product.price}</span>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  {product.description}
                </p>
              </div>

              <div className="space-y-8 mb-10">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{variant.name}</h3>
                      <span className="text-sm text-muted-foreground">{selectedVariants[variant.name]}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {variant.options.map((option) => {
                        const isSelected = selectedVariants[variant.name] === option;
                        return (
                          <motion.button
                            key={option}
                            onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: option }))}
                            whileTap={{ scale: 0.95 }}
                            animate={isSelected ? { 
                              scale: 1.05,
                              boxShadow: "0 0 15px rgba(255, 184, 158, 0.4)"
                            } : { 
                              scale: 1,
                              opacity: 0.7 
                            }}
                            className={`
                              h-12 px-6 rounded-xl text-sm font-medium transition-all duration-200 border-2
                              ${isSelected 
                                ? 'border-primary bg-primary/5 text-primary' 
                                : 'border-border/60 bg-transparent text-muted-foreground hover:border-muted-foreground/40 hover:bg-card/50'
                              }
                            `}
                          >
                            {option}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card/50 border border-border/40 p-6 rounded-3xl space-y-6 sticky bottom-4 z-20 md:static">
                <div className="flex gap-4">
                  <div className="flex items-center justify-between bg-background border border-border/60 rounded-2xl h-16 w-32 px-4 shadow-sm">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-lg w-6 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 h-16 rounded-2xl text-lg font-medium shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/40">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 mr-2" />
                    Ships in 1-2 days
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    30-day returns
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          <div className="border-t border-border/40 pt-16">
            <h2 className="font-heading font-bold text-3xl mb-10 text-center">You might also love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mockProducts.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
}
