'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck } from 'lucide-react';
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

  // 🔐 AUTH MODAL STATES
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // 🎛️ ADMIN PANEL SIDEBAR STATES (Strictly defined matching compiler types)
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

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

  // Auth Form Handler with Secret Admin Gateway Route
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Bhai, saare inputs dhyan se bharo pehle!");
    
    if (isSignUpMode) {
      if (passwordInput !== confirmPasswordInput) return alert("Bhai, dono passwords aapas me match nahi kar rahe hain!");
      alert(`🎉 Account successfully created: ${emailInput}`);
    } else {
      if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
        alert("Welcome Master Control Panel Admin Saheb! 👑");
        setActiveTab('AdminPanel');
        setIsSignInOpen(false);
        setEmailInput(''); setPasswordInput('');
        return;
      }
      alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    }

    setIsSignInOpen(false);
    setIsSignUpMode(false);
    setEmailInput(''); setPasswordInput(''); setConfirmPasswordInput('');
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

  // Admin filter database search logic
  const adminFilteredData = useMemo(() => {
    return massiveJosaaData.filter(item => 
      item.institute.toLowerCase().includes(adminSearch.toLowerCase()) ||
      item.program.toLowerCase().includes(adminSearch.toLowerCase())
    ).slice(0, 5);
  }, [adminSearch]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCutoffData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* PUBLIC NAVBAR */}
      {activeTab !== 'AdminPanel' ? (
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

            <button onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shrink-0 shadow-xs">
              Sign In
            </button>
          </div>
        </nav>
      ) : null}

      {/* 📋 RENDERING SYSTEM VIEWS */}
      
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ JoSAA 2026 Predictor Live</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] leading-[1.15] font-display">Your journey to the <br /><span className="text-[#705d00] italic font-medium">right</span> college starts here.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base max-w-xl leading-relaxed">Navigate the complexities of Indian college admissions with AI-driven rank predictions and personalized counseling roadmaps.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white border border-[#e2e2e2] text-[#1a1c1c] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#eeeeee] transition-all">View Cut-offs</button>
              </div>
            </div>
            <div className="md:col-span-5 relative flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeee] relative max-w-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" alt="CollegeAchiver Studying Student" className="rounded-xl object-cover h-64 w-full" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e2e2] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md w-[85%]">
                  <span className="p-1.5 bg-[#ffd700]/20 text-[#705d00] rounded-lg"><CheckCircle size={16} /></span>
                  <div className="text-left"><div className="text-[10px] font-mono text-[#5f5e5e] uppercase">Current Likelihood</div><div className="text-xs font-extrabold text-black">98.2% Accurate Matrix</div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
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
        </div>
      )}

      {activeTab === 'Counselling Guide' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-8 border-b border-[#e2e2e2] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div><h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display">Counselling Architecture Guide</h2></div>
            <div className="flex gap-2 bg-[#eeeeee] p-1.5 rounded-xl"><button onClick={() => setGuideMode('JoSAA')} className={`px-4 py-2 text-xs font-bold rounded-lg ${guideMode === 'JoSAA' ? 'bg-black text-white' : 'text-[#5f5e5e]'}`}>JoSAA Roadmap</button><button onClick={() => setGuideMode('CSAB')} className={`px-4 py-2 text-xs font-bold rounded-lg ${guideMode === 'CSAB' ? 'bg-[#ffd700] text-black' : 'text-[#5f5e5e]'}`}>CSAB Spot Round</button></div>
          </div>
        </section>
      )}

      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute</th><th className="px-6 py-4">Program</th><th className="px-6 py-4">Quota</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2] text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-[#ffd700]/5"><td className="px-6 py-4 font-semibold text-[#1a1c1c]">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 text-[#5f5e5e] font-mono">{item.quota}</td><td className="px-6 py-4">{item.category}</td><td className="px-6 py-4 font-mono font-bold text-zinc-700">{item.opening}</td><td className="px-6 py-4 font-mono font-bold text-[#705d00]">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12 text-left"><h2 className="text-2xl font-extrabold text-[#1a1c1c]">Cutoff Volatility Analytics</h2></section>}
      {activeTab === 'Deadlines' && <section className="max-w-4xl mx-auto px-6 py-12 text-left"><h2 className="text-3xl font-extrabold text-[#1a1c1c]">JoSAA 2026 Critical Dates Timeline</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12 text-left"><h2 className="text-2xl font-extrabold text-[#1a1c1c]">Seat Matrix Allocation Ledger</h2></section>}


      {/* 👑 HIDDEN ADMIN PANEL COCKPIT - FIXED MEMBERS LOGIC BUG */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          
          {/* Left Vertical Admin Sidebar */}
          <aside className="w-64 bg-[#1a1b1e] border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
                <ShieldCheck size={26} className="text-[#ffd700]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd700] font-mono">Control Desk</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">NATIVE MASTER PANEL</p>
                </div>
              </div>

              {/* Sidebar Tabs Selectors */}
              <div className="flex flex-col gap-1 text-xs font-medium text-zinc-400">
                <button 
                  onClick={() => setAdminView('Overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Overview' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800 hover:text-white'}`}
                >
                  <LayoutDashboard size={16} /> Dashboard Overview
                </button>
                <button 
                  onClick={() => setAdminView('Database')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Database' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800 hover:text-white'}`}
                >
                  <Database size={16} /> Manage Cutoffs Ledger
                </button>
                <button 
                  onClick={() => setAdminView('Users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Users' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800 hover:text-white'}`}
                >
                  <UserCog size={16} /> Student Activity Logs
                </button>
              </div>
            </div>

            <button 
              onClick={() => { setActiveTab('Home'); setAdminSearch(''); }}
              className="w-full bg-zinc-800 hover:bg-red-950 hover:text-white transition-all text-zinc-300 font-bold py-2.5 px-4 rounded-xl text-xs uppercase font-mono text-center"
            >
              🚪 Close Control Panel
            </button>
          </aside>

          {/* Right Area Admin Content Views */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            
            {/* VIEW A: OVERVIEW COUNTERS */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Status Overview</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live tracking query records running cleanly background updates.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Total Database Queries</div>
                    <div className="text-3xl font-black text-[#ffd700] font-mono mt-1">185,420</div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Registered Accounts</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">12,158</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: MANAGE DATABASE CUTOFF rows config */}
            {adminView === 'Database' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white">Cut-off Ledger Rows Dashboard</h2>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search ledger..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="bg-[#1a1b1e] border border-zinc-800 text-xs rounded-xl px-4 py-2.5 w-64 text-zinc-200 outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div className="bg-[#1a1b1e] border border-zinc-800 rounded-2xl overflow-hidden text-xs font-mono">
                  <div className="bg-zinc-900 p-4 grid grid-cols-4 font-bold text-zinc-400 border-b border-zinc-800">
                    <span>Institute Target</span><span>Branch Stream</span><span>Opening Node</span><span>Closing Node</span>
                  </div>
                  {adminFilteredData.map((item, idx) => (
                    <div key={idx} className="p-4 grid grid-cols-4 border-b border-zinc-800/40 items-center hover:bg-zinc-900/20">
                      <span className="text-white font-bold font-sans truncate pr-2">{item.institute}</span>
                      <span className="text-zinc-400 truncate pr-2">{item.program}</span>
                      <span className="text-zinc-400">{item.opening}</span>
                      <span className="text-[#ffd700] font-bold">{item.closing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW C: STUDENT PROFILE LOG RECORDS - FIXED COMPARISON ENUM TYPE BUG */}
            {adminView === 'Users' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Student Account Registry Logs</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Audit log parameters records tracked perfectly.</p>
                </div>
                <div className="border border-zinc-800 bg-[#1a1b1e] rounded-2xl overflow-hidden text-xs font-mono">
                  <div className="bg-zinc-900 p-4 grid grid-cols-4 font-bold text-zinc-400 border-b border-zinc-800">
                    <span>Profile Identity Identifier</span><span>Verification Token</span><span>Inquiries Count</span><span>Status Status</span>
                  </div>
                  <div className="p-4 grid grid-cols-4 font-sans text-zinc-300">
                    <span className="font-bold text-white font-mono">student.test@achiver.in</span><span>OTP_EMAIL_OK</span><span className="font-mono text-[#ffd700] font-bold pl-4">12 Calls</span><span className="text-emerald-500 font-bold">● ACTIVE SYNC</span>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      )}


      {/* FLOATING AI CHATBOT SYSTEM */}
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


      {/* DUAL-STATE AUTH MODAL COMPONENT */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            <button onClick={() => { setIsSignInOpen(false); setIsSignUpMode(false); setEmailInput(''); setPasswordInput(''); setConfirmPasswordInput(''); }} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><X size={20} /></button>

            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">{isSignUpMode ? 'Create New Account' : 'Welcome Back Student'}</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">
                {isSignUpMode ? 'Sign up to lock your personalized choice filling order.' : 'Sign in to access your locked rank predictions history lists.'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="px-6 md:px-8 pb-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Email ID Address</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input type="email" placeholder="e.g. aryan@nit.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required />
                </div>
              </div>

              {isSignUpMode && (
                <div className="animate-slideDown">
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Confirm Password</label>
                  <div className="relative"><Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="password" placeholder="••••••••" value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required={isSignUpMode} /></div>
                </div>
              )}

              <button type="submit" className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase shadow-md hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-2">
                {isSignUpMode ? <>Create My Account <UserPlus size={14}/></> : <>Access My Dashboard 🚀</>}
              </button>
            </form>

            <div className="bg-[#f3f3f3] px-6 py-4 border-t text-center text-xs text-[#5f5e5e]">
              {isSignUpMode ? <p>Already have an account? <button onClick={() => { setIsSignUpMode(false); setPasswordInput(''); }} className="text-[#705d00] font-bold hover:underline">Sign In Here</button></p> : <p>Don't have an account? <button onClick={() => { setIsSignUpMode(true); setPasswordInput(''); }} className="text-[#705d00] font-bold hover:underline">Sign Up / Register Here</button></p>}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}