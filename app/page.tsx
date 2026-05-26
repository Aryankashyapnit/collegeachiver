'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send } from 'lucide-react';
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

  // Opening/Closing Ranks Tab States
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Counselling Guide Tab State Control
  const [guideMode, setGuideMode] = useState<'JoSAA' | 'CSAB'>('JoSAA');

  // 🤖 FLOATING CHATBOT STATES
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  const predictorRef = useRef<HTMLDivElement>(null);

  // Predictor Calculation Engine Logic
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

  // Chatbot Send Message Logic
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;

    // Append User Message
    const userMsg = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    // Simulate Automated Intelligent Response
    setTimeout(() => {
      let botText = "Bhai, ye bohot badhiya sawal hai! Counselling matrix rules ke mutabik aapko safe strategy rakhni chahiye. Aap humare 'Predictor' tab me apni rank daal kar top options directly check kar sakte hain! 🔥";
      
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('rank') || lowerText.includes('predictor')) {
        botText = "Bhai, apni rank humare system widget me dalo! Agar rank under 10k hai toh top IITs/NITs branches milne ke high chances hain.";
      } else if (lowerText.includes('csab') || lowerText.includes('spot')) {
        botText = "CSAB Spot round JoSAA khatam hone ke baad bachi hui khali seats ke liye hota hai. Iski poori details aap 'Counselling Guide' tab me CSAB button daba kar padh sakte ho.";
      } else if (lowerText.includes('freeze') || lowerText.includes('float')) {
        botText = "Freeze matlab seat lock, Float matlab safer side seat rakh kar up-gradation check karna. 'Counselling Guide' tab me maine iska poora explanation daal rakha hai.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
    }, 800);
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
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased pb-10">
      
      {/* 🗺️ PREMIUM COCKPIT NAVBAR WITH MASCOT LOGO */}
      <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Mascot Logo */}
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
          
          {/* NAVIGATION LINKS */}
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

      {/* 📋 RENDER LAYOUT MODULES */}
      
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

            {/* Premium Photo Image Wrapper */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeee] relative max-w-sm overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
                  alt="CollegeAchiver Studying Student" 
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

          {/* COUNTER METRICS */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">10k+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Students Assisted Globally</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">500+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Indexed & Verified</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy in Admission Predictions</p></div>
          </section>

          {/* Precision Tools Modules */}
          <section className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-extrabold text-[#1a1c1c] font-display">Precision Tools for Admissions</h2>
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

      {/* 2️⃣ TAB CONTENT: PREDICTOR ENGINE */}
      {activeTab === 'Predictor' && (
        <>
          <section className="bg-white border-b border-[#e8e8e8] py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
              <h3 className="font-bold text-lg text-[#1a1c1c] mb-4">Rank Prediction Dashboard</h3>
              <form onSubmit={handlePredict} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Enter JEE Rank (CRL / Category)</label>
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
                <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase hover:opacity-90 transition-all shadow-sm">Calculate Predictions 🚀</button>
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
                    <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#eeeeee] text-xs text-[#5f5e5e]">
                      <span>Closing Cutoff: <strong>{college.closing}</strong></span>
                      <span>Average Placement: <strong>{college.placement}</strong></span>
                      <span>NIRF Rank: <strong>{college.nirf}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* 3️⃣ TAB CONTENT: COUNSELLING GUIDE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-8 border-b border-[#e2e2e2] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Master Admission Roadmap</span>
              <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">Counselling Architecture Guide</h2>
            </div>
            <div className="flex gap-2 bg-[#eeeeee] p-1.5 rounded-xl shadow-inner">
              <button onClick={() => setGuideMode('JoSAA')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'JoSAA' ? 'bg-black text-white' : 'text-[#5f5e5e]'}`}>JoSAA Roadmap</button>
              <button onClick={() => setGuideMode('CSAB')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'CSAB' ? 'bg-[#ffd700] text-black' : 'text-[#5f5e5e]'}`}>CSAB Spot Round</button>
            </div>
          </div>

          {guideMode === 'JoSAA' ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">1. Choice Filling</div><p className="text-xs text-[#5f5e5e]">Hamare predictor ki help se choices perfect priority sequence orders me fill karo.</p></div>
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">2. Seat Allotment</div><p className="text-xs text-[#5f5e5e]">Allotment rounds active hote hi Freeze, Float, ya Slide protocols execute karo.</p></div>
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">3. Reporting</div><p className="text-xs text-[#5f5e5e]">Seat Acceptance Fees pay karo aur online documents submit karke seat verify karo.</p></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">1. Vacant Seats</div><p className="text-xs text-[#5f5e5e]">JoSAA khatam hone ke baad khali bachi seats ka chart release hota hai.</p></div>
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">2. Fresh Filling</div><p className="text-xs text-[#5f5e5e]">CSAB me dobara se naye choices fill karke security deposit bharna hota hai.</p></div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4️⃣ TAB CONTENT: OPENING/CLOSING RANKS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 mb-8 border border-[#e2e2e2] grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm font-medium"><option>2023</option><option>2022</option></select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Institute Type</label>
              <div className="flex flex-wrap gap-2">
                {['IIT', 'NIT', 'IIIT'].map((type) => (
                  <button key={type} onClick={() => { setSelectedType(type); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedType === type ? 'bg-[#ffd700] text-[#221b00] border-[#ffd700]' : 'bg-white border-[#e2e2e2] text-[#5f5e5e]'}`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Round</label><select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm font-medium"><option>Round 1</option><option>Round 2</option></select></div>
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Search</label><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-2.5 text-sm outline-none" /></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase tracking-wider font-bold"><th className="px-6 py-4">Institute</th><th className="px-6 py-4">Program</th><th className="px-6 py-4">Quota</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2] text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-[#ffd700]/5">
                    <td className="px-6 py-4 font-semibold text-[#1a1c1c]">{item.institute}</td>
                    <td className="px-6 py-4 text-[#5f5e5e] text-xs">{item.program}</td>
                    <td className="px-6 py-4 text-[#5f5e5e] font-mono">{item.quota}</td>
                    <td className="px-6 py-4"><span className="bg-[#eeeeee] px-2.5 py-0.5 rounded-full text-[11px] font-medium">{item.category}</span></td>
                    <td className="px-6 py-4 font-mono font-bold text-zinc-700">{item.opening}</td>
                    <td className="px-6 py-4 font-mono font-bold text-[#705d00]">{item.closing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 5️⃣ TAB CONTENT: ANALYSIS */}
      {activeTab === 'Analysis' && (
        <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Statistical Variance Pulse</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display">Cutoff Volatility Analytics</h2>
          </div>
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs max-w-xl">
            <h4 className="text-xs font-bold text-black font-mono">IIT Bombay Core CS Round 1 Delta Variance Shift</h4>
            <div className="h-10 bg-zinc-100 border-b border-zinc-300 mt-2 rounded flex items-end gap-1 p-1"><div className="bg-[#ffd700] h-5/6 w-full"></div></div>
          </div>
        </section>
      )}

      {/* 6️⃣ TAB CONTENT: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4"><h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display">JoSAA 2026 Critical Dates & Schedule</h2></div>
          <div className="relative border-l-2 border-[#ffd700] ml-4 pl-8 space-y-6 text-xs text-[#5f5e5e]">
            <div className="relative"><div className="absolute -left-[41px] top-0.5 bg-white border-4 border-black h-4 w-4 rounded-full"></div><strong className="text-black block text-sm">June 10, 2026:</strong> JEE Advanced Result release.</div>
          </div>
        </section>
      )}

      {/* 7️⃣ TAB CONTENT: SEAT MATRIX */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <h2 className="text-2xl font-extrabold text-[#1a1c1c] mb-6 font-display tracking-tight">Seat Matrix Allocation Ledger</h2>
          <div className="border border-[#e2e2e2] rounded-xl overflow-hidden bg-white text-xs font-mono max-w-xl shadow-xs">
            <div className="bg-[#2f3131] text-white p-3 grid grid-cols-3 font-bold uppercase text-[10px]"><span>Institute</span><span>Branch</span><span>Count</span></div>
            <div className="p-3 grid grid-cols-3 border-b"><span>IIT Bombay</span><span>Computer Science</span><span>124</span></div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 py-8 text-xs text-[#4d4732] text-center">
        <p>© 2026 CollegeAchiver Platforms. All rights reserved.</p>
      </footer>


      {/* 🤖 BRAND NEW FLOATING AI CHATBOT SYSTEM (BOTTOM-RIGHT WIDGET) */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        
        {/* Toggle Floating Rounded Action Button */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-[#1a1c1c] text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-[#ffd700] relative group animate-bounce"
          >
            <MessageSquare size={24} className="text-[#ffd700]" />
            <span className="absolute -top-10 right-0 bg-[#ffd700] text-black font-bold text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Ask AI Support 👋
            </span>
          </button>
        )}

        {/* Expanded Premium Animated Chat Box UI Window */}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[480px] bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] flex flex-col overflow-hidden animate-slideUp">
            
            {/* Window Upper Header Accent Profile */}
            <div className="bg-[#1a1c1c] text-white p-4 flex justify-between items-center border-b border-[#ffd700]/30">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide text-white">CollegeAchiver Bot v2.0</h4>
                  <p className="text-[10px] text-zinc-400 font-mono">NATIVE AI COUNSELLOR</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Middle Message Pipeline Stream logs render */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-[#1a1c1c] text-white rounded-tr-none' 
                      : 'bg-white text-black border border-[#e2e2e2] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Predefined Quick Action Chips Helper Row */}
            <div className="px-4 py-2 bg-[#f3f3f3] border-t border-[#e2e2e2] flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button onClick={() => handleSendMessage('Rank Predictor kaise use karein?')} className="text-[10px] font-medium bg-white border border-[#e2e2e2] hover:border-[#ffd700] rounded-full px-2.5 py-1 text-[#5f5e5e] transition-all">Rank Help 🎯</button>
              <button onClick={() => handleSendMessage('JoSAA vs CSAB kya antar hai?')} className="text-[10px] font-medium bg-white border border-[#e2e2e2] hover:border-[#ffd700] rounded-full px-2.5 py-1 text-[#5f5e5e] transition-all">JoSAA vs CSAB 🔄</button>
              <button onClick={() => handleSendMessage('Freeze aur Float kya hai?')} className="text-[10px] font-medium bg-white border border-[#e2e2e2] hover:border-[#ffd700] rounded-full px-2.5 py-1 text-[#5f5e5e] transition-all">Freeze/Float 🧊</button>
            </div>

            {/* Lower Send Console Bar */}
            <div className="p-3 bg-white border-t border-[#e2e2e2] flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type your doubt here..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#ffd700] focus:outline-none"
              />
              <button 
                onClick={() => handleSendMessage()}
                className="p-2 bg-[#ffd700] text-black rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </div>

          </div>
        )}
      </div>

    </main>
  );
}