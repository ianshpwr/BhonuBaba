import { useState, useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts, categories } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];
    
    // Filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        // Already in mock order
        break;
    }
    
    return result;
  }, [selectedCategory, sortBy]);

  const FiltersContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div 
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setSelectedCategory(category)}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                selectedCategory === category 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground/30 group-hover:border-primary/50'
              }`}>
                {selectedCategory === category && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-sm ${selectedCategory === category ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add more filter sections here like Price Range, Color, etc. */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Price</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Under $50</p>
          <p>$50 - $100</p>
          <p>Over $100</p>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border/40 pb-8">
          <div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-4">Shop All</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Take your time. Browse our complete collection of thoughtfully crafted essentials.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filters */}
            <div className="md:hidden flex-1">
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full rounded-xl h-12 flex justify-between">
                    <span className="flex items-center">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters {selectedCategory !== "All" && '(1)'}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-6">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="font-heading text-2xl">Filters</SheetTitle>
                  </SheetHeader>
                  <FiltersContent />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border/40">
                    <Button 
                      className="w-full h-14 rounded-xl text-lg"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      Show {filteredAndSortedProducts.length} results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl h-12 flex-1 md:w-[220px] justify-between px-4">
                  <span className="truncate">
                    Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px] rounded-xl p-2">
                {sortOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.value}
                    className={`rounded-lg cursor-pointer py-2.5 ${sortBy === option.value ? 'bg-primary/10 font-medium text-primary' : ''}`}
                    onClick={() => setSortBy(option.value as SortOption)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0 sticky top-28 h-fit">
            <FiltersContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} products
            </div>
            
            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                  <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={() => setSelectedCategory("All")} variant="outline" className="rounded-xl">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}