'use client';
export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Aapka message received ho gaya hai.");
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-zinc-950 mb-2">Contact Us</h1>
      <p className="text-zinc-600 text-sm mb-8">Have questions or feedback? Drop us a message below.</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-zinc-200 p-5 md:p-6 rounded-2xl shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Full Name</label>
          <input type="text" required placeholder="Aryan Kumar" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Email Address</label>
          <input type="email" required placeholder="aryan@example.com" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Message</label>
          <textarea rows={4} required placeholder="Ask anything about counselling..." className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all active:scale-[0.98]">
          Send Message
        </button>
      </form>
    </main>
  );
}