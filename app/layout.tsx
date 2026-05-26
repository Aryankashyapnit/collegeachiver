import './globals.css';

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
        {/* Google Fonts configuration for Academic Theme */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, .font-display { font-family: 'Montserrat', sans-serif; }
        `}</style>
      </head>
      <body className="bg-[#f9f9f9] text-[#1a1c1c] antialiased">
        
        {/* Yahan se purana overlapping navbar poori tarah saaf kar diya gaya hai */}
        {children}

      </body>
    </html>
  );
}