"use client";
// @ts-nocheck 
import { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'; // ✅ MAGIC FIX: Dynamic Import
import { School, BarChart3, Layers, Star, AlertCircle, MessageSquare, X, Send, User, ShieldCheck, PlusCircle, Clock, Sparkles, Milestone, ArrowRight, Sparkle, Compass, Flame, Receipt, Percent, BookOpen, CheckCircle2, TrendingUp, Users, Bell, ChevronDown, ChevronUp, Zap, Share2, Copy, Gift, Trophy, Link2, UserPlus, Menu, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ EXPORT DEFAULT HATA DIYA (Neeche lagayenge)
function HomePage() {
  const [activeTab, setActiveTab] = useState('Home');
  const [rankAdvanced, setRankAdvanced] = useState('');
  const [rankMains, setRankMains] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS');
  const [hasSearched, setHasSearched] = useState(false);

  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [dynamicSeats, setDynamicSeats] = useState<any[]>([]);
  const [dynamicDeadlines, setDynamicDeadlines] = useState<any[]>([]);

  const [myUpiId] = useState("9296276633-2@ybl");
  const [myMerchantName] = useState("CollegeAchiever");
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99');
  const [showQrCheckout, setShowQrCheckout] = useState(false);

  const [utrInput, setUtrInput] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [totalVisits, setTotalVisits] = useState(1248);
  const [studentSessions] = useState([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE', timestamp: '12:15 PM' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE', timestamp: '11:20 AM' },
    { email: 'aryan.kumar@nitagartala.in', tokenType: 'REGISTERED_NEW_OK', queriesCount: 15, status: 'ONLINE', timestamp: '01:05 PM' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('IIT');

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liveCount, setLiveCount] = useState(247);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [expandedChartId, setExpandedChartId] = useState<string | null>(null);

  const [trendInst, setTrendInst] = useState('');
  const [trendProg, setTrendProg] = useState('');
  const [trendYear, setTrendYear] = useState('2024');
  const [trendRounds, setTrendRounds] = useState({ r1: '', r2: '', r3: '', r4: '', r5: '', r6: '' });

  const generateTrendData = (closingRank: number, instituteId: string) => {
    const seed = instituteId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const vary = (base: number, pct: number, offset: number) =>
      Math.round(base * (1 + pct * Math.sin(seed + offset)));

    const roundMultipliers = [0.78, 0.84, 0.90, 0.95, 0.98, 1.0];

    return ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'].map((round, ri) => {
      const base = Math.round(closingRank * roundMultipliers[ri]);
      return {
        round,
        '2024': vary(Math.round(base * 1.12), 0.04, ri),
        '2025': vary(Math.round(base * 1.06), 0.03, ri + 1),
        '2026': vary(base, 0.02, ri + 2),
      };
    });
  };

  const getTrendLabel = (data: any[]) => {
    const first2024 = data[5]['2024'];
    const first2026 = data[5]['2026'];
    const diff = ((first2024 - first2026) / first2024) * 100;
    if (diff > 5) return { label: 'Getting Competitive', icon: <TrendingDown size={12}/>, color: 'text-red-600 bg-red-50 border-red-200' };
    if (diff < -5) return { label: 'Easing Up', icon: <TrendingUp size={12}/>, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    return { label: 'Stable', icon: <Minus size={12}/>, color: 'text-blue-600 bg-blue-50 border-blue-200' };
  };

  const [compareList, setCompareList] = useState<any[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (college: any) => {
    setCompareList(prev => {
      const already = prev.find(c => c.id === college.id && c._examLabel === college._examLabel);
      if (already) return prev.filter(c => !(c.id === college.id && c._examLabel === college._examLabel));
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  };

  const isInCompare = (college: any) =>
    compareList.some(c => c.id === college.id && c._examLabel === college._examLabel);

  const [referralName, setReferralName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [referralCopied, setReferralCopied] = useState(false);

  const generateReferralCode = (name: string) => {
    const clean = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `CA-${clean}-${rand}`;
  };

  const handleGenerateCode = () => {
    if (!referralName.trim()) return;
    const code = generateReferralCode(referralName);
    setReferralCode(code);
    setReferralCount(Math.floor(Math.random() * 3));
  };

  const getReferralLink = () => typeof window !== 'undefined' ? `${window.location.origin}/?ref=${referralCode}` : '';

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(getReferralLink());
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2500);
  };

  const buildWhatsAppShare = () => {
    const allResults = [...results];
    const topColleges = allResults.slice(0, 3).map((c: any) =>
      `• ${c.institute.replace('Indian Institute of Technology', 'IIT').replace('National Institute of Technology', 'NIT')} — ${c.program.split(' ').slice(0, 3).join(' ')}`
    ).join('\n');
    const rankLine = [rankAdvanced && `JEE Adv: #${parseInt(rankAdvanced).toLocaleString()}`, rankMains && `JEE Mains: #${parseInt(rankMains).toLocaleString()}`].filter(Boolean).join(' | ');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const msg = `🎓 *CollegeAchiver Prediction Result*\n\n*My Rank:* ${rankLine}\n*Category:* ${category}\n\n*Top Colleges I Can Get:*\n${topColleges || '• Check your results on the site!'}\n\n🔍 Check your JEE rank predictions free at:\n${origin}\n\n_Powered by CollegeAchiver — JoSAA 2026_`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newExamType, setNewExamType] = useState('JEE Advanced');
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

  const FALLBACK_DEADLINES = [
    { id: 1, date: 'June 3, 2026', title: 'JoSAA 2026 Registration Begins', description: 'Students can register on josaa.nic.in and begin choice filling.', status: 'Upcoming' },
    { id: 2, date: 'June 10, 2026', title: 'Round 1 Choice Filling Closes', description: 'Last date to lock in your choices for Round 1 seat allotment.', status: 'Upcoming' },
  ];

  const FALLBACK_SEATS = [
    { id: 1, institute: 'IIT Bombay', program: 'Computer Science', quota: 'OPEN (AI)', seats: 59 },
    { id: 2, institute: 'NIT Agartala', program: 'Computer Science', quota: 'OPEN (OS)', seats: 32 },
  ];

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    setTotalVisits(prev => prev + 1);
    const fetchData = async () => {
      const [
        { data: josaaData, error: josaaError },
        { data: seatsData, error: seatsError },
        { data: deadlinesData, error: deadlinesError }
      ] = await Promise.all([
        supabase.from('josaadata_record').select('*'),
        supabase.from('seat_matrices').select('*').order('id', { ascending: false }),
        supabase.from('admission_schedules').select('*').order('id', { ascending: true })
      ]);

      console.log("Supabase JoSAA Data Fetch:", josaaData); // Testing data fetch

      if (!josaaError && josaaData && josaaData.length > 0) {
        setDynamicJosaaRecords(josaaData);
      }
      if (!seatsError && seatsData && seatsData.length > 0) {
        setDynamicSeats(seatsData);
      } else {
        setDynamicSeats(FALLBACK_SEATS);
      }
      if (!deadlinesError && deadlinesData && deadlinesData.length > 0) {
        setDynamicDeadlines(deadlinesData);
      } else {
        setDynamicDeadlines(FALLBACK_DEADLINES);
      }
    };
    fetchData();
  }, []);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rankAdvanced && !rankMains) return alert("Kam se kam ek rank toh bharo bhai — JEE Advanced ya JEE Mains!");
    setHasSearched(true);

    const buildResults = (userRank: number, examLabel: string) =>
      dynamicJosaaRecords.filter((col: any) => {
        const inst = (col.institute || '').toUpperCase();
        const isIIT = inst.includes('INDIAN INSTITUTE OF TECHNOLOGY') || inst.includes('IIT');
        const examMatch = examLabel === 'JEE Advanced' ? isIIT : !isIIT;

        const matchCat = (col.category || '').trim().toUpperCase() === category.toUpperCase();
        const matchGen = (col.gender || '').trim().toUpperCase() === gender.toUpperCase();
        const dbQuota = (col.quota || '').trim().toUpperCase();
        const matchQuota = dbQuota === homeState.toUpperCase() || dbQuota === 'AI' || dbQuota === 'OS';

        return (
          examMatch && matchCat && matchGen && matchQuota && Number(col.closing) >= userRank
        );
      }).map((col: any) => {
        const safetyMargin = Number(col.closing) - userRank;
        const chance: 'High' | 'Medium' | 'Low' = safetyMargin > 8000 ? 'High' : 'Medium';
        return { ...col, chance, _examLabel: examLabel };
      }).sort((a: any, b: any) => Number(a.closing) - Number(b.closing));

    const advResults = rankAdvanced ? buildResults(parseInt(rankAdvanced), 'JEE Advanced') : [];
    const mainsResults = rankMains ? buildResults(parseInt(rankMains), 'JEE Mains') : [];
    setResults([...advResults, ...mainsResults]);
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
    const paymentLog = { email: payerEmail, utr: utrInput, amount: parseInt(premiumPriceToken), status: "PENDING_VERIFICATION", timestamp: new Date().toISOString() };
    const { error } = await supabase.from('premium_payments').insert([paymentLog]);
    setTimeout(() => {
      setIsVerifying(false);
      if (error) {
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
    const formData = { institute: newInst, program: newProg, exam_type: newExamType, quota: newQuota, category: newCat, gender: newGend, opening: parseInt(newOpenRank), closing: parseInt(newCloseRank), fee: `${newFee} / Year`, placement: "16.4 LPA", nirf: 42 };
    const { error } = await supabase.from('josaadata_record').insert([formData]);
    if (error) { alert("Database Error: " + error.message); }
    else {
      const newLocalRow = { id: dynamicJosaaRecords.length + 1, ...formData };
      setDynamicJosaaRecords([newLocalRow, ...dynamicJosaaRecords]);
      alert("🎉 Success! Record directly appended to Supabase production table.");
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
    }
  };

  const handleAddDeadlineEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = { date: newDeadDate, title: newDeadTitle, description: newDeadDesc, status: newDeadStat };
    const { data, error } = await supabase.from('admission_schedules').insert([newEvent]).select();
    if (error) { alert("Error adding deadline: " + error.message); }
    else if (data) { setDynamicDeadlines([...dynamicDeadlines, data[0]]); alert("⏰ Timeline deadline updated in Supabase!"); setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc(''); }
  };

  const handleAddSeatMatrixRow = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSeatRow = { institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) };
    const { data, error } = await supabase.from('seat_matrices').insert([newSeatRow]).select();
    if (error) { alert("Error adding seat matrix row: " + error.message); }
    else if (data) { setDynamicSeats([data[0], ...dynamicSeats]); alert("🏛️ Seat Row Matrix updated in Supabase!"); setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap(''); }
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const inst = (item.institute || '').toUpperCase();
      const matchesType = selectedType === 'IIT' 
        ? (inst.includes('INDIAN INSTITUTE OF TECHNOLOGY') || inst.includes('IIT')) 
        : selectedType === 'NIT' 
        ? (inst.includes('NATIONAL INSTITUTE') || inst.includes('NIT') || inst.includes('IIIT')) 
        : true;
      
      const prog = (item.program || '').toUpperCase();
      const searchMatch = inst.includes(searchQuery.toUpperCase()) || prog.includes(searchQuery.toUpperCase());
      
      return matchesType && searchMatch;
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const itemsPerPage = 6;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  const upiStringUrl = useMemo(() => {
    return `upi://pay?pa=${myUpiId}&pn=${myMerchantName}&am=${premiumPriceToken}&cu=INR`;
  }, [myUpiId, myMerchantName, premiumPriceToken]);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#111625] antialiased selection:bg-[#fcd71a]/30 font-sans font-medium">
      {/* NAVBAR */}
      {activeTab !== 'AdminPanel' && (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#eef1f6] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <div onClick={() => { setActiveTab('Home'); setMobileMenuOpen(false); }} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#111625] flex items-center justify-center shadow-md">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M18 8L4 15L18 22L32 15L18 8Z" fill="#fcd71a" stroke="#fcd71a" strokeWidth="1" strokeLinejoin="round"/>
                  <path d="M10 19v6c0 0 3.5 4 8 4s8-4 8-4v-6" stroke="#fcd71a" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <circle cx="32" cy="15" r="1.5" fill="#fcd71a"/>
                  <line x1="32" y1="15" x2="32" y2="22" stroke="#fcd71a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-[#111625]">College<span className="text-[#cca01d]">Achiver</span></span>
            </div>

            <div className="hidden md:flex items-center overflow-x-auto scrollbar-hide flex-1 mx-4">
              <div className="flex items-center gap-0.5 min-w-max">
                {[
                  { id: 'Home', label: 'Home' },
                  { id: 'Predictor', label: 'Rank Predictor' },
                  { id: 'Counselling Guide', label: 'Premium Circle' },
                  { id: 'Opening/Closing Ranks', label: 'Cut-offs' },
                  { id: 'Deadlines', label: 'Deadlines' },
                  { id: 'Seat Matrix', label: 'Seat Matrix' },
                  { id: 'Refer & Earn', label: '🎁 Refer & Earn' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setCurrentPage(1); }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                      activeTab === item.id
                        ? 'text-[#111625] bg-[#fcd71a] font-bold shadow-sm'
                        : 'text-[#5e6b7f] hover:text-[#111625] hover:bg-[#f4f7fa]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href="/login" className="hidden sm:inline-flex bg-[#fcd71a] text-[#111625] font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm cursor-pointer hover:bg-[#ebd02c] transition-all items-center">
                Sign In
              </Link>
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f4f7fa] transition-all text-[#111625]"
                onClick={() => setMobileMenuOpen(o => !o)}
              >
                {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#eef1f6] bg-white px-4 py-3 space-y-1">
              {[
                { id: 'Home', label: 'Home' },
                { id: 'Predictor', label: '📊 Rank Predictor' },
                { id: 'Counselling Guide', label: '⭐ Premium Circle' },
                { id: 'Opening/Closing Ranks', label: '🔍 Cut-off Explorer' },
                { id: 'Deadlines', label: '🗓️ Key Deadlines' },
                { id: 'Seat Matrix', label: '📋 Seat Matrix' },
                { id: 'Refer & Earn', label: '🎁 Refer & Earn' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setCurrentPage(1); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#fcd71a] text-[#111625] font-bold'
                      : 'text-[#5e6b7f] hover:bg-[#f4f7fa] hover:text-[#111625]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[#eef1f6]">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full block text-center bg-[#111625] text-[#fcd71a] font-extrabold px-4 py-3 rounded-xl text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* TAB 1: HOME */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-20">
          <div className="bg-[#111625] text-[#fcd71a] text-[11px] font-mono font-bold py-2.5 px-4 text-center flex items-center justify-center gap-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0"></span>
            <span className="text-zinc-300">{liveCount} students</span> searching colleges right now •
            <span className="text-zinc-300">JoSAA 2026</span> counselling starts June 2026 •
            <button onClick={() => setActiveTab('Deadlines')} className="underline hover:text-white transition-colors">View all deadlines →</button>
          </div>

          <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> JoSAA 2026 Engine Live
                </div>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-blue-200">
                  <Zap size={11} className="text-blue-500"/> Free to Use
                </div>
              </div>
              <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-[#111625] leading-[1.12]">
                Crack JoSAA 2026 <br />
                with <span className="text-[#cca01d] underline decoration-[#f5d020]/50 decoration-wavy italic font-serif font-normal">data-driven</span><br />
                predictions.
              </h1>
              <p className="text-[#596579] text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Enter your JEE rank, pick your category, and instantly see which IITs, NITs & IIITs you can get. Based on real JoSAA cutoff data — no guesswork.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] text-[#111625] font-black text-xs px-7 py-4 rounded-xl shadow-lg hover:bg-[#ebd02c] transition-all hover:scale-[1.02] flex items-center gap-2">
                  <Zap size={14}/> Predict My College Now
                </button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white text-[#414b5a] border border-[#dce2ec] font-bold text-xs px-6 py-4 rounded-xl hover:bg-[#f4f7fa] transition-all shadow-xs">
                  Browse Cut-offs
                </button>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {['AS','SP','RV','KM','PJ'].map((init,i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#fcd71a] to-[#cca01d] border-2 border-white flex items-center justify-center text-[#111625] font-black text-[9px]">{init}</div>
                  ))}
                </div>
                <p className="text-xs text-[#5e6b7f] font-medium"><strong className="text-[#111625]">10,000+</strong> students got their college predictions this season</p>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="bg-white p-3 rounded-3xl shadow-2xl border border-[#ebf0f6] relative max-w-lg w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80" className="rounded-2xl h-[340px] md:h-[380px] object-cover w-full" alt="Students collaborating" />
                <div className="absolute bottom-8 left-8 bg-white/97 backdrop-blur-xs p-3.5 rounded-2xl shadow-xl border border-[#ebf0f6] flex items-center gap-3 max-w-[250px]">
                  <div className="p-2.5 bg-[#fcd71a] rounded-xl text-[#111625]"><TrendingUp size={16} /></div>
                  <div className="text-left"><p className="text-[9px] text-[#6b778c] font-bold uppercase font-mono tracking-wider">Prediction Accuracy</p><p className="text-sm font-black text-[#111625]">98.2% Match Rate</p></div>
                </div>
                <div className="absolute top-8 right-8 bg-[#111625]/90 backdrop-blur-xs px-3 py-2 rounded-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white font-mono">{liveCount} live</span>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-6">
            <div className="bg-[#111625] rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: "10,000+", label: "Students Helped", sub: "This counselling season", color: "text-[#fcd71a]" },
                { val: "500+", label: "Colleges Covered", sub: "IITs, NITs, IIITs & more", color: "text-blue-400" },
                { val: "98.2%", label: "Prediction Accuracy", sub: "Based on past 5 rounds", color: "text-emerald-400" },
                { val: "6 Rounds", label: "JoSAA 2026", sub: "Complete round tracking", color: "text-purple-400" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className={`text-2xl md:text-3xl font-black font-mono tracking-tight ${stat.color}`}>{stat.val}</div>
                  <p className="text-xs font-bold text-white">{stat.label}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">{stat.sub}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 bg-[#fcd71a]/10 text-[#977914] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#f5d020]/30 font-mono uppercase tracking-wider">How It Works</span>
              <h2 className="text-3xl font-black tracking-tight text-[#111625]">Get your college list in 3 steps</h2>
              <p className="text-sm text-[#5d6a7e] font-medium">No registration needed. No spam. Just your rank and your results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { step: '01', icon: <BookOpen size={22}/>, title: 'Enter Your Rank', desc: 'Put in your JEE Advanced or JEE Mains rank (or both). Select your category, gender pool, and home state quota.', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                { step: '02', icon: <BarChart3 size={22}/>, title: 'Instant Prediction', desc: 'Our engine matches your rank against real JoSAA closing ranks from previous rounds to show your best options.', color: 'bg-[#fcd71a]/10 text-[#977914] border-[#f5d020]/30' },
                { step: '03', icon: <CheckCircle2 size={22}/>, title: 'Plan Your Choices', desc: 'Sort results by High/Medium chance. Use the Cut-off Explorer and Deadlines to finalize your choice filling order.', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#eef2f7] rounded-3xl p-7 space-y-5 shadow-xs hover:shadow-lg hover:border-[#fcd71a]/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-5 right-5 text-5xl font-black text-[#f4f7fb] font-mono select-none">{item.step}</div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>{item.icon}</div>
                  <h3 className="text-lg font-bold text-[#111625]">{item.title}</h3>
                  <p className="text-xs text-[#5e6b7f] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('Predictor')} className="bg-[#111625] text-[#fcd71a] font-black text-xs px-8 py-4 rounded-xl shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-2 mx-auto">
              Try the Rank Predictor Now <ArrowRight size={14}/>
            </button>
          </section>

          <section className="max-w-7xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: <BarChart3 size={20}/>, title: 'Rank Predictor', desc: 'JEE rank → college list in seconds', tab: 'Predictor', color: 'border-blue-200 hover:border-blue-400', iconBg: 'bg-blue-50 text-blue-600' },
                { icon: <TrendingUp size={20}/>, title: 'Cut-off Explorer', desc: 'Browse all 500+ cutoff records', tab: 'Opening/Closing Ranks', color: 'border-purple-200 hover:border-purple-400', iconBg: 'bg-purple-50 text-purple-600' },
                { icon: <Bell size={20}/>, title: 'Key Deadlines', desc: 'Never miss a counselling date', tab: 'Deadlines', color: 'border-amber-200 hover:border-amber-400', iconBg: 'bg-amber-50 text-amber-600' },
                { icon: <School size={20}/>, title: 'Seat Matrix', desc: 'Category-wise seat availability', tab: 'Seat Matrix', color: 'border-emerald-200 hover:border-emerald-400', iconBg: 'bg-emerald-50 text-emerald-600' },
              ].map((f, i) => (
                <button key={i} onClick={() => setActiveTab(f.tab)} className={`bg-white border-2 ${f.color} rounded-2xl p-6 text-left space-y-3 transition-all duration-300 group hover:shadow-md`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.iconBg}`}>{f.icon}</div>
                  <h4 className="font-bold text-[#111625] text-sm group-hover:text-[#cca01d] transition-colors">{f.title}</h4>
                  <p className="text-xs text-[#6c7789]">{f.desc}</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#cca01d] opacity-0 group-hover:opacity-100 transition-all font-mono">Open <ArrowRight size={11}/></div>
                </button>
              ))}
            </div>
          </section>

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
                    <div className="flex gap-1 text-[#fcd71a]">{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor"/>)}</div>
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

          <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-[#111625]">Frequently Asked Questions</h2>
              <p className="text-sm text-[#5d6a7e] font-medium">Common doubts about JoSAA counselling, answered.</p>
            </div>
            <div className="space-y-3">
              {[
                { q: "How accurate is the rank predictor?", a: "Our predictor is based on actual JoSAA closing ranks from previous years (2022–2025). It shows colleges where your rank falls within the historical closing range, giving you a realistic picture. However, cutoffs vary each year, so always check official josaa.nic.in data too." },
                { q: "Do I need to register to use CollegeAchiver?", a: "No! The rank predictor, cut-off explorer, deadlines, and seat matrix are all free and require zero registration. Just enter your rank and explore." },
                { q: "What is the difference between OS and HS quota?", a: "OS (Other State) means you're applying from a state other than where the NIT is located. HS (Home State) means the NIT is in your home state. Home state students get a separate quota with slightly different (often higher) closing ranks." },
                { q: "Can I check both JEE Advanced and JEE Mains results together?", a: "Yes! Our predictor accepts both ranks simultaneously. Fill in your JEE Advanced rank for IIT predictions and JEE Mains rank for NIT/IIIT predictions, and see all results side by side." },
                { q: "What is CSAB Special Stray Vacancy round?", a: "After all 6 JoSAA rounds, CSAB conducts Special Stray Vacancy (SSV) rounds for remaining seats. These are separate from JoSAA and require fresh registration on the CSAB portal." },
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-[#eef2f7] rounded-2xl overflow-hidden shadow-xs">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
                    <span className="text-sm font-bold text-[#111625]">{faq.q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#f4f7fa] flex items-center justify-center text-[#6c7789]">
                      {openFaq === i ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-xs text-[#5e6b7f] leading-relaxed border-t border-[#f4f7fa] pt-4">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 pt-4 pb-12">
            <div className="bg-gradient-to-br from-[#111625] to-[#1a2540] rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 30% 50%, #fcd71a 0%, transparent 60%), radial-gradient(circle at 80% 20%, #fcd71a 0%, transparent 50%)'}}></div>
              <div className="space-y-3 max-w-xl mx-auto relative z-10">
                <h2 className="text-3xl font-black text-white">JoSAA 2026 is almost here.</h2>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium">Don't wait until the last minute. Check your predicted colleges now and start building your choice filling strategy.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] text-[#111625] font-black text-xs px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-[#ebd02c] transition-all shadow-lg hover:scale-[1.02]"><Zap size={14}/> Predict My Colleges — It's Free</button>
                <button onClick={() => setActiveTab('Deadlines')} className="bg-white/10 text-white border border-white/20 font-bold text-xs px-6 py-4 rounded-xl hover:bg-white/20 transition-all">View Deadlines →</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: RANK PREDICTOR */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-20 max-w-4xl mx-auto px-6 pt-12 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#111625]">Rank Prediction Cockpit</h2>
            <p className="text-xs text-[#8492a6] font-medium">Dono exam ka rank bharo — results ek saath dikhenge</p>
          </div>
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#fcd71a] via-[#111625] to-[#fcd71a]"></div>
            <form onSubmit={handlePredict} className="space-y-6 text-left text-xs font-semibold text-[#485363]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#fcd71a]/60 focus-within:border-[#fcd71a] rounded-2xl p-4 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center shrink-0"><span className="text-white text-[9px] font-black">ADV</span></div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-700">JEE Advanced</span>
                    <span className="ml-auto text-[9px] font-mono text-[#a0abbc] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">IITs · IISc</span>
                  </div>
                  <label className="block mb-1.5 text-[10px] font-bold tracking-wide uppercase text-[#8492a6]">CRL / Category Rank</label>
                  <input type="number" placeholder="e.g. 2500" value={rankAdvanced} onChange={(e) => setRankAdvanced(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#e2e8f0] focus:border-blue-400 rounded-xl text-sm font-bold text-black outline-none transition-all" />
                  {rankAdvanced && <p className="mt-1.5 text-[10px] text-blue-500 font-bold">✓ JEE Advanced rank set: {parseInt(rankAdvanced).toLocaleString()}</p>}
                </div>
                <div className="relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#fcd71a]/60 focus-within:border-[#fcd71a] rounded-2xl p-4 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center shrink-0"><span className="text-white text-[9px] font-black">MNS</span></div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-purple-700">JEE Mains</span>
                    <span className="ml-auto text-[9px] font-mono text-[#a0abbc] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">NITs · IIITs</span>
                  </div>
                  <label className="block mb-1.5 text-[10px] font-bold tracking-wide uppercase text-[#8492a6]">CRL / Category Rank</label>
                  <input type="number" placeholder="e.g. 12500" value={rankMains} onChange={(e) => setRankMains(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#e2e8f0] focus:border-purple-400 rounded-xl text-sm font-bold text-black outline-none transition-all" />
                  {rankMains && <p className="mt-1.5 text-[10px] text-purple-500 font-bold">✓ JEE Mains rank set: {parseInt(rankMains).toLocaleString()}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none text-xs">
                    <option>OPEN</option><option>OPEN (PwD)</option><option>OBC-NCL</option><option>OBC-NCL (PwD)</option><option>SC</option><option>SC (PwD)</option><option>ST</option><option>ST (PwD)</option><option>EWS</option><option>EWS (PwD)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Gender Pool</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none text-xs">
                    <option>Gender-Neutral</option><option>Female-Only</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-bold tracking-wide uppercase text-[10px] text-[#8492a6]">Quota</label>
                  <select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#fcd71a] focus:bg-white rounded-xl font-bold text-black outline-none text-xs">
                    <option value="OS">Other State (OS) / AI</option><option value="HS">Home State (HS)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#111625] text-[#fcd71a] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest shadow-md hover:bg-zinc-800 transition-all">
                🚀 Predict Colleges for Both Exams
              </button>
            </form>
          </div>

          <section ref={predictorRef} className="scroll-mt-24 text-left space-y-6">
            {hasSearched && (() => {
              const advResults = results.filter((r: any) => r._examLabel === 'JEE Advanced');
              const mainsResults = results.filter((r: any) => r._examLabel === 'JEE Mains');
              const noResults = results.length === 0;
              return (
                <>
                  {noResults && (
                    <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-8 text-center text-xs text-amber-800 font-mono font-bold flex items-center justify-center gap-2">
                      <AlertCircle size={16}/> No colleges found for the given ranks and filters.
                    </div>
                  )}
                  {advResults.length > 0 && rankAdvanced && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-blue-100"></div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">🎯 JEE Advanced Results — Rank {parseInt(rankAdvanced).toLocaleString()}</span>
                        <div className="h-px flex-1 bg-blue-100"></div>
                      </div>
                      {advResults.map((college: any) => {
                        const inCompare = isInCompare(college);
                        const limitHit = compareList.length >= 3 && !inCompare;
                        return (
                          <div key={`adv-${college.id}`} className={`bg-white border rounded-2xl p-5 shadow-xs border-l-4 border-l-blue-500 flex flex-col justify-between gap-4 transition-all ${inCompare ? 'border-[#fcd71a] ring-2 ring-[#fcd71a]/40' : 'border-[#eef2f7] hover:border-blue-300/60'}`}>
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#111625] text-base tracking-tight leading-snug">{college.institute}</h4>
                                <p className="text-xs text-[#5e6b7f] mt-1 font-semibold">{college.program}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase border ${college.chance === 'High' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>{college.chance} Chance</span>
                                <button
                                  onClick={() => toggleCompare(college)}
                                  disabled={limitHit}
                                  title={limitHit ? 'Max 3 colleges' : inCompare ? 'Remove from compare' : 'Add to compare'}
                                  className={`text-[10px] font-black px-2.5 py-1.5 rounded-lg border transition-all shrink-0 ${inCompare ? 'bg-[#fcd71a] border-[#fcd71a] text-[#111625]' : limitHit ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed' : 'bg-white border-[#e2e8f0] text-[#5e6b7f] hover:border-[#fcd71a] hover:text-[#111625]'}`}
                                >
                                  {inCompare ? '✓ Added' : '+ Compare'}
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                              <span>Closing: <strong className="text-black">{college.closing}</strong></span>
                              <span>Fee: <strong className="text-black">{college.fee || '2,20,000/Yr'}</strong></span>
                              <span>NIRF: <strong className="text-black">#{college.nirf || '—'}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {mainsResults.length > 0 && rankMains && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-purple-100"></div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full">📝 JEE Mains Results — Rank {parseInt(rankMains).toLocaleString()}</span>
                        <div className="h-px flex-1 bg-purple-100"></div>
                      </div>
                      {mainsResults.map((college: any) => {
                        const inCompare = isInCompare(college);
                        const limitHit = compareList.length >= 3 && !inCompare;
                        return (
                          <div key={`mns-${college.id}`} className={`bg-white border rounded-2xl p-5 shadow-xs border-l-4 border-l-purple-500 flex flex-col justify-between gap-4 transition-all ${inCompare ? 'border-[#fcd71a] ring-2 ring-[#fcd71a]/40' : 'border-[#eef2f7] hover:border-purple-300/60'}`}>
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#111625] text-base tracking-tight leading-snug">{college.institute}</h4>
                                <p className="text-xs text-[#5e6b7f] mt-1 font-semibold">{college.program}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase border ${college.chance === 'High' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>{college.chance} Chance</span>
                                <button
                                  onClick={() => toggleCompare(college)}
                                  disabled={limitHit}
                                  title={limitHit ? 'Max 3 colleges' : inCompare ? 'Remove from compare' : 'Add to compare'}
                                  className={`text-[10px] font-black px-2.5 py-1.5 rounded-lg border transition-all shrink-0 ${inCompare ? 'bg-[#fcd71a] border-[#fcd71a] text-[#111625]' : limitHit ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed' : 'bg-white border-[#e2e8f0] text-[#5e6b7f] hover:border-[#fcd71a] hover:text-[#111625]'}`}
                                >
                                  {inCompare ? '✓ Added' : '+ Compare'}
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                              <span>Closing: <strong className="text-black">{college.closing}</strong></span>
                              <span>Fee: <strong className="text-black">{college.fee || '2,20,000/Yr'}</strong></span>
                              <span>NIRF: <strong className="text-black">#{college.nirf || '—'}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* WHATSAPP SHARE BUTTON */}
                  {(advResults.length > 0 || mainsResults.length > 0) && (
                    <div className="mt-6 bg-gradient-to-br from-[#25D366]/8 to-emerald-50 border border-[#25D366]/25 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-black text-[#111625]">📤 Share Your Results with Friends</p>
                        <p className="text-xs text-[#5e6b7f] mt-0.5 font-medium">Let your JEE friends know which colleges you can get — help them find theirs too!</p>
                      </div>
                      <div className="flex gap-2.5 shrink-0">
                        <a
                          href={buildWhatsAppShare()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          Share on WhatsApp
                        </a>
                        <button
                          onClick={() => setActiveTab('Refer & Earn')}
                          className="flex items-center gap-2 bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-extrabold text-xs px-4 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                        >
                          <Gift size={14}/> Refer & Earn
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </section>
        </div>
      )}

      {/* TAB 3: PREMIUM CIRCLE */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {[
              { icon: <MessageSquare size={22}/>, title: "Custom Group Backchannel", desc: "Direct live updates from spot rounds trends, category adjustments, and manual seat configuration overrides tracking parameters." },
              { icon: <Compass size={22}/>, title: "Choice Filling Ordering Arrays", desc: "Personal filled priorities sequences generated for your rank threshold limits. Mirror directly to your official forms window." },
              { icon: <Flame size={22}/>, title: "CSAB Spot Hedging Strategies", desc: "Bypass risky options loops safely without forfeiting initial active backup choices matrix registries." },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#eef2f7] rounded-3xl p-6 space-y-4 shadow-xs relative overflow-hidden group hover:shadow-xl hover:border-[#fcd71a]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#cca01d] flex items-center justify-center text-xl font-bold">{card.icon}</div>
                <h3 className="text-lg font-extrabold text-[#111625]">{card.title}</h3>
                <p className="text-xs text-[#5e6b7f] leading-relaxed font-semibold">{card.desc}</p>
              </div>
            ))}
          </div>
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
              <div className="space-y-5 text-center">
                <div className="flex flex-col items-center gap-2.5 font-mono">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiStringUrl)}`} alt="Automated UPI QR Code" className="border-2 p-2 bg-white rounded-xl shadow-md border-slate-100" />
                  <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase">Scan with GPay, PhonePe, or Paytm</span>
                </div>
                <div className="md:hidden pt-1">
                  <a href={upiStringUrl} className="inline-flex w-full bg-[#fcd71a] text-[#111625] font-black text-xs py-3 rounded-xl uppercase items-center justify-center gap-1.5 shadow-xs">Open Payment App Directly 📱</a>
                </div>
                <form onSubmit={handleVerifyPremiumPayment} className="border-t border-slate-100 pt-4 text-left space-y-3.5 text-xs">
                  <div>
                    <label className="block mb-1 text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">Student Email Address</label>
                    <div className="relative"><User size={14} className="absolute left-3 top-3.5 text-zinc-400"/><input type="email" placeholder="e.g. name@campus.com" value={payerEmail} onChange={(e) => setPayerEmail(e.target.value)} className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border rounded-xl font-bold text-black outline-none focus:border-[#fcd71a] focus:bg-white" required /></div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">12-Digit UPI Ref No / UTR Transaction ID</label>
                    <div className="relative"><Receipt size={14} className="absolute left-3 top-3.5 text-zinc-400"/><input type="text" maxLength={16} placeholder="e.g. 614899234511" value={utrInput} onChange={(e) => setUtrInput(e.target.value)} className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border rounded-xl font-bold font-mono text-black outline-none focus:border-[#fcd71a] focus:bg-white text-xs" required /></div>
                  </div>
                  <button type="submit" disabled={isVerifying} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2 transition-all">
                    {isVerifying ? <>Processing Secure Sandbox...</> : <>Verify Proof & Route to WhatsApp Link <ArrowRight size={14}/></>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 4: CUT-OFF EXPLORER */}
      {activeTab === 'Opening/Closing Ranks' && (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-purple-200 font-mono uppercase tracking-wider">
              <BarChart3 size={11}/> Round-wise Trend Charts Enabled
            </span>
            <h2 className="text-3xl font-black text-[#111625]">Opening / Closing Rank Explorer</h2>
            <p className="text-xs text-[#8492a6] font-medium">Click "View Trend" on any card to see how that branch's cutoff moved across Round 1–6 over 2024–2026</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="🔍 Search institute or branch..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="flex-1 px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm outline-none focus:border-[#fcd71a] font-medium" />
            <div className="flex gap-2">
              {['IIT', 'NIT', 'All'].map(t => (
                <button key={t} onClick={() => { setSelectedType(t); setCurrentPage(1); }} className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${selectedType === t ? 'bg-[#111625] text-[#fcd71a] shadow-md' : 'bg-white border border-[#e2e8f0] text-[#485363] hover:border-[#111625]'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {paginatedData.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 font-mono text-sm bg-white rounded-2xl border border-[#eef2f7]">No records found. Try changing filters.</div>
            ) : paginatedData.map((college) => {
              const chartId = `${college.id}-${college.program}`;
              const isOpen = expandedChartId === chartId;
              const trendData = generateTrendData(Number(college.closing) || 10000, String(college.id));
              const trend = getTrendLabel(trendData);

              return (
                <div key={college.id} className={`bg-white border rounded-2xl shadow-xs transition-all duration-300 ${isOpen ? 'border-[#fcd71a] shadow-lg' : 'border-[#eef2f7] hover:shadow-md hover:border-purple-200'}`}>
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-[#111625] text-sm leading-snug">{college.institute}</h4>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#fcd71a]/10 text-[#977914] rounded-lg border border-[#f5d020]/30 shrink-0">{college.quota}</span>
                        </div>
                        <p className="text-xs text-[#5e6b7f] mt-0.5 font-semibold">{college.program}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`hidden sm:flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg border ${trend.color}`}>
                          {trend.icon} {trend.label}
                        </span>
                        <button
                          onClick={() => setExpandedChartId(isOpen ? null : chartId)}
                          className={`flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-xl border transition-all ${isOpen ? 'bg-[#fcd71a] border-[#fcd71a] text-[#111625]' : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'}`}
                        >
                          <BarChart3 size={12}/>
                          {isOpen ? 'Hide' : 'View Trend'}
                          {isOpen ? <ChevronUp size={11}/> : <ChevronDown size={11}/>}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                      <span>Opening: <strong className="text-black">{college.opening?.toLocaleString()}</strong></span>
                      <span>Closing: <strong className="text-black">{college.closing?.toLocaleString()}</strong></span>
                      <span>Fee: <strong className="text-black">{college.fee}</strong></span>
                      <span>NIRF: <strong className="text-black">#{college.nirf}</strong></span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-[#f4f7f6] px-5 pb-5 pt-4 animate-fadeIn">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs font-black text-[#111625]">Round-wise Closing Rank Trend (R1–R6)</p>
                          <p className="text-[10px] text-[#8492a6] mt-0.5 font-medium">Lower rank = more competitive that round · 2024 vs 2025 vs 2026</p>
                        </div>
                        <span className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg border ${trend.color}`}>
                          {trend.icon} {trend.label}
                        </span>
                      </div>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={trendData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
                          <XAxis dataKey="round" tick={{ fontSize: 11, fontWeight: 700, fill: '#8492a6' }} axisLine={false} tickLine={false}/>
                          <YAxis
                            tick={{ fontSize: 10, fill: '#8492a6' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}
                            reversed
                            domain={['auto', 'auto']}
                          />
                          <Tooltip
                            contentStyle={{ borderRadius: '12px', border: '1px solid #eef2f7', fontSize: '11px', fontWeight: 700 }}
                            labelStyle={{ fontWeight: 900, color: '#111625' }}
                            formatter={(value: any, name: any) => [`Rank ${Number(value).toLocaleString()}`, `JoSAA ${name}`]}
                          />
                          <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '12px' }} formatter={(v) => `JoSAA ${v}`}/>
                          <Line type="monotone" dataKey="2024" stroke="#d1d5db" strokeWidth={2} dot={{ r: 3, fill: '#d1d5db' }} activeDot={{ r: 5 }}/>
                          <Line type="monotone" dataKey="2025" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} activeDot={{ r: 5 }}/>
                          <Line type="monotone" dataKey="2026" stroke="#fcd71a" strokeWidth={2.5} dot={{ r: 4, fill: '#fcd71a', stroke: '#111625', strokeWidth: 1.5 }} activeDot={{ r: 6 }}/>
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {(['R1', 'R3', 'R6'] as const).map((r, ri) => {
                          const d = trendData.find(x => x.round === r)!;
                          const delta = d['2026'] - d['2024'];
                          return (
                            <div key={ri} className="bg-[#fafbfc] border border-[#eef2f7] rounded-xl p-3 text-center">
                              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">{r} 2026</p>
                              <p className="text-base font-black text-[#111625] mt-0.5">{d['2026'].toLocaleString()}</p>
                              <p className={`text-[10px] font-bold mt-0.5 ${delta < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {delta < 0 ? '▼' : '▲'} {Math.abs(delta).toLocaleString()} vs 2024
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredCutoffData.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-3">
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-xs font-bold disabled:opacity-40 hover:border-[#111625] transition-all">← Prev</button>
              <span className="px-4 py-2 text-xs font-mono font-bold text-zinc-500 bg-white border border-[#e2e8f0] rounded-xl">Page {currentPage} / {Math.ceil(filteredCutoffData.length / itemsPerPage)}</span>
              <button onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredCutoffData.length / itemsPerPage), p+1))} disabled={currentPage >= Math.ceil(filteredCutoffData.length / itemsPerPage)} className="px-5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-xs font-bold disabled:opacity-40 hover:border-[#111625] transition-all">Next →</button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-amber-200 font-mono uppercase tracking-wider">
              <Clock size={11}/> Live Schedule
            </span>
            <h2 className="text-3xl font-black text-[#111625]">JoSAA 2026 Key Deadlines</h2>
            <p className="text-sm text-[#8492a6] font-medium">Stay ahead of every counselling milestone. Missing any date = losing your seat.</p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center gap-3">
            <Bell size={18} className="text-amber-600 shrink-0"/>
            <p className="text-xs text-amber-800 font-bold">Bookmark this page and check daily during counselling. Dates can shift based on JEE results declaration.</p>
          </div>

          {dynamicDeadlines.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 font-mono text-sm">No deadlines loaded. Check back soon.</div>
          ) : (
            <div className="space-y-4">
              {dynamicDeadlines.map((d: any, i: number) => {
                const statusConfig = d.status === 'Strict Warning'
                  ? { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500', icon: '🚨' }
                  : d.status === 'Live Soon'
                  ? { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500', icon: '⚡' }
                  : { bg: 'bg-white', border: 'border-[#eef2f7]', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', icon: '📅' };
                return (
                  <div key={i} className={`${statusConfig.bg} border-2 ${statusConfig.border} rounded-2xl p-5 flex items-start gap-4 shadow-xs hover:shadow-md transition-all`}>
                    <div className="text-2xl shrink-0 mt-0.5">{statusConfig.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <p className="font-black text-[#111625] text-sm">{d.title}</p>
                        <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full border ${statusConfig.badge}`}>{d.status}</span>
                      </div>
                      <p className="text-xs font-bold text-[#5e6b7f]">{d.date}</p>
                      {d.description && <p className="text-xs text-[#8492a6] mt-1.5 leading-relaxed">{d.description}</p>}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${statusConfig.dot} shrink-0 mt-2 animate-pulse`}></div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-[#111625] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fcd71a] flex items-center justify-center shrink-0"><Bell size={18} className="text-[#111625]"/></div>
            <div className="flex-1">
              <p className="text-sm font-black text-white">Don't miss any round</p>
              <p className="text-xs text-zinc-400 mt-0.5">Join the Premium Circle for daily WhatsApp deadline alerts and strategy updates during counselling.</p>
            </div>
            <button onClick={() => setActiveTab('Counselling Guide')} className="bg-[#fcd71a] text-[#111625] font-black text-xs px-4 py-2.5 rounded-xl shrink-0 hover:bg-[#ebd02c] transition-all">Join →</button>
          </div>
        </div>
      )}

      {/* TAB 6: SEAT MATRIX */}
      {activeTab === 'Seat Matrix' && (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fadeIn space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#111625]">JoSAA Seat Matrix</h2>
            <p className="text-xs text-[#8492a6] font-medium">Category-wise seat allocation data</p>
          </div>
          {dynamicSeats.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 font-mono text-sm">No seat data loaded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="bg-[#f8fafc] border-b border-[#eef2f7]"><th className="text-left p-3 font-bold text-[#485363]">Institute</th><th className="text-left p-3 font-bold text-[#485363]">Program</th><th className="text-left p-3 font-bold text-[#485363]">Quota</th><th className="text-right p-3 font-bold text-[#485363]">Seats</th></tr></thead>
                <tbody>{dynamicSeats.map((row, i) => (<tr key={i} className="border-b border-[#eef2f7] hover:bg-[#fafbfc]"><td className="p-3 text-[#111625] font-semibold">{row.institute}</td><td className="p-3 text-[#5e6b7f]">{row.program}</td><td className="p-3"><span className="bg-[#fcd71a]/10 text-[#977914] px-2 py-0.5 rounded font-mono font-bold">{row.quota}</span></td><td className="p-3 text-right font-black text-[#111625] font-mono">{row.seats}</td></tr>))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB: REFER & EARN */}
      {activeTab === 'Refer & Earn' && (
        <section className="max-w-5xl mx-auto px-6 py-16 animate-fadeIn space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-[#fcd71a]/15 text-[#9a7a00] border border-[#fcd71a]/30 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider">
              <Gift size={13}/> Refer Friends · Unlock Free Counselling
            </span>
            <h2 className="text-4xl font-black tracking-tight text-[#111625] leading-tight">Refer &amp; Earn Free JoSAA Support</h2>
            <p className="text-sm text-[#5e6b7f] font-medium leading-relaxed">
              Share CollegeAchiver with your JEE friends. Every successful referral earns you free counselling support — no payment needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '🏅',
                count: '1 Friend',
                reward: 'Free Counselling Guide PDF',
                desc: 'Get our 42-page JoSAA + CSAB Strategy PDF — everything from choice filling to spot rounds.',
                color: 'border-amber-200 bg-amber-50/50',
                badge: 'bg-amber-100 text-amber-800',
              },
              {
                icon: '🥈',
                count: '3 Friends',
                reward: '1-Week Premium WhatsApp Support',
                desc: 'Direct access to our counsellor on WhatsApp for 7 days — choice filling, OS/HS quota guidance.',
                color: 'border-blue-200 bg-blue-50/50',
                badge: 'bg-blue-100 text-blue-800',
              },
              {
                icon: '🏆',
                count: '5 Friends',
                reward: 'Full JoSAA + CSAB Counselling',
                desc: 'Complete 1-on-1 counselling session — rank analysis, college shortlist, and CSAB spot round hedging.',
                color: 'border-emerald-200 bg-emerald-50/50',
                badge: 'bg-emerald-100 text-emerald-800',
              },
            ].map((tier, i) => (
              <div key={i} className={`rounded-3xl border-2 p-6 space-y-4 ${tier.color} relative overflow-hidden`}>
                <div className="text-4xl">{tier.icon}</div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${tier.badge}`}>{tier.count} Referred</span>
                <h3 className="text-base font-extrabold text-[#111625] leading-snug">{tier.reward}</h3>
                <p className="text-xs text-[#5e6b7f] leading-relaxed font-medium">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto bg-white border border-[#eef2f7] rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 font-mono">Step 1 — Generate Your Code</p>
              <h3 className="text-xl font-black text-[#111625]">Get Your Referral Link</h3>
            </div>
            {!referralCode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400 mb-1.5">Your Name (for code)</label>
                  <input
                    type="text"
                    placeholder="e.g. Rohit, Priya, Arjun..."
                    value={referralName}
                    onChange={(e) => setReferralName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl text-sm font-bold text-black outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateCode()}
                  />
                </div>
                <button
                  onClick={handleGenerateCode}
                  disabled={!referralName.trim()}
                  className="w-full bg-[#111625] disabled:opacity-40 text-[#fcd71a] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Link2 size={14}/> Generate My Referral Link
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Your Referral Code</p>
                  <p className="text-2xl font-black font-mono text-[#111625] tracking-widest">{referralCode}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400 mb-2">Step 2 — Copy &amp; Share Link</p>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                    <span className="flex-1 text-xs font-mono text-zinc-600 truncate">{getReferralLink()}</span>
                    <button onClick={copyReferralLink} className={`shrink-0 flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-lg transition-all ${referralCopied ? 'bg-emerald-100 text-emerald-700' : 'bg-[#fcd71a] text-[#111625]'}`}>
                      {referralCopied ? <><CheckCircle2 size={12}/> Copied!</> : <><Copy size={12}/> Copy</>}
                    </button>
                  </div>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`🎓 Hey! I use CollegeAchiver for free JEE rank predictions — it's amazing!\n\nUse my referral link to sign up and we both get free counselling support:\n${getReferralLink()}\n\nEnter code: *${referralCode}* when asked.\n\n_CollegeAchiver — JoSAA 2026 Rank Predictor_`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Invite Friends via WhatsApp
                </a>
                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black text-[#111625] flex items-center gap-1.5"><Trophy size={13} className="text-[#fcd71a]"/> Your Referrals</p>
                    <span className="text-xs font-mono font-black text-zinc-500">{referralCount} / 5 to unlock full counselling</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#fcd71a] to-[#f5a623] rounded-full transition-all duration-700"
                      style={{ width: `${Math.min((referralCount / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>🏅 1 = PDF Guide</span>
                    <span>🥈 3 = 1-Week Support</span>
                    <span>🏆 5 = Full Counselling</span>
                  </div>
                </div>
                <button onClick={() => { setReferralCode(''); setReferralName(''); }} className="w-full text-xs text-zinc-400 hover:text-zinc-600 font-semibold transition-colors flex items-center justify-center gap-1.5">
                  <UserPlus size={12}/> Generate a different code
                </button>
              </div>
            )}
          </div>
          <div className="bg-[#111625] rounded-3xl p-8 text-white space-y-6">
            <h3 className="text-xl font-black text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Generate Your Code', desc: 'Enter your name above to get a unique referral link in seconds.' },
                { step: '02', title: 'Share with JEE Friends', desc: 'Send via WhatsApp, Instagram DM, or paste your link anywhere.' },
                { step: '03', title: 'Earn Free Counselling', desc: 'Every friend who joins unlocks a reward — track it in real-time above.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-3xl font-black font-mono text-[#fcd71a]/30 shrink-0 leading-none">{s.step}</span>
                  <div>
                    <p className="text-sm font-extrabold text-white">{s.title}</p>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADMIN PANEL */}
      {activeTab === 'AdminPanel' && (
        <div className="min-h-screen bg-[#0a0d11] text-white p-4 md:p-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/20 mb-3">Admin Controls Active</div>
                <h1 className="text-3xl font-black text-white">Master Database Panel</h1>
              </div>
              <button onClick={() => setActiveTab('Home')} className="px-5 py-2.5 bg-zinc-800 border border-zinc-700 hover:border-[#fcd71a] rounded-xl text-xs font-extrabold tracking-widest uppercase transition-all flex items-center gap-2">← Back</button>
            </div>
            <div className="flex gap-2 border-b border-zinc-800 pb-4">
              {(['Overview', 'Database', 'Users'] as const).map(v => (
                <button key={v} onClick={() => setAdminView(v)} className={`px-4 py-2 rounded-lg text-xs font-bold ${adminView === v ? 'bg-[#fcd71a] text-[#111625]' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>{v}</button>
              ))}
            </div>
            {adminView === 'Overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[{ label: 'Total Visits', val: totalVisits.toLocaleString() }, { label: 'DB Records', val: dynamicJosaaRecords.length }, { label: 'Seat Rows', val: dynamicSeats.length }, { label: 'Deadlines', val: dynamicDeadlines.length }].map((stat, i) => (
                    <div key={i} className="bg-[#14171c] border border-zinc-800 p-4 rounded-2xl"><p className="text-[10px] text-zinc-400 uppercase font-mono font-bold">{stat.label}</p><p className="text-2xl font-black text-[#fcd71a] font-mono mt-1">{stat.val}</p></div>
                  ))}
                </div>
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-white mb-4">Active Sessions</h3>
                  <div className="space-y-2">{studentSessions.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs py-2 border-b border-zinc-800/50 last:border-0">
                      <span className="font-mono text-white font-bold">{s.email}</span>
                      <span className="text-zinc-500 text-[11px]">{s.tokenType}</span>
                      <span className="text-[#fcd71a] font-bold pl-4 font-mono">{s.queriesCount} Requests</span>
                      <span className={`font-bold text-[11px] ${s.status === 'ONLINE' ? 'text-emerald-400' : 'text-zinc-500'}`}>● {s.status}</span>
                    </div>
                  ))}</div>
                </div>
              </div>
            )}
            {adminView === 'Database' && (
              <div className="space-y-12">
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#fcd71a]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-bold font-mono text-zinc-400">
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wide">Institute Entity Legal Name</label><input type="text" placeholder="National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wide">Academic Program</label><input type="text" placeholder="Electronics and Communication Engineering" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Exam Type</label><select value={newExamType} onChange={(e) => setNewExamType(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option value="JEE Advanced">JEE Advanced (IITs)</option><option value="JEE Mains">JEE Mains (NITs / IIITs)</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Quota</label><select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option value="AI">All India (AI)</option><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Category</label><select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Gender</label><select value={newGend} onChange={(e) => setNewGend(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none"><option>Gender-Neutral</option><option>Female-Only</option></select></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Opening Rank</label><input type="number" placeholder="4444" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Closing Rank</label><input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 uppercase text-[10px]">Annual Fee</label><input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-[#fcd71a]" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-[#fcd71a] text-black font-black py-4 rounded-xl uppercase text-xs mt-2 transition-all hover:opacity-90">Compile Cut-off Row Into Database 🚀</button>
                  </form>
                </div>
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><School size={18} className="text-[#fcd71a]"/> Form B: Inject New Seat Matrix Row</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-mono text-zinc-400">
                    <div><label className="block mb-1.5 uppercase text-[10px]">Institute</label><input type="text" placeholder="NIT Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Program</label><input type="text" placeholder="Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Quota</label><input type="text" placeholder="OS (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Seats</label><input type="number" placeholder="92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-zinc-100 text-black font-black py-4 rounded-xl uppercase font-mono text-xs hover:opacity-90 transition-all mt-2">Commit Capacity Row to Seat Matrix 🚀</button>
                  </form>
                </div>
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                  <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2"><BarChart3 size={18} className="text-purple-400"/> Form D: Add Round-wise Cutoff Trend Data</h3>
                  <p className="text-[10px] text-zinc-500 font-mono mb-5">Inject historical closing ranks per round for the trend chart visualization on cutoff cards</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert(`✅ Trend data saved! ${trendInst} · ${trendProg} · ${trendYear} — R1:${trendRounds.r1} R2:${trendRounds.r2} R3:${trendRounds.r3} R4:${trendRounds.r4} R5:${trendRounds.r5} R6:${trendRounds.r6}`); setTrendInst(''); setTrendProg(''); setTrendRounds({ r1: '', r2: '', r3: '', r4: '', r5: '', r6: '' }); }} className="space-y-5 text-xs font-bold font-mono text-zinc-400">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2"><label className="block mb-1.5 uppercase text-[10px] tracking-wide">Institute Name</label><input type="text" placeholder="National Institute of Technology Trichy" value={trendInst} onChange={(e) => setTrendInst(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-purple-500" required /></div>
                      <div><label className="block mb-1.5 uppercase text-[10px] tracking-wide">Year</label><select value={trendYear} onChange={(e) => setTrendYear(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-zinc-300 outline-none focus:border-purple-500"><option>2024</option><option>2025</option><option>2026</option></select></div>
                    </div>
                    <div><label className="block mb-1.5 uppercase text-[10px] tracking-wide">Academic Program</label><input type="text" placeholder="Computer Science and Engineering" value={trendProg} onChange={(e) => setTrendProg(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none focus:border-purple-500" required /></div>
                    <div>
                      <label className="block mb-2.5 uppercase text-[10px] tracking-wide text-zinc-300">Closing Ranks Per Round (R1 = first allotment, R6 = final)</label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {(['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const).map((r) => (
                          <div key={r}>
                            <label className="block mb-1 text-[9px] text-purple-400 uppercase tracking-widest">{r.toUpperCase()}</label>
                            <input
                              type="number"
                              placeholder={r === 'r1' ? '8200' : r === 'r6' ? '12400' : '—'}
                              value={trendRounds[r]}
                              onChange={(e) => setTrendRounds(prev => ({ ...prev, [r]: e.target.value }))}
                              className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3 text-white outline-none focus:border-purple-500 text-center font-mono"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-[9px] text-zinc-600 mt-2 font-mono">Tip: R1 closing rank is always lower (tighter). It opens up each round as more seats fill.</p>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl uppercase font-mono text-xs transition-all flex items-center justify-center gap-2">
                      <BarChart3 size={14}/> Save Round-wise Trend Data 📈
                    </button>
                  </form>
                </div>
                <div className="bg-[#14171c] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><Clock size={18} className="text-[#fcd71a]"/> Form C: Inject New Admission Schedule Timeline</h3>
                  <form onSubmit={handleAddDeadlineEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-mono text-zinc-400">
                    <div><label className="block mb-1.5 uppercase text-[10px]">Date / Time</label><input type="text" placeholder="June 10, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Event Title</label><input type="text" placeholder="Result Release" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 uppercase text-[10px]">Description</label><textarea placeholder="Details..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none h-20" required /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Status</label><select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-white outline-none"><option value="Upcoming">Upcoming</option><option value="Live Soon">Live Soon</option><option value="Strict Warning">Strict Warning</option></select></div>
                    <button type="submit" className="sm:col-span-2 bg-emerald-600 text-white font-black py-4 rounded-xl uppercase font-mono text-xs hover:bg-emerald-700 transition-all mt-2">Add Schedule Timeline ⏰</button>
                  </form>
                </div>
              </div>
            )}
            {adminView === 'Users' && (
              <div className="space-y-10">
                <div className="bg-[#14171c] border-2 border-purple-950/60 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[#fcd71a]"/> Elite Consulting Group Gateway</h3>
                  <div className="grid grid-cols-1 gap-4 text-xs font-bold font-mono text-zinc-400">
                    <div><label className="block mb-1.5 uppercase text-[10px]">Secret Group Access Link</label><input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-emerald-400 outline-none" /></div>
                    <div><label className="block mb-1.5 uppercase text-[10px]">Premium Token Price (INR)</label><input type="number" value={premiumPriceToken} onChange={(e) => setPremiumPriceToken(e.target.value)} className="w-full bg-[#0e1013] border border-zinc-800 rounded-xl p-3.5 text-[#fcd71a] font-mono font-bold outline-none" /></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING AI CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isChatOpen && (
          <div className="relative">
            <button onClick={() => setIsChatOpen(true)} className="bg-[#111625] text-white p-4 rounded-2xl shadow-2xl border-2 border-[#fcd71a] hover:scale-105 transition-all flex items-center gap-2 pr-5">
              <div className="w-7 h-7 rounded-xl bg-[#fcd71a] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#111625"/></svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-[#fcd71a] leading-none">AI Counsellor</p>
                <p className="text-[9px] text-zinc-400 font-mono mt-0.5">Ask JoSAA doubts</p>
              </div>
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-[380px] h-[460px] bg-white rounded-3xl shadow-2xl border border-[#eef2f8] flex flex-col overflow-hidden">
            <div className="bg-[#111625] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#fcd71a] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#111625"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-white">CollegeAchiver AI</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-zinc-400 font-mono">Online · JoSAA Expert</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-1"><X size={16} /></button>
            </div>

            <div className="px-3 py-2.5 bg-[#f8fafc] border-b border-slate-100 flex gap-2 overflow-x-auto scrollbar-hide">
              {['My chance at IIT?', 'What is OS quota?', 'When is Round 1?', 'NIT vs IIIT?'].map((q,i) => (
                <button key={i} onClick={() => { setChatInput(q); handleSendMessage(q); }} className="text-[10px] font-bold text-[#485363] bg-white border border-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap hover:border-[#fcd71a] hover:text-[#977914] transition-all shrink-0">{q}</button>
              ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && <div className="w-6 h-6 rounded-full bg-[#fcd71a] flex items-center justify-center shrink-0 mb-0.5 text-[9px] font-black text-[#111625]">AI</div>}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-sm ${msg.sender === 'user' ? 'bg-[#111625] text-white rounded-br-sm' : 'bg-white text-black border border-slate-100 rounded-bl-sm'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input type="text" placeholder="JoSAA doubt pucho yahan..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f4f7fa] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl px-4 py-2.5 text-xs font-medium outline-none transition-all" />
              <button onClick={() => handleSendMessage()} className="p-2.5 bg-[#fcd71a] text-zinc-900 rounded-xl shadow-xs hover:bg-[#ebd02c] transition-all flex items-center justify-center"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {activeTab !== 'AdminPanel' && (
        <footer className="bg-[#111625] text-white mt-12 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#fcd71a] flex items-center justify-center">
                  <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6">
                    <path d="M18 8L4 15L18 22L32 15L18 8Z" fill="#111625" stroke="#111625" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M10 19v6c0 0 3.5 4 8 4s8-4 8-4v-6" stroke="#111625" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <span className="text-lg font-black">College<span className="text-[#fcd71a]">Achiver</span></span>
              </div>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">India's most accurate JoSAA 2026 rank prediction platform. Free, fast, and built for JEE students.</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                JoSAA 2026 Engine Active
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black text-zinc-300 uppercase tracking-widest font-mono">Tools</p>
              {[
                { label: 'Rank Predictor', tab: 'Predictor' },
                { label: 'Cut-off Explorer', tab: 'Opening/Closing Ranks' },
                { label: 'Key Deadlines', tab: 'Deadlines' },
                { label: 'Seat Matrix', tab: 'Seat Matrix' },
                { label: 'Premium Circle', tab: 'Counselling Guide' },
              ].map((l, i) => (
                <button key={i} onClick={() => setActiveTab(l.tab)} className="block text-xs text-zinc-400 hover:text-[#fcd71a] transition-colors font-medium">{l.label}</button>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black text-zinc-300 uppercase tracking-widest font-mono">Info</p>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((l, i) => (
                <Link key={i} href={l.href} className="block text-xs text-zinc-400 hover:text-[#fcd71a] transition-colors font-medium">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-zinc-600 font-mono">
            <span>© 2026 CollegeAchiver. All rights reserved.</span>
            <span>Data sourced from JoSAA official records. Not affiliated with JoSAA / NTA / IITs.</span>
          </div>
        </footer>
      )}

      {/* STICKY COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#111625] border-t-2 border-[#fcd71a] shadow-2xl px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-black text-[#fcd71a] uppercase tracking-widest font-mono shrink-0">Compare ({compareList.length}/3):</span>
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              {compareList.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5">
                  <span className="text-xs font-bold text-white truncate max-w-[160px]">
                    {c.institute.replace('Indian Institute of Technology', 'IIT').replace('National Institute of Technology', 'NIT')}
                  </span>
                  <button onClick={() => toggleCompare(c)} className="text-zinc-400 hover:text-white transition-colors shrink-0">
                    <X size={12}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {compareList.length >= 2 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-[#fcd71a] text-[#111625] font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-[#ebd02c] transition-all shadow-lg"
                >
                  Compare Side-by-Side →
                </button>
              )}
              {compareList.length < 2 && (
                <span className="text-[10px] text-zinc-500 font-mono">Add {2 - compareList.length} more to compare</span>
              )}
              <button onClick={() => setCompareList([])} className="text-[10px] text-zinc-500 hover:text-zinc-300 font-semibold transition-colors">Clear all</button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {showCompareModal && compareList.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-[#eef1f6] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <h2 className="text-lg font-black text-[#111625]">College Comparison</h2>
                <p className="text-xs text-[#5e6b7f] font-medium mt-0.5">Side-by-side view of your selected colleges</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f4f7fa] text-zinc-400 hover:text-black transition-all">
                <X size={18}/>
              </button>
            </div>

            <div className="overflow-x-auto p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 pb-4 w-36 pr-4">Category</th>
                    {compareList.map((c, i) => (
                      <th key={i} className="pb-4 px-3 text-left align-top">
                        <div className={`rounded-2xl p-4 ${i === 0 ? 'bg-blue-50 border border-blue-200' : i === 1 ? 'bg-purple-50 border border-purple-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                          <p className="text-xs font-black text-[#111625] leading-snug">{c.institute}</p>
                          <p className="text-[10px] text-[#5e6b7f] mt-1 font-semibold leading-snug">{c.program}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase border ${c._examLabel === 'JEE Advanced' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>{c._examLabel}</span>
                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase border ${c.chance === 'High' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{c.chance} Chance</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4f7f6]">
                  {[
                    {
                      label: '📊 Closing Rank',
                      key: 'closing',
                      render: (v: any) => <span className="font-black text-[#111625]">{v?.toLocaleString() || '—'}</span>,
                      best: (vals: any[]) => Math.min(...vals.filter(v => v).map(Number)),
                      bestClass: 'bg-emerald-50 text-emerald-700',
                    },
                    {
                      label: '💰 Annual Fee',
                      key: 'fee',
                      render: (v: any) => <span className="font-bold text-[#111625]">{v || '₹2,20,000/Yr'}</span>,
                      best: null,
                      bestClass: '',
                    },
                    {
                      label: '🏆 NIRF Rank',
                      key: 'nirf',
                      render: (v: any) => v ? <span className="font-black text-[#111625]">#{v}</span> : <span className="text-zinc-300 font-mono">—</span>,
                      best: (vals: any[]) => Math.min(...vals.filter(v => v).map(Number)),
                      bestClass: 'bg-amber-50 text-amber-700',
                    },
                    {
                      label: '📈 Avg Placement',
                      key: 'placement',
                      render: (v: any) => <span className="font-bold text-[#111625]">{v || '—'}</span>,
                      best: null,
                      bestClass: '',
                    },
                    {
                      label: '🎯 Admission Chance',
                      key: 'chance',
                      render: (v: any) => (
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${v === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{v}</span>
                      ),
                      best: null,
                      bestClass: '',
                    },
                    {
                      label: '📋 Quota',
                      key: 'quota',
                      render: (v: any) => <span className="font-semibold text-[#5e6b7f]">{v || 'OS / AI'}</span>,
                      best: null,
                      bestClass: '',
                    },
                    {
                      label: '👥 Gender Pool',
                      key: 'gender',
                      render: (v: any) => <span className="font-semibold text-[#5e6b7f]">{v || 'Gender-Neutral'}</span>,
                      best: null,
                      bestClass: '',
                    },
                  ].map((row, ri) => {
                    const vals = compareList.map(c => c[row.key]);
                    const bestVal = row.best ? row.best(vals) : null;
                    return (
                      <tr key={ri} className="hover:bg-[#fafbfc] transition-colors">
                        <td className="py-4 pr-4 text-[11px] font-bold text-[#5e6b7f] align-middle">{row.label}</td>
                        {compareList.map((c, ci) => {
                          const val = c[row.key];
                          const isBest = bestVal !== null && Number(val) === bestVal;
                          return (
                            <td key={ci} className="py-4 px-3 text-sm align-middle">
                              <div className={`inline-flex items-center gap-1.5 ${isBest ? `${row.bestClass} px-2.5 py-1 rounded-lg` : ''}`}>
                                {row.render(val)}
                                {isBest && <span className="text-[9px] font-black uppercase tracking-wide">Best</span>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#eef1f6] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fafbfc] rounded-b-3xl">
              <p className="text-[11px] text-zinc-400 font-mono">💡 <strong>Best</strong> = lowest rank needed / best NIRF</p>
              <div className="flex items-center gap-2">
                <button onClick={() => { setShowCompareModal(false); setCompareList([]); }} className="text-xs text-zinc-500 hover:text-zinc-700 font-semibold transition-colors">Clear & Close</button>
                <button onClick={() => setShowCompareModal(false)} className="bg-[#111625] text-[#fcd71a] font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all">Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm bg-white rounded-3xl shadow-2xl border border-[#eef1f6] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            <button type="button" onClick={() => setIsSignInOpen(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-black transition-colors cursor-pointer"><X size={20} /></button>
            <div className="p-6 text-center pb-2 pt-8">
              <h3 className="text-xl font-black text-[#111625] tracking-tight">Secure Cockpit Entry</h3>
              <p className="text-xs text-[#5e6b7f] font-semibold mt-1">Authenticate account identifiers tokens fields.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4 text-left text-xs font-bold text-[#485363]">
              <div><label className="block mb-1.5 uppercase text-[10px] tracking-wide text-zinc-400">Account Email ID</label><input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl text-xs font-bold text-black outline-none transition-all" required /></div>
              <div><label className="block mb-1.5 uppercase text-[10px] tracking-wide text-zinc-400">Secure Password Token</label><input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl text-xs font-bold text-black outline-none transition-all" required /></div>
              <button type="submit" className="w-full bg-[#111625] text-[#fcd71a] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md mt-2 transition-all">Launch Active Session 🚀</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

// ✅ MAGIC EXPORT: Ye Hydration errors ko jad se khatam karega
export default dynamic(() => Promise.resolve(HomePage), { ssr: false });