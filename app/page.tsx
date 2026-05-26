'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, HelpCircle } from 'lucide-react';
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

      {/* 2️⃣ 🌟 NEW DYNAMIC TAB CONTENT: COUNSELLING GUIDE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          
          {/* Header Banner */}
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Step-by-Step Roadmap</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">JoSAA 2026 Counselling Master Guide</h2>
            <p className="text-sm text-[#5f5e5e] mt-1">Bhai, engineering admission process ko aasan bhasha me samjho aur apni seat secure karo.</p>
          </div>

          {/* 3-Step Process Flow Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs relative overflow-hidden group hover:border-[#ffd700] transition-all">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#ffd700]"></div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#1a1c1c] mb-2">
                <span className="w-6 h-6 bg-[#1a1c1c] text-white rounded-full flex items-center justify-center text-xs">1</span>
                Registration & Choice Filling
              </div>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">JoSAA website par login karke apni profile verify karo, aur hamare predictor ki di hui best choice-list priority order me fill karo.</p>
            </div>

            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs relative overflow-hidden group hover:border-[#ffd700] transition-all">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#ffd700]"></div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#1a1c1c] mb-2">
                <span className="w-6 h-6 bg-[#1a1c1c] text-white rounded-full flex items-center justify-center text-xs">2</span>
                Seat Allotment Round Result
              </div>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">Har round ke baad system aapko seat allot karega. Allotment milte hi aapse teen bhasha me options puchega: Freeze, Float, ya Slide.</p>
            </div>

            <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs relative overflow-hidden group hover:border-[#ffd700] transition-all">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#ffd700]"></div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#1a1c1c] mb-2">
                <span className="w-6 h-6 bg-[#ffd700] text-black rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Document Upload & Fees
              </div>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">Seat confirm karne ke liye online reporting karni hogi, seat acceptance fee pay karo aur documents up-to-date verify karwao.</p>
            </div>
          </div>

          {/* Golden Core Concepts Block (Freeze, Float, Slide Core Rules) */}
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs mb-8">
            <h3 className="text-lg font-bold text-[#1a1c1c] mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-[#705d00]" /> Sabse Important: In Teen Options Ko Samjho
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded-lg border-l-4 border-zinc-400">
                <strong className="text-black text-sm">🧊 FREEZE:</strong> Agar aapko jo college aur branch mili hai aap usse 100% khush hain, toh use freeze kar do. Aapki seat final ho jayegi aur aap aage ke rounds se bahar ho jayenge.
              </div>
              <div className="p-3 bg-[#ffd700]/10 rounded-lg border-l-4 border-[#ffd700]">
                <strong className="text-[#705d00] text-sm">⛵ FLOAT:</strong> (Sabse Popular) Iska matlab aapko abhi mili seat toh safe hai, par agar aage ke rounds me aapko isse upar ki koi behtar choice milti hai, toh aap use lena chahenge. Agar upar ki seat nahi mili, toh ye safe rahegi.
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border-l-4 border-[#1a1c1c]">
                <strong className="text-black text-sm">🛝 SLIDE:</strong> Iska matlab aapko mila hua college toh pasand hai, par aap usi same college ke andar koi behtar branch (jaise Civil se ECE/CSE) up-grade karwana chahte hain.
              </div>
            </div>
          </div>

          {/* Mandatory Documents Verification Checklist */}
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-base text-[#1a1c1c] mb-3 flex items-center gap-2"><FileText size={18} className="text-[#705d00]" /> Mandatory Documents Checklist</h3>
              <ul className="text-xs text-[#5f5e5e] space-y-2">
                <li className="flex items-center gap-2">✅ Class 10th Certificate (DOB proof)</li>
                <li className="flex items-center gap-2">✅ Class 12th Marksheet & Passing Certificate</li>
                <li className="flex items-center gap-2">✅ JEE Main / Advanced Admit Card & Rank Card</li>
                <li className="flex items-center gap-2">✅ Category Certificate (OBC-NCL/SC/ST/EWS if applicable)</li>
                <li className="flex items-center gap-2">✅ Medical Certificate (Official JoSAA format me signed)</li>
              </ul>
            </div>
            
            <div className="bg-[#2f3131] text-white p-5 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#ffd700] mb-2 flex items-center gap-1.5"><ShieldAlert size={16} /> Bhai, Galti Mat Karna:</h4>
                <p className="text-xs text-[#dadada] leading-relaxed">
                  Agar Round 1 me seat allot hoti hai aur aapne documents verify ya seat fee online upload nahi ki, toh aapki seat automatic cancel ho jayegi aur aap pure counseling process se bahar fekh diye jaoge. Isliye dates ka dhyan strictly rakhna!
                </p>
              </div>
              <button onClick={() => setActiveTab('Predictor')} className="mt-4 bg-[#ffd700] text-[#221b00] font-bold text-xs py-2.5 px-4 rounded-lg uppercase tracking-wider hover:opacity-90 self-start transition-all">
                Check My Chances Now ➜
              </button>
            </div>
          </div>

        </section>
      )}

      {/* Baaki saare tabs previous settings ke hisab se constant chalenge */}
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
                  <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm accent-border card-hover transition-all">
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

      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold font-display border-b border-[#e2e2e2] pb-2">Analysis Shift Charts</h2></section>}
      {activeTab === 'Deadlines' && <section className="max-w-3xl mx-auto px-6 py-12"><h2 className="text-xl font-black border-b border-[#e2e2e2] pb-2">Target Date Schedules</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-xl font-extrabold border-b border-[#e2e2e2] pb-2">Seat Matrix Log Ledger</h2></section>}

      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <p className="text-center">© 2026 CollegeAchiver Platforms. Handcrafted for ambitious students everywhere.</p>
      </footer>
    </main>
  );
}