'use client';
import { useState, useRef } from 'react';
import { School, Award, TrendingUp, Search, SlidersHorizontal, MapPin, Download, CheckSquare, Layers, BarChart3, Clock, HelpCenter, Flame, ShieldCheck } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
}

export default function Home() {
  // 🎛️ Active Tab State Control
  const [activeTab, setActiveTab] = useState('Predictor');
  
  // Predictor States
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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

  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased">
      
      {/* 🗺️ DYNAMIC INDUSTRIAL NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd] px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div onClick={() => setActiveTab('Predictor')} className="text-base font-bold tracking-tight text-[#0b1c30] flex items-center gap-2 cursor-pointer">
            <span className="h-4 w-4 bg-[#000000] inline-block rounded-[2px]"></span>
            Rank Matrix <span className="text-[10px] font-mono text-[#76777d] font-normal">v4.2</span>
          </div>
          
          {/* Tabs System Matrix */}
          <div className="flex items-center gap-2 md:gap-6 text-xs font-semibold text-[#45464d]">
            {['Predictor', 'Analysis', 'Deadlines', 'Seat Matrix', 'Choice Filling'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 transition-all ${
                  activeTab === tab 
                    ? 'text-[#000000] border-b-2 border-[#131b2e] font-bold' 
                    : 'hover:text-[#000000]'
                } ${tab === 'Seat Matrix' ? 'bg-[#ffddb8] text-[#2a1700] text-[10px] font-mono px-2 py-0.5 rounded-[2px] border border-[#ffb95f]' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-xs font-bold text-[#0b1c30] hover:underline font-mono hidden sm:block">Sign In</button>
        </div>
      </nav>

      {/* 📋 RENDER DYNAMIC CONTENT BASED ON ACTIVE TAB */}
      
      {/* 1️⃣ TAB: PREDICTOR (Main Engine) */}
      {activeTab === 'Predictor' && (
        <>
          <section className="border-b border-[#c6c6cd] bg-[#f8f9ff] py-12 md:py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#131b2e] text-[#eff4ff] text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-[4px] border border-[#76777d]">
                  ⚡ ENGINE V4.2.0 | STABLE STATUS
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0b1c30] leading-[1.1]">
                  Precision Intelligence <br />
                  for <span className="text-[#fea619]">JoSAA 2026</span>
                </h1>
                <p className="text-[#45464d] text-base md:text-lg max-w-xl leading-relaxed">
                  Strategize your counseling with deterministic choice filling and real-time seat analysis. Precision forecasting for IITs, NITs, and IIITs based on decades of admission history.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button onClick={() => predictorRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#000000] text-white font-semibold text-sm px-6 py-3.5 rounded-[4px] transition-all hover:bg-[#213145] shadow-sm flex items-center gap-2">
                    Start Predicting <TrendingUp size={16} className="text-[#fea619]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-[#c6c6cd] rounded-[8px] p-6 shadow-sm">
                <h3 className="font-bold text-xl tracking-tight text-[#0b1c30] mb-4">Quick Rank Check</h3>
                <form onSubmit={handlePredict} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">JEE Rank</label>
                    <input type="number" placeholder="e.g. 25000" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-sm font-mono text-[#0b1c30]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-xs font-semibold">
                        <option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">Gender</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-xs font-semibold">
                        <option>Gender-Neutral</option><option>Female-Only</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">Quota</label>
                    <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-xs font-semibold">
                      <option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#131b2e] text-white font-bold py-3.5 rounded-[4px] text-xs uppercase tracking-wider">Calculate Results 🚀</button>
                </form>
              </div>
            </div>
          </section>

          {/* Predictor Results Outputs */}
          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-6">
            {hasSearched && results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#45464d]">📊 DETECTED ALLOTMENTS ({results.length})</h3>
                {results.map(college => (
                  <div key={college.id} className="bg-white border border-[#c6c6cd] p-5 rounded-[4px] shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-[#0b1c30] text-base">{college.institute}</h4>
                        <p className="text-xs text-[#45464d] font-mono">{college.program}</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-[4px] uppercase">{college.chance} Allotment</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 text-[11px] font-mono text-[#45464d]">
                      <span>Closing Cutoff: <strong>{college.closing}</strong></span>
                      <span>Average Package: <strong>{college.placement}</strong></span>
                      <span>NIRF Rank: <strong>{college.nirf}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* 2️⃣ TAB: ANALYSIS (Market Volatility Analytics) */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <span className="text-[10px] font-mono font-bold text-[#76777d] uppercase">TRENDS MATRIX</span>
            <h2 className="text-3xl font-black text-[#0b1c30]">Cutoff Volatility Analysis</h2>
            <p className="text-sm text-[#45464d] mt-1">Real-time delta metrics indicating branch movement patterns over multi-year cycles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#c6c6cd] p-6 rounded-[4px]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm">IIT Bombay (CSE)</h4>
                <span className="bg-red-100 text-red-700 font-mono text-[9px] px-2 py-0.5 rounded-[2px] font-bold">CRITICAL</span>
              </div>
              <div className="h-20 flex items-end gap-2 border-b border-[#c6c6cd] mb-4">
                <div className="w-full bg-slate-200 h-[30%]"></div>
                <div className="w-full bg-slate-200 h-[50%]"></div>
                <div className="w-full bg-slate-200 h-[75%]"></div>
                <div className="w-full bg-[#fea619] h-[90%]"></div>
              </div>
              <div className="flex justify-between font-mono text-xs"><span>Closing: 68</span> <span className="text-red-600 font-bold">+12.4% Volatility</span></div>
            </div>

            <div className="bg-white border border-[#c6c6cd] p-6 rounded-[4px]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm">IIT Delhi (AI & DS)</h4>
                <span className="bg-[#ffddb8] text-[#653e00] font-mono text-[9px] px-2 py-0.5 rounded-[2px] font-bold">HOT TIER</span>
              </div>
              <div className="h-20 flex items-end gap-2 border-b border-[#c6c6cd] mb-4">
                <div className="w-full bg-slate-200 h-[20%]"></div>
                <div className="w-full bg-slate-200 h-[45%]"></div>
                <div className="w-full bg-slate-200 h-[65%]"></div>
                <div className="w-full bg-[#fea619] h-[95%]"></div>
              </div>
              <div className="flex justify-between font-mono text-xs"><span>Closing: 115</span> <span className="text-red-600 font-bold">+21.8% Volatility</span></div>
            </div>

            <div className="bg-white border border-[#c6c6cd] p-6 rounded-[4px]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm">NIT Trichy (CSE)</h4>
                <span className="bg-blue-100 text-blue-700 font-mono text-[9px] px-2 py-0.5 rounded-[2px] font-bold">STABLE</span>
              </div>
              <div className="h-20 flex items-end gap-2 border-b border-[#c6c6cd] mb-4">
                <div className="w-full bg-slate-200 h-[80%]"></div>
                <div className="w-full bg-slate-200 h-[82%]"></div>
                <div className="w-full bg-slate-200 h-[81%]"></div>
                <div className="w-full bg-[#fea619] h-[83%]"></div>
              </div>
              <div className="flex justify-between font-mono text-xs"><span>Closing: 1482</span> <span className="text-emerald-600 font-bold">-0.8% Steady</span></div>
            </div>
          </div>
        </section>
      )}

      {/* 3️⃣ TAB: DEADLINES (Counselling Schedule Timeline) */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black mb-6">JoSAA 2026 Critical Schedule</h2>
          <div className="space-y-4 border-l-2 border-[#131b2e] pl-6 ml-2">
            <div className="relative mb-6">
              <div className="absolute -left-[31px] top-1.5 bg-[#131b2e] h-3 w-3 rounded-full"></div>
              <span className="text-xs font-mono text-amber-600 font-bold">JUNE 10, 2026</span>
              <h4 className="font-bold text-base text-[#0b1c30]">JEE Advanced Results Announcement</h4>
              <p className="text-xs text-[#45464d]">Official cutoffs and rank lists published by organizing IIT.</p>
            </div>
            <div className="relative mb-6">
              <div className="absolute -left-[31px] top-1.5 bg-[#131b2e] h-3 w-3 rounded-full"></div>
              <span className="text-xs font-mono text-amber-600 font-bold">JUNE 15, 2026</span>
              <h4 className="font-bold text-base text-[#0b1c30]">Online Registration & Choice Filling Begins</h4>
              <p className="text-xs text-[#45464d]">Candidates can start entering preferences on JoSAA portal.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 bg-red-500 h-3 w-3 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-red-600 font-bold">JUNE 25, 2026 (CRITICAL)</span>
              <h4 className="font-bold text-base text-red-600">Choice Filling System Auto-Locking</h4>
              <p className="text-xs text-[#45464d]">Final timestamp to organize and save choices before allocation algorithms trigger.</p>
            </div>
          </div>
        </section>
      )}

      {/* 4️⃣ TAB: SEAT MATRIX (Capacity & Breakdown Tracker) */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black mb-2">Institutional Capacity Seat Matrix</h2>
          <p className="text-xs text-[#45464d] mb-6 font-mono">Total Verified Allocation Points: 52,148 Seats Across Nation</p>
          <div className="border border-[#c6c6cd] rounded-[4px] overflow-hidden bg-white text-xs font-mono">
            <div className="bg-[#131b2e] text-white p-3 grid grid-cols-4 font-bold uppercase tracking-wider text-[10px]">
              <span>Institute Name</span><span>Program / Branch</span><span>Category Break</span><span>Seats Count</span>
            </div>
            <div className="p-3 grid grid-cols-4 border-b border-zinc-100"><span>IIT Bombay</span><span>Computer Science</span><span>OPEN (Gender-Neutral)</span><span className="font-bold">124</span></div>
            <div className="p-3 grid grid-cols-4 border-b border-zinc-100"><span>IIT Delhi</span><span>Data Science & AI</span><span>OPEN (Gender-Neutral)</span><span className="font-bold">40</span></div>
            <div className="p-3 grid grid-cols-4 border-b border-zinc-100"><span>NIT Agartala</span><span>Electronics & Comm. Engineering</span><span>OS - OPEN</span><span className="font-bold">92</span></div>
            <div className="p-3 grid grid-cols-4"><span>NIT Trichy</span><span>Computer Science</span><span>OS - OBC-NCL</span><span className="font-bold">38</span></div>
          </div>
        </section>
      )}

      {/* 5️⃣ TAB: CHOICE FILLING (Sequence Preference Order Helper) */}
      {activeTab === 'Choice Filling' && (
        <section className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
          <div className="bg-[#131b2e] text-white p-8 rounded-[8px] border border-black text-left">
            <span className="text-[10px] font-mono text-amber-500 font-bold block mb-1">ALGORITHMIC HELPER</span>
            <h3 className="text-xl font-bold mb-2">Choice Optimizer Preference Sequence</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">Apne upar generate kiye gaye results me se best preference sequence set karo. Aur direct sequence draft export karke use counseling panel par fill karo.</p>
            <div className="space-y-2 font-mono text-xs text-slate-200">
              <div className="p-3 bg-[#0d1c2f] border border-slate-700 rounded-[4px]">Choice #1: IIT Bombay — Computer Science (AIR Cutoff: 68)</div>
              <div className="p-3 bg-[#0d1c2f] border border-slate-700 rounded-[4px]">Choice #2: IIT Delhi — Data Science & Artificial Intelligence (AIR Cutoff: 115)</div>
              <div className="p-3 bg-[#0d1c2f] border border-slate-700 rounded-[4px]">Choice #3: NIT Trichy — Computer Science (AIR Cutoff: 1482)</div>
            </div>
            <button className="mt-6 bg-[#fea619] text-black font-bold text-xs px-4 py-2.5 rounded-[4px] font-mono tracking-wider hover:bg-amber-500 transition-all flex items-center gap-2">
              <Download size={14} /> EXPORT PREFERENCE SPREADSHEET
            </button>
          </div>
        </section>
      )}

      {/* 📋 SHARED METRIC ARCHITECTURAL FOOTER */}
      <footer className="bg-white border-t border-[#c6c6cd] mt-20 py-10 text-xs text-[#76777d] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="font-bold text-[#0b1c30]">Rank Matrix Intelligence Systems</div>
            <p className="text-[11px]">The definitive engine for engineering counseling intelligence. Data verified via JoSAA protocols.</p>
          </div>
          <p className="font-mono text-[10px]">© 2026 Rank Matrix Systems. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}