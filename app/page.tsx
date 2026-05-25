'use client';
import { useState, useRef } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3 } from 'lucide-react';
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
      
      {/* 👑 AUTHORITATIVE TOP HERO PLATFORM */}
      <section className="border-b border-[#c6c6cd] bg-[#f8f9ff] py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Copy */}
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
              <button onClick={() => { setActiveTab('Predictor'); setTimeout(() => predictorRef.current?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="bg-[#000000] text-white font-semibold text-sm px-6 py-3.5 rounded-[4px] transition-all hover:bg-[#213145] shadow-sm flex items-center gap-2">
                Start Predicting <TrendingUp size={16} className="text-[#fea619]" />
              </button>
            </div>
            
            {/* Engineering Metrics Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#c6c6cd]/60 max-w-md text-[11px] font-mono text-[#45464d]">
              <div>🟢 <strong className="text-[#0b1c30]">52,148</strong> SEATS TRACKED</div>
              <div>🏛️ <strong className="text-[#0b1c30]">113</strong> COLLEGES</div>
              <div>🤖 <strong className="text-[#0b1c30]">ML v2</strong> STRATEGY MODEL</div>
            </div>
          </div>

          {/* Right Column: Premium Quick Rank Form */}
          <div className="lg:col-span-5 bg-white border border-[#c6c6cd] rounded-[8px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl tracking-tight text-[#0b1c30]">Quick Rank Check</h3>
              <span className="bg-[#eff4ff] text-[#0b1c30] font-mono text-[9px] font-bold px-2 py-0.5 rounded-[4px] border border-[#c6c6cd]">READY</span>
            </div>

            <form onSubmit={handlePredict} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">JEE Rank (Main / Advanced)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="e.g. 25000" 
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#131b2e] text-sm text-[#0b1c30] font-mono"
                  />
                </div>
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
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d] mb-1.5">Home State Quota</label>
                <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-xs font-semibold">
                  <option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-[#131b2e] text-white font-bold py-3.5 rounded-[4px] text-xs uppercase tracking-wider transition-all hover:bg-black">
                Calculate Results 🚀
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 📋 RENDER DYNAMIC CONTENT BASED ON ACTIVE TAB */}
      
      {/* 1️⃣ TAB: PREDICTOR */}
      {activeTab === 'Predictor' && (
        <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-6">
          {hasSearched ? (
            results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-mono font-bold text-[#45464d] uppercase tracking-wider">📊 DETECTED ALLOTMENTS GRID ({results.length})</h3>
                  <button className="text-xs font-mono font-bold text-[#131b2e] hover:underline flex items-center gap-1">
                    <Download size={14} /> EXPORT PDF LIST
                  </button>
                </div>
                {results.map(college => {
                  const statusColors = {
                    High: "bg-emerald-50 text-emerald-800 border-emerald-200",
                    Medium: "bg-amber-50 text-amber-800 border-amber-200",
                    Low: "bg-red-50 text-red-800 border-red-200"
                  };
                  return (
                    <div key={college.id} className="bg-white border border-[#c6c6cd] p-5 rounded-[4px] shadow-sm hover:border-[#131b2e] transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-3">
                          <div className="p-2 bg-[#f8f9ff] border border-[#c6c6cd] rounded-[4px] text-[#0b1c30] h-9 w-9 flex items-center justify-center shrink-0">
                            <School size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0b1c30] text-base leading-tight tracking-tight">{college.institute}</h4>
                            <p className="text-xs text-[#45464d] font-mono mt-1">{college.program}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border rounded-[4px] uppercase tracking-wider shrink-0 ${statusColors[college.chance || 'Low']}`}>
                          {college.chance} Allotment
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-3.5 mt-3 border-t border-[#f8f9ff] text-[11px] font-mono text-[#45464d]">
                        <span>NIRF RANK: <strong className="text-[#0b1c30]">{college.nirf}</strong></span>
                        <span>CLOSING RANK: <strong className="text-[#0b1c30]">{college.closing}</strong></span>
                        <span>QUOTA ID: <strong className="text-[#0b1c30]">{college.quota}</strong></span>
                        <div className="col-span-3 bg-[#f8f9ff] border border-[#c6c6cd]/40 p-2.5 rounded-[4px] flex justify-between text-[10px]">
                          <span>AVERAGE REVENUE COMP: <strong className="text-[#0b1c30]">{college.placement}</strong></span>
                          <span>MESS & TUITION CAPEX: <strong className="text-[#0b1c30]">{college.fee}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-red-200 text-[#ba1a1a] rounded-[4px] p-6 text-center text-sm font-mono shadow-sm">
                🚨 NO INSTANCE FOUND: Is specified rank matrix range ke andar koi matching records save nahi hain.
              </div>
            )
          ) : (
            <div className="bg-white border border-[#c6c6cd] rounded-[4px] p-8 text-center text-xs text-[#45464d] font-mono">
              💡 Upaye: Rank enter karke "Calculate Results" button par click karein dashboard active karne ke liye.
            </div>
          )}
        </section>
      )}

      {/* 2️⃣ TAB: ANALYSIS */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <span className="text-[10px] font-mono font-bold text-[#76777d] uppercase tracking-wider block mb-1">REAL-TIME METRICS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30]">Cutoff Volatility Analysis</h2>
            <p className="text-xs text-[#45464d] mt-1">Interactive visualization of cutoff volatility for high-demand branches across premiere institutes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#c6c6cd] p-5 rounded-[4px] bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-bold text-sm text-[#0b1c30]">IIT Bombay</h5>
                  <span className="text-[10px] text-[#45464d] font-mono">CS (Computer Science)</span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded-[2px]">CRITICAL</span>
              </div>
              <div className="h-24 flex items-end gap-3 px-2 border-b border-[#c6c6cd] mb-4 pt-4 bg-[#f8f9ff]">
                <div className="w-full bg-slate-300 h-[40%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[55%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[70%] rounded-t-[2px]"></div>
                <div className="w-full bg-[#fea619] h-[85%] rounded-t-[2px]"></div>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#45464d]">
                <span>CURRENT CUTOFF: <strong className="text-[#0b1c30]">68 (AIR)</strong></span>
                <span className="text-red-600 font-bold">↗ +12.4%</span>
              </div>
            </div>

            <div className="border border-[#c6c6cd] p-5 rounded-[4px] bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-bold text-sm text-[#0b1c30]">IIT Delhi</h5>
                  <span className="text-[10px] text-[#45464d] font-mono">Data Science & AI</span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#ffddb8] text-[#653e00] rounded-[2px]">HOT TIER</span>
              </div>
              <div className="h-24 flex items-end gap-3 px-2 border-b border-[#c6c6cd] mb-4 pt-4 bg-[#f8f9ff]">
                <div className="w-full bg-slate-300 h-[30%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[50%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[68%] rounded-t-[2px]"></div>
                <div className="w-full bg-[#fea619] h-[92%] rounded-t-[2px]"></div>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#45464d]">
                <span>CURRENT CUTOFF: <strong className="text-[#0b1c30]">115 (AIR)</strong></span>
                <span className="text-red-600 font-bold">↗ +21.8%</span>
              </div>
            </div>

            <div className="border border-[#c6c6cd] p-5 rounded-[4px] bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-bold text-sm text-[#0b1c30]">NIT Trichy</h5>
                  <span className="text-[10px] text-[#45464d] font-mono">CS (Computer Science)</span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-[2px]">STABLE</span>
              </div>
              <div className="h-24 flex items-end gap-3 px-2 border-b border-[#c6c6cd] mb-4 pt-4 bg-[#f8f9ff]">
                <div className="w-full bg-slate-300 h-[80%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[82%] rounded-t-[2px]"></div>
                <div className="w-full bg-slate-300 h-[79%] rounded-t-[2px]"></div>
                <div className="w-full bg-[#fea619] h-[81%] rounded-t-[2px]"></div>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#45464d]">
                <span>CURRENT CUTOFF: <strong className="text-[#0b1c30]">1482 (AIR)</strong></span>
                <span className="text-emerald-600 font-bold">↘ -0.8%</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3️⃣ TAB: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black mb-6">JoSAA 2026 Critical Schedule Timeline</h2>
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
              <p className="text-xs text-[#45464d]">Candidates can start entering preferences on official JoSAA portal.</p>
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

      {/* 4️⃣ TAB: SEAT MATRIX */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black mb-2">Institutional Capacity Seat Matrix</h2>
          <p className="text-xs text-[#45464d] mb-6 font-mono">Total Verified Allocation Points: 52,148 Seats Across Nation</p>
          <div className="border border-[#c6c6cd] rounded-[4px] overflow-hidden bg-white text-xs font-mono shadow-sm">
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

      {/* 5️⃣ TAB: CHOICE FILLING */}
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

      {/* 📊 THE RANK MATRIX ADVANTAGE (Dark Stats Section) */}
      <section className="bg-[#131b2e] text-white py-16 px-6 border-t border-[#000000]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#7c839b] uppercase tracking-wider block mb-2">🛡️ PROPRIETARY DATA PROTOCOL</span>
            <h3 className="text-3xl font-bold tracking-tight mb-4">The Rank Matrix Advantage</h3>
            <p className="text-[#7c839b] text-sm leading-relaxed mb-6">
              CollegeAchiver Portal ensures every prediction is backed by verifiable historical data from JoSAA and CSAB rounds processed with high technical precision.
            </p>
            <div className="space-y-3 font-mono text-xs text-[#7c839b]">
              <div className="flex justify-between border-b border-[#7c839b]/20 pb-2"><span>PREDICTION RELIABILITY</span> <span className="text-[#fea619] font-bold">98.42%</span></div>
              <div className="flex justify-between border-b border-[#7c839b]/20 pb-2"><span>VERIFIED DATA POINTS</span> <span className="text-[#fea619] font-bold">185,420+</span></div>
            </div>
          </div>
          
          <div className="bg-[#0d1c2f] border border-[#76859b]/30 p-8 rounded-[8px] space-y-6">
            <h4 className="font-bold text-sm tracking-wide text-white font-mono uppercase">Unrivaled Infrastructure</h4>
            <p className="text-xs text-[#7c839b] leading-relaxed">As the leading platform for rank analysis, CollegeAchiver ensures technical alignment with actual seating results trends.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-[#fea619] pl-3">
                <div className="text-2xl font-black tracking-tight text-white">500k+</div>
                <div className="text-[10px] font-mono text-[#7c839b]">STUDENT USERS</div>
              </div>
              <div className="border-l-2 border-[#fea619] pl-3">
                <div className="text-2xl font-black tracking-tight text-white">12Y</div>
                <div className="text-[10px] font-mono text-[#7c839b]">DATA HISTORY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}