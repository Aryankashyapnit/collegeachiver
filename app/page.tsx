'use client';
import { useState, useRef } from 'react';
import { School, Award, TrendingUp, Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
}

export default function Home() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  const predictorRef = useRef<HTMLDivElement>(null);

  const scrollToPredictor = () => {
    predictorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");

    const userRank = parseInt(rank);

    // Dynamic filtering over massive database
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

    // Best college sort rank-wise
    filtered.sort((a, b) => a.closing - b.closing);
    setResults(filtered);
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-zinc-200 py-20 md:py-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-indigo-200 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[250px] h-[250px] bg-emerald-100 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-indigo-100">
            🚀 CollegeAchiver Predictor v2.0 (Real Database Loaded)
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1] mb-6">
            Predict Your <span className="text-indigo-600">IIT / NIT / IIIT</span>
          </h1>
          <p className="text-zinc-600 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Ab loaded hai actual allotment trends data. Apne rank ke accurate insights check karo directly screen par.
          </p>
          <button 
            onClick={scrollToPredictor}
            className="bg-zinc-950 hover:bg-zinc-900 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-md active:scale-[0.98] inline-flex items-center gap-2 text-sm sm:text-base"
          >
            Start Predicting Now 📊
          </button>
        </div>
      </section>

      {/* Core Interface */}
      <section ref={predictorRef} className="py-12 px-4 scroll-mt-20">
        <div className="max-w-xl mx-auto bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm mb-8">
          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">JEE Rank (CRL / Category as per select)</label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="e.g. 25000, 4000, 500" 
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full px-4 py-3 pl-11 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-zinc-900"
                />
                <Search className="absolute left-3.5 top-3.5 text-zinc-400" size={18} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-zinc-800"
                >
                  <option>OPEN</option>
                  <option>OBC-NCL</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>EWS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Gender</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-zinc-800"
                >
                  <option>Gender-Neutral</option>
                  <option>Female-Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Quota</label>
                <select 
                  value={homeState}
                  onChange={(e) => setHomeState(e.target.value)}
                  className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-zinc-800"
                >
                  <option value="OS">Other State (OS)</option>
                  <option value="HS">Home State (HS)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] text-sm mt-2 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal size={16} /> Predict My Colleges
            </button>
          </form>
        </div>

        {/* Results Visual Grid */}
        <div className="max-w-2xl mx-auto">
          {results.length > 0 ? (
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
              📊 Possible Options Found ({results.length})
            </h2>
          ) : rank && (
            <p className="text-center text-sm text-zinc-500 mt-8">Is criteria aur rank par database me koi match nahi mila. Try changing values.</p>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            {results.map(college => {
              const colors = {
                High: "bg-emerald-50 text-emerald-700 border-emerald-200",
                Medium: "bg-amber-50 text-amber-700 border-amber-200",
                Low: "bg-rose-50 text-rose-700 border-rose-200"
              };

              return (
                <div key={college.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex gap-3">
                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 h-10 w-10 flex items-center justify-center shrink-0">
                          <School size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 text-base leading-tight">{college.institute}</h3>
                          <p className="text-xs text-zinc-600 mt-1 font-medium">{college.program}</p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${colors[college.chance || 'Low']}`}>
                        {college.chance} Chance
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 pt-3 mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <Award size={14} className="text-zinc-400" />
                      <span>NIRF: <strong className="text-zinc-800">{college.nirf}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <TrendingUp size={14} className="text-zinc-400" />
                      <span>Cutoff: <strong className="text-zinc-800">{college.closing}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <MapPin size={14} className="text-zinc-400" />
                      <span>Quota: <strong className="text-zinc-800">{college.quota}</strong></span>
                    </div>
                    <div className="col-span-3 bg-zinc-50 p-2.5 rounded-xl flex justify-between text-[11px] mt-1 text-zinc-500 font-medium">
                      <span>Average Package: <strong className="text-zinc-800">{college.placement}</strong></span>
                      <span>Hostel Fees: <strong className="text-zinc-800">{college.fee}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}