import { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductVariant } from "../lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity: number, variants: Record<string, string>) => void;
  removeFromCart: (productId: string, variants: Record<string, string>) => void;
  updateQuantity: (productId: string, variants: Record<string, string>, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number, variants: Record<string, string>) => {
    setItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prev, { product, quantity, selectedVariants: variants }];
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.title} has been added to your cart.`,
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variants: Record<string, string>) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && JSON.stringify(item.selectedVariants) === JSON.stringify(variants))
      )
    );
  };

  const updateQuantity = (productId: string, variants: Record<string, string>, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variants);
      return;
    }
    
    setItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.product.id === productId &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity = quantity;
        return newItems;
      }
      return prev;
    });
  };

  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
