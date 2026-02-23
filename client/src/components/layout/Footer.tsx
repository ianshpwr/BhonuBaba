import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background py-24 md:py-32 border-t border-foreground/[0.03]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">

          <div className="md:col-span-1">
            <span className="font-heading font-light text-2xl tracking-tight text-foreground/80 mb-6 block">
              Bhonubaba.
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-light">
              Cozy, warm, and friendly essentials for your everyday life. Thoughtfully designed to make your home feel like a sanctuary.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-light text-xs uppercase tracking-[0.2em] mb-8 text-foreground/40">Shop</h4>
            <ul className="space-y-5">
              {['All Products', 'Apparel', 'Home & Decor', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link href="/shop">
                    <span className="text-muted-foreground hover:text-primary transition-colors text-[13px] font-light cursor-pointer tracking-wide">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-light text-xs uppercase tracking-[0.2em] mb-8 text-foreground/40">Support</h4>
            <ul className="space-y-5">
              {['FAQ', 'Shipping & Returns', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-[13px] font-light tracking-wide">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-light text-xs uppercase tracking-[0.2em] mb-8 text-foreground/40">Stay Cozy</h4>
            <p className="text-muted-foreground text-[13px] mb-6 font-light">Subscribe for soft updates and 10% off your first order.</p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="bg-foreground/[0.02] border border-foreground/[0.05] rounded-full px-6 py-3 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <button className="bg-foreground/90 text-background px-8 py-3 rounded-full font-medium text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-foreground/[0.03] mt-24 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-[10px] tracking-[0.1em] uppercase font-light text-center md:text-left">
            © {new Date().getFullYear()} Bhonubaba. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-muted-foreground hover:text-foreground text-[10px] tracking-[0.1em] uppercase transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-[10px] tracking-[0.1em] uppercase transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
