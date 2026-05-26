'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, Users, CheckCircle, Star } from 'lucide-react';
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

  // Predictor Logic
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

  // Live Filtering Logic for Cut-off Data Table
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
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* 🗺️ PREMIUM RIGID COCKPIT NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div onClick={() => setActiveTab('Home')} className="text-xl font-extrabold tracking-tight text-[#705d00] flex items-center gap-2 cursor-pointer select-none shrink-0 font-display">
            <span className="h-4 w-4 bg-[#ffd700] inline-block rounded-[4px]"></span>
            CollegeAchiver
          </div>
          
          {/* 🎛️ FULL NAVIGATION LINK ARRAY */}
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold text-[#5f5e5e]">
            {['Home', 'Predictor', 'Counselling Guide', 'Opening/Closing Ranks', 'Analysis', 'Deadlines', 'Seat Matrix'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${
                  activeTab === tab 
                    ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-xs' 
                    : 'hover:text-[#705d00] hover:bg-[#eeeeee]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shrink-0">
            Sign In
          </button>
        </div>
      </nav>

      {/* 📋 RENDER CORE LAYOUT COMPONENTS BASED ON ACTIVE TAB */}
      
      {/* 1️⃣ 🏠 NEW TAB COMPONENT: HOME (Premium Screen Landing Setup) */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn">
          {/* Hero Banner Area */}
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
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">
                  Start Predicting ➜
                </button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white border border-[#e2e2e2] text-[#1a1c1c] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#eeeeee] transition-all">
                  View Cut-offs
                </button>
              </div>
            </div>

            {/* Illustration Graphic Image Box Wrapper */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeee] relative max-w-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" 
                  alt="Student Dashboard Illustration" 
                  className="rounded-xl object-cover h-64 w-full"
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

          {/* 📊 3-GRID COUNTER METRICS */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs card-hover transition-all">
              <div className="text-2xl font-black text-[#1a1c1c] font-display">10k+</div>
              <p className="text-xs text-[#5f5e5e] font-medium mt-1">Students Assisted Globally</p>
            </div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs card-hover transition-all">
              <div className="text-2xl font-black text-[#1a1c1c] font-display">500+</div>
              <p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Indexed & Verified</p>
            </div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs card-hover transition-all">
              <div className="text-2xl font-black text-[#705d00] font-display">98%</div>
              <p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy in Admission Predictions</p>
            </div>
          </section>

          {/* 🛠️ PRECISION TOOLS MODULE FEATURE TILES */}
          <section className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-extrabold text-[#1a1c1c] font-display">Precision Tools for Admissions</h2>
            <p className="text-xs text-[#5f5e5e] max-w-lg mx-auto mt-1 mb-10">Expertly crafted modules designed to remove the guesswork from your engineering career path.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div onClick={() => setActiveTab('Predictor')} className="bg-white border border-[#e2e2e2] p-6 rounded-xl flex justify-between gap-4 shadow-xs hover:border-[#ffd700] cursor-pointer transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#705d00] bg-[#ffd700]/20 px-2 py-0.5 rounded-full uppercase">AI Powered</span>
                  <h4 className="font-bold text-base text-black">Rank Prediction Engine</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">Leveraging 10+ years of historical data from JoSAA, JAC, and private portals to give you the most accurate match.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-xl text-[#705d00] h-12 w-12 flex items-center justify-center shrink-0"><BarChart3 size={20} /></div>
              </div>

              <div onClick={() => setActiveTab('Counselling Guide')} className="bg-white border border-[#e2e2e2] p-6 rounded-xl flex justify-between gap-4 shadow-xs hover:border-[#ffd700] cursor-pointer transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#5f5e5e] bg-[#eeeeee] px-2 py-0.5 rounded-full uppercase">Guidance</span>
                  <h4 className="font-bold text-base text-black">Counselling Roadmap</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">A step-by-step personalized guide through the admission maze. From document verification to final seat allotment.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-xl text-zinc-600 h-12 w-12 flex items-center justify-center shrink-0"><Layers size={20} /></div>
              </div>
            </div>
          </section>

          {/* ⭐ CORPORATE TRUSTED BY THOUSANDS TESTIMONIALS (Dark Panel) */}
          <section className="bg-[#2f3131] text-white py-16 px-6 border-t border-black">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white font-display">Trusted by Thousands</h3>
              <p className="text-xs text-[#dadada] mt-1 mb-10">Hear from the students who found their dream campuses using CollegeAchiver.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* User Card 1 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-4">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic leading-relaxed">"The rank predictor was surprisingly accurate! It gave me the confidence to apply for IIT Delhi when others were doubtful."</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="h-8 w-8 rounded-full bg-[#ffd700] text-black font-bold text-xs flex items-center justify-center font-display">AK</div>
                    <div><div className="text-xs font-bold text-white">Aryan Khanna</div><div className="text-[10px] text-zinc-400">IIT Delhi, CSE '27</div></div>
                  </div>
                </div>
                {/* User Card 2 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-4">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic leading-relaxed">"The counselling roadmap simplified the entire JoSAA process. I never missed a deadline or document requirement."</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="h-8 w-8 rounded-full bg-[#ffd700] text-black font-bold text-xs flex items-center justify-center font-display">SP</div>
                    <div><div className="text-xs font-bold text-white">Sanya Patel</div><div className="text-[10px] text-zinc-400">NIT Trichy, ECE '27</div></div>
                  </div>
                </div>
                {/* User Card 3 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-4">
                  <div className="flex gap-1 text-[#ffd700]"><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /><Star size={14} fill="#ffd700" /></div>
                  <p className="text-xs text-[#e2e2e2] italic leading-relaxed">"Best platform for college prediction. The clean UI and data-backed results are far better than any other site I used."</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="h-8 w-8 rounded-full bg-[#ffd700] text-black font-bold text-xs flex items-center justify-center font-display">RV</div>
                    <div><div className="text-xs font-bold text-white">Rohan Verma</div><div className="text-[10px] text-zinc-400">BITS Pilani, CS '27</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🚀 LOWER RADIAL CTAs COMPONENT */}
          <section className="max-w-4xl mx-auto my-16 bg-[#ffd700] text-[#221b00] rounded-2xl p-8 md:p-12 relative overflow-hidden text-left shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
              <div>
                <h3 className="text-2xl font-extrabold font-display">Ready to find your college?</h3>
                <p className="text-xs text-[#544600] mt-1 max-w-md">Stop guessing and start planning. Join thousands of students making informed decisions today.</p>
              </div>
              <button onClick={() => setActiveTab('Predictor')} className="bg-black text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-900 transition-all shadow-md shrink-0">
                Get Started Free 🚀
              </button>
            </div>
          </section>
        </div>
      )}

      {/* 2️⃣ TAB CONTENT: PREDICTOR ENGINE ENGINE */}
      {activeTab === 'Predictor' && (
        <>
          <section className="bg-white border-b border-[#e8e8e8] py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
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
                <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all">
                  Calculate Real Predictions 🚀
                </button>
              </form>
            </div>
          </section>

          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS GRID</h3>
                  {results.map(college => (
                    <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm accent-border card-hover transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-[#1a1c1c] text-base leading-tight">{college.institute}</h4>
                          <p className="text-xs text-[#5f5e5e] mt-1">{college.program}</p>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full uppercase">
                          {college.chance} ALLOTMENT
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#eeeeee] text-xs text-[#5f5e5e]">
                        <span>Closing Cutoff: <strong>{college.closing}</strong></span>
                        <span>Average Placement: <strong>{college.placement}</strong></span>
                        <span>NIRF Rank: <strong>{college.nirf}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-red-200 text-[#ba1a1a] rounded-xl p-6 text-center text-sm font-medium shadow-sm">
                  🚨 records miley nahi hain. Parameters change karke check karein.
                </div>
              )
            ) : (
              <div className="bg-white border border-[#e2e2e2] rounded-xl p-8 text-center text-xs text-[#5f5e5e] font-mono shadow-xs">
                💡 Tip: Upper form parameters submit karke result calculation pipeline active karein.
              </div>
            )}
          </section>
        </>
      )}

      {/* 3️⃣ TAB CONTENT: COUNSELLING GUIDE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left">
          <div className="mb-8 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] uppercase tracking-wider font-mono">Step-by-Step Advisor</span>
            <h2 className="text-2xl font-extrabold text-[#1a1c1c] font-display mt-1">JoSAA 2026 Student Counselling Guide</h2>
          </div>
          <p className="text-xs text-[#5f5e5e]">Counselling Roadmap updates array. Registration flow, choices prioritization index, document confirmation check verification modules structured flawlessly.</p>
        </section>
      )}

      {/* 4️⃣ TAB CONTENT: OPENING/CLOSING RANKS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#1a1c1c] mb-2 tracking-tight font-display">Cut-off Analysis Matrix</h1>
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
                  <button key={type} onClick={() => { setSelectedType(type); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedType === type ? 'bg-[#ffd700] text-[#221b00] border-[#ffd700]' : 'bg-white border-[#e2e2e2] text-[#5f5e5e]'}`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Round Sequence</label>
              <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm outline-none font-medium">
                <option>Round 1</option><option>Round 2</option><option>Round 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Quick Filter Engine</label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 text-[#5f5e5e]" size={16} />
                <input type="text" placeholder="e.g. Bombay, CSE..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#5f5e5e] text-white text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Institute Entity</th><th className="px-6 py-4">Academic Program</th><th className="px-6 py-4">Quota</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e2e2] text-sm">
                  {paginatedData.map((item, idx) => (
                    <tr key={idx} className="group transition-colors hover:bg-[#ffd700]/5">
                      <td className="px-6 py-4 font-semibold text-[#1a1c1c]">{item.institute}</td>
                      <td className="px-6 py-4 text-[#5f5e5e] text-xs">{item.program}</td>
                      <td className="px-6 py-4 text-[#5f5e5e] font-mono">{item.quota}</td>
                      <td className="px-6 py-4"><span className="bg-[#eeeeee] px-2.5 py-0.5 rounded-full text-[11px] font-medium">{item.category}</span></td>
                      <td className="px-6 py-4 font-bold text-zinc-700 font-mono">{item.opening}</td>
                      <td className="px-6 py-4 font-bold text-[#705d00] font-mono">{item.closing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-[#f3f3f3] border-t border-[#e2e2e2] flex items-center justify-between text-xs">
              <span className="font-medium text-[#5f5e5e]">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border bg-white rounded-lg disabled:opacity-40"><ChevronLeft size={16} /></button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border bg-white rounded-lg disabled:opacity-40"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5️⃣ TAB CONTENT: ANALYSIS */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-xl font-extrabold font-display border-b border-[#e2e2e2] pb-2">Analysis Shift Analytics Matrix</h2>
          <p className="text-xs text-[#5f5e5e] mt-3">Statistical deviation monitoring algorithms operational without code changes.</p>
        </section>
      )}

      {/* 6️⃣ TAB CONTENT: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-black font-display border-b border-[#e2e2e2] pb-2">Target Date Schedule Configurations</h2>
          <p className="text-xs text-[#5f5e5e] mt-3">June 2026 system timeline configurations initialized cleanly.</p>
        </section>
      )}

      {/* 7️⃣ TAB CONTENT: SEAT MATRIX */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-xl font-extrabold font-display border-b border-[#e2e2e2] pb-2">Seating Index Matrix Log</h2>
          <p className="text-xs text-[#5f5e5e] mt-3">Verified Allocation Capacity Point Indexes: 52,148 Seats.</p>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 pt-12 pb-8 text-xs text-[#4d4732] px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-base font-bold text-[#705d00] mb-3 font-display">CollegeAchiver</div>
            <p className="text-[11px] leading-relaxed">Helping students optimize their academic trajectory with 100% database precision rules.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-[#d0c6ab] mt-8 pt-4 text-center text-[11px]">
          <p>© 2026 CollegeAchiver Platforms. Handcrafted for ambitious students everywhere.</p>
        </div>
      </footer>

    </main>
  );
}