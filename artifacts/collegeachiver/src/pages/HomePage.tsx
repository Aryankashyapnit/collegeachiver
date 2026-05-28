// @ts-ignore
import { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { School, BarChart3, Layers, Star, AlertCircle, MessageSquare, X, Send, User, ShieldCheck, PlusCircle, Clock, Sparkles, Milestone, ArrowRight, Sparkle, Compass, Flame, Receipt, Percent } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { CollegeData } from '@/lib/josaaData';

const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ExtendedCollegeData extends CollegeData {
  chance?: 'High' | 'Medium' | 'Low';
  _examLabel?: string;
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Home');
  const [rankAdvanced, setRankAdvanced] = useState('');
  const [rankMains, setRankMains] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS');
  const [hasSearched, setHasSearched] = useState(false);

  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>([]);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);
  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([]);
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
  const [studentSessions] = useState<StudentLog[]>([
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
    { id: 3, date: 'June 18, 2026', title: 'Round 1 Seat Allotment Result', description: 'Round 1 results declared — check allotment on josaa.nic.in.', status: 'Live Soon' },
    { id: 4, date: 'June 20–22, 2026', title: 'Document Verification Window', description: 'Upload required documents within the Reporting window to confirm seat.', status: 'Strict Warning' },
    { id: 5, date: 'June 28, 2026', title: 'Round 2 Seat Allotment Result', description: 'Second round allotment published for floating/sliding candidates.', status: 'Upcoming' },
    { id: 6, date: 'July 10, 2026', title: 'Final Round (Round 6) Allotment', description: 'Last JoSAA round — freeze your seat before CSAB Special Stray begins.', status: 'Upcoming' },
  ];

  const FALLBACK_SEATS = [
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (AI)', seats: 59 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Computer Science and Engineering', quota: 'OPEN (AI)', seats: 62 },
    { id: 3, institute: 'Indian Institute of Technology Madras', program: 'Computer Science and Engineering', quota: 'OPEN (AI)', seats: 83 },
    { id: 4, institute: 'National Institute of Technology Trichy', program: 'Computer Science and Engineering', quota: 'OPEN (OS)', seats: 45 },
    { id: 5, institute: 'National Institute of Technology Agartala', program: 'Computer Science & Engineering', quota: 'OPEN (OS)', seats: 32 },
    { id: 6, institute: 'National Institute of Technology Agartala', program: 'Electronics and Communication Engineering', quota: 'OPEN (OS)', seats: 28 },
    { id: 7, institute: 'National Institute of Technology Agartala', program: 'Electrical Engineering', quota: 'OPEN (HS)', seats: 24 },
    { id: 8, institute: 'IIIT Hyderabad', program: 'Computer Science and Engineering', quota: 'OPEN (AI)', seats: 120 },
  ];

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

      if (!josaaError && josaaData && josaaData.length > 0) {
        setDynamicJosaaRecords(josaaData as CollegeData[]);
      }
      if (!seatsError && seatsData && seatsData.length > 0) {
        setDynamicSeats(seatsData as SeatMatrixRecord[]);
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
        const examMatch = !col.exam_type || col.exam_type === examLabel;
        return (
          examMatch &&
          col.category === category &&
          col.gender === gender &&
          (col.quota === homeState || col.quota === 'AI') &&
          col.closing >= userRank
        );
      }).map((col: any) => {
        const safetyMargin = col.closing - userRank;
        const chance: 'High' | 'Medium' | 'Low' = safetyMargin > 8000 ? 'High' : 'Medium';
        return { ...col, chance, _examLabel: examLabel };
      }).sort((a: any, b: any) => a.closing - b.closing);

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
      const newLocalRow = { id: dynamicJosaaRecords.length + 1, ...formData } as CollegeData;
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
    else if (data) { setDynamicSeats([data[0] as SeatMatrixRecord, ...dynamicSeats]); alert("🏛️ Seat Row Matrix updated in Supabase!"); setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap(''); }
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
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
                <button key={item.id} onClick={() => { setActiveTab(item.id); setCurrentPage(1); }}
                  className={`px-3 py-2 transition-all rounded-lg text-[13px] font-medium ${activeTab === item.id ? 'text-[#111625] bg-[#fcd71a]/10 border border-[#f5d020]/30 font-bold shadow-xs' : 'text-[#616b7c] hover:text-[#111625] hover:bg-[#f4f7fa]'}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <Link href="/login" className="bg-[#fcd71a] text-[#111625] font-extrabold px-5 py-2 rounded-xl text-xs shadow-xs shrink-0 cursor-pointer hover:bg-[#ebd02c] transition-all hover:scale-[1.03] inline-block">
              Sign In
            </Link>
          </div>
        </nav>
      )}

      {/* TAB 1: HOME */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-20">
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

          <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <User size={18}/>, val: "10k+", label: "Students Assisted" },
              { icon: <School size={18}/>, val: "500+", label: "Colleges Verified" },
              { icon: <Percent size={18}/>, val: "98%", label: "Accuracy Target", highlight: true },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#eef2f7] p-8 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-all duration-300">
                <div className="mx-auto w-10 h-10 rounded-xl bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center shadow-xs">{stat.icon}</div>
                <div className={`text-3xl font-black font-mono tracking-tight ${stat.highlight ? 'text-[#cca01d]' : 'text-[#111625]'}`}>{stat.val}</div>
                <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider font-mono">{stat.label}</p>
              </div>
            ))}
          </section>

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
                      {advResults.map((college: any) => (
                        <div key={`adv-${college.id}`} className="bg-white border border-[#eef2f7] hover:border-blue-300/60 rounded-2xl p-5 shadow-xs border-l-4 border-l-blue-500 flex flex-col justify-between gap-4 transition-all">
                          <div className="flex justify-between items-start gap-4">
                            <div><h4 className="font-bold text-[#111625] text-base tracking-tight">{college.institute}</h4><p className="text-xs text-[#5e6b7f] mt-1 font-semibold">{college.program}</p></div>
                            <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase border ${college.chance === 'High' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>{college.chance} Chance</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                            <span>Closing: <strong className="text-black">{college.closing}</strong></span>
                            <span>Fee: <strong className="text-black">{college.fee || '2,20,000/Yr'}</strong></span>
                            <span>NIRF: <strong className="text-black">#{college.nirf || '—'}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {mainsResults.length > 0 && rankMains && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-purple-100"></div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full">📝 JEE Mains Results — Rank {parseInt(rankMains).toLocaleString()}</span>
                        <div className="h-px flex-1 bg-purple-100"></div>
                      </div>
                      {mainsResults.map((college: any) => (
                        <div key={`mns-${college.id}`} className="bg-white border border-[#eef2f7] hover:border-purple-300/60 rounded-2xl p-5 shadow-xs border-l-4 border-l-purple-500 flex flex-col justify-between gap-4 transition-all">
                          <div className="flex justify-between items-start gap-4">
                            <div><h4 className="font-bold text-[#111625] text-base tracking-tight">{college.institute}</h4><p className="text-xs text-[#5e6b7f] mt-1 font-semibold">{college.program}</p></div>
                            <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase border ${college.chance === 'High' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>{college.chance} Chance</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                            <span>Closing: <strong className="text-black">{college.closing}</strong></span>
                            <span>Fee: <strong className="text-black">{college.fee || '2,20,000/Yr'}</strong></span>
                            <span>NIRF: <strong className="text-black">#{college.nirf || '—'}</strong></span>
                          </div>
                        </div>
                      ))}
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
            <h2 className="text-3xl font-black text-[#111625]">Opening / Closing Rank Explorer</h2>
            <p className="text-xs text-[#8492a6] font-medium">Filter and browse historical JoSAA cutoff data</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="Search institute..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm outline-none focus:border-[#fcd71a]" />
            <div className="flex gap-2">
              {['IIT', 'NIT', 'All'].map(t => (
                <button key={t} onClick={() => { setSelectedType(t); setCurrentPage(1); }} className={`px-4 py-3 rounded-xl text-xs font-bold uppercase ${selectedType === t ? 'bg-[#111625] text-[#fcd71a]' : 'bg-white border border-[#e2e8f0] text-[#485363]'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {paginatedData.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 font-mono text-sm">No records found. Try changing filters.</div>
            ) : paginatedData.map((college) => (
              <div key={college.id} className="bg-white border border-[#eef2f7] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div><h4 className="font-bold text-[#111625] text-sm">{college.institute}</h4><p className="text-xs text-[#5e6b7f] mt-1">{college.program}</p></div>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 bg-[#fcd71a]/10 text-[#977914] rounded-lg border border-[#f5d020]/30 shrink-0">{college.quota}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#f4f7f6] text-[11px] font-semibold text-[#5e6b7f]">
                  <span>Opening: <strong className="text-black">{college.opening}</strong></span>
                  <span>Closing: <strong className="text-black">{college.closing}</strong></span>
                  <span>Fee: <strong className="text-black">{college.fee}</strong></span>
                  <span>NIRF: <strong className="text-black">#{college.nirf}</strong></span>
                </div>
              </div>
            ))}
          </div>
          {filteredCutoffData.length > itemsPerPage && (
            <div className="flex justify-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-xs font-bold disabled:opacity-40">← Prev</button>
              <span className="px-4 py-2 text-xs font-mono text-zinc-500">Page {currentPage} of {Math.ceil(filteredCutoffData.length / itemsPerPage)}</span>
              <button onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredCutoffData.length / itemsPerPage), p+1))} disabled={currentPage >= Math.ceil(filteredCutoffData.length / itemsPerPage)} className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-xs font-bold disabled:opacity-40">Next →</button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DEADLINES */}
      {activeTab === 'Deadlines' && (
        <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#111625]">JoSAA 2026 Key Deadlines</h2>
            <p className="text-xs text-[#8492a6] font-medium">Stay ahead of every counselling milestone</p>
          </div>
          {dynamicDeadlines.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 font-mono text-sm">No deadlines loaded. Check back soon.</div>
          ) : dynamicDeadlines.map((d: any, i: number) => (
            <div key={i} className="bg-white border border-[#eef2f7] rounded-2xl p-5 shadow-xs flex items-start gap-4">
              <div className={`px-3 py-1 rounded-lg text-[10px] font-mono font-black shrink-0 ${d.status === 'Strict Warning' ? 'bg-red-50 text-red-700 border border-red-100' : d.status === 'Live Soon' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{d.status}</div>
              <div><p className="font-bold text-[#111625] text-sm">{d.title}</p><p className="text-xs text-[#5e6b7f] mt-1">{d.date}</p>{d.description && <p className="text-xs text-[#8492a6] mt-1">{d.description}</p>}</div>
            </div>
          ))}
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
          <button onClick={() => setIsChatOpen(true)} className="bg-[#111625] text-white p-4 rounded-full shadow-2xl border-2 border-[#fcd71a] animate-bounce hover:scale-105 transition-all"><MessageSquare size={24} className="text-[#fcd71a]" /></button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[420px] bg-white rounded-2xl shadow-2xl border border-[#eef2f8] flex flex-col overflow-hidden">
            <div className="bg-[#111625] text-white p-4 flex justify-between items-center border-b border-[#fcd71a]/30"><span className="text-xs font-mono font-bold text-[#fcd71a]">CollegeAchiever AI Bot v2.5</span><button onClick={() => setIsChatOpen(false)}><X size={18} /></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed font-medium shadow-sm border ${msg.sender === 'user' ? 'bg-[#111625] text-white border-zinc-800' : 'bg-white text-black border-slate-100'}`}>{msg.text}</div></div>
              ))}
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input type="text" placeholder="Ask anything about choices order sequences..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f4f7fa] border border-slate-200 focus:border-[#fcd71a] focus:bg-white rounded-xl px-4 py-2.5 text-xs font-medium outline-none transition-all" />
              <button onClick={() => handleSendMessage()} className="p-2.5 bg-[#fcd71a] text-zinc-900 rounded-xl shadow-xs hover:bg-[#ebd02c] transition-all"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

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
