import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow flex flex-col relative">
        {/* Editorial Vignette Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(46,42,39,0.02)]" />
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
