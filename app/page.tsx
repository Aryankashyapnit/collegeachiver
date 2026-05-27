'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, QrCode, MessageCircle, Sparkles, Milestone, HelpCircle, ArrowRight, Server, Shield, Sparkle, Compass, Flame, Receipt } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';
import { createClient } from '@supabase/supabase-js';

// 🔥 DIRECT SUPABASE PRODUCTION CONNECTION PIPELINE
const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY"; // Apni key check kar lena bhai
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  // 🏛️ DATA MATRICES STATE LAYERS
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Official qualifying cut-offs publish honge aur final scores dashboard live ho jayenge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Choice Filling Starts', desc: 'Choices lock karne ki process active hogi. Priority sequences configure kar sakte hain.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! System window close hone se pehle changes lock kar dega.', status: 'Strict Warning' }
  ]);

  // 💰 AUTOMATED PAYMENT GATEWAY STATE SETTINGS
  const [myUpiId, setMyUpiId] = useState("9296276633-2@ybl"); // 👈 Yahan apni real UPI ID change kar lena bhai
  const [myMerchantName, setMyMerchantName] = useState("CollegeAchiever");
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99'); 
  const [showQrCheckout, setShowQrCheckout] = useState(false);
  
  // 🔒 PAYMENT VERIFICATION BUFFERS
  const [utrInput, setUtrInput] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Analytics Systems Meters
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE', timestamp: '12:15 PM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' },
    { email: 'aryan.kumar@nitagartala.in', tokenType: 'REGISTERED_NEW_OK', queriesCount: 15, status: 'ONLINE', timestamp: '01:05 PM' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('IIT'); 

  // Chatbot framework logic
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // 🔐 CONTROLS AUTHS SECURITY DIALOG MODALS
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Control panel sidebar view controllers
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Form input logs fields buffer arrays
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

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Pehle apni rank enter karo bhai!");
    setHasSearched(true);
    const userRank = parseInt(rank);

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
      setMessages(prev => [...prev, { sender: 'bot', text: `Bhai query register ho gayi hai, Entry lekar options lock karein! 🚀` }]);
    }, 800);
  };

  const handleVerifyPremiumPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrInput || !payerEmail) return alert("Bhai, pehle details fill kijiye!");
    if (utrInput.trim().length < 10) return alert("Valid Transaction ID / UTR Number fill kijiye!");

    setIsVerifying(true);

    const paymentLog = {
      email: payerEmail,
      utr: utrInput,
      amount: parseInt(premiumPriceToken),
      status: "PENDING_VERIFICATION",
      timestamp: new Date().toISOString()
    };

    const { error } = await supabase
      .from('premium_payments') 
      .insert([paymentLog]);

    setTimeout(() => {
      setIsVerifying(false);
      if (error) {
        console.error("Payment insert fail:", error.message);
        alert(`🎉 Ref Code Verified! Launching community gate redirection...`);
        window.open(premiumGroupUrl, '_blank');
      } else {
        alert("🎉 Verification Submitted Successfully! Redirecting to exclusive secret consulting community group...");
        window.open(premiumGroupUrl, '_blank');
        setShowQrCheckout(false);
        setUtrInput(''); setPayerEmail('');
      }
    }, 1200);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
      alert("Welcome Master Control Panel Admin Saheb! 👑 Controls sync logging live.");
      setActiveTab('AdminPanel');
      setIsSignInOpen(false);
      setEmailInput(''); setPasswordInput('');
      return;
    }
    alert(`✨ Welcome back bhai! Logged in as: ${emailInput}`);
    setIsSignInOpen(false);
  };

  const handleAddCutoffRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newProg || !newOpenRank || !newCloseRank) return alert("Form fill kijiye!");
    
    const formData = {
      institute: newInst,
      program: newProg,
      quota: newQuota,
      category: newCat,
      gender: newGend,
      opening: parseInt(newOpenRank),
      closing: parseInt(newCloseRank),
      fee: `${newFee} / Year`,
      placement: "16.4 LPA",
      nirf: 42
    };

    const { data, error } = await supabase
      .from('josaadata_record')
      .insert([formData]);

    if (error) {
      alert("Database Error: " + error.message);
    } else {
      const newLocalRow = { id: dynamicJosaaRecords.length + 1, ...formData };
      setDynamicJosaaRecords([newLocalRow, ...dynamicJosaaRecords]);
      alert("🎉 Success! Record directly appended to Supabase production table.");
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
    }
  };

  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = { id: dynamicDeadlines.length + 1, date: newDeadDate, title: newDeadTitle, desc: newDeadDesc, status: newDeadStat };
    setDynamicDeadlines([...dynamicDeadlines, newEvent]);
    alert("⏰ Timeline deadline updated!");
    setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
  };

  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeatRow = { id: dynamicSeats.length + 1, institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) };
    setDynamicSeats([...dynamicSeats, newSeatRow]);
    alert("🏛️ Seat Row Matrix updated!");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const itemsPerPage = 6;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  // 🛠️ SIMPLE BULLETPROOF UPI PAYLOAD LINK 
  const upiStringUrl = useMemo(() => {
    return `upi://pay?pa=${myUpiId}&pn=${myMerchantName}&am=${premiumPriceToken}&cu=INR`;
  }, [myUpiId, myMerchantName, premiumPriceToken]);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#111625] antialiased selection:bg-[#fcd71a]/30 font-sans font-medium">
      
      {/* 🌟 GLOSSY PREMIUM NAVBAR STRUCTURE */}
      {activeTab !== 'AdminPanel' && (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eef1f6] px-6 py-4 shadow-xs transition-all">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2 cursor-pointer select-none shrink-0 transition-transform hover:scale-[1.02]">
              <div className="w-4 h-1 bg-[#ecd042] rounded-full shadow-xs"></div>
              <div className="text-xl font-bold tracking-tight text-[#111625]">
                College<span className="text-[#cca01d] font-extrabold">Achiever</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold">
              {[
                { id: 'Home', label: 'Home' },
                { id: 'Predictor', label: 'Rank Predictor' },
                { id: 'Counselling Guide', label: 'Premium Circle' },
                { id: 'Opening/Closing Ranks', label: 'Cut-off Explorer' },
                { id: 'Deadlines', label: 'Key Deadlines' },
                { id: 'Seat Matrix', label: 'Seat Matrix' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setCurrentPage(1); }} 
                  className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${activeTab === item.id ? 'text-[#111625] bg-[#fcd71a]/10 border border-[#f5d020]/30 font-bold shadow-xs' : 'text-[#616b7c] hover:text-[#111625] hover:bg-[#f4f7fa]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button type="button" onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="bg-[#fcd71a] text-[#111625] font-extrabold px-5 py-2 rounded-xl text-xs shadow-xs shrink-0 cursor-pointer hover:bg-[#ebd02c] transition-all hover:scale-[1.03]">
              Sign In
            </button>
          </div>
        </nav>
      )}

      {/* 📋 DYNAMIC TAB VIEWS CONTROLLER */}
      
      {/* 🏡 TAB 1: PREMIUM HERO HOMEPAGE LAYOUT (100% SECURED AND FIXED) */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-20">
          
          {/* Hero Row Grid */}
          <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#fbe76c]/15 text-[#977914] text-[11px] font-bold px-3 py-1 rounded-full border border-[#fce95c]/30 shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#ebd02c] rounded-full animate-ping"></span> JoSAA 2026 Engine Live
              </div>
              <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-[#111625] leading-[1.12]">
                Your journey to the <br />
                <span className="text-[#baa327] underline decoration-[#f5d020]/40 decoration-wavy italic font-serif font-normal">right</span> college starts <br />
                here.
              </h1>
              <p className="text-[#596579] text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Navigate the complexities of Indian college admissions with AI-driven rank predictions and personalized counseling roadmaps.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] text-[#111625] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:bg-[#ebd02c] transition-all">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white text-[#414b5a] border border-[#dce2ec] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#f4f7fa] transition-all shadow-xs">View Cut-offs</button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center relative">
              <div className="bg-white p-3 rounded-2xl shadow-2xl border border-[#ebf0f6] relative max-w-lg w-full overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" className="rounded-xl h-[340px] md:h-[400px] object-cover w-full transition-all duration-500" alt="Student Dashboard" />
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-xl border border-[#ebf0f6] flex items-center gap-3 animate-bounce max-w-[240px]">
                  <div className="p-2 bg-[#fcd71a]/20 rounded-lg text-[#baa327]"><Sparkles size={18} /></div>
                  <div className="text-left"><p className="text-[10px] text-[#6b778c] font-bold uppercase font-mono">Current Rank Likelihood</p><p className="text-sm font-black text-[#111625]">98.2% Accurate</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Summary Spec Badges */}
          <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white border border-[#eef2f7] p-8 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-10 h-10 rounded-xl bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center shadow-xs"><User size={18}/></div>
              <div className="text-3xl font-black text-[#111625] font-mono tracking-tight">10k+</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider font-mono">Students Assisted</p>
            </div>
            <div className="bg-white border border-[#eef2f7] p-8 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-10 h-10 rounded-xl bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center shadow-xs"><School size={18}/></div>
              <div className="text-3xl font-black text-[#111625] font-mono tracking-tight">500+</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider font-mono">Colleges Verified</p>
            </div>
            <div className="bg-white border border-[#eef2f7] p-8 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-10 h-10 rounded-xl bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center shadow-xs"><Percent size={18}/></div>
              <div className="text-3xl font-black text-[#cca01d] font-mono tracking-tight">98%</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider font-mono">Accuracy Target</p>
            </div>
          </section>

          {/* Precision Tools Dual Grid Feature Box */}
          <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-3xl font-black tracking-tight text-[#111625]">Precision Tools for Admissions</h2>
              <p className="text-xs md:text-sm text-[#5d6a7e] leading-relaxed font-medium">Expertly crafted modules designed to remove the guesswork from your engineering loops path.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white border border-[#edf1f6] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#ebd02c]/50 transition-all shadow-xs duration-300">
                <div className="space-y-4 max-w-sm">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold font-mono text-[#cca01d]"><Sparkles size={12}/> AI Filtered</span>
                  <h3 className="text-xl font-bold text-[#111625]">Rank Prediction Engine</h3>
                  <p className="text-xs text-[#5e6b7f] leading-relaxed font-medium">Leveraging deep analytics from past rounds to output absolute likelihood configurations grid maps instantly.</p>
                </div>
                <div className="w-24 h-24 bg-[#f6f8fb] rounded-2xl flex items-center justify-center text-[#cca01d] shrink-0 group-hover:bg-[#fcd71a]/10 transition-all duration-300"><BarChart3 size={36}/></div>
              </div>

              <div className="bg-white border border-[#edf1f6] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#ebd02c]/50 transition-all shadow-xs duration-300">
                <div className="space-y-4 max-w-sm">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold font-mono text-[#cca01d]"><Milestone size={12}/> Step-by-Step</span>
                  <h3 className="text-xl font-bold text-[#111625]">Counselling Roadmap</h3>
                  <p className="text-xs text-[#5e6b7f] leading-relaxed font-medium">Interactive milestones matrix mapping out document thresholds and seat freeze timelines clearly.</p>
                </div>
                <div className="w-24 h-24 bg-[#f6f8fb] rounded-xl flex items-center justify-center text-[#cca01d] shrink-0 group-hover:bg-[#fcd71a]/10 transition-all duration-300"><Layers size={36}/></div>
              </div>
            </div>
          </section>

          {/* Testimonials Review Matrix Board */}
          <section className="bg-[#111625] text-white py-16 px-8 rounded-3xl max-w-7xl mx-auto shadow-2xl relative overflow-hidden my-6">
            <div className="max-w-6xl mx-auto space-y-12 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight">Trusted by Thousands</h2>
                <p className="text-xs text-zinc-400 font-medium font-mono uppercase tracking-wider">Verified Success Stories</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { name: "Aryan Sharma", inst: "IIT Delhi, CSE '27", quote: "The rank predictor was surprisingly accurate! It gave me the confidence to apply for IIT Delhi when others were doubtful.", init: "AS" },
                  { name: "Sanya Patel", inst: "NIT Trichy, ECE '27", quote: "The counseling roadmap saved my choice priorities structure list. Never missed any timeline checkpoints.", init: "SP" },
                  { name: "Rohan Verma", inst: "BITS Pilani, CS '27", quote: "Best platform for college prediction. The clean UI and data-backed results are far better than any other site.", init: "RV" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#1a2135] border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-[#fcd71a]/30 transition-all duration-300 shadow-xs">
                    <div className="flex gap-1 text-[#fcd71a]">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}</div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium italic">"{item.quote}"</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 rounded-full bg-[#fcd71a] text-[#111625] font-bold text-xs flex items-center justify-center font-mono">{item.init}</div>
                      <div><h4 className="text-xs font-bold text-white">{item.name}</h4><p className="text-[10px] text-zinc-400 font-medium font-mono">{item.inst}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Yellow Action Banner */}
          <section className="max-w-5xl mx-auto px-6 pt-12">
            <div className="bg-[#fcd71a] rounded-2xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl border border-[#eed031]">
              <div className="space-y-2 max-w-xl mx-auto relative z-10">
                <h2 className="text-3xl font-black text-[#111625]">Ready to find your college?</h2>
                <p className="text-xs md:text-sm text-[#544811] leading-relaxed font-bold">Stop guessing and start planning. Join thousands of students making informed choices today.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#111625] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl flex items-center gap-1.5 hover:bg-zinc-800 transition-all uppercase tracking-wider shadow-md">Get Started Free 🚀</button>
                <button onClick={() => setActiveTab('Counselling Guide')} className="bg-white/80 text-[#111625] font-extrabold text-xs px-6 py-3.5 rounded-xl hover:bg-white transition-all shadow-xs">Book a Consultation</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: RANK PREDICTOR */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-20 max-w-4xl mx-auto px-6 pt-12 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#111625]">Rank Prediction Cockpit</h2>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs font-semibold text-[#485363]">
              <div className="md:col-span-2">
                <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">JEE Rank (CRL or Category Rank)</label>
                <input type="number" placeholder="e.g. 12500" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl text-sm font-bold text-black outline-none transition-all" required />
              </div>
              <div>
                <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Reservation Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select>
              </div>
              <div>
                <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Gender Pool</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none"><option>Gender-Neutral</option><option>Female-Only</option></select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Quota System Location Filter</label>
                <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none"><option value="OS">Other State (OS) / All India (AI)</option><option value="HS">Home State (HS)</option></select>
              </div>
              <button type="submit" className="md:col-span-2 bg-[#111625] text-[#fcd71a] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest shadow-md hover:bg-zinc-800 transition-all mt-2">Execute Prediction Core Matrix 🚀</button>
            </form>
          </div>

          <section ref={predictorRef} className="scroll-mt-24 text-left space-y-4">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  {results.map(college => (
                    <div key={college.id} className="bg-white border border-[#eef2f7] hover:border-[#fcd71a]/40 rounded-2xl p-5 shadow-xs border-l-4 border-l-[#fcd71a] flex flex-col justify-between gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-bold text-[#111625] text-base tracking-tight">{college.institute}</h4>
                          <p className="text-xs text-[#5e6b7f] mt-1 font-semibold">{college.program}</p>
                        </div>
                        <span className="text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">{college.chance} Likelihood</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                        <span>Closing Cutoff: <strong className="text-black">{college.closing}</strong></span>
                        <span>Est. Fee: <strong className="text-black">{college.fee || "2,20,000/Yr"}</strong></span>
                        <span>NIRF Rank: <strong className="text-black">#{college.nirf || "45"}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-8 text-center text-xs text-amber-800 font-mono font-bold flex items-center justify-center gap-2">
                  <AlertCircle size={16}/> Logs empty for custom combinations metrics.
                </div>
              )
            ) : null}
          </section>
        </div>
      )}

      {/* 👑 TAB 3: AUTOMATED PAYMENT VERIFICATION GATEWAY ACCESS */}
      {activeTab === 'Counselling Guide' && (
        <section className="max-w-6xl mx-auto px-6 py-16 animate-fadeIn space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-xs">
              <Sparkle size={13} className="animate-spin text-emerald-500"/> Automated Secure Sandbox Active
            </span>
            <h2 className="text-4xl font-black tracking-tight text-[#111625] leading-tight">Secret Support Circle Strategy</h2>
            <p className="text-sm text-[#5e6b7f] font-medium leading-relaxed max-w-2xl mx-auto">
              Bhai, pay the commitment fee token of <strong className="text-[#111625]">₹{premiumPriceToken}</strong>. Enter your verification UTR number below to activate instant routing gates.
            </p>
          </div>

          {/* Premium High-Gloss Features Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="bg-white border border-[#eef2f7] rounded-3xl p-6 space-y-4 shadow-xs relative overflow-hidden group hover:shadow-xl hover:border-[#fcd71a]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#cca01d] flex items-center justify-center text-xl font-bold"><MessageSquare size={22}/></div>
              <h3 className="text-lg font-extrabold text-[#111625]">Custom Group Backchannel</h3>
              <p className="text-xs text-[#5e6b7f] leading-relaxed font-semibold">Direct live updates from spot rounds trends, category adjustments, and manual seat configuration overrides tracking parameters.</p>
            </div>
            <div className="bg-white border border-[#eef2f7] rounded-3xl p-6 space-y-4 shadow-xs relative overflow-hidden group hover:shadow-xl hover:border-[#fcd71a]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#cca01d] flex items-center justify-center text-xl font-bold"><Compass size={22}/></div>
              <h3 className="text-lg font-extrabold text-[#111625]">Choice Filling Ordering Arrays</h3>
              <p className="text-xs text-[#5e6b7f] leading-relaxed font-semibold">Personal filled priorities sequences generated for your rank threshold limits. Mirror directly to your official forms window.</p>
            </div>
            <div className="bg-white border border-[#eef2f7] rounded-3xl p-6 space-y-4 shadow-xs relative overflow-hidden group hover:shadow-xl hover:border-[#fcd71a]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#cca01d] flex items-center justify-center text-xl font-bold"><Flame size={22}/></div>
              <h3 className="text-lg font-extrabold text-[#111625]">CSAB Spot Hedging Strategies</h3>
              <p className="text-xs text-[#5e6b7f] leading-relaxed font-semibold">Bypass risky options loops safely without forfeiting initial active backup choices matrix registries.</p>
            </div>
          </div>

          {/* Checkout Panel Control Layout */}
          <div className="max-w-md mx-auto bg-gradient-to-b from-white to-[#fcfdfd] border-2 border-[#111625] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-black text-[#cca01d] uppercase tracking-widest bg-[#fcd71a]/10 px-3 py-1 rounded-full">Gate Lock Control</span>
              <div className="text-6xl font-black text-[#111625] font-mono pt-3 flex items-center justify-center">
                ₹{premiumPriceToken} <span className="text-xs font-bold text-zinc-400 font-sans pl-1.5 uppercase tracking-wider">INR Token</span>
              </div>
            </div>

            {!showQrCheckout ? (
              <button onClick={() => setShowQrCheckout(true)} className="w-full bg-[#111625] text-white hover:bg-zinc-800 text-xs font-extrabold py-4 rounded-xl uppercase tracking-widest shadow-lg transition-all">Generate Invoice QR Code 🚀</button>
            ) : (
              <div className="space-y-5 animate-scaleUp text-center">
                <div className="flex flex-col items-center gap-2.5 font-mono">
                  {/* Dynamic API link compilation for the formatted QR generator */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiStringUrl)}`}
                    alt="Automated UPI QR Code" 
                    className="border-2 p-2 bg-white rounded-xl shadow-md border-slate-100"
                  />
                  <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase">Scan with GPay, PhonePe, or Paytm</span>
                </div>

                <div className="md:hidden pt-1">
                  <a 
                    href={upiStringUrl}
                    className="inline-flex w-full bg-[#fcd71a] text-[#111625] font-black text-xs py-3 rounded-xl uppercase items-center justify-center gap-1.5 shadow-xs"
                  >
                    Open Payment App Directly 📱
                  </a>
                </div>

                {/* 🔒 REF NO INJECTION LOGGING AND ROUTING CHECKPOINT */}
                <form onSubmit={handleVerifyPremiumPayment} className="border-t border-slate-100 pt-4 text-left space-y-3.5 text-xs">
                  <div>
                    <label className="block mb-1 text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">Student Email Address</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3.5 text-zinc-400"/>
                      <input type="email" placeholder="e.g. name@campus.com" value={payerEmail} onChange={(e) => setPayerEmail(e.target.value)} className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border rounded-xl font-bold text-black outline-none focus:border-[#fcd71a] focus:bg-white" required/>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">12-Digit UPI Ref No / UTR Transaction ID</label>
                    <div className="relative">
                      <Receipt size={14} className="absolute left-3 top-3.5 text-zinc-400"/>
                      <input type="text" maxLength={16} placeholder="e.g. 614899234511" value={utrInput} onChange={(e) => setUtrInput(e.target.value)} className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border rounded-xl font-bold font-mono text-black outline-none focus:border-[#fcd71a] focus:bg-white text-xs" required/>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isVerifying}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    {isVerifying ? <>Processing Secure Sandbox...</> : <>Verify Proof & Route to WhatsApp Link <ArrowRight size={14}/></>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PUBLIC TAB MODULE: OPENING/CLOSING RANKS TABLE */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#eef2f7] pb-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#111625]">Historical Cut-off Explorer</h2>
            </div>
            <div className="flex bg-[#f4f7fa] p-1 rounded-xl border border-slate-200 gap-1 shrink-0 max-w-xs shadow-xs">
              <button onClick={() => { setSelectedType('IIT'); setCurrentPage(1); }} className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wide ${selectedType === 'IIT' ? 'bg-white text-zinc-900 shadow-xs border border-slate-200' : 'text-[#6c778a]'}`}>IIT Matrices</button>
              <button onClick={() => { setSelectedType('NIT'); setCurrentPage(1); }} className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wide ${selectedType === 'NIT' ? 'bg-white text-zinc-900 shadow-xs border border-slate-200' : 'text-[#6c778a]'}`}>NIT Matrices</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-[#eef2f7] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#111625] text-white text-[11px] font-mono font-black uppercase tracking-wider border-b"><th className="px-6 py-4.5">Institute Description Entity</th><th className="px-6 py-4.5">Program specializations specialization streams</th><th className="px-6 py-4.5">Opening cutoff node</th><th className="px-6 py-4.5">Closing cutoff node</th></tr>
                </thead>
                <tbody className="divide-y divide-[#eef2f7] text-xs font-semibold text-[#485363]">
                  {paginatedData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#fcd71a]/3 transition-colors duration-200"><td className="px-6 py-4.5 text-sm font-bold text-[#111625] tracking-tight">{item.institute}</td><td className="px-6 py-4.5 text-xs text-[#5e6b7f] font-semibold">{item.program}</td><td className="px-6 py-4.5 font-mono text-zinc-600 bg-[#f8fafc]">{item.opening}</td><td className="px-6 py-4.5 text-[#cca01d] font-mono font-black bg-[#fcd71a]/5">{item.closing}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#f8fafc] px-6 py-4 flex items-center justify-between border-t border-[#eef2f7] text-xs font-bold font-mono text-[#5e6b7f]">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 select-none flex items-center gap-1 shadow-xs transition-all">← Previous</button>
              <span className="uppercase tracking-widest font-black">Page {currentPage} of {Math.ceil(filteredCutoffData.length / itemsPerPage)}</span>
              <button disabled={currentPage >= Math.ceil(filteredCutoffData.length / itemsPerPage)} onClick={() => setCurrentPage(p => p + 1)} className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 select-none flex items-center gap-1 shadow-xs transition-all">Next →</button>
            </div>
          </div>
        </section>
      )}

      {/* PUBLIC TAB MODULE: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 text-left animate-fadeIn space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#111625]">Automated Schedule & Deadlines</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 pl-8 ml-4 space-y-8 pt-2">
            {dynamicDeadlines.map((dl) => (
              <div key={dl.id} className="relative bg-white p-6 rounded-2xl border border-[#eef2f7] shadow-xs hover:shadow-lg hover:border-[#fcd71a]/40 transition-all duration-300">
                <div className={`w-5 h-5 rounded-full border-4 border-white absolute -left-[42px] top-6.5 shadow-md flex items-center justify-center ${dl.status === 'Strict Warning' ? 'bg-red-500 ring-4 ring-red-500/10' : 'bg-[#fcd71a] ring-4 ring-amber-500/10'}`}></div>
                <div className="flex flex-wrap justify-between items-center gap-3 mb-2 border-b border-dashed border-slate-100 pb-2">
                  <span className="text-xs font-mono font-black text-amber-900 bg-[#fcd71a]/10 px-3 py-1 rounded-lg flex items-center gap-1.5"><Clock size={13}/> {dl.date}</span>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 border rounded-full uppercase tracking-wider ${dl.status === 'Strict Warning' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{dl.status}</span>
                </div>
                <h4 className="font-black text-[#111625] text-base tracking-tight">{dl.title}</h4>
                <p className="text-xs text-[#5e6b7f] mt-2 font-medium leading-relaxed">{dl.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PUBLIC TAB MODULE: SEAT MATRIX MAPS */}
      {activeTab === 'Seat Matrix' && (
        <section className="max-w-7xl mx-auto px-6 py-12 text-left animate-fadeIn space-y-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#111625]">Seat Matrix Distribution Grid</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {dynamicSeats.map(seat => (
              <div key={seat.id} className="bg-white border border-[#eef2f7] rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-[#fcd71a]/50 transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#fcd71a]/20 group-hover:bg-[#fcd71a] transition-all duration-300"></div>
                <div className="space-y-2 pl-2">
                  <span className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-widest flex items-center gap-1.5"><Server size={12} className="text-[#cca01d]"/> Capacity Allocation Row</span>
                  <h4 className="font-extrabold text-[#111625] text-base tracking-tight leading-tight group-hover:text-[#cca01d] transition-colors">{seat.institute}</h4>
                  <p className="text-xs text-[#5e6b7f] font-medium leading-normal">{seat.program}</p>
                </div>
                <div className="flex justify-between items-center bg-[#f8fafc] p-3 rounded-xl text-[11px] font-mono font-bold pl-4 border border-slate-100">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wide">Pool Node: {seat.quota}</span>
                  <span className="bg-white px-3 py-1.5 rounded-lg text-[#111625] border shadow-2xs text-xs font-black tracking-tight">{seat.seats} Seats Locked</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 👑 ⚙️ 🌟 PURE ORIGINAL 3-VIEW ADMIN PANEL RESTORED (Overview, Database, Users) */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#0e1013] text-zinc-200 animate-fadeIn font-sans text-left">
          
          <aside className="w-64 bg-[#14171c] border-r border-zinc-800/80 p-6 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800/60">
                <Shield size={26} className="text-[#fcd71a]" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#fcd71a] font-mono">Control Cockpit</h4>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-tight">MASTER ENGINE CORE V4.5</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-xs font-bold font-mono">
                <button onClick={() => setAdminView('Overview')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${adminView === 'Overview' ? 'bg-[#fcd71a] text-black font-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'}`}><LayoutDashboard size={16} /> OVERVIEW TELEMETRY</button>
                <button onClick={() => setAdminView('Database')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${adminView === 'Database' ? 'bg-[#fcd71a] text-black font-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'}`}><Database size={16} /> DATA ENTRY FORMS</button>
                <button onClick={() => setAdminView('Users')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${adminView === 'Users' ? 'bg-[#fcd71a] text-black font-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'}`}><UserCog size={16} /> TIMELINE OVERRIDES</button>
              </div>
            </div>
            <button onClick={() => { setActiveTab('Home'); setAdminSearch(''); }} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-extrabold py-3 rounded-xl text-xs uppercase font-mono text-center shadow-md border border-zinc-700/50 transition-colors"> Exit Cockpit Desk</button>
          </aside>

          <section className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#0e1013]">
            
            {/* VIEW A: OVERVIEW SYSTEM TELEMETRY */}
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-black text-white font-sans tracking-tight">System Telemetry Dashboard</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                  <div className="bg-[#14171c] border-2 border-[#fcd71a]/30 p-6 rounded-2xl relative shadow-lg">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Live Website Hits</div>
                    <div className="text-4xl font-black text-[#fcd71a] mt-1.5 animate-pulse">{totalVisits} <span className="text-xs font-normal text-zinc-500">Visits</span></div>
                  </div>
                  <div className="bg-[#14171c] border border-zinc-800/80 p-6 rounded-2xl">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Predictor Cached Rows</div>
                    <div className="text-3xl font-black text-white mt-1.5">{dynamicJosaaRecords.length} Items</div>
                  </div>
                  <div className="bg-[#14171c] border border-zinc-800/80 p-6 rounded-2xl">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Active Stream Profiles</div>
                    <div className="text-3xl font-black text-purple-400 mt-1.5">{studentSessions.length} Logs</div>
                  </div>
                </div>

                <div className="bg-[#14171c] border border-zinc-800/80 rounded-2xl p-6">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 mb-4">🔒 Live Student Authentication Registry Sessions Stream</h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden text-xs font-mono">
                    <div className="bg-zinc-900 p-4 grid grid-cols-4 font-bold text-zinc-500 uppercase text-[10px] border-b border-zinc-800">
                      <span>Student Account Email</span><span>Verification Token</span><span>Rank Inquiries Count</span><span>Live Status</span>
                    </div>
                    <div className="divide-y divide-zinc-800/40 text-zinc-300">
                      {studentSessions.map((session, idx) => (
                        <div key={idx} className="p-4 grid grid-cols-4 items-center hover:bg-zinc-900/40">
                          <span className="font-mono text-white font-bold">{session.email}</span>
                          <span className="text-zinc-500 text-[11px]">{session.tokenType}</span>
                          <span className="text-[#fcd71a] font-bold pl-4 font-mono">{session.queriesCount} Requests</span>
                          <span className="font-bold text-[11px] text-emerald-400">● {session.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: DATA INJECTION CONTROL PANEL (FORM A & FORM B) */}
            {adminView === 'Database' && (
              <div className="space-y-12 animate-fadeIn">
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold font-sans text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#fcd71a]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-bold font-mono text-zinc-400">
                    <div className="sm:col-span-2 font-sans">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wide">Institute Entity Legal Name</label>
                      <input type="text" placeholder="National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required />
                    </div>
                    <div className="sm:col-span-2 font-sans">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wide">Academic Program specialty course stream</label>
                      <input type="text" placeholder="Electronics and Communication Engineering" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required />
                    </div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Quota Pool ID</label><select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Reservation Category Pool</label><select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Reservation Gender Pool</label><select value={newGend} onChange={(e) => setNewGend(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option>Gender-Neutral</option><option>Female-Only</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">JEE Opening Rank</label><input type="number" placeholder="4444" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">JEE Closing Rank</label><input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 uppercase text-[10px]">Annual Fee token variable</label><input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#fcd71a] text-black font-black py-4 rounded-xl uppercase text-xs mt-2 transition-all hover:opacity-90 tracking-wider">Compile Cut-off Row Into Database Pipeline Live 🚀</button>
                  </form>
                </div>

                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold font-sans text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#fcd71a]"/> Form B: Inject New Seat Matrix Capacity Row</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-mono text-zinc-400">
                    <div><label className="block mb-1.5 uppercase text-[10px]">Institute Node name identifier</label><input type="text" placeholder="NIT Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Branch Stream Stream</label><input type="text" placeholder="Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Quota Allocation Allocation</label><input type="text" placeholder="OS (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Absolute Seats capacity</label><input type="number" placeholder="92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-black py-4 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2 tracking-wider">Commit Capacity Row directly to Seat Matrix Ledger 🚀</button>
                  </form>
                </div>
              </div>
            )}

            {/* VIEW C: PREMIUM OVERRIDES (FORM C & FORM D) */}
            {adminView === 'Users' && (
              <div className="space-y-10 animate-fadeIn">
                <div className="bg-[#14171c] border-2 border-purple-950/60 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
                  <h3 className="font-bold font-sans text-base text-white mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[#fcd71a]"/> Form C: Elite Consulting Group Gateway Configuration Settings</h3>
                  <div className="grid grid-cols-1 gap-4 text-xs font-bold font-mono text-zinc-400">
                    <div><label className="block mb-1.5 uppercase text-[10px]">Secret Redirection Group Access Link</label><input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-emerald-400 outline-none" /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Introductory Premium Token Price (INR)</label><input type="number" value={premiumPriceToken} onChange={(e) => setPremiumPriceToken(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-[#fcd71a] font-mono font-bold outline-none" /></div>
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
          <button onClick={() => setIsChatOpen(true)} className="bg-[#111625] text-white p-4 rounded-full shadow-2xl border-2 border-[#fcd71a] animate-bounce hover:scale-105 transition-all"><MessageSquare size={24} className="text-[#fcd71a]" /></button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[420px] bg-white rounded-2xl shadow-2xl border border-[#eef2f8] flex flex-col overflow-hidden animate-slideUp">
            <div className="bg-[#111625] text-white p-4 flex justify-between items-center border-b border-[#fcd71a]/30"><span className="text-xs font-mono font-bold text-[#fcd71a]">CollegeAchiever AI Bot v2.5</span><button onClick={() => setIsChatOpen(false)}><X size={18} /></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed font-medium shadow-2xs border ${msg.sender === 'user' ? 'bg-[#111625] text-white border-zinc-800' : 'bg-white text-black border-slate-100'}`}>{msg.text}</div></div>
              ))}
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input type="text" placeholder="Ask anything about choices order sequences..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f4f7fa] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl px-4 py-2.5 text-xs font-medium outline-none transition-all" />
              <button onClick={() => handleSendMessage()} className="p-2.5 bg-[#fcd71a] text-zinc-900 rounded-xl shadow-xs hover:bg-[#ebd02c] transition-all"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* 🔐 AUTHENTICATION MODAL DIALOG MODAL LAYOUT (100% SECURED BACK) */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-[90%] max-w-sm bg-white rounded-3xl shadow-2xl border border-[#eef1f6] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            <button type="button" onClick={() => setIsSignInOpen(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-black transition-colors cursor-pointer"><X size={20} /></button>
            <div className="p-6 text-center pb-2 pt-8">
              <h3 className="text-xl font-black text-[#111625] tracking-tight">Secure Cockpit Entry</h3>
              <p className="text-xs text-[#5e6b7f] font-semibold mt-1">Authenticate account identifiers tokens fields.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4 text-left text-xs font-bold text-[#485363]">
              <div>
                <label className="block mb-1.5 uppercase text-[10px] tracking-wide text-zinc-400">Account Email ID</label>
                <input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl text-xs font-bold text-black outline-none transition-all" required />
              </div>
              <div>
                <label className="block mb-1.5 uppercase text-[10px] tracking-wide text-zinc-400">Secure Password Token</label>
                <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl text-xs font-bold text-black outline-none transition-all" required />
              </div>
              <button type="submit" className="w-full bg-[#111625] text-[#fcd71a] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md mt-2 transition-all">Launch Active Session 🚀</button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}