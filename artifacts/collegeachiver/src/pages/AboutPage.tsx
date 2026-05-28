export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-zinc-950 mb-4">About Us</h1>
      <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
        Welcome to <strong className="text-zinc-900">CollegeAchiver</strong>! We are dedicated to helping engineering aspirants make informed decisions during the intense JoSAA/CSAB counselling period.
      </p>
      <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
        Our prediction engine analyzes historical opening and closing ranks to project your best institutional matches instantly. No hidden algorithms, no clutter—just pure, transparent data optimized perfectly for your mobile devices.
      </p>
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-800 text-sm">
        <strong>Mission:</strong> To eliminate counselling anxiety for students by providing fast, accurate, and completely free cutoff analytics.
      </div>
    </main>
  );
}
