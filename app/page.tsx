'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, ArrowUpRight, ArrowDownRight, Activity, Percent } from 'lucide-react';
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
          {/* Detailed counselling guide body rendering dynamically */}
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs mb-8">
            <h3 className="text-lg font-bold text-[#1a1c1c] mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-[#705d00]" /> Freeze, Float, or Slide Rules
            </h3>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">Detailed rules breakdown for JoSAA protocols managed perfectly.</p>
          </div>
        </section>
      )}

      {/* 3️⃣ 📊 NEW DYNAMIC TAB CONTENT: ANALYSIS TAB UPDATE */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn">
          
          {/* Header Dashboard section */}
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Statistical Variance Pulse</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">Cutoff Volatility Analytics</h2>
            <p className="text-sm text-[#5f5e5e] mt-1">Analyze real-time shifts, opening-closing deltas, and multi-year competition density patterns.</p>
          </div>

          {/* Stat Mini Tracker Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs">
              <div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">CSE Volatility Delta</div>
              <div className="text-2xl font-black text-red-600 mt-1 flex items-center gap-1">↗ +14.2% <span className="text-xs font-normal text-[#5f5e5e]">(High)</span></div>
            </div>
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs">
              <div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">ECE Competition Index</div>
              <div className="text-2xl font-black text-[#705d00] mt-1 flex items-center gap-1">↗ +6.8% <span className="text-xs font-normal text-[#5f5e5e]">(Stable)</span></div>
            </div>
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs">
              <div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">Seat Locking Velocity</div>
              <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">94.8% <span className="text-xs font-normal text-[#5f5e5e]">/ Round</span></div>
            </div>
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs">
              <div className="text-[10px] font-mono font-bold text-[#5f5e5e] uppercase">Total Data Points Tracked</div>
              <div className="text-2xl font-black text-black mt-1 font-mono">185.4k+</div>
            </div>
          </div>

          {/* Main Visual Comparison Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Box: High Volatility Premium Target List */}
            <div className="lg:col-span-2 bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs">
              <h3 className="font-bold text-base text-[#1a1c1c] mb-4 flex items-center gap-2">
                <Activity size={18} className="text-red-500" /> High-Volatility Target Institutes (Round 1 Core Shifts)
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-zinc-50 border border-[#e2e2e2] rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-black">Indian Institute of Technology Bombay</h5>
                    <p className="text-[11px] text-[#5f5e5e] font-mono mt-0.5">Computer Science & Eng. (4 Years, B.Tech)</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] bg-red-50 border border-red-200 text-red-700 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5"><ArrowUpRight size={12}/> +12.4% Up</span>
                    <span className="text-[11px] font-mono font-bold block text-zinc-700 mt-1">Est. Closing: 68</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 border border-[#e2e2e2] rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-black">Indian Institute of Technology Delhi</h5>
                    <p className="text-[11px] text-[#5f5e5e] font-mono mt-0.5">Data Science & Artificial Intelligence</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] bg-red-50 border border-red-200 text-red-700 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5"><ArrowUpRight size={12}/> +21.8% Up</span>
                    <span className="text-[11px] font-mono font-bold block text-zinc-700 mt-1">Est. Closing: 115</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 border border-[#e2e2e2] rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-black">National Institute of Technology Trichy</h5>
                    <p className="text-[11px] text-[#5f5e5e] font-mono mt-0.5">Computer Science and Engineering</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5"><ArrowDownRight size={12}/> -0.8% Steady</span>
                    <span className="text-[11px] font-mono font-bold block text-zinc-700 mt-1">Est. Closing: 1482</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Strategic Intelligence Analysis Sidebar */}
            <div className="bg-[#2f3131] text-white rounded-xl p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#ffd700] uppercase tracking-wider font-mono flex items-center gap-1.5"><Percent size={16}/> Strategic Insight:</h4>
                <p className="text-xs text-[#dadada] leading-relaxed">
                  Bhai, data matrix shift se saaf pata chal raha hai ki top **5 IITs me Computer Science** aur **Data Science** waali branches ki cutoffs pichle 3 saalon se lagatar <strong>Upward Shift (Tight Competition)</strong> show kar rahi hain. 
                </p>
                <p className="text-xs text-[#dadada] leading-relaxed">
                  Agar aapki rank borderline par hai, toh counseling list me top IITs ke sath-sath premium NITs (Trichy, Surathkal, Warangal) ki core electronics/communication branches ko zaroor back-up sequence me daalna.
                </p>
              </div>
              <button onClick={() => setActiveTab('Predictor')} className="mt-6 bg-[#ffd700] text-black font-bold text-xs py-3 px-4 rounded-lg uppercase tracking-wider text-center block w-full hover:opacity-90 transition-all">
                Test My Custom Ranks ➜
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 4️⃣ TAB CONTENT: OPENING/CLOSING RANKS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase tracking-wider font-bold"><th className="px-6 py-4">Institute</th><th className="px-6 py-4">Program</th><th className="px-6 py-4">Quota</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
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

      {activeTab === 'Deadlines' && <section className="max-w-3xl mx-auto px-6 py-12"><h2 className="text-xl font-black font-display border-b border-[#e2e2e2] pb-2">Target Date Schedules</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold font-display border-b border-[#e2e2e2] pb-2">Seat Matrix Log Ledger</h2></section>}

      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <p className="text-center">© 2026 CollegeAchiver Platforms. Handcrafted for ambitious students everywhere.</p>
      </footer>
    </main>
  );
}