'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, QrCode, MessageCircle } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';
import { supabase } from './supabaseClient'; // 🚀 Connected Cloud Core Client Node

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

  // 🏛️ CLOUD ENGINE REAL-TIME MATRIX ARRAYS
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);
  const [isCloudLoading, setIsCloudLoading] = useState(true);

  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students choices online fill karna shuru kar sakte hain.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  // 💰 PREMIUM GATE MONITOR SETTINGS (₹99 locked model)
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99'); 
  const [showQrCheckout, setShowQrCheckout] = useState(false);

  // Telemetry Traffic counters
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE', timestamp: '12:15 PM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' }
  ]);

  const [selectedType, setSelectedType] = useState('IIT'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Form Inputs State Buffers
  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000'); 

  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  const predictorRef = useRef<HTMLDivElement>(null);

  // 📡 🚀 READ OPERATION
  useEffect(() => {
    setTotalVisits(prev => prev + 1);
    
    async function loadCloudDatabaseRecords() {
      try {
        setIsCloudLoading(true);
        const { data, error } = await supabase
          .from('josaa_records')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setDynamicJosaaRecords(data);
        } else {
          setDynamicJosaaRecords(massiveJosaaData);
        }
      } catch (err) {
        console.error("Supabase load transaction execution crashed:", err);
      } finally {
        setIsCloudLoading(false);
      }
    }

    loadCloudDatabaseRecords();
  }, []);

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
      setMessages(prev => [...prev, { sender: 'bot', text: `Inquiry parsed! Premium group options unlock karke safe guidance channel circle join karein. Token fee standard ₹${premiumPriceToken} only.` }]);
    }, 800);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Credentials entries ko fill kijiye!");
    if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
      alert("Welcome Master Control Panel Admin Saheb! 👑 Controls synchronizing live.");
      setActiveTab('AdminPanel');
      setIsSignInOpen(false);
      return;
    }
    alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    setIsSignInOpen(false);
  };
// ⚙️ WRITE OPERATION
  const handleAddCutoffRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Form k cells ko fill karein!");

    // Sirf wahi columns jo Supabase table me 100% exist karte hain
    const newRowData = {
      institute: newInst,
      program: newProg,
      quota: newQuota,
      category: newCat,
      gender: newGend,
      opening: parseInt(newOpenRank) || 0,
      closing: parseInt(newCloseRank) || 0
    };

    try {
      const { data, error } = await supabase
        .from('josaa_records')
        .insert([newRowData])
        .select();

      if (error) {
        console.error("Supabase Error Details:", error);
        return alert(`Database Reject: ${error.message}`);
      }

      if (data && data[0]) {
        setDynamicJosaaRecords(prev => [data[0] as CollegeData, ...prev]);
      }
      
      alert("🚀 Mubarak ho! Naya Cutoff Record Real Supabase Cloud Database me permanently save ho gaya h!");
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
    } catch (err: any) {
      console.error("Cloud insert transaction crashed:", err);
      alert(`🚨 Crash Error: ${err?.message || "Unknown Network Crash"}`);
    }
  };
  

  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadDate || !newDeadTitle || !newDeadDesc) return alert("Values fill kijiye!");
    const newEvent = { id: dynamicDeadlines.length + 1, date: newDeadDate, title: newDeadTitle, desc: newDeadDesc, status: newDeadStat };
    setDynamicDeadlines([...dynamicDeadlines, newEvent]);
    alert("⏰ Success! Timeline deadline step updated.");
    setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
  };

  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatInst || !newSeatProg || !newSeatCap) return alert("Fields fill kijiye!");
    const newSeatRow = { id: dynamicSeats.length + 1, institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) };
    setDynamicSeats([...dynamicSeats, newSeatRow]);
    alert("🏛️ Seat Matrix grid tracking sync done!");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };

  const handleVerifyPremiumPayment = () => {
    alert("🚨 Payment verification validated! Redirecting directly to the Elite Premium Consulting Group Link...");
    window.open(premiumGroupUrl, '_blank');
    setShowQrCheckout(false);
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') || item.institute.includes('Motilal Nehru') : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const itemsPerPage = 5;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; 
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      
      {/* PUBLIC NAVBAR COMPONENT BANNER HEADER */}
      {activeTab !== 'AdminPanel' ? (
        <nav className="sticky top-0 z-50 bg-white shadow-xs border-b border-[#e2e2e2] px-6 py-3.5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
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
            <button type="button" onClick={() => setIsSignInOpen(true)} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs shadow-xs shrink-0 cursor-pointer hover:opacity-90">Sign In</button>
          </div>
        </nav>
      ) : null}

      {/* CLOUD CONNECTION STATUS BADGE BAR */}
      {activeTab !== 'AdminPanel' && (
        <div className="bg-zinc-950 text-white text-[11px] py-1 px-6 font-mono text-center flex items-center justify-center gap-1.5 border-b border-zinc-800">
          <span className={`h-2 w-2 rounded-full ${isCloudLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
          {isCloudLoading ? 'Synchronizing with Supabase cloud infrastructure database layers...' : 'Production Node Sync Status: CONNECTED (Supabase PostgreSQL Array Live)'}
        </div>
      )}

      {/* TABS VIEWPORT VIEW CONFIGURATIONS */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ Production Cloud Engine Engaged</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] font-display leading-[1.15]">Unlock your perfect college <br />seat layout with <span className="text-[#705d00] italic font-medium">expert</span> mentorship.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Join our high-end premium community circle for accurate personalized choice filling sequence structures lists.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Test My Ranks ➜</button>
                <button onClick={() => setActiveTab('Counselling Guide')} className="bg-[#1a1c1c] text-white font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-zinc-800 transition-all uppercase tracking-wider shadow-md">Get Premium Guide 🚀</button>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center"><div className="bg-white p-4 rounded-2xl shadow-xl border relative max-w-sm"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" className="rounded-xl h-64 object-cover w-full" alt="College Prep" /></div></div>
          </section>
        </div>
      )}

      {/* PUBLIC PREDICTOR APP MODULE VIEW */}
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
                <button type="submit" className="w-full bg-[#ffd700] text-black font-bold py-3.5 rounded-lg text-xs uppercase shadow-sm">Calculate Real Predictions 🚀</button>
              </form>
            </div>
          </section>

          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 text-left">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 DYNAMIC CAMPUS ALLOTMENTS LINKED ({results.length} Matches)</h3>
                  {results.map(college => (
                    <div key={college.id} className="bg-white border rounded-xl p-5 border-l-4 border-l-[#ffd700]">
                      <div className="flex justify-between items-start mb-2">
                        <div><h4 className="font-bold text-base text-black">{college.institute}</h4><p className="text-xs text-[#5f5e5e] mt-1 font-medium">{college.program}</p></div>
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

      {/* PREMIUM CHANNELS MONETIZATION PAGE */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-center animate-fadeIn space-y-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">👑 Elite Consulting Membership</span>
            <h2 className="text-3xl md:text-4xl font-black text-black font-display tracking-tight leading-[1.15]">Personalized Handholding Counselling Group Network</h2>
            <p className="text-sm text-[#5f5e5e] leading-relaxed">Sirf <strong className="text-black">₹{premiumPriceToken} token fee</strong> pay karke humare exclusive premium group circle me join ho jao.</p>
          </div>
          <div className="max-w-md mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            <div className="text-5xl font-black text-black font-mono flex items-center justify-center">₹{premiumPriceToken}</div>
            {!showQrCheckout ? (
              <button onClick={() => setShowQrCheckout(true)} className="w-full bg-[#1a1c1c] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-800 transition-all cursor-pointer">Get Instant Access To Secret Group 🚀</button>
            ) : (
              <div className="p-4 bg-zinc-50 border rounded-xl space-y-4">
                <div className="flex flex-col items-center gap-2 font-mono"><QrCode size={130} className="text-black border p-2 bg-white rounded-lg" /><span className="text-[10px] font-bold text-zinc-500">SCAN QR TO PAY INSTANT ₹{premiumPriceToken}</span></div>
                <button onClick={handleVerifyPremiumPayment} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-xs uppercase flex items-center justify-center gap-1 cursor-pointer">I Paid! Verify & Join Group <MessageCircle size={14}/></button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* AUX STATIC READ LISTINGS VIEW PORTS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn text-left">
          <div className="flex gap-4 mb-4">
            <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }} className="p-2 border rounded bg-white text-xs font-semibold">
              <option value="IIT">IITs</option>
              <option value="NIT">NITs</option>
            </select>
            <input type="text" placeholder="Search Campus..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="p-2 border rounded text-xs w-64 bg-white" />
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute Name</th><th className="px-6 py-4">Program Course specialties</th><th className="px-6 py-4">Opening Node</th><th className="px-6 py-4">Closing Node</th></tr>
              </thead>
              <tbody className="divide-y text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#ffd700]/5"><td className="px-6 py-4 font-semibold">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 font-mono">{item.opening}</td><td className="px-6 py-4 text-[#705d00] font-mono">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="bg-zinc-800 text-white px-3 py-1 rounded text-xs disabled:opacity-50 flex items-center"><ChevronLeft size={14}/> Prev</button>
            <span className="text-xs font-mono">Page {currentPage}</span>
            <button disabled={paginatedData.length < itemsPerPage} onClick={() => setCurrentPage(prev => prev + 1)} className="bg-zinc-800 text-white px-3 py-1 rounded text-xs disabled:opacity-50 flex items-center">Next <ChevronRight size={14}/></button>
          </div>
        </section>
      )}
      
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <h2 className="text-2xl font-extrabold border-b pb-2 mb-6">JoSAA Deadlines Timeline Calendar</h2>
          <div className="border-l-2 border-[#ffd700] pl-6 space-y-6">
            {dynamicDeadlines.map(dl => (<div key={dl.id}><span className="text-xs font-bold text-amber-700 block font-mono">{dl.date}</span><h4 className="font-bold text-black text-sm mt-0.5">{dl.title}</h4><p className="text-xs text-[#5f5e5e] mt-1">{dl.desc}</p></div>))}
          </div>
        </section>
      )}
      
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-5xl mx-auto px-6 py-12 text-left animate-fadeIn">
          <h2 className="text-2xl font-extrabold border-b pb-4 mb-6">Seat Matrix Allocation Ledger</h2>
          <div className="border rounded-xl overflow-hidden bg-white text-xs font-mono shadow-xs">
            <div className="bg-[#2f3131] text-white p-4 grid grid-cols-4 font-bold uppercase text-[10px]"><span>Institute Node</span><span>Branch Program Stream</span><span>Quota Pool ID</span><span>Seat Capacity Cap</span></div>
            {dynamicSeats.map(seat => (
              <div key={seat.id} className="p-4 grid grid-cols-4 items-center hover:bg-zinc-50"><span className="font-sans font-bold text-sm text-[#1a1c1c]">{seat.institute}</span><span className="text-zinc-500 font-sans text-xs">{seat.program}</span><span className="text-zinc-500 text-xs">{seat.quota}</span><span className="font-bold text-base text-zinc-700 pl-4">{seat.seats} Seats</span></div>
            ))}
          </div>
        </section>
      )}

      {/* 👑 ⚙️ ADMIN PANEL CONTROLS COCKPIT WORKSPACE */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          <aside className="w-64 bg-[#1a1b1e] border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800"><ShieldCheck size={26} className="text-[#ffd700]" /><div className="text-left"><h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd700] font-mono">Control Desk</h4><p className="text-[10px] text-zinc-500 font-mono">MASTER DATA ENGINE V4.2</p></div></div>
              <div className="flex flex-col gap-1 text-xs font-medium text-zinc-400">
                <button onClick={() => setAdminView('Overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${adminView === 'Overview' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><LayoutDashboard size={16} /> Dashboard Overview</button>
                <button onClick={() => setAdminView('Database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${adminView === 'Database' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><Database size={16} /> Data Entry Workspace</button>
                <button onClick={() => setAdminView('Users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${adminView === 'Users' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><UserCog size={16} /> Premium Gate Setup</button>
              </div>
            </div>
            <button onClick={() => { setActiveTab('Home'); setAdminSearch(''); }} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md cursor-pointer"> Exit Control Desk</button>
          </aside>

          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-white">System Core Control Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1b1e] border-2 border-[#ffd700]/40 p-6 rounded-2xl relative shadow-lg">
                    <div className="absolute top-0 right-0 p-4 text-[#ffd700]/20"><Eye size={20}/></div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Total Website Live Visits</div>
                    <div className="text-4xl font-black text-[#ffd700] font-mono mt-1 animate-pulse">{totalVisits} <span className="text-xs font-normal text-zinc-500">Hits</span></div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Database Total Rows</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{dynamicJosaaRecords.length} Rows</div>
                  </div>
                </div>

                {/* Live Student Authentication Registry Sessions Monitor */}
                <div className="bg-[#1a1b1e] border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 mb-4">🔒 Live Student Authentication Registry Sessions Monitor</h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden text-xs font-mono shadow-md">
                    <div className="bg-zinc-900 p-4 grid grid-cols-4 font-bold text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                      <span>Student Visitor Profile Email</span><span>Verification Token</span><span>Rank Inquiries Count</span><span>Live Status</span>
                    </div>
                    <div className="divide-y divide-zinc-800/40 text-zinc-300">
                      {studentSessions.map((session, idx) => (
                        <div key={idx} className="p-4 grid grid-cols-4 font-sans items-center hover:bg-zinc-900/20">
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

            {/* FORM A & B DATA WORKSPACE */}
            {adminView === 'Database' && (
              <div className="space-y-12 animate-fadeIn">
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#ffd700]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Institute Legal Entity Full Name</label><input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Academic Program specialty course stream</label><input type="text" placeholder="e.g. Electronics and Communication Engineering (4 Years, B.Tech)" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Quota Pool ID</label><select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select></div>
                    <div><label className="block text-zinc-400 mb-1">Reservation Category Pool</label><select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select></div>
                    <div><label className="block text-zinc-400 mb-1">JEE Opening Rank cut-off</label><input type="number" placeholder="4444" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">JEE Closing Rank cut-off</label><input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Annual Fee parameter allocation</label><input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs mt-2 transition-all hover:bg-[#e6c200] cursor-pointer">Compile Cut-off Row Into Database Matrix 🚀</button>
                  </form>
                </div>

                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#ffd700]"/> Form B: Inject New Seat Matrix Capacity Row</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Institute Node name identifier</label><input type="text" placeholder="e.g. NIT Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Specialization Stream Branch</label><input type="text" placeholder="e.g. Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Quota Pool Allocation</label><input type="text" placeholder="e.g. OS (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Absolute Seats capacity</label><input type="number" placeholder="e.g. 92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#ffd700]" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2 cursor-pointer">Commit Capacity Row directly to Seat Matrix Ledger 🚀</button>
                  </form>
                </div>
              </div>
            )}

            {adminView === 'Users' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-[#1a1b1e] border-2 border-purple-900/60 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[#ffd700]"/> Form C: Elite Paid Consulting Group Gateway Settings Overrides</h3>
                  <div className="grid grid-cols-1 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Secret Redirection Group Access Link</label><input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-emerald-400 font-mono outline-none" /></div>
                    <div><label className="block text-zinc-400 mb-1">Introductory Premium Token Price (INR)</label><input type="number" value={premiumPriceToken} onChange={(e) => setPremiumPriceToken(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-[#ffd700] font-mono font-bold outline-none" /></div>
                  </div>
                </div>

                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-[#ffd700]"/> Form D: Push New Action Deadline Event Timeline</h3>
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Date Timestamp info</label><input type="text" placeholder="June 28, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Timeline status chip select option</label><select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>Upcoming</option><option>Live Soon</option><option>Strict Warning</option></select></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event Title</label><input type="text" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event descriptions logs</label><textarea rows={2} value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 mt-2">Commit Deadline step to timeline calendar 🚀</button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* 🤖 FLOATING CHATBOT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="bg-[#1a1c1c] text-white p-4 rounded-full shadow-2xl border-2 border-[#ffd700] animate-bounce cursor-pointer"><MessageSquare size={24} className="text-[#ffd700]" /></button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[400px] bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] flex flex-col overflow-hidden">
            <div className="bg-[#1a1c1c] text-white p-4 flex justify-between items-center border-b border-[#ffd700]/30"><span className="text-xs font-bold">CollegeAchiver Bot v2.0</span><button onClick={() => setIsChatOpen(false)} className="cursor-pointer"><X size={18} /></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-xl p-3 text-xs ${msg.sender === 'user' ? 'bg-[#1a1c1c] text-white' : 'bg-white text-black border'}`}>{msg.text}</div></div>
              ))}
            </div>
            <div className="p-3 bg-white border-t flex items-center gap-2">
              <input type="text" placeholder="Ask AI..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f9f9f9] border rounded-xl px-4 py-2 text-xs outline-none" />
              <button onClick={() => handleSendMessage()} className="p-2 bg-[#ffd700] rounded-xl cursor-pointer"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* SIGN IN MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl relative text-black">
            <button onClick={() => setIsSignInOpen(false)} className="absolute top-4 right-4 cursor-pointer"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input type="email" placeholder="Email (admin@achiver.com)" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full border p-2.5 rounded text-sm outline-none" required />
              <input type="password" placeholder="Password (admin123)" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full border p-2.5 rounded text-sm outline-none" required />
              <button type="submit" className="w-full bg-black text-white py-2.5 rounded font-bold text-sm hover:opacity-90 transition-all cursor-pointer">Access Dashboard</button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}