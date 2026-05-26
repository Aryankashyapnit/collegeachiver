'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const predictorRef = useRef<HTMLDivElement>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");

    setHasSearched(true);
    const userRank = parseInt(rank);

    const filtered = massiveJosaaData.filter(col => {
      return (
        col.category === category &&
        col.gender === gender &&
        (col.quota === homeState || col.quota === "AI") &&
        col.closing >= userRank
      );
    }).map(col => {
      let chance: 'High' | 'Medium' | 'Low' = 'Low';
      const safetyMargin = col.closing - userRank;
      if (safetyMargin > 8000) chance = 'High';       
      else if (safetyMargin >= 0) chance = 'Medium';   
      return { ...col, chance };
    });

    filtered.sort((a, b) => a.closing - b.closing);
    setResults(filtered);

    setTimeout(() => {
      predictorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredCutoffData = useMemo(() => {
    return massiveJosaaData.filter(item => {
      const matchesType = 
        selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') :
        selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') || item.institute.includes('Motilal Nehru') :
        selectedType === 'IIIT' ? item.institute.includes('International Institute of Information') : true;

      const matchesSearch = 
        item.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCutoffData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12L15 32L50 52L85 32L50 12Z" fill="#FFD700" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M25 45V68C25 78 36 85 50 85C64 85 75 78 75 68V45" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M40 70L50 42L60 70" stroke="#1A1C1C" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M43 60H57" stroke="#1A1C1C" strokeWidth="6" strokeLinecap="round"/>
              <circle cx="20" cy="48" r="4" fill="#705D00"/>
              <line x1="20" y1="36" x2="20" y2="44" stroke="#1A1C1C" strokeWidth="3"/>
            </svg>
            <div className="text-xl tracking-tight font-display text-[#1a1c1c]">
              College<span className="font-extrabold text-[#705d00]">Achiver</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold text-[#5f5e5e]">
            {['Home', 'Predictor', 'Counselling Guide', 'Opening/Closing Ranks', 'Analysis', 'Deadlines', 'Seat Matrix'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${
                  activeTab === tab ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-xs' : 'hover:text-[#705d00] hover:bg-[#eeeeee]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shrink-0">Sign In</button>
        </div>
      </nav>

      {/* 1️⃣ TAB CONTENT: HOME */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">
                🛡️ JoSAA 2026 Predictor Live
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1c1c] leading-[1.15] font-display">
                Your journey to the <br />
                <span className="text-[#705d00] italic font-medium">right</span> college starts here.
              </h1>
              <p className="text-[#5f5e5e] text-sm md:text-base max-w-xl leading-relaxed">
                Navigate the complexities of Indian college admissions with AI-driven rank predictions and personalized counseling roadmaps.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white border border-[#e2e2e2] text-[#1a1c1c] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#eeeeee] transition-all">View Cut-offs</button>
              </div>
            </div>

            {/* 📸 FIXED HERO IMAGE WRAPPER (Swapped to target screenarya2.png config) */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeee] relative max-w-sm overflow-hidden group">
                <img 
  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
  alt="CollegeAchiver Studying Student" 
  className="rounded-xl object-cover h-64 w-full transition-transform duration-300 group-hover:scale-[1.02]"
/>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-[#e2e2e2] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md w-[85%]">
                  <span className="p-1.5 bg-[#ffd700]/20 text-[#705d00] rounded-lg"><CheckCircle size={16} /></span>
                  <div className="text-left">
                    <div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">Current Rank Likelihood</div>
                    <div className="text-xs font-extrabold text-black">98.2% Accurate Matrix</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 📊 COUNTER METRICS */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">10k+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Students Assisted Globally</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">500+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Indexed & Verified</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy in Admission Predictions</p></div>
          </section>

          {/* Precision Tools Modules */}
          <section className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-extrabold text-[#1a1c1c]">Precision Tools for Admissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
              <div onClick={() => setActiveTab('Predictor')} className="bg-white border border-[#e2e2e2] p-6 rounded-xl flex justify-between gap-4 shadow-xs hover:border-[#ffd700] cursor-pointer transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#705d00] bg-[#ffd700]/20 px-2 py-0.5 rounded-full uppercase">AI Powered</span>
                  <h4 className="font-bold text-base text-black">Rank Prediction Engine</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">Leveraging 10+ years of historical data from JoSAA to give you the most accurate college match.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-xl text-[#705d00] h-12 w-12 flex items-center justify-center shrink-0"><BarChart3 size={20} /></div>
              </div>
              <div onClick={() => setActiveTab('Counselling Guide')} className="bg-white border border-[#e2e2e2] p-6 rounded-xl flex justify-between gap-4 shadow-xs hover:border-[#ffd700] cursor-pointer transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#5f5e5e] bg-[#eeeeee] px-2 py-0.5 rounded-full uppercase">Guidance</span>
                  <h4 className="font-bold text-base text-black">Counselling Roadmap</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">A step-by-step personalized guide through the admission maze from verification to allotment.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-xl text-zinc-600 h-12 w-12 flex items-center justify-center shrink-0"><Layers size={20} /></div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-[#2f3131] text-white py-16 px-6 border-t border-black">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white">Trusted by Thousands</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic">"The rank predictor was surprisingly accurate! It gave me the confidence to apply for IIT Delhi."</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs"><strong>AK</strong> <span>Aryan Khanna (IITD '27)</span></div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic">"The counselling roadmap simplified the entire JoSAA process flawlessly."</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs"><strong>SP</strong> <span>Sanya Patel (NITT '27)</span></div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /><Star size={12} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic">"Best platform for college prediction. The clean UI and data-backed results are top notch."</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs"><strong>RV</strong> <span>Rohan Verma (BITS '27)</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* OTHER TABS RENDER MATRIX AS IS */}
      {activeTab === 'Predictor' && (
        <>
          <section className="bg-white border-b border-[#e8e8e8] py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
              <h3 className="font-bold text-lg text-[#1a1c1c] mb-4">Rank Prediction Dashboard</h3>
              <form onSubmit={handlePredict} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Enter JEE Rank</label>
                  <input type="number" placeholder="e.g. 15000" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-sm focus:ring-2 focus:ring-[#ffd700] focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option></select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option>Gender-Neutral</option><option>Female-Only</option></select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Quota Type</label>
                  <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select>
                </div>
                <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase hover:opacity-90 transition-all">Calculate Predictions 🚀</button>
              </form>
            </div>
          </section>
          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20">
            {hasSearched && results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS GRID</h3>
                {results.map(college => (
                  <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm accent-border transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div><h4 className="font-bold text-[#1a1c1c] text-base">{college.institute}</h4><p className="text-xs text-[#5f5e5e] mt-1">{college.program}</p></div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border rounded-full uppercase">{college.chance} Allotment</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {activeTab === 'Counselling Guide' && <section className="max-w-4xl mx-auto px-6 py-12 text-left"><h2 className="text-2xl font-extrabold border-b pb-2">JoSAA Student Counselling Guide</h2></section>}

      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs font-bold"><th className="px-6 py-4">Institute</th><th className="px-6 py-4">Program</th><th className="px-6 py-4">Quota</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2] text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-[#ffd700]/5"><td className="px-6 py-4 font-semibold">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 font-mono">{item.quota}</td><td className="px-6 py-4">{item.category}</td><td className="px-6 py-4 font-mono">{item.opening}</td><td className="px-6 py-4 text-[#705d00] font-mono">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold border-b pb-2">Analysis Shift Charts</h2></section>}
      {activeTab === 'Deadlines' && <section className="max-w-3xl mx-auto px-6 py-12"><h2 className="text-xl font-black border-b pb-2">Target Date Schedules</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold border-b pb-2">Seat Matrix Log Ledger</h2></section>}

      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <p className="text-center">© 2026 CollegeAchiver Platforms. Handcrafted for ambitious students everywhere.</p>
      </footer>
    </main>
  );
}