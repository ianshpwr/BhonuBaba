import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 py-16 mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1">
            <span className="font-heading font-bold text-2xl tracking-tight text-foreground mb-4 block">
              Bhonubaba.
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Cozy, warm, and friendly essentials for your everyday life. Thoughtfully designed to make your home feel like a hug.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-4">
              {['All Products', 'Apparel', 'Home & Decor', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link href="/shop">
                    <span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              {['FAQ', 'Shipping & Returns', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Stay Cozy</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe for soft updates and 10% off your first order.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-border rounded-xl px-4 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-border/40 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {new Date().getFullYear()} Bhonubaba. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
