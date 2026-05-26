'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User } from 'lucide-react';
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

  // 🔐 SIGN IN MODAL STATE
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

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

    const userMsg = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

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

  // Sign In Handle Submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Bhai, Email aur Password dono bharo pehle!");
    
    alert(`Mubarak ho bhai! Successfully logged in as: ${emailInput}`);
    setIsSignInOpen(false);
    setEmailInput('');
    setPasswordInput('');
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
      
      {/* 🗺_ PREMIUM COCKPIT NAVBAR */}
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

          {/* Trigger Open Sign In Modal Trigger */}
          <button 
            onClick={() => setIsSignInOpen(true)}
            className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-xs"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* 📋 RENDER MODULE DATA */}
      
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
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">1. Choice Filling</div><p className="text-xs text-[#5f5e5e]">Ranks parameters priority instructions mapping complete.</p></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-xs"><div className="text-sm font-bold mb-2">1. Vacant Seats</div><p className="text-xs text-[#5f5e5e]">Special spot round capacity allocations index ledger view logs.</p></div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Baaki saare tabs previous logic constraints mapping constants remain */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-fadeIn">
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

      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-2xl font-extrabold text-[#1a1c1c]">Cutoff Volatility Analytics</h2></section>}
      {activeTab === 'Deadlines' && <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-3xl font-extrabold text-[#1a1c1c]">JoSAA 2026 Critical Dates & Schedule</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-2xl font-extrabold text-[#1a1c1c]">Seat Matrix Allocation Ledger</h2></section>}

      <footer className="bg-[#e8e8e8] border-t border-[#e2e2e2] mt-24 py-8 text-xs text-[#4d4732] text-center"><p>© 2026 CollegeAchiver Platforms. All rights reserved.</p></footer>


      {/* 🤖 FLOATING AI CHATBOT SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="bg-[#1a1c1c] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center border-2 border-[#ffd700] animate-bounce">
            <MessageSquare size={24} className="text-[#ffd700]" />
          </button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[400px] bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] flex flex-col overflow-hidden animate-slideUp">
            <div className="bg-[#1a1c1c] text-white p-4 flex justify-between items-center border-b border-[#ffd700]/30">
              <span className="text-xs font-bold">CollegeAchiver Bot v2.0</span>
              <button onClick={() => setIsChatOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-xs ${msg.sender === 'user' ? 'bg-[#1a1c1c] text-white' : 'bg-white text-black border'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white border-t flex items-center gap-2">
              <input type="text" placeholder="Ask AI..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f9f9f9] border rounded-xl px-4 py-2 text-xs outline-none" />
              <button onClick={() => handleSendMessage()} className="p-2 bg-[#ffd700] rounded-xl"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>


      {/* 🔐 PREMIUM BLUR STATE: INTERACTIVE SIGN IN MODAL WINDOW */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          
          {/* Main Form Container Frame */}
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            
            {/* Upper Top Accent Border Grid line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            
            {/* Close Cross Trigger Button */}
            <button 
              onClick={() => { setIsSignInOpen(false); setEmailInput(''); setPasswordInput(''); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header branding info titles */}
            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">Welcome Back Student</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">Sign in to your CollegeAchiver account to access locked rank predictions history lists.</p>
            </div>

            {/* Input Form Fields Box Console */}
            <form onSubmit={handleSignInSubmit} className="px-6 md:px-8 pb-8 space-y-4 text-left">
              
              {/* Field 1: Email Box */}
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Registered Email ID</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input 
                    type="email" 
                    placeholder="e.g. aryan@nit.com" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs focus:ring-1 focus:ring-[#ffd700] focus:outline-none font-medium text-[#1a1c1c]"
                  />
                </div>
              </div>

              {/* Field 2: Password Input */}
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs focus:ring-1 focus:ring-[#ffd700] focus:outline-none"
                  />
                </div>
              </div>

              {/* Remember Pass matrix options */}
              <div className="flex justify-between items-center text-[11px] font-medium text-[#5f5e5e] pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded text-[#ffd700] focus:ring-[#ffd700] h-3.5 w-3.5 bg-zinc-50 border-[#e2e2e2]" />
                  Remember Me
                </label>
                <span className="text-[#705d00] hover:underline cursor-pointer">Forgot Password?</span>
              </div>

              {/* Main Submit CTA Action */}
              <button 
                type="submit" 
                className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-zinc-800 transition-all active:scale-98 mt-2"
              >
                Access My Dashboard 🚀
              </button>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}