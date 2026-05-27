// @ts-nocheck
'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, QrCode, MessageCircle, Sparkles, Milestone, HelpCircle, ArrowRight, Server, Shield, Sparkle, Compass, Flame, Receipt } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [gender, setGender] = useState('Gender-Neutral');
  const [homeState, setHomeState] = useState('OS');
  const [hasSearched, setHasSearched] = useState(false);

  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState([]);
  const [results, setResults] = useState([]);

  const [dynamicSeats, setDynamicSeats] = useState([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  const [dynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Choice Filling Starts', desc: 'Choices lock karne ki process active hogi.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026', title: 'Choice Filling Window Closes', desc: 'System window close hone se pehle changes lock kar dega.', status: 'Strict Warning' }
  ]);

  const [myUpiId] = useState("9296276633@axl");
  const [myMerchantName] = useState("CollegeAchiever");
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99');
  const [showQrCheckout, setShowQrCheckout] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [totalVisits, setTotalVisits] = useState(1248);
  const [studentSessions] = useState([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE' },
    { email: 'sanya.patel@delhi.edu', tokenType: 'OAUTH_GOOGLE_OK', queriesCount: 8, status: 'OFFLINE' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('IIT');

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 JoSAA/CSAB counselling ka koi doubt yahan pucho!' }
  ]);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');

  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000');

  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  const predictorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchJosaaData = async () => {
      const { data, error } = await supabase.from('josaadata_record').select('*');
      if (!error && data) setDynamicJosaaRecords(data);
    };
    fetchJosaaData();
    setTotalVisits(prev => prev + 1);
  }, []);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return alert("Rank enter karo!");
    setHasSearched(true);
    const userRank = parseInt(rank);
    const filtered = dynamicJosaaRecords.filter(col => 
      col.category === category && col.gender === gender && (col.quota === homeState || col.quota === "AI") && col.closing >= userRank
    ).map(col => ({ ...col, chance: (col.closing - userRank > 8000) ? 'High' : ((col.closing - userRank >= 0) ? 'Medium' : 'Low') }));
    filtered.sort((a, b) => a.closing - b.closing);
    setResults(filtered);
    setTimeout(() => predictorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => setMessages(prev => [...prev, { sender: 'bot', text: `Query registered! 🚀` }]), 800);
  };

  const handleVerifyPremiumPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    await supabase.from('premium_payments').insert([{ email: payerEmail, utr: utrInput, amount: parseInt(premiumPriceToken), status: "PENDING_VERIFICATION", timestamp: new Date().toISOString() }]);
    setTimeout(() => {
      setIsVerifying(false);
      window.open(premiumGroupUrl, '_blank');
      setShowQrCheckout(false);
    }, 1200);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
      setActiveTab('AdminPanel');
      setIsSignInOpen(false);
      setEmailInput(''); setPasswordInput('');
    } else {
      setIsSignInOpen(false);
    }
  };

  const handleAddCutoffRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      institute: newInst, program: newProg, quota: newQuota, category: newCat,
      gender: newGend, opening: parseInt(newOpenRank), closing: parseInt(newCloseRank),
      fee: `${newFee} / Year`, placement: "16.4 LPA", nirf: 42
    };
    setDynamicJosaaRecords(prev => [formData, ...prev]);
    alert("Record Live!");
    supabase.from('josaadata_record').insert([formData]).then();
    setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
  };

  const handleAddSeatMatrixRow = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSeatRow = { 
      id: Date.now() + Math.random(), 
      institute: newSeatInst, 
      program: newSeatProg, 
      quota: newSeatQuota, 
      seats: parseInt(newSeatCap) 
    };
    setDynamicSeats(prev => [newSeatRow, ...prev]);
    alert("🏛️ Seat Matrix Frontend Updated!");
    setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? (item.institute.includes('IIT') || item.institute.includes('Indian Institute of Technology')) 
        : selectedType === 'NIT' ? (item.institute.includes('NIT') || item.institute.includes('National Institute of Technology')) : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const paginatedData = useMemo(() => filteredCutoffData.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6), [filteredCutoffData, currentPage]);
  const upiStringUrl = useMemo(() => `upi://pay?pa=${myUpiId}&pn=${myMerchantName}&am=${premiumPriceToken}&cu=INR`, [myUpiId, myMerchantName, premiumPriceToken]);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#111625] antialiased font-sans font-medium">
      {activeTab !== 'AdminPanel' && (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-1 bg-[#ecd042] rounded-full"></div>
              <div className="text-xl font-bold tracking-tight">College<span className="text-[#cca01d] font-extrabold">Achiever</span></div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3 text-xs font-semibold">
              {[ { id: 'Home', label: 'Home' }, { id: 'Predictor', label: 'Rank Predictor' }, { id: 'Counselling Guide', label: 'Premium Circle' }, { id: 'Opening/Closing Ranks', label: 'Cut-off Explorer' }, { id: 'Deadlines', label: 'Key Deadlines' }, { id: 'Seat Matrix', label: 'Seat Matrix' }].map((item) => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setCurrentPage(1); }} className={`px-3 py-2 rounded-lg transition-all ${activeTab === item.id ? 'bg-[#fcd71a]/10 font-bold' : 'text-[#616b7c] hover:bg-[#f4f7fa]'}`}>{item.label}</button>
              ))}
            </div>
            <button onClick={() => setIsSignInOpen(true)} className="bg-[#fcd71a] font-extrabold px-5 py-2 rounded-xl text-xs shadow-xs">Sign In (Admin)</button>
          </div>
        </nav>
      )}

      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-20">
          <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl md:text-[52px] font-black leading-[1.12]">Your journey to the right college starts here.</h1>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white border font-bold text-xs px-6 py-3.5 rounded-lg shadow-xs">View Cut-offs</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-20 max-w-4xl mx-auto px-6 pt-12 space-y-12">
          <div className="text-center space-y-2"><h2 className="text-3xl font-black">Rank Prediction Cockpit</h2></div>
          <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-[#485363]">
              <div className="md:col-span-2"><label className="block mb-2 font-bold uppercase text-[10px]">JEE Rank</label><input type="number" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border rounded-xl" required /></div>
              <div><label className="block mb-2 font-bold uppercase text-[10px]">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border rounded-xl"><option>OPEN</option><option>OBC-NCL</option><option>SC</option><option>ST</option></select></div>
              <div><label className="block mb-2 font-bold uppercase text-[10px]">Gender</label><select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border rounded-xl"><option>Gender-Neutral</option><option>Female-Only</option></select></div>
              <div className="md:col-span-2"><label className="block mb-2 font-bold uppercase text-[10px]">State Quota</label><select value={homeState} onChange={(e) => setHomeState(e.target.value)} className="w-full px-4 py-3.5 bg-[#f8fafc] border rounded-xl"><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option></select></div>
              <button type="submit" className="md:col-span-2 bg-[#111625] text-[#fcd71a] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest">Execute Prediction 🚀</button>
            </form>
          </div>
          <section ref={predictorRef} className="space-y-4">
            {hasSearched && results.map(college => (
              <div key={college.id || Math.random()} className="bg-white border rounded-2xl p-5 shadow-xs border-l-4 border-l-[#fcd71a]">
                <h4 className="font-bold">{college.institute}</h4><p className="text-xs">{college.program} | {college.chance}</p>
              </div>
            ))}
          </section>
        </div>
      )}

      {activeTab === 'Counselling Guide' && (
        <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-12">
          <h2 className="text-4xl font-black">Secret Support Circle Strategy</h2>
          <button onClick={() => setShowQrCheckout(true)} className="bg-[#111625] text-white font-extrabold py-4 px-8 rounded-xl uppercase">Generate QR Code 🚀</button>
          {showQrCheckout && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiStringUrl)}`} className="mx-auto border p-2 bg-white rounded-xl shadow-md" />}
        </section>
      )}

      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-7xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-3xl font-black">Historical Cut-off Explorer</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead><tr className="bg-[#111625] text-white text-[11px] font-mono uppercase"><th className="p-4">Institute</th><th className="p-4">Program</th><th className="p-4">Opening</th><th className="p-4">Closing</th></tr></thead>
              <tbody>{paginatedData.map((item, idx) => <tr key={idx} className="border-b"><td className="p-4">{item.institute}</td><td className="p-4">{item.program}</td><td className="p-4">{item.opening}</td><td className="p-4">{item.closing}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'Seat Matrix' && (
        <section className="max-w-7xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-3xl font-black">Seat Matrix Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicSeats.map(seat => (
              <div key={seat.id} className="bg-white border rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-5 border-l-4 border-l-[#fcd71a]">
                <div><h4 className="font-extrabold">{seat.institute}</h4><p className="text-xs">{seat.program}</p></div>
                <div className="bg-[#f8fafc] p-3 rounded-xl text-xs font-bold flex justify-between"><span>{seat.quota}</span><span>{seat.seats} Seats</span></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'Deadlines' && (
        <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
          <h2 className="text-3xl font-black">Automated Schedule & Deadlines</h2>
          {dynamicDeadlines.map(dl => <div key={dl.id} className="bg-white p-6 rounded-2xl border mb-4"><h4 className="font-black">{dl.title}</h4><p className="text-xs">{dl.date}</p></div>)}
        </section>
      )}

      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#0e1013] text-zinc-200">
          <aside className="w-64 bg-[#14171c] border-r border-zinc-800/80 p-6 flex flex-col justify-between">
            <div className="space-y-8">
              <h4 className="font-black uppercase text-[#fcd71a] tracking-wider">Control Cockpit</h4>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <button onClick={() => setAdminView('Overview')} className="p-3 bg-zinc-800 rounded">Overview</button>
                <button onClick={() => setAdminView('Database')} className="p-3 bg-zinc-800 rounded">Database Entry</button>
              </div>
            </div>
            <button onClick={() => setActiveTab('Home')} className="p-3 bg-red-900 rounded font-bold">Exit</button>
          </aside>

          <section className="flex-1 p-10 overflow-y-auto">
            {adminView === 'Overview' && <h2 className="text-2xl font-black mb-6">Telemetry (Live Records: {dynamicJosaaRecords.length})</h2>}
            {adminView === 'Database' && (
              <div className="space-y-12">
                <div className="bg-[#14171c] p-6 rounded-2xl border border-zinc-800">
                  <h3 className="font-bold text-[#fcd71a] mb-4">Form A: Add Cutoff Record</h3>
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-2 gap-4 text-black text-xs font-bold">
                    <input placeholder="Institute" value={newInst} onChange={e => setNewInst(e.target.value)} className="p-3 rounded" required />
                    <input placeholder="Program" value={newProg} onChange={e => setNewProg(e.target.value)} className="p-3 rounded" required />
                    <input type="number" placeholder="Open Rank" value={newOpenRank} onChange={e => setNewOpenRank(e.target.value)} className="p-3 rounded" required />
                    <input type="number" placeholder="Close Rank" value={newCloseRank} onChange={e => setNewCloseRank(e.target.value)} className="p-3 rounded" required />
                    <button type="submit" className="col-span-2 bg-[#fcd71a] p-3 rounded">Submit Cutoff</button>
                  </form>
                </div>
                <div className="bg-[#14171c] p-6 rounded-2xl border border-zinc-800">
                  <h3 className="font-bold text-[#fcd71a] mb-4">Form B: Add Seat Matrix Record</h3>
                  <form onSubmit={handleAddSeatMatrixRow} className="grid grid-cols-2 gap-4 text-black text-xs font-bold">
                    <input placeholder="Institute" value={newSeatInst} onChange={e => setNewSeatInst(e.target.value)} className="p-3 rounded" required />
                    <input placeholder="Program" value={newSeatProg} onChange={e => setNewSeatProg(e.target.value)} className="p-3 rounded" required />
                    <input placeholder="Quota" value={newSeatQuota} onChange={e => setNewSeatQuota(e.target.value)} className="p-3 rounded" required />
                    <input type="number" placeholder="Seats" value={newSeatCap} onChange={e => setNewSeatCap(e.target.value)} className="p-3 rounded" required />
                    <button type="submit" className="col-span-2 bg-[#fcd71a] p-3 rounded">Submit Seat Matrix</button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm bg-white p-8 rounded-3xl relative">
            <button onClick={() => setIsSignInOpen(false)} className="absolute top-4 right-4"><X /></button>
            <h3 className="text-xl font-black mb-4">Admin Login</h3>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input type="email" placeholder="admin@achiver.com" value={emailInput} onChange={e => setEmailInput(e.target.value)} className="w-full p-3 border rounded-xl" required />
              <input type="password" placeholder="admin123" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} className="w-full p-3 border rounded-xl" required />
              <button type="submit" className="w-full bg-black text-white p-3 rounded-xl font-bold">Login</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}