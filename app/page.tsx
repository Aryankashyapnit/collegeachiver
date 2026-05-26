'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, Clock, ChevronLeft, ChevronRight, Mail, Share2, Globe } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
}

export default function Home() {
  // 🎛️ Navbar Active Tab Control (Default to 'Home')
  const [activeTab, setActiveTab] = useState('Home');
  
  // Predictor Engine States
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // 🏛️ Opening/Closing Ranks Cut-off Tab States
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const predictorRef = useRef<HTMLDivElement>(null);

  // Predictor Calculation Trigger
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

  // Dynamic Live Filtering Logic for Cut-off Data Table
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

  // Pagination metrics
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCutoffData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased font-sans">
      
      {/* 🗺️ PREMIUM RIGID COCKPIT NAVBAR WITH PERMANENT HOME TAB */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e2e2e2] px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div onClick={() => setActiveTab('Home')} className="text-xl font-extrabold tracking-tight text-[#705d00] flex items-center gap-2 cursor-pointer select-none">
            <span className="h-4 w-4 bg-[#ffd700] inline-block rounded-[4px]"></span>
            CollegeAchiver
          </div>
          
          {/* 🎛️ NAVIGATION BUTTONS ARRAY (Home Included) */}
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4 text-xs font-semibold text-[#5f5e5e]">
            {['Home', 'Predictor', 'Opening/Closing Ranks', 'Analysis', 'Deadlines', 'Seat Matrix'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${
                  activeTab === tab 
                    ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-sm' 
                    : 'hover:text-[#705d00] hover:bg-[#eeeeee]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shadow-xs">
            Sign In
          </button>
        </div>
      </nav>

      {/* 📋 RENDER CORE COMPONENTS BASED ON HEADER SELECTION */}
      
      {/* 1️⃣ TAB CONTENT: HOME OR PREDICTOR (Dono Landing Layout render karenge) */}
      {(activeTab === 'Home' || activeTab === 'Predictor') && (
        <>
          <section className="bg-white border-b border-[#e8e8e8] py-12 md:py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-[#ffd700]/40">
                  ✨ AI-Counselling Engine Loaded
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1c1c] leading-[1.15]">
                  Predict Your Dream <span className="text-[#705d00]">IIT & NIT</span>
                </h1>
                <p className="text-[#5f5e5e] text-sm md:text-base max-w-xl leading-relaxed">
                  Enter your ranks below to query our multi-year historical dataset. Get precise, instant allotment analytics built on strict academic logic.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e2e2e2] max-w-md text-xs text-[#5f5e5e]">
                  <div>🔥 <strong className="text-black">52,148</strong> Seats</div>
                  <div>🏛️ <strong className="text-black">113</strong> Colleges</div>
                  <div>⚡ <strong className="text-black">2026 Ready</strong></div>
                </div>
              </div>

              {/* Form Input Block */}
              <div className="lg:col-span-5 bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
                <h3 className="font-bold text-lg text-[#1a1c1c] mb-4">Rank Prediction Dashboard</h3>
                <form onSubmit={handlePredict} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Enter JEE Rank (CRL / Category)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 15000" 
                      value={rank} 
                      onChange={(e) => setRank(e.target.value)} 
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-sm focus:ring-2 focus:ring-[#ffd700] focus:border-[#ffd700] focus:outline-none transition-all" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium">
                        <option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Gender</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium">
                        <option>Gender-Neutral</option><option>Female-Only</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Quota Allocation Filter</label>
                    <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium">
                      <option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider hover:opacity-90 shadow-md active:scale-95 transition-all">
                    Launch Real Predictions 🚀
                  </button>
                </form>
              </div>

            </div>
          </section>

          {/* Results Render Target */}
          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS</h3>
                  {results.map(college => {
                    const statusColors = {
                      High: "bg-emerald-50 text-emerald-800 border-emerald-200",
                      Medium: "bg-amber-50 text-amber-800 border-amber-200",
                      Low: "bg-red-50 text-red-800 border-red-200"
                    };
                    return (
                      <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm accent-border card-hover transition-all duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-[#1a1c1c] text-base leading-tight">{college.institute}</h4>
                            <p className="text-xs text-[#5f5e5e] mt-1">{college.program}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full border shrink-0 ${statusColors[college.chance || 'Low']}`}>
                            {college.chance} CHANCE
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#eeeeee] text-xs text-[#5f5e5e]">
                          <span>Closing Cutoff: <strong className="text-black">{college.closing}</strong></span>
                          <span>Average Placement: <strong className="text-black">{college.placement}</strong></span>
                          <span>NIRF Rank: <strong className="text-black">{college.nirf}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-red-200 text-[#ba1a1a] rounded-xl p-6 text-center text-sm font-medium shadow-sm">
                  🚨 NO ALLOTMENT INSTANCE: Is specified parameter settings par record block nahi mila.
                </div>
              )
            ) : (
              <div className="bg-white border border-[#e2e2e2] rounded-xl p-8 text-center text-xs text-[#5f5e5e] font-mono">
                💡 Tip: Upper widget me data enter karke system parameters compile karein.
              </div>
            )}
          </section>
        </>
      )}

      {/* 2️⃣ TAB CONTENT: OPENING/CLOSING RANKS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1c] mb-2 tracking-tight">Cut-off Analysis Matrix</h1>
            <p className="text-base text-[#5f5e5e] max-w-2xl">Browse historical opening and closing ranks for all JoSAA participating institutes.</p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-[#e2e2e2] grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Year Configuration</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm outline-none font-medium">
                <option>2023</option><option>2022</option><option>2021</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Institute Type</label>
              <div className="flex flex-wrap gap-2">
                {['IIT', 'NIT', 'IIIT'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      selectedType === type ? 'bg-[#ffd700] text-[#221b00] border-[#ffd700]' : 'bg-white border-[#e2e2e2] text-[#5f5e5e] hover:bg-[#eeeeee]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Round Sequence</label>
              <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm outline-none font-medium">
                <option>Round 1</option><option>Round 2</option><option>Round 3</option><option>Round 4</option><option>Round 5</option><option>Round 6 (Final)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Quick Filter Engine</label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 text-[#5f5e5e]" size={16} />
                <input 
                  type="text" 
                  placeholder="e.g. Bombay, CSE..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#5f5e5e] text-white text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Institute Entity</th>
                    <th className="px-6 py-4">Academic Program Specialization</th>
                    <th className="px-6 py-4">Quota</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Opening Rank</th>
                    <th className="px-6 py-4">Closing Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e2e2] text-sm">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, idx) => (
                      <tr key={idx} className="group transition-colors hover:bg-[#ffd700]/5">
                        <td className="px-6 py-4.5 font-semibold text-[#1a1c1c] transition-colors">{item.institute}</td>
                        <td className="px-6 py-4.5 text-[#5f5e5e] text-xs">{item.program}</td>
                        <td className="px-6 py-4.5 text-[#5f5e5e] font-mono">{item.quota}</td>
                        <td className="px-6 py-4.5">
                          <span className="bg-[#eeeeee] text-[#4d4732] px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#e2e2e2]">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 font-bold text-zinc-700 font-mono">{item.opening}</td>
                        <td className="px-6 py-4.5 font-bold text-[#705d00] font-mono">{item.closing}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-xs font-mono text-[#5f5e5e]">
                        ❌ No records available. Search queries change karein.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-[#f3f3f3] border-t border-[#e2e2e2] flex items-center justify-between text-xs">
              <span className="font-medium text-[#5f5e5e]">
                Showing {filteredCutoffData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCutoffData.length)} of {filteredCutoffData.length} instances
              </span>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#e2e2e2] bg-white hover:bg-[#eeeeee] disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-bold px-3 font-mono">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#e2e2e2] bg-white hover:bg-[#eeeeee] disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3️⃣ TAB CONTENT: ANALYSIS */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-8 border-b border-[#e2e2e2] pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c]">Cutoff Shift Volatility Charts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-5 rounded-xl shadow-xs">
              <h4 className="font-bold text-sm mb-4">IIT Bombay — Computer Science Trends</h4>
              <div className="h-16 bg-[#f9f9f9] border-b border-[#e2e2e2] mb-3 flex items-end gap-2 p-1">
                <div className="bg-[#5f5e5e] h-[40%] w-full rounded-t"></div>
                <div className="bg-[#ffd700] h-[85%] w-full rounded-t"></div>
              </div>
              <div className="flex justify-between text-xs font-mono"><span>2026 Target Cutoff: 68</span><span className="text-red-600 font-bold">↗ +12.4%</span></div>
            </div>
          </div>
        </section>
      )}

      {/* 4️⃣ TAB CONTENT: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-black mb-6 tracking-tight">JoSAA Counselling Event Target Sequence</h2>
          <div className="space-y-6 border-l-2 border-[#705d00] pl-6 ml-2 text-sm">
            <div>
              <span className="text-xs font-mono text-amber-700 font-bold block">JUNE 10, 2026</span>
              <h4 className="font-bold text-[#1a1c1c] mt-0.5">JEE Advanced Rankings Ledger Audit</h4>
            </div>
          </div>
        </section>
      )}

      {/* 5️⃣ TAB CONTENT: SEAT MATRIX */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-extrabold mb-4 tracking-tight">Seat Matrix Allocation Ledger</h2>
          <div className="border border-[#e2e2e2] rounded-xl overflow-hidden bg-white text-xs font-mono shadow-sm">
            <div className="bg-[#2f3131] text-white p-3.5 grid grid-cols-4 font-bold uppercase tracking-wider text-[10px]">
              <span>Institute Node</span><span>Specialization Branch</span><span>Quota ID</span><span>Seat Cap</span>
            </div>
            <div className="p-3.5 grid grid-cols-4 border-b border-zinc-100"><span>IIT Bombay</span><span>Computer Science Engineering</span><span>OPEN (Neutral)</span><span className="font-bold">124</span></div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-base font-bold text-[#705d00] mb-3">CollegeAchiver</div>
            <p className="text-[11px] leading-relaxed">Navigating future with data integrity.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-[#d0c6ab] mt-8 pt-4 text-center text-[11px]">
          <p>© 2026 CollegeAchiver Systems. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}