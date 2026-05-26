'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
}

interface StudentLog {
  email: string;
  tokenType: string;
  queriesCount: number;
  status: string;
  timestamp: string;
}

// Seat Matrix Structure Interface
interface SeatMatrixRecord {
  id: number;
  institute: string;
  program: string;
  quota: string;
  seats: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home'); 
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [hasSearched, setHasSearched] = useState(false);

  // 🏛️ MASTER EDITABLE SYSTEM DATABASE ARRAYS (Admin Panel Sync Protocols)
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  // Dynamic Seat Matrix Allocation Ledger Array (Editable from Admin Panel)
  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  // Dynamic Deadlines Timeline Storage Array (Editable from Admin Panel)
  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students apni choices online fill karna shuru kar sakte hain. Predictor order sequence isi dauran lock hoga.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  // Dynamic Counselling Advisor Core Text Manuals (Editable from Admin Panel)
  const [josaaGuideText, setJosaaGuideText] = useState('JEE Main/Advanced ranks ke basis par registration karke maximum choice options descending configuration order me lock karo. Allotment rounds active hote hi Freeze, Float, ya Slide protocols execute karo.');
  const [csabGuideText, setCsabGuideText] = useState('JoSAA ke 5/6 rounds over hone ke baad NITs, IIITs, aur GFTIs me jo bachi hui khali seats hoti hain, unka chart release kiya jata hai. CSAB me dobara se naye choices fill karke security deposit bharna hota hai.');

  // 📈 LIVE TRACKING TELEMETRY SYSTEMS
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'OFFLINE', timestamp: '10:15 AM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' }
  ]);

  // Public Search Filter States
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Counselling Guide toggle state mode switcher
  const [guideMode, setGuideMode] = useState<'JoSAA' | 'CSAB'>('JoSAA');

  // 🤖 FLOATING CHATBOT WIDGET SYSTEMS
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // 🔐 SECURE SIGN IN/SIGN UP STATES
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // 🎛️ COCKPIT CONTROL DESK ACTIVE STATE
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // 📝 ADMIN INPUT FIELDS: Core Cut-off Row
  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000'); 

  // 📝 ADMIN INPUT FIELDS: Step Deadline
  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  // 📝 ADMIN INPUT FIELDS: Seat Matrix Entry Row Block
  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  const predictorRef = useRef<HTMLDivElement>(null);

  // Trigger telemetry visits counter on mount phase
  useEffect(() => {
    setTotalVisits(prev => prev + 1);
  }, []);

  // Public Predictor Formula Execution
  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");

    setHasSearched(true);
    const userRank = parseInt(rank);
    setTotalVisits(prev => prev + 2); // Log search analytic

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

  // Conversational Chatbot Input Handler Streams
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;

    const userMsg = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let botText = "Bhai, ye bohot badhiya sawal hai! Counselling matrix rules ke mutabik aapko safe strategy rakhni chahiye. Aap humare 'Predictor' tab me apni rank daal kar check kar sakte hain! 🔥";
      setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
    }, 800);
  };

  // Auth Submit Flow with Dynamic Logs Tracking Parser Node
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Bhai, saare credentials fields bhariye!");
    
    if (isSignUpMode) {
      if (passwordInput !== confirmPasswordInput) return alert("Passwords split mismatch error!");
      const newStudentLog: StudentLog = {
        email: emailInput,
        tokenType: 'REGISTERED_NEW_OK',
        queriesCount: 0,
        status: 'ONLINE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setStudentSessions(prev => [newStudentLog, ...prev]);
      alert(`🎉 Account created successfully: ${emailInput}`);
    } else {
      if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
        alert("Welcome Master Control Panel Admin Saheb! 👑 Controls sync.");
        setActiveTab('AdminPanel');
        setIsSignInOpen(false);
        setEmailInput(''); setPasswordInput('');
        return;
      }
      const loggedStudentLog: StudentLog = {
        email: emailInput,
        tokenType: 'OTP_EMAIL_OK',
        queriesCount: Math.floor(Math.random() * 4) + 1,
        status: 'ONLINE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setStudentSessions(prev => [loggedStudentLog, ...prev]);
      alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    }
    setIsSignInOpen(false);
    setIsSignUpMode(false);
    setEmailInput(''); setPasswordInput(''); setConfirmPasswordInput('');
  };

  // ⚙️ ADMISSIONS CORE ADMIN CONTROL INJECTIONS PIPELINES
  
  // Form Action 1: Inject New Predictor & Cut-off record row
  const handleAddCutoffRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Bhai, form fill kijiye!");

    const newRow: CollegeData = {
      id: dynamicJosaaRecords.length + 1,
      institute: newInst,
      program: newProg,
      quota: newQuota,
      category: newCat,
      gender: newGend,
      opening: parseInt(newOpenRank),
      closing: parseInt(newCloseRank),
      placement: "16.4 LPA",
      nirf: 42,
      fee: `${newFee} / Year`
    };

    setDynamicJosaaRecords(prev => [newRow, ...prev]);
    alert("🔥 Mubarak ho! Naya Cutoff Data Row Predictor Database array me live inject ho gaya.");
    setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
  };

  // Form Action 2: Inject New Calendar Date Timestamp step
  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadDate || !newDeadTitle || !newDeadDesc) return alert("Bhai, deadlines columns fill karein!");

    const newEvent = {
      id: dynamicDeadlines.length + 1,
      date: newDeadDate,
      title: newDeadTitle,
      desc: newDeadDesc,
      status: newDeadStat
    };

    setDynamicDeadlines(prev => [...prev, newEvent]);
    alert("⏰ Success! Timeline deadline step sequence calendar me push ho gayi.");
    setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
  };

  // Form Action 3: Inject New Dynamic Seat Matrix Allocation Ledger Capacity Row
  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatInst || !newSeatProg || !newSeatCap) return alert("Bhai, seat matrix ke saare fields bhariye!");

    const newSeatRow: SeatMatrixRecord = {
      id: dynamicSeats.length + 1,
      institute: newSeatInst,
      program: newSeatProg,
      quota: newSeatQuota,
      seats: parseInt(newSeatCap)
    };

    setDynamicSeats(prev => [...prev, newSeatRow]);
    alert("🏛️ Seat Matrix Grid Sync Complete! Nayi branch capacity seats successfully ledger me append ho gayi.");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };


  // Public Lookup matrices filtrations data computations
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

  const adminFilteredData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => 
      item.institute.toLowerCase().includes(adminSearch.toLowerCase()) ||
      item.program.toLowerCase().includes(adminSearch.toLowerCase())
    ).slice(0, 3);
  }, [adminSearch, dynamicJosaaRecords]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCutoffData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* PUBLIC HEAD NAVBAR */}
      {activeTab !== 'AdminPanel' ? (
        <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Mascot Vector Logo */}
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12L15 32L50 52L85 32L50 12Z" fill="#FFD700" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M25 45V68C25 78 36 85 50 85C64 85 75 78 75 68V45" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M40 70L50 42L60 70" stroke="#1A1C1C" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M43 60H57" stroke="#1A1C1C" strokeWidth="6" strokeLinecap="round"/>
              </svg>
              <div className="text-xl tracking-tight font-display text-[#1a1c1c]">College<span className="font-extrabold text-[#705d00]">Achiver</span></div>
            </div>
            
            {/* PORTAL LINKS TABS SELECTION NODES */}
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold text-[#5f5e5e]">
              {['Home', 'Predictor', 'Counselling Guide', 'Opening/Closing Ranks', 'Analysis', 'Deadlines', 'Seat Matrix'].map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${activeTab === tab ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-xs' : 'hover:text-[#705d00] hover:bg-[#eeeeee]'}`}>{tab}</button>
              ))}
            </div>

            <button onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs hover:opacity-90 transition-all shadow-xs shrink-0">Sign In</button>
          </div>
        </nav>
      ) : null}

      {/* 📋 RENDERING SECTIONS ACCORDING TO USER STATE */}
      
      {/* 🏠 VIEW TAB 1: HOME LANDING COCKPIT */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ JoSAA AI Predictor Engine Loaded</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] font-display leading-[1.15]">Your journey to the <br /><span className="text-[#705d00] italic font-medium">right</span> college starts here.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Calculate precise custom predictor allocations matching multi-year parameters data density matrix seamlessly.</p>
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

          {/* Core system analytics summaries cards */}
          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">{dynamicJosaaRecords.length}+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Live Database Rows Indexed</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#1a1c1c]">113+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Verified In Database</p></div>
            <div className="bg-white border border-[#e2e2e2] p-6 rounded-xl text-center shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy Index Rating Score</p></div>
          </section>
        </div>
      )}

      {/* 🚀 VIEW TAB 2: PREDICTOR CALCULATOR INTERFACE */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
          <section className="bg-white border-b border-[#e8e8e8] py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
              <h3 className="font-bold text-lg text-[#1a1c1c] mb-4">Rank Prediction Dashboard</h3>
              <form onSubmit={handlePredict} className="space-y-4">
                <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Enter JEE Rank (CRL / Category)</label><input type="number" placeholder="e.g. 15000" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-sm focus:ring-2 focus:ring-[#ffd700] focus:outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option></select></div>
                  <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Gender</label><select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option>Gender-Neutral</option><option>Female-Only</option></select></div>
                </div>
                <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Quota Allocation Filter</label><select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg text-xs font-medium"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select></div>
                <button type="submit" className="w-full bg-[#ffd700] text-[#221b00] font-bold py-3.5 rounded-lg text-xs uppercase hover:opacity-90 transition-all shadow-sm">Calculate Real Predictions 🚀</button>
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
                      <span>Annual Fee structure: <strong className="text-black">{college.fee || "2,20,000 / Year"}</strong></span>
                      <span>NIRF Rank: <strong>{college.nirf}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* 🧭 VIEW TAB 3: COUNSELLING STRUCTURAL ROADMAP GUIDE */}
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
            <h3 className="text-base font-bold text-[#1a1c1c] mb-3 flex items-center gap-2"><BookOpen size={18} className="text-[#705d00]"/> {guideMode} Instructions Flow Strategy</h3>
            <p className="text-sm text-[#5f5e5e] leading-relaxed p-4 bg-zinc-50 border rounded-xl font-medium whitespace-pre-wrap">
              {guideMode === 'JoSAA' ? josaaGuideText : csabGuideText}
            </p>
          </div>
        </section>
      )}

      {/* ⏰ VIEW TAB 4: CRITICAL DEADLINES EVENT TIMELINE SEQUENCE */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-10 border-b border-[#e2e2e2] pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Live Timeline Steps</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display mt-2 tracking-tight">JoSAA Critical Deadlines Calendar</h2>
          </div>
          <div className="relative border-l-2 border-[#ffd700] ml-4 pl-8 space-y-8 text-xs text-[#5f5e5e]">
            {dynamicDeadlines.map((dl) => (
              <div key={dl.id} className="relative group">
                <div className="absolute -left-[41px] top-0.5 bg-white border-4 border-black h-4 w-4 rounded-full group-hover:border-[#ffd700] transition-colors"></div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#705d00] bg-[#ffd700]/10 px-2 py-0.5 rounded flex items-center gap-1 w-max"><Calendar size={12}/> {dl.date}</span>
                  <h4 className="text-sm font-bold text-black font-display mt-1">{dl.title}</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed max-w-2xl">{dl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🏛️ VIEW TAB 5: PUBLIC SEAT MATRIX LOOKUP LEDGER (Connected to Admin dynamic list) */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <div className="mb-6 border-b pb-4">
            <span className="text-xs font-bold text-[#705d00] bg-[#ffd700]/20 px-2.5 py-1 rounded-full uppercase font-mono">Capacity Ledger Maps</span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c] font-display tracking-tight mt-1">Seat Matrix Allocation Ledger</h2>
            <p className="text-xs text-[#5f5e5e] font-mono mt-1">Official absolute seat structural distribution index matrix for engineering campuses.</p>
          </div>
          
          <div className="border border-[#e2e2e2] rounded-xl overflow-hidden bg-white text-xs font-mono shadow-sm">
            <div className="bg-[#2f3131] text-white p-4 grid grid-cols-4 font-bold uppercase text-[10px] tracking-wider">
              <span>Institute Node</span><span>Branch Program Specialization</span><span>Quota Pool ID</span><span>Seat Cap Capacity</span>
            </div>
            <div className="divide-y divide-zinc-100 text-[#1a1c1c]">
              {dynamicSeats.map((seat) => (
                <div key={seat.id} className="p-4 grid grid-cols-4 items-center hover:bg-zinc-50 transition-colors">
                  <span className="font-sans font-bold text-sm text-[#1a1c1c] truncate pr-2">{seat.institute}</span>
                  <span className="text-zinc-500 font-sans text-xs truncate pr-2">{seat.program}</span>
                  <span className="text-zinc-500 text-xs font-mono">{seat.quota}</span>
                  <span className="font-bold text-base text-zinc-700 pl-4">{seat.seats} Seats</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PUBLIC TABS PASSTHROUGH LOGIC CONSTANTS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 animate-fadeIn text-left">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e2e2e2]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute Entity</th><th className="px-6 py-4">Specialization Course</th><th className="px-6 py-4">Quota ID</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2] text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#ffd700]/5"><td className="px-6 py-4 font-semibold">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 font-mono">{item.quota}</td><td className="px-6 py-4">{item.category}</td><td className="px-6 py-4 font-mono font-bold text-zinc-700">{item.opening}</td><td className="px-6 py-4 font-mono font-bold text-[#705d00]">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {activeTab === 'Analysis' && <section className="max-w-6xl mx-auto px-6 py-12 text-left animate-fadeIn"><h2 className="text-2xl font-extrabold font-display border-b pb-2">Cutoff Volatility Analytics Dashboard</h2></section>}


      {/* 👑 ⚙️ 🌟 TOP SECRET ACCESS: RESTORED ABSOLUTE DATA INJECTION COCKPIT DASHBOARD DESK PANEL */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          
          {/* Side navigation admin panels toggles */}
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
            <button onClick={() => setActiveTab('Home')} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md">🚪 Exit Control Desk</button>
          </aside>

          {/* Core admin panels switch workspaces viewport views maps */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            
            {/* VIEW 1: OVERVIEW METRICS HITS SCANS DETECTOR LOGS */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Synchronization Desk</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live tracking telemetry counters scanning real-time active student sessions actions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Visitor Widget */}
                  <div className="bg-[#1a1b1e] border-2 border-[#ffd700]/40 p-6 rounded-2xl relative shadow-lg">
                    <div className="absolute top-0 right-0 bg-[#ffd700]/10 p-4 text-[#ffd700] rounded-bl-2xl"><Eye size={18}/></div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Total Website Live Visits</div>
                    <div className="text-4xl font-black text-[#ffd700] font-mono mt-1 animate-pulse">{totalVisits} <span className="text-xs font-normal text-zinc-500">Hits</span></div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Database Predictor Rows</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{dynamicJosaaRecords.length} Nodes</div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Configured Seat Matrix Options</div>
                    <div className="text-3xl font-black text-purple-400 font-mono mt-1">{dynamicSeats.length} Rows</div>
                  </div>
                </div>
              </div>
            )}

            {/* 🚀 VIEW 2: DYNAMIC DATA ENTRY WORKSPACE ZONE - RESTORED BOTH FORMS PERFECTLY */}
            {adminView === 'Database' && (
              <div className="space-y-12 animate-fadeIn">
                
                {/* 📝 FORM A: INJECT NEW CUTOFF & PREDICTOR ROW RECORD */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#ffd700]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Institute Legal Entity Full Name</label><input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Academic Program specialty course stream</label><input type="text" placeholder="e.g. Electronics and Communication Engineering (4 Years, B.Tech)" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Quota Pool ID</label><select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option><option value="AI">All India (AI)</option></select></div>
                    <div><label className="block text-zinc-400 mb-1">Reservation Category Pool</label><select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option></select></div>
                    <div><label className="block text-zinc-400 mb-1">JEE Opening Rank cut-off</label><input type="number" placeholder="5000" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">JEE Closing Rank cut-off</label><input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Annual Fee token parameter variable assignment</label><input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 mt-2 transition-all">Compile Cut-off Row Into Database Matrix 🚀</button>
                  </form>
                </div>

                {/* 📝 FORM B: NEW SEAT MATRIX CAPACITY RECORD ENTRY LOG (INJECTS ROW TO SEAT MATRIX TAB) */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#ffd700]"/> Form B: Inject New Seat Matrix Capacity Row</h3>
                  
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div>
                      <label className="block text-zinc-400 mb-1">Institute Node Name</label>
                      <input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Specialization Branch Stream</label>
                      <input type="text" placeholder="e.g. Electronics & Communication Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Quota ID Allocation pool</label>
                      <input type="text" placeholder="e.g. HS (Neutral) or OS (Female-Only)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Absolute Seat Capacity Count</label>
                      <input type="number" placeholder="e.g. 92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">
                      Commit Capacity Row directly to Seat Matrix Ledger 🚀
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* 🚀 VIEW SUB-SET 3: COPYTEXT OVERRIDES AND EVENTS DEADLINES STEPS FORM WORKSPACE - RESTORED PERFECTLY */}
            {adminView === 'Users' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* 📝 FORM C: COUNSELLING ROADMAP ADVISOR INSTRUCTIONS COPIES OVERRIDES */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Layers size={18} className="text-[#ffd700]"/> Form C: Counselling Roadmap Guide Explainer Copy Overrides</h3>
                  <div className="space-y-4 text-xs text-zinc-300">
                    <div>
                      <label className="block text-zinc-400 mb-1">JoSAA Guide text descriptions block</label>
                      <textarea rows={2} value={josaaGuideText} onChange={(e) => setJosaaGuideText(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">CSAB Spot Round explainer guide copy blocks</label>
                      <textarea rows={2} value={csabGuideText} onChange={(e) => setCsabGuideText(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" />
                    </div>
                  </div>
                </div>

                {/* 📝 FORM D: INJECT NEW DEADLINE STEP ON TIMELINE TRACKER */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative">
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-[#ffd700]"/> Form D: Inject New Deadline Sequence Step milestone</h3>
                  
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div>
                      <label className="block text-zinc-400 mb-1">Date Timestamp info</label>
                      <input type="text" placeholder="e.g. June 28, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Timeline status chip layer</label>
                      <select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none">
                        <option>Upcoming</option><option>Live Soon</option><option>Simulation</option><option>Strict Warning</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Event Header title text</label>
                      <input type="text" placeholder="e.g. Round 1 Allocation Final List" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Event explanatory context description details block</label>
                      <textarea rows={2} placeholder="Type description details entries text blocks..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>

                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 mt-2 transition-all">
                      Commit Event Sequence Milestone to Deadlines Tab Timeline 🚀
                    </button>
                  </form>
                </div>

                {/* Student logs email stream feed */}
                <div className="bg-[#1a1b1e] border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 mb-4">Student account logins session registries auditing feed</h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden text-[11px] font-mono divide-y divide-zinc-800/40">
                    {studentSessions.map((session, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900/10 flex justify-between text-zinc-400">
                        <span>👤 Logged Student: <strong className="text-white">{session.email}</strong> — Token: <span className="text-zinc-500">{session.tokenType}</span></span>
                        <span className="text-[#ffd700] font-bold">Calculations Queries: {session.queriesCount} Calls</span>
                      </div>
                    ))}
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

      {/* DUAL-STATE AUTH MODAL CONTAINER PROFILES MAPPING */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            <button onClick={() => { setIsSignInOpen(false); setIsSignUpMode(false); }} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><X size={20} /></button>

            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">{isSignUpMode ? 'Create New Account' : 'Welcome Back Student'}</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">Sign in using security parameters tokens mapping layout views.</p>
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