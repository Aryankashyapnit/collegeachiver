'use client';
import { useState, useRef, useMemo } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle } from 'lucide-react';
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
  const [hasSearched, setHasSearched] = useState(false);

  // 🏛️ MASTER DYNAMIC MEMORY LAYER STATE
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  // Deadlines Dynamic Array Storage
  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students apni choices online fill karna shuru kar sakte hain. Predictor order sequence isi dauran lock hoga.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  // Counselling Roadmap Copywriting State Overrides
  const [josaaGuideText, setJosaaGuideText] = useState('JEE Main/Advanced ranks ke basis par registration karke maximum choice options descending configuration order me lock karo.');
  const [csabGuideText, setCsabGuideText] = useState('JoSAA ke 5/6 rounds over hone ke baad NITs, IIITs, aur GFTIs me jo bachi hui khali seats hoti hain, unka chart release kiya jata hai.');

  // Opening/Closing Ranks public table filters
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Inner Counselling Guide sub-tabs mode switch
  const [guideMode, setGuideMode] = useState<'JoSAA' | 'CSAB'>('JoSAA');

  // 🤖 AI CONVERSATIONAL CHATBOT PROMPT STATES
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // 🔐 AUTH SYSTEMS GATEWAY MODALS
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // 🎛️ CONTROL PANEL SIDEBAR VIEWS PROTOCOLS
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Admin New Cutoff Form Field Injections (With fully safe type properties)
  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000'); // Default base structure added

  // Admin Deadlines form step parameters
  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  const predictorRef = useRef<HTMLDivElement>(null);

  // Predictor Calculation Core Process Flow
  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");

    setHasSearched(true);
    const userRank = parseInt(rank);

    const filtered = dynamicJosaaRecords.filter(col => {
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

  // Chatbot Send Message Streams
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;

    const userMsg = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let botText = "Bhai, ye bohot badhiya sawal hai! Counselling matrix rules ke mutabik aapko safe strategy rakhni chahiye. Aap humare 'Predictor' tab me apni rank daal kar top options directly check kar sakte hain! 🔥";
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('rank')) botText = "Bhai, rank details dalo, predictor systems dynamic matrix output load kar denge.";
      setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
    }, 800);
  };

  // Auth Gate Controller with Master Entry Credentials
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Bhai, saare inputs dhyan se bharo pehle!");
    
    if (isSignUpMode) {
      if (passwordInput !== confirmPasswordInput) return alert("Bhai, passwords match nahi ho rahe!");
      alert(`🎉 Account created successfully: ${emailInput}`);
    } else {
      if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
        alert("Welcome Master Control Panel Admin Saheb! 👑 Layout shifting triggered.");
        setActiveTab('AdminPanel');
        setIsSignInOpen(false);
        setEmailInput(''); setPasswordInput('');
        return;
      }
      alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    }
    setIsSignInOpen(false);
    setIsSignUpMode(false);
  };

  // ⚙️ FIXED ADMIN CORE ACTION: Appends full type properties mapping including explicit 'fee' attribute
  const handleAddCutoffRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Bhai, saare parameters fill kijiye!");

    // Constructing object explicitly tracking the interface's fee constraint rule configuration
    const newRow: CollegeData = {
      id: dynamicJosaaRecords.length + 1,
      institute: newInst,
      program: newProg,
      quota: newQuota,
      category: newCat,
      gender: newGend,
      opening: parseInt(newOpenRank),
      closing: parseInt(newCloseRank),
      placement: "15.6 LPA",
      nirf: 45,
      fee: newFee.trim() ? `${newFee} / Year` : "2,10,000 / Year" // 🛡️ Safely patched 'fee' type variable bug
    };

    setDynamicJosaaRecords(prev => [newRow, ...prev]);
    alert("🔥 Mubarak ho! Naya Predictor Custom Cutoff Record 'fee' property ke sath successfully compile ho gaya.");
    
    // Clear form inputs buffers
    setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank(''); setNewFee('2,25,000');
  };

  // Admin Action: Append date action steps array to deadlines view
  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadDate || !newDeadTitle || !newDeadDesc) return alert("Bhai, pure forms columns fill karein!");

    const newEvent = {
      id: dynamicDeadlines.length + 1,
      date: newDeadDate,
      title: newDeadTitle,
      desc: newDeadDesc,
      status: newDeadStat
    };

    setDynamicDeadlines(prev => [...prev, newEvent]);
    alert("⏰ Success! Pushed timeline event to deadlines tracking panel smoothly.");
    setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
  };

  // Public filtering computations logic over matrix
  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
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
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  // Admin database lookups filter
  const adminFilteredData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => 
      item.institute.toLowerCase().includes(adminSearch.toLowerCase()) ||
      item.program.toLowerCase().includes(adminSearch.toLowerCase())
    ).slice(0, 5);
  }, [adminSearch, dynamicJosaaRecords]);

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
            
            {/* Mascot Vector Cap Emblem Branding Logo */}
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12L15 32L50 52L85 32L50 12Z" fill="#FFD700" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M25 45V68C25 78 36 85 50 85C64 85 75 78 75 68V45" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M40 70L50 42L60 70" stroke="#1A1C1C" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M43 60H57" stroke="#1A1C1C" strokeWidth="6" strokeLinecap="round"/>
              </svg>
              <div className="text-xl tracking-tight font-display text-[#1a1c1c]">College<span className="font-extrabold text-[#705d00]">Achiver</span></div>
            </div>
            
            {/* PUBLIC NAVIGATION PANEL BUTTONS ARRAY */}
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold text-[#5f5e5e]">
              {['Home', 'Predictor', 'Counselling Guide', 'Opening/Closing Ranks', 'Analysis', 'Deadlines', 'Seat Matrix'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }} 
                  className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${activeTab === tab ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-xs' : 'hover:text-[#705d00] hover:bg-[#eeeeee]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shadow-xs shrink-0">Sign In</button>
          </div>
        </nav>
      ) : null}

      {/* 📋 PUBLIC VIEWS MANAGER VIEWPORT CHUNKS */}
      
      {/* 🏠 TAB VIEW: HOME */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ JoSAA Real-time Engine Loaded</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] font-display leading-[1.15]">Your journey to the <br /><span className="text-[#705d00] italic font-medium">right</span> college starts here.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Calculate exact custom predictor allocations dynamically verified against historical database layers grids.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white border border-[#e2e2e2] text-[#1a1c1c] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#eeeeee] transition-all">View Cut-offs</button>
              </div>
            </div>
            <div className="md:col-span-5 relative flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeee] relative max-w-sm">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" alt="CollegeAchiver Studying Student" className="rounded-xl object-cover h-64 w-full" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e2e2] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md w-[85%]">
                  <span className="p-1.5 bg-[#ffd700]/20 text-[#705d00] rounded-lg"><CheckCircle size={16} /></span>
                  <div className="text-left"><div className="text-[10px] font-mono text-[#5f5e5e] uppercase">Current Likelihood</div><div className="text-xs font-extrabold text-black">98.2% Accurate Matrix</div></div>
                </div>
              </div>
            </div>
          </section>

          {/* 3-Grid metrics summary */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">{dynamicJosaaRecords.length}+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Live Database Rows Indexed</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">500+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Indexed & Verified</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy Index Threshold</p></div>
          </section>
        </div>
      )}

      {/* 🧭 VIEW TAB: PREDICTOR INTERFACE TOOL */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
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
                <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase hover:opacity-90 tracking-wider shadow-sm transition-all">Calculate Real Predictions 🚀</button>
              </form>
            </div>
          </section>

          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20">
            {hasSearched && results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS GRID ({results.length} Matches)</h3>
                {results.map(college => (
                  <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm accent-border card-hover transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div><h4 className="font-bold text-[#1a1c1c] text-base">{college.institute}</h4><p className="text-xs text-[#5f5e5e] mt-1">{college.program}</p></div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border rounded-full uppercase">{college.chance} Allotment</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t text-xs text-[#5f5e5e]">
                      <span>Closing Cutoff: <strong>{college.closing}</strong></span>
                      <span>Annual Fee: <strong className="text-black">{college.fee || "2,20,000 / Year"}</strong></span>
                      <span>NIRF Rank: <strong>{college.nirf}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* 🧭 VIEW TAB: COUNSELLING ROADMAP ADVISOR */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-8 border-b border-[#e2e2e2] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Master Admission Roadmap</span>
              <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">Counselling Architecture Guide</h2>
            </div>
            <div className="flex gap-2 bg-[#eeeeee] p-1.5 rounded-xl shadow-inner">
              <button onClick={() => setGuideMode('JoSAA')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'JoSAA' ? 'bg-black text-white shadow-xs' : 'text-[#5f5e5e]'}`}>JoSAA Roadmap</button>
              <button onClick={() => setGuideMode('CSAB')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${guideMode === 'CSAB' ? 'bg-[#ffd700] text-black shadow-xs' : 'text-[#5f5e5e]'}`}>CSAB Spot Round</button>
            </div>
          </div>
          <div className="bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-xs">
            <p className="text-sm text-[#5f5e5e] leading-relaxed p-4 bg-zinc-50 border rounded-xl font-medium">
              {guideMode === 'JoSAA' ? josaaGuideText : csabGuideText}
            </p>
          </div>
        </section>
      )}

      {/* 🏛️ VIEW TAB: OPENING AND CLOSING DATA LOOKUP LEDGERS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-fadeIn text-left">
          <div className="bg-white rounded-xl p-6 mb-8 border border-[#e2e2e2] grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Institute Category Type</label>
              <div className="flex flex-wrap gap-2">
                {['IIT', 'NIT', 'IIIT'].map((type) => (
                  <button key={type} onClick={() => { setSelectedType(type); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedType === type ? 'bg-[#ffd700] text-[#221b00] border-[#ffd700]' : 'bg-white border-[#e2e2e2] text-[#5f5e5e]'}`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Round Sequence</label><select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm font-medium"><option>Round 1</option><option>Round 2</option></select></div>
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Quick Search Filter</label><input type="text" placeholder="Search college name or branch stream..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-2.5 text-sm outline-none" /></div>
            <div className="flex flex-col gap-2"><label className="text-xs font-bold text-[#4d4732] uppercase tracking-wider">Year Matrix</label><select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg p-3 text-sm font-medium"><option>2023</option><option>2022</option></select></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs font-bold uppercase"><th className="px-6 py-4">Institute Participating Entity</th><th className="px-6 py-4">Specialization Program Course</th><th className="px-6 py-4">Quota ID</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2] text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-[#ffd700]/5">
                    <td className="px-6 py-4 font-semibold text-[#1a1c1c]">{item.institute}</td>
                    <td className="px-6 py-4 text-[#5f5e5e] text-xs">{item.program}</td>
                    <td className="px-6 py-4 text-[#5f5e5e] font-mono text-xs">{item.quota}</td>
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

      {/* ⏰ VIEW TAB: TIME SEQUENCES DEADLINES CALENDAR STEPS */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Live Time Matrix</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">JoSAA Critical Deadlines Calendar</h2>
          </div>
          <div className="relative border-l-2 border-[#ffd700] ml-4 pl-8 space-y-8 text-xs text-[#5f5e5e]">
            {dynamicDeadlines.map((dl) => (
              <div key={dl.id} className="relative group">
                <div className="absolute -left-[41px] top-0.5 bg-white border-4 border-black h-4 w-4 rounded-full group-hover:border-[#ffd700] transition-colors"></div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#705d00] bg-[#ffd700]/10 px-2 py-0.5 rounded">{dl.date}</span>
                  <h4 className="text-sm font-bold text-black font-display mt-1">{dl.title}</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed max-w-2xl">{dl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ANALYSIS AND EXTRA SEAT TRACKS COMPONENTS */}
      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-2xl font-extrabold text-[#1a1c1c] font-display border-b pb-2">Cutoff Volatility Analytics Dashboard</h2></section>}
      {activeTab === 'Seat Matrix' && <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-2xl font-extrabold text-[#1a1c1c] font-display border-b pb-2">Seat Allocation Matrix Logs Ledger</h2></section>}


      {/* 👑 ⚙️ 🌟 TOP SECRET SYSTEM GATEWAY DESK PANEL (ONLY TRIGGERS FOR THE SECRET AUTH CREDENTIALS LOGINS) */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          
          {/* Left Controls Sidebar Section */}
          <aside className="w-64 bg-[#1a1b1e] border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
                <ShieldCheck size={26} className="text-[#ffd700]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd700] font-mono">Control Desk</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">MASTER DATA ENGINE V4.2</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium text-zinc-400">
                <button onClick={() => setAdminView('Overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Overview' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><LayoutDashboard size={16} /> Dashboard Overview</button>
                <button onClick={() => setAdminView('Database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Database' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><Database size={16} /> Data Entry Workspace</button>
                <button onClick={() => setAdminView('Users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Users' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><UserCog size={16} /> Text & Guide Overrides</button>
              </div>
            </div>
            <button onClick={() => setActiveTab('Home')} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md"> Exit Control Desk</button>
          </aside>

          {/* Right Core viewport panel windows workspace */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            
            {/* VIEW SUB-SET NODE 1: OVERVIEW METRICS STATUS */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Synchronization Desk</h2>
                  <p className="text-xs text-zinc-400 mt-1">Manage core layout layers across all IIT, NIT, IIIT, and GFTI system properties smoothly.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Predictor Engine Array Rows</div>
                    <div className="text-3xl font-black text-[#ffd700] font-mono mt-1">{dynamicJosaaRecords.length} Nodes</div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Configured Calendar Steps</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{dynamicDeadlines.length} Actions</div>
                  </div>
                </div>
              </div>
            )}

            {/* 🚀 VIEW SUB-SET NODE 2: FULL DATA ENTRY FORM (INJECTS RECORDS SECURELY COMPILING OVER DYNAMIC MATRIX) */}
            {adminView === 'Database' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#ffd700]"/> Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Institute Entity Legal Name</label>
                      <input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Academic Program Specialty / Course Branch</label>
                      <input type="text" placeholder="e.g. Electronics and Communication Engineering (4 Years, B.Tech)" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Quota Pool Allocation</label>
                      <select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none">
                        <option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option><option value="AI">All India (AI)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Reservation Category Pool</label>
                      <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none">
                        <option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Opening Rank cut-off point</label>
                      <input type="number" placeholder="e.g. 5000" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Closing Rank cut-off point</label>
                      <input type="number" placeholder="e.g. 12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    
                    {/* 🛡️ FIXED INPUT ELEMENT PACKING: Explicitly mapping 'fee' parameter row block */}
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Annual Fee Structure Token (Interface Requirement)</label>
                      <input type="text" placeholder="e.g. 2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 active:scale-98 transition-all shadow-md mt-2">
                      Inject Row Into Dynamic Predictor Memory Matrix Grid 🚀
                    </button>
                  </form>
                </div>

                {/* Previews database content entries */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center"><h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Live Memory Database Buffer (Top Records)</h4><input type="text" placeholder="Filter listing..." value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="bg-[#1a1b1e] border border-zinc-800 rounded-xl px-3 py-1.5 text-[11px] outline-none w-48 focus:border-[#ffd700]" /></div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 rounded-xl text-xs font-mono divide-y divide-zinc-800/50">
                    {adminFilteredData.map((item) => (
                      <div key={item.id} className="p-3.5 flex justify-between items-center hover:bg-zinc-900/20">
                        <div className="truncate pr-4"><span className="text-white font-bold">{item.institute}</span> — <span className="text-zinc-400">{item.program}</span></div>
                        <div className="shrink-0 font-bold text-zinc-400 text-[11px]">Fee: <span className="text-[#ffd700]">{item.fee || "2,20,000 / Year"}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW SUB-SET NODE 3: OVERRIDES TEXT COPIES AND CALENDAR EVENTS */}
            {adminView === 'Users' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4"><Layers size={18} className="text-[#ffd700] inline-block mr-2"/> Text Guide Overrides Copy Form</h3>
                  <div className="space-y-4 text-xs text-left">
                    <div><label className="block text-zinc-400 mb-1">JoSAA Roadmap description instructions block text</label><textarea rows={2} value={josaaGuideText} onChange={(e) => setJosaaGuideText(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" /></div>
                    <div><label className="block text-zinc-400 mb-1">CSAB Spot Round guide steps copy blocks</label><textarea rows={2} value={csabGuideText} onChange={(e) => setCsabGuideText(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" /></div>
                  </div>
                </div>

                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4"><Calendar size={18} className="text-[#ffd700] inline-block mr-2"/> Push New Action Deadline Event Timeline</h3>
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div><label className="block text-zinc-400 mb-1">Date Stamp</label><input type="text" placeholder="e.g. June 28, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Status Chip Configuration</label><select value={newDeadStat} onChange={(newDeadStat => setNewDeadStat(newDeadStat.target.value))} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>Upcoming</option><option>Live Soon</option><option>Strict Warning</option></select></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event Header Title</label><input type="text" placeholder="e.g. Round 1 Allocation Final List" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event Explainer Description Detail</label><textarea rows={2} placeholder="Type description entries text block..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl font-mono text-xs hover:opacity-90 transition-all mt-2">Commit Event Step to Deadlines Timeline Calendar 🚀</button>
                  </form>
                </div>
              </div>
            )}

          </section>
        </div>
      )}


      {/* 🤖 FLOATING AI CHATBOT SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="bg-[#1a1c1c] text-white p-4 rounded-full shadow-2xl border-2 border-[#ffd700] animate-bounce"><MessageSquare size={24} className="text-[#ffd700]" /></button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[400px] bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] flex flex-col overflow-hidden animate-slideUp">
            <div className="bg-[#1a1c1c] text-white p-4 flex justify-between items-center border-b border-[#ffd700]/30"><span className="text-xs font-bold">CollegeAchiver Bot v2.0</span><button onClick={() => setIsChatOpen(false)}><X size={18} /></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-xl p-3 text-xs ${msg.sender === 'user' ? 'bg-[#1a1c1c] text-white' : 'bg-white text-black border'}`}>{msg.text}</div></div>
              ))}
            </div>
            <div className="p-3 bg-white border-t flex items-center gap-2">
              <input type="text" placeholder="Ask AI..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f9f9f9] border rounded-xl px-4 py-2 text-xs outline-none" />
              <button onClick={() => handleSendMessage()} className="p-2 bg-[#ffd700] rounded-xl"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>


      {/* AUTH CONTROLS MODAL CONTAINER PANEL */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            <button onClick={() => { setIsSignInOpen(false); setIsSignUpMode(false); }} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><X size={20} /></button>

            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">{isSignUpMode ? 'Create New Account' : 'Welcome Back Student'}</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">Sign in using system administration credential tokens.</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="px-6 md:px-8 pb-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Email ID Address</label>
                <div className="relative"><User size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label>
                <div className="relative"><Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="password" placeholder="e.g. admin123" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required /></div>
              </div>
              {isSignUpMode && (
                <div className="animate-slideDown"><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Confirm Password Token</label><div className="relative"><Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="password" placeholder="••••••••" value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-xl text-xs outline-none" required={isSignUpMode} /></div></div>
              )}
              <button type="submit" className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase shadow-md hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-2">
                {isSignUpMode ? <>Create My Account <UserPlus size={14}/></> : <>Access My Dashboard 🚀</>}
              </button>
            </form>

            <div className="bg-[#f3f3f3] px-6 py-4 border-t text-center text-xs text-[#5f5e5e]">
              {isSignUpMode ? <p>Already have an account? <button onClick={() => setIsSignUpMode(false)} className="text-[#705d00] font-bold hover:underline">Sign In Here</button></p> : <p>Don't have an account? <button onClick={() => setIsSignUpMode(true)} className="text-[#705d00] font-bold hover:underline">Sign Up / Register Here</button></p>}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}