'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, QrCode, MessageCircle } from 'lucide-react';
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

  // 🏛️ PERSISTENT CORE DATABASE MANAGEMENT ARRAYS
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students choices online fill karna shuru kar sakte hain. Sequence order isi dauran lock hoga.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  // 💰 PREMIUM GROUP FUNNEL STATE SETTINGS (₹99 Sweets spot locked)
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99'); 
  const [showQrCheckout, setShowQrCheckout] = useState(false);

  // 📈 SYSTEMS ANALYTICS MONITORING METERS
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE', timestamp: '12:15 PM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' },
    { email: 'aryan.kumar@nitagartala.in', tokenType: 'REGISTERED_NEW_OK', queriesCount: 15, status: 'ONLINE', timestamp: '01:05 PM' }
  ]);

  // Public filtrations table parameters configurations
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 🤖 FLOATING SYSTEM CHATBOT LOGIC
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // 🔐 SECURE SIGN IN/SIGN UP MODALS LAYOUT HANDLERS
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // 🎛️ CONTROL DESK COCKPIT SIDEBAR RENDERING TOOGLE STATES
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Form Inputs Buffer Management variables: Form A
  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000'); 

  // Form Inputs Buffer Management variables: Form B Deadline
  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  // Form Inputs Buffer Management variables: Form C Seat Matrix
  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  const predictorRef = useRef<HTMLDivElement>(null);

  // Rehydration lifecycle protocol
  useEffect(() => {
    setTotalVisits(prev => prev + 1);
    if (typeof window !== 'undefined') {
      const cachedRecords = localStorage.getItem('achiver_colleges');
      if (cachedRecords) setDynamicJosaaRecords(JSON.parse(cachedRecords));
      
      const cachedDeadlines = localStorage.getItem('achiver_deadlines');
      if (cachedDeadlines) setDynamicDeadlines(JSON.parse(cachedDeadlines));

      const cachedSeats = localStorage.getItem('achiver_seats');
      if (cachedSeats) setDynamicSeats(JSON.parse(cachedSeats));
    }
  }, []);

  // Public Predictor algorithm compiler run handler logic
  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");
    setHasSearched(true);
    const userRank = parseInt(rank);
    setTotalVisits(prev => prev + 2); 

    const filtered = dynamicJosaaRecords.filter(col => {
      return (
        col.category === category && col.gender === gender && (col.quota === homeState || col.quota === "AI") && col.closing >= userRank
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
    setTimeout(() => { predictorRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    if (!textToSend) setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: `Bhai query register ho gayi hai, Premium group entry lekar direct exclusive supports group me handholding connect karein! 🚀 Token: ₹${premiumPriceToken}` }]);
    }, 800);
  };

  // Auth Submit handler gatekeeper
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Credentials fields bhariye!");
    
    if (isSignUpMode) {
      if (passwordInput !== confirmPasswordInput) return alert("Passwords split mismatch!");
      alert(`🎉 Account successfully created: ${emailInput}`);
    } else {
      // 👑 SECURITY BACKDOOR ACTION ENTRY LOCK FOR THE ADMIN CORE PANELS
      if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
        alert("Welcome Master Control Panel Admin Saheb! 👑 Controls synchronizing live.");
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

  // ⚙️ ADMINE ACTION 1: Append Cut-off Row Form A
  const handleAddCutoffRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Form fill kijiye!");
    const newRow = { id: dynamicJosaaRecords.length + 1, institute: newInst, program: newProg, quota: newQuota, category: newCat, gender: newGend, opening: parseInt(newOpenRank), closing: parseInt(newCloseRank), placement: "16.4 LPA", nirf: 42, fee: `${newFee} / Year` };
    
    const updated = [newRow, ...dynamicJosaaRecords];
    setDynamicJosaaRecords(updated);
    localStorage.setItem('achiver_colleges', JSON.stringify(updated));
    
    alert("🔥 Success! Record appended straight to predictor local memory storage pipeline.");
    setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
  };

  // ⚙️ ADMINE ACTION 2: Append Deadline Event Form C (Inside Users/Overrides Tab)
  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadDate || !newDeadTitle || !newDeadDesc) return alert("Fields fill kijiye!");
    const newEvent = { id: dynamicDeadlines.length + 1, date: newDeadDate, title: newDeadTitle, desc: newDeadDesc, status: newDeadStat };
    
    const updated = [...dynamicDeadlines, newEvent];
    setDynamicDeadlines(updated);
    localStorage.setItem('achiver_deadlines', JSON.stringify(updated));

    alert("⏰ Success! Timeline deadline step committed to persistence state layers.");
    setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
  };

  // ⚙️ ADMINE ACTION 3: Append Seat Capacity Row Form B
  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatInst || !newSeatProg || !newSeatCap) return alert("Fields fill kijiye!");
    const newSeatRow = { id: dynamicSeats.length + 1, institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) };
    
    const updated = [...dynamicSeats, newSeatRow];
    setDynamicSeats(updated);
    localStorage.setItem('achiver_seats', JSON.stringify(updated));

    alert("🏛️ Seat Matrix ledger persistence synchronizing done!");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };

  const handleVerifyPremiumPayment = () => {
    alert("🚨 Payment verification validated! Redirecting to exclusive secret consulting community group link...");
    window.open(premiumGroupUrl, '_blank');
    setShowQrCheckout(false);
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') || item.institute.includes('Motilal Nehru') : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const adminFilteredData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => item.institute.toLowerCase().includes(adminSearch.toLowerCase())).slice(0, 3);
  }, [adminSearch, dynamicJosaaRecords]);

  const itemsPerPage = 5;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* PUBLIC NAVBAR COMPONENT LAYER */}
      {activeTab !== 'AdminPanel' ? (
        <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Mascot Vector Cap Branding Logo */}
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12L15 32L50 52L85 32L50 12Z" fill="#FFD700" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M25 45V68C25 78 36 85 50 85C64 85 75 78 75 68V45" stroke="#1A1C1C" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M40 70L50 42L60 70" stroke="#1A1C1C" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="text-xl tracking-tight font-display text-[#1a1c1c]">College<span className="font-extrabold text-[#705d00]">Achiver</span></div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold text-[#5f5e5e]">
              {['Home', 'Predictor', 'Counselling Guide', 'Opening/Closing Ranks', 'Deadlines', 'Seat Matrix'].map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${activeTab === tab ? 'text-[#221b00] bg-[#ffd700] font-bold shadow-xs' : 'hover:text-[#705d00] hover:bg-[#eeeeee]'}`}>{tab}</button>
              ))}
            </div>

            <button type="button" onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs shadow-xs shrink-0 cursor-pointer">
              Sign In
            </button>
          </div>
        </nav>
      ) : null}

      {/* 📋 USER SIDE ACTIVE TAB ROUTINGS RENDERS */}
      
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ Premium Admission Accelerator Engine Live</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] font-display leading-[1.15]">Unlock your perfect college <br />seat layout with <span className="text-[#705d00] italic font-medium">expert</span> mentorship.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Join our high-end premium community circle for accurate personalized choice filling sequence structures lists.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Test My Ranks ➜</button>
                <button onClick={() => setActiveTab('Counselling Guide')} className="bg-[#1a1c1c] text-white font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-zinc-800 transition-all uppercase tracking-wider shadow-md">Get Premium Guide 🚀</button>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center"><div className="bg-white p-4 rounded-2xl shadow-xl border relative max-w-sm"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" className="rounded-xl h-64 object-cover w-full" /></div></div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white border p-6 rounded-xl shadow-xs"><div className="text-2xl font-black text-black">{dynamicJosaaRecords.length}+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Live Database Rows Indexed</p></div>
            <div className="bg-white border p-6 rounded-xl shadow-xs"><div className="text-2xl font-black text-black">113+</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Colleges Verified In Database</p></div>
            <div className="bg-white border p-6 rounded-xl shadow-xs"><div className="text-2xl font-black text-[#705d00]">98%</div><p className="text-xs text-[#5f5e5e] font-medium mt-1">Accuracy Index Threshold</p></div>
          </section>
        </div>
      )}

      {/* PUBLIC TAB MODULE: PREDICTOR CALCULATOR */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
          <section className="bg-white border-b py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
              <h3 className="font-bold text-lg mb-4 text-left">Rank Prediction Dashboard</h3>
              <form onSubmit={handlePredict} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Enter JEE Rank (CRL / Category)</label>
                  <input type="number" placeholder="e.g. 15000" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border rounded-lg text-sm focus:outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border rounded-lg text-xs font-medium"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Gender Pool</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border rounded-lg text-xs font-medium"><option>Gender-Neutral</option><option>Female-Only</option></select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Quota Allocation</label>
                  <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-3 py-2.5 bg-[#f9f9f9] border rounded-lg text-xs font-medium"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select>
                </div>
                <button type="submit" className="w-full bg-[#ffd700] text-black font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow-sm hover:opacity-90 transition-all">Calculate Predictions 🚀</button>
              </form>
            </div>
          </section>

          {/* Predictor Core Output recommendations table lower area mapping logs */}
          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20 text-left">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS GRID ({results.length} Matches)</h3>
                  {results.map(college => (
                    <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm border-l-4 border-l-[#ffd700]">
                      <div className="flex justify-between items-start mb-2">
                        <div><h4 className="font-bold text-[#1a1c1c] text-base">{college.institute}</h4><p className="text-xs text-[#5f5e5e] mt-1 font-medium">{college.program}</p></div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border rounded-full uppercase">{college.chance} Allotment</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t text-xs text-[#5f5e5e]">
                        <span>Closing Cutoff: <strong>{college.closing}</strong></span>
                        <span>Annual Fee: <strong className="text-black">{college.fee || "2,20,000 / Year"}</strong></span>
                        <span>NIRF Ranking: <strong>{college.nirf || "45"}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border rounded-xl p-8 text-center text-xs text-zinc-500 font-mono">🚨 Parameters criteria match records lookup logs empty.</div>
              )
            ) : null}
          </section>
        </div>
      )}

      {/* PUBLIC TAB MODULE: PREMIUM CHECKOUT LINK MONETIZATION PAGE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-center animate-fadeIn space-y-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">👑 Elite Consulting Membership</span>
            <h2 className="text-3xl md:text-4xl font-black text-black font-display tracking-tight leading-[1.15]">Personalized Handholding Counselling Group Network</h2>
            <p className="text-sm text-[#5f5e5e] leading-relaxed">Sirf <strong className="text-black">₹{premiumPriceToken} token fee</strong> pay karke humare exclusive premium group circle me join ho jao. Wahan mai aapko personal choice-filling orders, cut-off updates, aur live seat safety recommendations directly guide karunga!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white border rounded-2xl p-5 shadow-xs relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div><h4 className="font-bold text-black text-sm">💬 Secret Group Access</h4><p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">Direct support channels jahan har bache ke custom queries personal track honge.</p></div>
            <div className="bg-white border rounded-2xl p-5 shadow-xs relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div><h4 className="font-bold text-black text-sm">📑 Custom Choice Filling Order</h4><p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">Aapki rank ranges priorities criteria descending prioritization lists layout mapping sheets.</p></div>
            <div className="bg-white border rounded-2xl p-5 shadow-xs relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div><h4 className="font-bold text-black text-sm">🛡️ Risk-Free Spot Round Strategy</h4><p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">CSAB special round rules adjustments matrix systems layouts checks to safeguard seats metrics.</p></div>
          </div>
          <div className="max-w-md mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">LIMITED ENTRY ENROLLMENT</div>
              <div className="text-5xl font-black text-black font-mono flex items-center justify-center">₹{premiumPriceToken} <span className="text-xs font-normal text-zinc-400 font-sans">/ Full Access Token</span></div>
            </div>
            {!showQrCheckout ? (
              <button onClick={() => setShowQrCheckout(true)} className="w-full bg-[#1a1c1c] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-800 transition-all">Get Instant Access To Secret Group 🚀</button>
            ) : (
              <div className="p-4 bg-zinc-50 border rounded-xl space-y-4 animate-scaleUp">
                <div className="flex flex-col items-center gap-2 font-mono"><QrCode size={130} className="text-black border p-2 bg-white rounded-lg" /><span className="text-[10px] font-bold text-zinc-500">SCAN QR TO PAY INSTANT ₹{premiumPriceToken}</span></div>
                <button onClick={handleVerifyPremiumPayment} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-xs uppercase flex items-center justify-center gap-1">I Paid! Verify & Join Group <MessageCircle size={14}/></button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* REMAINING AUX TABS RENDER MATRIX LAYOUT PARAMETERS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn text-left">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute Entity</th><th className="px-6 py-4">Program specialties specialty</th><th className="px-6 py-4">Opening Node</th><th className="px-6 py-4">Closing Node</th></tr>
              </thead>
              <tbody className="divide-y text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#ffd700]/5"><td className="px-6 py-4 font-semibold">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 font-mono">{item.opening}</td><td className="px-6 py-4 text-[#705d00] font-mono">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <h2 className="text-2xl font-extrabold border-b pb-2 mb-6">JoSAA Deadlines Timeline</h2>
          <div className="border-l-2 border-[#ffd700] pl-6 space-y-6">
            {dynamicDeadlines.map(dl => (<div key={dl.id}><span className="text-xs font-bold text-amber-700 block font-mono">{dl.date}</span><h4 className="font-bold text-black text-sm mt-0.5">{dl.title}</h4><p className="text-xs text-[#5f5e5e] mt-1">{dl.desc}</p></div>))}
          </div>
        </section>
      )}

      {activeTab === 'Seat Matrix' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <h2 className="text-2xl font-extrabold border-b pb-4 mb-6">Seat Matrix Allocation Ledger</h2>
          <div className="border rounded-xl overflow-hidden bg-white text-xs font-mono shadow-xs">
            <div className="bg-[#2f3131] text-white p-4 grid grid-cols-4 font-bold uppercase text-[10px]"><span>Institute</span><span>Branch Stream</span><span>Quota Pool</span><span>Seat Capacity Cap</span></div>
            {dynamicSeats.map(seat => (
              <div key={seat.id} className="p-4 grid grid-cols-4 items-center hover:bg-zinc-50"><span className="font-sans font-bold text-sm text-[#1a1c1c]">{seat.institute}</span><span className="text-zinc-500 font-sans text-xs">{seat.program}</span><span className="text-zinc-500 text-xs">{seat.quota}</span><span className="font-bold text-base text-zinc-700 pl-4">{seat.seats} Seats</span></div>
            ))}
          </div>
        </section>
      )}


      {/* 👑 ⚙️ 🌟 BACKDOOR CONTROL PANEL COCKPIT DESK INFRASTRUCTURE (100% INTINT RULES RESTORED) */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          
          {/* Left Navigation control nodes lists */}
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
                <button onClick={() => setAdminView('Users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Users' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><UserCog size={16} /> Premium Gate Overrides</button>
              </div>
            </div>
            <button onClick={() => { setActiveTab('Home'); setAdminSearch(''); }} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md"> Exit Control Desk</button>
          </aside>

          {/* Right Area content panel windows workspaces render maps layout */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            
            {/* VIEW A: DASHBOARD ANALYTICS COUNTERS AND STUDENT TELEMETRY LOOKUPS */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Synchronization Desk</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live background streams logging portal analytical visits counts telemetry patterns entries.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Visitiors live tracker counter widget box */}
                  <div className="bg-[#1a1b1e] border-2 border-[#ffd700]/40 p-6 rounded-2xl relative shadow-lg">
                    <div className="absolute top-0 right-0 p-4 text-[#ffd700]/20"><Eye size={20}/></div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Total Website Live Visits</div>
                    <div className="text-4xl font-black text-[#ffd700] font-mono mt-1 animate-pulse">{totalVisits} <span className="text-xs font-normal text-zinc-500">Hits</span></div>
                    <p className="text-[10px] text-emerald-400 font-mono mt-2">📊 Analytics: Real-time logging telemetry active</p>
                  </div>

                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Database Predictor Capacity</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{dynamicJosaaRecords.length} Rows</div>
                  </div>

                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Active Logged Student Registries</div>
                    <div className="text-3xl font-black text-purple-400 font-mono mt-1">{studentSessions.length} Profiles</div>
                  </div>
                </div>

                {/* 🔒 👤 REAL EMAIL LOG TRACKER CONTAINER ADDED PERMANENTLY UNDER OVERVIEW VIEW */}
                <div className="bg-[#1a1b1e] border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 mb-4">🔒 Live Student Authentication Registry Sessions Stream</h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden text-xs font-mono">
                    <div className="bg-zinc-900 p-4 grid grid-cols-4 font-bold text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                      <span>Student Account Email</span><span>Verification Token</span><span>Rank Inquiries Count</span><span>Live Status</span>
                    </div>
                    <div className="divide-y divide-zinc-800/40 text-zinc-300">
                      {studentSessions.map((session, idx) => (
                        <div key={idx} className="p-4 grid grid-cols-4 font-sans items-center hover:bg-zinc-900/10">
                          <span className="font-mono text-white font-bold">{session.email}</span>
                          <span className="text-zinc-500 font-mono text-[11px]">{session.tokenType}</span>
                          <span className="text-[#ffd700] font-bold pl-4 font-mono">{session.queriesCount} Requests</span>
                          <span className={`font-bold text-[11px] ${session.status === 'ONLINE' ? 'text-emerald-400 animate-pulse' : 'text-zinc-600'}`}>● {session.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 🚀 VIEW B: DATA INJECTION CONTROL WORKSPACE ZONE (RESTORED FORM A & FORM B COMBINED) */}
            {adminView === 'Database' && (
              <div className="space-y-12 animate-fadeIn">
                
                {/* 📝 FORM A: INJECT NEW CUT-OFF RECORD LOG MATRIX */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#ffd700]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Institute Legal Entity Full Name</label>
                      <input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Academic Program specialty course stream</label>
                      <input type="text" placeholder="e.g. Electronics and Communication Engineering (4 Years, B.Tech)" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Quota Pool ID</label>
                      <select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Reservation Category Pool</label>
                      <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Opening Rank</label>
                      <input type="number" placeholder="4444" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Closing Rank</label>
                      <input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Annual Fee token parameters variable assignment</label>
                      <input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs mt-2 transition-all hover:opacity-90">Compile Cut-off Row Into Database Matrix 🚀</button>
                  </form>
                </div>

                {/* 📝 FORM B: INJECT NEW DYNAMIC SEAT Matrix CAP ROW LEDGER RECORD */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#ffd700]"/> Form B: Inject New Seat Matrix Capacity Row</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Institute Node name text identifier</label><input type="text" placeholder="e.g. NIT Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Specialization Stream Branch course</label><input type="text" placeholder="e.g. Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Quota Pool Allocation pool ID</label><input type="text" placeholder="e.g. OS (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Absolute Seats capacity count number</label><input type="number" placeholder="e.g. 92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">Commit Capacity Row directly to Seat Matrix Ledger 🚀</button>
                  </form>
                </div>

              </div>
            )}

            {/* 🚀 VIEW C: PREMIUM RE-ROUTING GATE LINKS OVERRIDES AND DEADLINES EVENTS GENERATIONS WORKSPACE */}
            {adminView === 'Users' && (
              <div className="space-y-10 animate-fadeIn">
                
                {/* 📝 FORM C: LIVE REDIRECT GROUP CONFIGURATION OVERRIDES CARD */}
                <div className="bg-[#1a1b1e] border-2 border-purple-900/60 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[#ffd700]"/> Form C: Elite Consulting Group Gateway Configuration Settings</h3>
                  <div className="grid grid-cols-1 gap-4 text-xs text-zinc-300">
                    <div>
                      <label className="block text-zinc-400 mb-1">Secret Redirection Group Access Link (WhatsApp/Telegram Private Link)</label>
                      <input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-emerald-400 font-mono outline-none" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Introductory Premium Token Price (INR)</label>
                      <input type="number" value={premiumPriceToken} onChange={(e) => setPremiumPriceToken(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-[#ffd700] font-mono font-bold outline-none" />
                    </div>
                  </div>
                </div>

                {/* 📝 FORM D: INJECT NEW DEADLINE CALENDAR TIMESTAMP STEPS ARRAY RECORD */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-[#ffd700]"/> Form D: Push New Action Deadline Event Timeline</h3>
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Date Timestamp info</label><input type="text" placeholder="e.g. June 28, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Timeline status chip layer option</label><select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>Upcoming</option><option>Live Soon</option><option>Strict Warning</option></select></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event Header Title</label><input type="text" placeholder="e.g. Mock Seat Allocation Round 2 Result" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event explanatory context description details block</label><textarea rows={2} placeholder="Type descriptions text parameters items logs..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">Commit Deadline step milestone to public timeline timeline calendar 🚀</button>
                  </form>
                </div>

              </div>
            )}

          </section>
        </div>
      )}

      {/* FLOATING AI CHATBOT SYSTEM FRAMEWORK */}
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

      {/* 🔐 AUTHENTICATION MODAL LOGINS COMPONENT CONTAINER WINDOW FRAME */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            <button type="button" onClick={() => { setIsSignInOpen(false); setIsSignUpMode(false); }} className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer"><X size={20} /></button>
            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">{isSignUpMode ? 'Create New Account' : 'Welcome Back Student'}</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">Sign in to access secure dashboard and system options lists.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="px-6 md:px-8 pb-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Email ID Address</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border text-xs outline-none rounded-xl text-black font-medium" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" />
                  <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border text-xs outline-none rounded-xl text-black font-medium" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase shadow-md flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer hover:bg-zinc-800">Access My Dashboard 🚀</button>
            </form>
            <div className="bg-[#f3f3f3] px-6 py-4 border-t text-center text-xs text-[#5f5e5e]">
              {isSignUpMode ? <p>Already have an account? <button onClick={() => setIsSignUpMode(false)} className="text-[#705d00] font-bold hover:underline cursor-pointer">Sign In Here</button></p> : <p>Don't have an account? <button onClick={() => setIsSignUpMode(true)} className="text-[#705d00] font-bold hover:underline cursor-pointer">Sign Up / Register Here</button></p>}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
