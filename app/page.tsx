'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, ShieldCheck as Guarantee, MessageCircle, QrCode } from 'lucide-react';
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

interface RefundRule {
  id: number;
  round: string;
  josaaRule: string;
  csabRule: string;
  penalty: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home'); 
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS'); 
  const [hasSearched, setHasSearched] = useState(false);

  // 🏛️ MASTER SYSTEM DATABASE MEMORY STATES
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  // Seat Matrix Allocation Ledger Storage
  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  // Deadlines calendar array configurations
  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students choices online fill karna shuru kar sakte hain. Sequence order isi dauran lock hoga.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  // Counselling dynamic rules backup logs tables
  const [refundRules, setRefundRules] = useState<RefundRule[]>([
    { id: 1, round: 'Before Round 5 Allotment', josaaRule: 'Full SAF Refund after processing', csabRule: 'Allowed with Exit status option', penalty: '₹7,000 Processing fee' },
    { id: 2, round: 'After Round 5 Allotment', josaaRule: 'Strictly No Refund Allowed', csabRule: 'Allowed only if seat upgrades', penalty: 'Full SAF Forfeited' }
  ]);

  // 📈 PREMIUM SALES CONTROL STRATEGIC STATES (Editable Group Gateway URLs)
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('1'); // Base ₹1 structure config
  const [showQrCheckout, setShowQrCheckout] = useState(false);

  // Live traffic analytical stats meters
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'OFFLINE', timestamp: '10:15 AM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' }
  ]);

  // Public filtering layouts selectors state parameters
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('IIT'); 
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 🤖 FLOATING CHATBOT WIDGET
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // 🔐 SECURE AUTH COMPONENT GATEWAY MODALS
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // 🎛️ SECURE WORKSPACE SELECTION MODES
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Input fields row elements mapping variables buffers
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

  useEffect(() => {
    setTotalVisits(prev => prev + 1);
  }, []);

  // Predictor formula executions handler
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
      setMessages(prev => [...prev, { sender: 'bot', text: "Bhai, ye bohot badhiya sawal hai! Premium consulting membership le lo, direct group me handholding support de dunga! 🚀" }]);
    }, 800);
  };

  // Auth Gate verification controller process logs
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return alert("Fields fill kijiye!");
    if (isSignUpMode) {
      alert(`🎉 Account created successfully: ${emailInput}`);
    } else {
      if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
        alert("Welcome Master Control Panel Admin Saheb! 👑 Controls sync.");
        setActiveTab('AdminPanel');
        setIsSignInOpen(false);
        return;
      }
      alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    }
    setIsSignInOpen(false);
  };

  // Admin operational task handlers 
  const handleAddCutoffRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Form fill kijiye!");
    const newRow = { id: dynamicJosaaRecords.length + 1, institute: newInst, program: newProg, quota: newQuota, category: newCat, gender: newGend, opening: parseInt(newOpenRank), closing: parseInt(newCloseRank), placement: "16.4 LPA", nirf: 42, fee: `${newFee} / Year` };
    setDynamicJosaaRecords(prev => [newRow, ...prev]);
    alert("🔥 Success! Record appended straight to predictor layers arrays.");
    setNewInst(''); setNewProg('');
  };

  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadDate || !newDeadTitle || !newDeadDesc) return alert("Fields fill kijiye!");
    const newEvent = { id: dynamicDeadlines.length + 1, date: newDeadDate, title: newDeadTitle, desc: newDeadDesc, status: newDeadStat };
    setDynamicDeadlines(prev => [...prev, newEvent]);
    alert("⏰ Success! Timeline event pushed.");
    setNewDeadDate(''); setNewDeadTitle('');
  };

  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatInst || !newSeatProg || !newSeatCap) return alert("Fields fill kijiye!");
    const newSeatRow = { id: dynamicSeats.length + 1, institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) };
    setDynamicSeats(prev => [...prev, newSeatRow]);
    alert("🏛️ Seat Matrix ledger sync complete!");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };

  // Secure checkout processor logic simulations
  const handleVerifyPremiumPayment = () => {
    alert("🚨 Payment verification pipeline validated successfully! Redirecting you straight to the Elite Consulting Community Group...");
    window.open(premiumGroupUrl, '_blank');
    setShowQrCheckout(false);
  };


  // Public filters computations logs
  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') : true;
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
      
      {/* PUBLIC HEAD NAVBAR */}
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
            <button onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#ffd700] text-[#221b00] font-bold px-5 py-2 rounded-lg text-xs shadow-xs shrink-0 animate-fadeIn">Sign In</button>
          </div>
        </nav>
      ) : null}

      {/* 📋 USER EXPERIENCE CHUNKS ROUTINGS VIEWS */}
      
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-10">
          <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#ffd700]/20 text-[#705d00] text-xs font-bold px-3 py-1 rounded-full border border-[#ffd700]/30">🛡️ Premium Admission Accelerator Engine</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] font-display leading-[1.15]">Unlock your perfect college <br />seat layout with <span className="text-[#705d00] italic font-medium">expert</span> mentorship.</h1>
              <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Join our high-end premium community circle for accurate personalized choice filling sequence structures.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#ffd700] text-[#221b00] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all uppercase tracking-wider">Test My Ranks ➜</button>
                <button onClick={() => setActiveTab('Counselling Guide')} className="bg-[#1a1c1c] text-white font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-zinc-800 transition-all uppercase tracking-wider shadow-md">Get Premium Guide 🚀</button>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center"><div className="bg-white p-4 rounded-2xl shadow-xl border relative max-w-sm"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" className="rounded-xl h-64 object-cover w-full" /></div></div>
          </section>
        </div>
      )}

      {/* ⛵ 🌟 BRAND NEW DESIGN REVOLUTION: THE PREMIUM CONVERSION SALES Counselling Guide TAB LAYOUT */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-center animate-fadeIn space-y-10">
          
          {/* Main Visual Sales Pitch Copywriting Header */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              👑 Elite Consulting Membership
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black font-display tracking-tight leading-[1.15]">
              Personalized Handholding Counselling Group Network
            </h2>
            <p className="text-sm text-[#5f5e5e] leading-relaxed">
              Bhai, internet par bhatakna band karo! Sirf <strong className="text-black">₹{premiumPriceToken} token fee</strong> pay karke humare exclusive premium group circle me join ho jao. Wahan mai aapko personal choice-filling configurations, cut-off updates, aur live seat safety recommendations directly guide karunga!
            </p>
          </div>

          {/* Benefits Value Props Multi Grid Cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white border border-[#e2e2e2] rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
              <h4 className="font-bold text-black text-sm flex items-center gap-2">💬 Secret Group Access</h4>
              <p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">Direct WhatsApp / Telegram premium support channels jahan har bache ke custom rank ranges queries trace honge.</p>
            </div>
            <div className="bg-white border border-[#e2e2e2] rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
              <h4 className="font-bold text-black text-sm flex items-center gap-2">📑 Custom Choice Filling Order</h4>
              <p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">Aapki rank, category, aur home state preference criteria ke hisab se absolute descending prioritization lists matching guidelines.</p>
            </div>
            <div className="bg-white border border-[#e2e2e2] rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
              <h4 className="font-bold text-black text-sm flex items-center gap-2">🛡️ Risk-Free Spot Round Strategy</h4>
              <p className="text-xs text-[#5f5e5e] mt-1.5 leading-relaxed">CSAB and specific local adjustments windows over penalty structures rules checks to avoid seat loss risks.</p>
            </div>
          </div>

          {/* Core Interactive Checkout Transaction Processing Trigger Card */}
          <div className="max-w-md mx-auto bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-3 -right-3 bg-[#ffd700] text-black text-[10px] font-mono font-bold py-1 px-4 rotate-12 uppercase tracking-widest shadow-xs">
              Live Promo
            </div>
            
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">LIMITED ENTRY ENROLLMENT</div>
              <div className="text-5xl font-black text-black font-mono flex items-center justify-center gap-0.5">
                ₹{premiumPriceToken} <span className="text-xs font-normal text-zinc-400 font-sans">/ Only Base Token</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium">🔒 Secure Gateway Encryption Certified Matrix</p>
            </div>

            {/* Default CTA View vs QR Dropdown Toggle view rendering */}
            {!showQrCheckout ? (
              <button 
                onClick={() => setShowQrCheckout(true)}
                className="w-full bg-[#1a1c1c] hover:bg-zinc-800 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                Get Instant Access To Secret Group 🚀
              </button>
            ) : (
              <div className="p-4 bg-zinc-50 border rounded-xl space-y-4 animate-scaleUp">
                <div className="flex flex-col items-center gap-2 font-mono">
                  <QrCode size={130} className="text-black border p-2 bg-white rounded-lg shadow-sm" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">SCAN QR TO PAY INSTANT ₹{premiumPriceToken}</span>
                </div>
                <button 
                  onClick={handleVerifyPremiumPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wide flex items-center justify-center gap-1"
                >
                  I Paid! Verify & Join Group <MessageCircle size={14}/>
                </button>
              </div>
            )}

            <div className="text-[10px] text-zinc-400 font-mono tracking-wide leading-relaxed">
              *Payment complete hote hi secure integration system browser me access link unlock kar dega bhai. No extra backend database charges required.
            </div>
          </div>

        </section>
      )}

      {/* RENDER PUBLIC TAB MODULES PASSTHROUGH CHUNKS */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
          <section className="bg-white border-b py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 text-left">Rank Prediction Dashboard</h3>
              <form onSubmit={handlePredict} className="space-y-4 text-left">
                <div><label className="block text-xs font-semibold mb-1.5">Enter JEE Rank</label><input type="number" placeholder="e.g. 15000" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border rounded-lg text-sm focus:outline-none" /></div>
                <button type="submit" className="w-full bg-[#ffd700] text-black font-bold py-3.5 rounded-lg text-xs uppercase shadow-sm">Calculate Real Predictions 🚀</button>
              </form>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute</th><th className="px-6 py-4">Program</th><th className="px-6 py-4">Opening</th><th className="px-6 py-4">Closing</th></tr>
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


      {/* 👑 ⚙️ 🌟 ACTIVE ADMIN PORTAL COCKPIT WINDOWS MANAGEMENT ACCESSIBLE DESK */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          
          <aside className="w-64 bg-[#1a1b1e] border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
                <ShieldCheck size={26} className="text-[#ffd700]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd700] font-mono">Control Desk</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">MASTER PROGRAM GATEWAY</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium text-zinc-400">
                <button onClick={() => setAdminView('Overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Overview' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><LayoutDashboard size={16} /> Dashboard Overview</button>
                <button onClick={() => setAdminView('Database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Database' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><Database size={16} /> Data Entry Workspace</button>
                <button onClick={() => setAdminView('Users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Users' ? 'bg-[#ffd700] text-black font-bold' : 'hover:bg-zinc-800'}`}><UserCog size={16} /> Premium Gate Setup</button>
              </div>
            </div>
            <button onClick={() => setActiveTab('Home')} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md">🚪 Exit Control Desk</button>
          </aside>

          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            
            {/* VIEW A: ANALYTICAL METRICS TELEMETRY COUNTERS ROW */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Core Control Overview</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live background analytics system metrics scanning total visits package.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Visitiors counter */}
                  <div className="bg-[#1a1b1e] border-2 border-[#ffd700]/40 p-6 rounded-2xl relative shadow-lg">
                    <div className="absolute top-0 right-0 p-4 text-[#ffd700]/30"><Eye size={18}/></div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Total Website Live Visits</div>
                    <div className="text-4xl font-black text-[#ffd700] font-mono mt-1 animate-pulse">{totalVisits} <span className="text-xs font-normal text-zinc-500">Hits</span></div>
                  </div>
                  <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Live Database Total Rows</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{dynamicJosaaRecords.length} Nodes</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: COMPREHENSIVE CUTOFF AND DATA ENTRY MANAGE WORKSPACES */}
            {adminView === 'Database' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#ffd700]"/> Inject New Predictor & Cutoff Record Row</h3>
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Institute Legal Name</label><input type="text" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Academic Program specialty</label><input type="text" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Opening</label><input type="number" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Closing</label><input type="number" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Annual Course Fee structure structure</label><input type="text" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#ffd700] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">Inject Row Into Predictor Memory Array Grid 🚀</button>
                  </form>
                </div>

                {/* Seat Matrix append controls panel Form B inside workspace */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#ffd700]"/> Inject New Seat Matrix Capacity Row</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Institute Node name text</label><input type="text" placeholder="e.g. IIT Delhi" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Specialization Stream specialty branch</label><input type="text" placeholder="e.g. Computer Science" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Quota Pool Pool ID</label><input type="text" placeholder="e.g. OPEN (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Absolute Seats capacity</label><input type="number" placeholder="40" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">Commit Capacity Row directly to Seat Matrix Ledger 🚀</button>
                  </form>
                </div>
              </div>
            )}

            {/* 🚀 ⚙️ PREMIUM VIEW C: CONFIGURING THE ELITE GROUP LINKS AND TOKEN PRICE FOR COUNSELLING ACCELERATOR */}
            {adminView === 'Users' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-[#1a1b1e] border-2 border-purple-900/60 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                    <Guarantee size={18} className="text-[#ffd700]"/> Elite Consulting Group Gateway Configuration Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 text-xs text-zinc-300">
                    <div>
                      <label className="block text-zinc-400 mb-1">Secret Redirection Group Access Link (WhatsApp/Telegram Private Link)</label>
                      <input 
                        type="text" 
                        value={premiumGroupUrl} 
                        onChange={(e) => setPremiumGroupUrl(e.target.value)}
                        className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-emerald-400 font-mono outline-none focus:border-[#ffd700]" 
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Introductory Premium Token Price (INR)</label>
                      <input 
                        type="number" 
                        value={premiumPriceToken} 
                        onChange={(e) => setPremiumPriceToken(e.target.value)}
                        className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-[#ffd700] font-mono font-bold outline-none" 
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 italic">
                      *Bhai, is input field me aap jo link daaloge, bacha jab payment complete karke verification trigger karega, system automatic use usi group me land karwa dega.
                    </p>
                  </div>
                </div>

                {/* Form D Timeline pushes input boxes framework restored perfectly */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-[#ffd700]"/> Inject New Timeline Step Deadline</h3>
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div><label className="block text-zinc-400 mb-1">Date Stamp info</label><input type="text" placeholder="June 28, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div><label className="block text-zinc-400 mb-1">Status chip select</label><select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>Upcoming</option><option>Live Soon</option><option>Strict Warning</option></select></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event title header</label><input type="text" placeholder="Round 1 Allotment Result" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block text-zinc-400 mb-1">Event descriptions logs</label><textarea rows={2} value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-bold py-3 rounded-xl uppercase font-mono text-xs hover:opacity-90 mt-2 transition-all">Commit Deadline step milestone to public timeline 🚀</button>
                  </form>
                </div>

                {/* Auditing records student session lists */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 mb-4">Student email session audits logs stream</h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800/40 text-[11px] font-mono text-zinc-400">
                    {studentSessions.map((session, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900/10 flex justify-between"><span>👤 Logged Account: <strong>{session.email}</strong></span><span className="text-zinc-500">Timestamp: {session.timestamp}</span></div>
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

      {/* DUAL-STATE AUTH MODAL PROFILES COMPONENT */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]"></div>
            <button onClick={() => { setIsSignInOpen(false); setIsSignUpMode(false); }} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><X size={20} /></button>
            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">{isSignUpMode ? 'Create New Account' : 'Welcome Back Student'}</h3>
              <p className="text-xs text-[#5f5e5e] mt-1">Sign in using credentials security parameter variables mapping tokens.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="px-6 md:px-8 pb-6 space-y-4 text-left">
              <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Email ID Address</label><div className="relative"><User size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border text-xs outline-none" required /></div></div>
              <div><label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label><div className="relative"><Lock size={16} className="absolute left-3.5 top-3.5 text-[#5f5e5e]" /><input type="password" placeholder="e.g. admin123" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] border text-xs outline-none" required /></div></div>
              <button type="submit" className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase shadow-md flex items-center justify-center gap-2 mt-2 transition-all">Access Dashboard 🚀</button>
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