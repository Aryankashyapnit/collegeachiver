import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CollegeAchiver - JoSAA Predictor',
  description: 'Handcrafted JoSAA Counselling Predictor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-zinc-50 text-zinc-900 antialiased">
        
        {/* 🗺️ RESPONSIVE NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 py-3.5">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            
            {/* Logo / Brand Name */}
            <Link href="/" className="text-xl font-bold tracking-tight text-zinc-950 hover:opacity-90 transition-opacity">
              College<span className="text-indigo-600">Achiver</span>
            </Link>
            
            {/* Nav Links - Added 'Home' with touch-friendly spacing for mobile */}
            <div className="flex items-center gap-5 text-sm font-semibold text-zinc-600">
              <Link href="/" className="hover:text-indigo-600 transition-colors py-1">
                Home
              </Link>
              <Link href="/about" className="hover:text-indigo-600 transition-colors py-1">
                About
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors py-1">
                Contact
              </Link>
            </div>

          </div>
        </nav>

        {/* Main Content Area */}
        {children}

        {/* 📋 UNIVERSAL FOOTER */}
        <footer className="bg-white border-t border-zinc-200 mt-12 py-8 text-center text-xs text-zinc-500 px-4">
          <p>© 2026 CollegeAchiver. Built for JEE Main & Advanced Aspirants.</p>
          <div className="flex justify-center gap-5 mt-3 font-medium text-zinc-400">
            <Link href="/privacy" className="hover:text-zinc-600 hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-600 hover:underline transition-colors">Terms of Service</Link>
          </div>
        </footer>

      </body>
    </html>
  );
}