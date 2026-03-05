export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] py-12 mt-20 border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
        <div className="text-4xl mb-4 transition-transform hover:scale-110 duration-300 inline-block cursor-default">🍑</div>
        <p className="font-bold text-white text-2xl tracking-tight mb-2">Bhonu<span className="bhonu-gradient-text">Baba</span></p>
        <p className="text-sm mt-2 text-[#b3b3b3]">&copy; {new Date().getFullYear()} BhonuBaba E-Commerce. All rights reserved.</p>
        <p className="text-xs mt-2 text-[#b3b3b3]/50 tracking-wider uppercase font-semibold">Premium Dark-Themed Aesthetic Experience</p>
      </div>
    </footer>
  );
}
