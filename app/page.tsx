'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar } from 'lucide-react';
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

          {/* METRICS COUNTER */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">10k+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Students Assisted Globally</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">500+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Indexed & Verified</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy in Admission Predictions</p></div>
          </section>
        </div>
      )}

      {/* 2️⃣ TAB CONTENT: COUNSELLING GUIDE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Step-by-Step Roadmap</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">JoSAA 2026 Counselling Master Guide</h2>
          </div>
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs mb-8">
            <h3 className="text-lg font-bold text-[#1a1c1c] mb-4 flex items-center gap-2"><BookOpen size={20} className="text-[#705d00]" /> Freeze, Float, or Slide Rules</h3>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">Detailed rules breakdown for JoSAA protocols managed perfectly.</p>
          </div>
        </section>
      )}

      {/* 3️⃣ TAB CONTENT: ANALYSIS */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Statistical Variance Pulse</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">Cutoff Volatility Analytics</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">CSE Volatility Delta</div><div className="text-2xl font-black text-red-600 mt-1">↗ +14.2%</div></div>
          </div>
        </section>
      )}

      {/* 4️⃣ ⏰ NEW DYNAMIC TAB CONTENT: DEADLINES TIMELINE SCHEDULE */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          
          {/* Section Header */}
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Official Time Matrix</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">JoSAA 2026 Critical Dates & Schedule</h2>
            <p className="text-sm text-[#5f5e5e] mt-1">Bhai, ek bhi deadline miss hui toh poori mehnat bekaar ho jayegi. In dates ko dhyan se note kar lo!</p>
          </div>

          {/* Core Stepper/Timeline Architecture Layout */}
          <div className="relative border-l-2 border-[#ffd700] ml-4 pl-8 space-y-10">
            
            {/* Step 1: Results Announcement */}
            <div className="relative group">
              {/* Dot Icon Indicator */}
              <div className="absolute -left-[41px] top-1 bg-white border-4 border-[#1a1c1c] h-5 w-5 rounded-full group-hover:border-[#ffd700] transition-colors"></div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-[#705d00] bg-[#ffd700]/20 px-2 py-0.5 rounded-md flex items-center gap-1"><Calendar size={12}/> June 10, 2026</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-300 font-bold px-2 py-0.5 rounded-md uppercase">Upcoming</span>
                </div>
                <h4 className="text-base font-bold text-black font-display">JEE Advanced Result & Cut-off Release</h4>
                <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed">Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge. Isi ke baad JoSAA portal active kiya jayega.</p>
              </div>
            </div>

            {/* Step 2: Registration Ignited */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1 bg-white border-4 border-[#ffd700] h-5 w-5 rounded-full flex items-center justify-center"><span className="h-1.5 w-1.5 bg-black rounded-full animate-ping"></span></div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1"><Clock size={12}/> June 15, 2026</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-md uppercase animate-pulse">Live Soon</span>
                </div>
                <h4 className="text-base font-bold text-black font-display">Online Registration & Preference Choice Filling Starts</h4>
                <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed">Students apni choices online fill karna shuru kar sakte hain. Bhai, hamare predictor se generated choice-locking sequence isi dauran fill karna hai.</p>
              </div>
            </div>

            {/* Step 3: Mock Seat Allotment */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1 bg-white border-4 border-[#1a1c1c] h-5 w-5 rounded-full group-hover:border-[#ffd700] transition-colors"></div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-[#705d00] bg-[#ffd700]/20 px-2 py-0.5 rounded-md"><Calendar size={12}/> June 22, 2026</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-300 font-bold px-2 py-0.5 rounded-md uppercase">Simulation</span>
                </div>
                <h4 className="text-base font-bold text-black font-display">Mock Seat Allocation Round 1 Result</h4>
                <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed">Abhi tak filled choices ke basis par system ek tentative prediction data show karega ki aapko kaun sa college mil sakta hai, taaki aap apni choices ko modify kar sako.</p>
              </div>
            </div>

            {/* Step 4: CRITICAL AUTO LOCK TERMINATION */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1 bg-white border-4 border-red-600 h-5 w-5 rounded-full"></div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md flex items-center gap-1"><AlertCircle size={12}/> June 25, 2026 (5:00 PM)</span>
                  <span className="text-[10px] bg-red-100 text-red-800 border border-red-300 font-bold px-2 py-0.5 rounded-md uppercase">Strict Warning</span>
                </div>
                <h4 className="text-base font-bold text-red-600 font-display">Choice Filling Window Closes & Auto-Locking</h4>
                <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed font-medium">Bhai, ye sabse critical timestamp hai! Shaam 5 baje choice filling window lock ho jayegi. Isse pehle apni preferences ko re-arrange aur save zaroor kar lena, iske baad koi change nahi hoga.</p>
              </div>
            </div>

            {/* Step 5: Round 1 Seat Allocation */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1 bg-white border-4 border-[#1a1c1c] h-5 w-5 rounded-full group-hover:border-[#ffd700] transition-colors"></div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-[#705d00] bg-[#ffd700]/20 px-2 py-0.5 rounded-md"><Calendar size={12}/> June 27, 2026</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-300 font-bold px-2 py-0.5 rounded-md uppercase">Allocation</span>
                </div>
                <h4 className="text-base font-bold text-black font-display">Official Seat Allotment Round 1 Result publicado</h4>
                <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed">Actual Round 1 ka seat allocation result declared hoga. Seat milte hi online document checking pipeline active ho jayegi.</p>
              </div>
            </div>

          </div>

          {/* Strategic Action Banner */}
          <div className="mt-12 bg-white border border-[#e2e2e2] p-6 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h5 className="font-bold text-sm text-black">Don't remember all dates?</h5>
              <p className="text-xs text-[#5f5e5e]">Apne status ko safe rakhne ke liye counseling shuru hote hi alert systems open rakhein.</p>
            </div>
            <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-black font-bold text-xs px-5 py-3 rounded-lg uppercase tracking-wider font-mono shadow-xs hover:opacity-90 transition-all shrink-0">
              Prepare Choice Order ➜
            </button>
          </div>

        </section>
      )}

      {/* 5️⃣ TAB CONTENT: PREDICTOR ENGINE */}
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
        </>
      )}

      {/* 6️⃣ TAB CONTENT: OPENING/CLOSING RANKS */}
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

      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold border-b pb-2">Seat Matrix Log Ledger</h2></section>}

      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <p className="text-center">© 2026 CollegeAchiver Platforms. Handcrafted for ambitious students everywhere.</p>
      </footer>
    </main>
  );
}