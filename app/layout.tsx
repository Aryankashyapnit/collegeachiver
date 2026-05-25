import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CollegeAchiver - JoSAA 2026 Matrix Portal',
  description: 'Precision Intelligence for JoSAA / CSAB Counselling Forecasting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        `}</style>
      </head>
      <body className="bg-[#f8f9ff] text-[#0b1c30] antialiased">
        
        {/* 🗺️ FIXED RIGID NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd] px-6 py-3.5">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            {/* Corrected Active Logo Group */}
            <Link href="/" className="text-base font-bold tracking-tight text-[#0b1c30] flex items-center gap-2">
              <span className="h-4 w-4 bg-[#000000] inline-block rounded-[2px]"></span>
              CollegeAchiver <span className="text-[10px] font-mono text-[#76777d] font-normal">v4.2</span>
            </Link>
            
            {/* Info Status Text */}
            <div className="text-xs font-mono text-[#76777d] hidden sm:block">
              🟢 SYSTEM ONLINE
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        {children}

        {/* 📋 ARCHITECTURAL FOOTER */}
        <footer className="bg-white border-t border-[#c6c6cd] py-10 text-xs text-[#76777d] px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-sm">
              <div className="font-bold text-[#0b1c30]">CollegeAchiver Intelligence Systems</div>
              <p className="text-[11px] leading-relaxed">The definitive engine for engineering counseling intelligence. Precision tools for JEE aspirants seeking seat optimization through data science.</p>
            </div>
            <p className="font-mono text-[10px]">© 2026 CollegeAchiver Systems. Data verified via JoSAA protocols.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}