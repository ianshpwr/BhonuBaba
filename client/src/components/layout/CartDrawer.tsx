import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l-border/40 flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border/40">
          <SheetTitle className="font-heading text-2xl flex items-center">
            Your Cart
            <span className="ml-3 bg-muted text-muted-foreground text-sm font-medium px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl">Your cart feels a bit empty</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">Looks like you haven't added any cozy essentials yet.</p>
              <Button 
                variant="outline" 
                className="mt-4 rounded-xl border-border hover:bg-muted"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.product.id}-${idx}`} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-card border border-border/40 flex-shrink-0 relative">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-foreground text-sm leading-tight line-clamp-2">{item.product.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        {Object.values(item.selectedVariants).join(" / ")}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.selectedVariants)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center bg-card border border-border rounded-xl h-9">
                      <button 
                        className="px-3 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.selectedVariants, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        className="px-3 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.selectedVariants, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/40 p-6 bg-card/50 backdrop-blur-sm">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-heading font-semibold text-xl pt-3 border-t border-border/40">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button 
                className="w-full h-14 rounded-2xl text-lg font-medium shadow-md hover:shadow-lg transition-all active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsCartOpen(false)}
              >
                Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Separate component for the X icon since I forgot to import it at the top
function X(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}