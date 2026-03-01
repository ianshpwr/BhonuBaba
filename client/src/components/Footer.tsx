export default function Footer() {
  return (
    <footer className="bg-peach-50 py-12 mt-20 border-t border-peach-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-peach-500">
        <div className="text-4xl mb-4 transition-transform hover:scale-110 inline-block cursor-default">🍑</div>
        <p className="font-medium">&copy; {new Date().getFullYear()} PeachStore. All rights reserved.</p>
        <p className="text-sm mt-2 opacity-80">Designed with a soft pastel aesthetic.</p>
      </div>
    </footer>
  );
}
