'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { School, Award, TrendingUp, Search, MapPin, Download, CheckSquare, Layers, BarChart3, ChevronLeft, ChevronRight, Mail, Share2, Globe, CheckCircle, Star, BookOpen, ShieldAlert, FileText, Activity, Percent, Clock, AlertCircle, Calendar, RefreshCw, MessageSquare, X, Send, Lock, User, UserPlus, LayoutDashboard, Database, UserCog, ShieldCheck, PlusCircle, Eye, QrCode, MessageCircle, Sparkles, Milestone, HelpCircle } from 'lucide-react';
import { massiveJosaaData, CollegeData } from './josaaData';
import { createClient } from '@supabase/supabase-js';

// 🔥 DIRECT SUPABASE CLIENT INJECTION
const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub25fMTg0IiwiaWF0IjoxNzEzNDU2Nzg5LCJleHAiOjIwMjk3MTI3ODl9.your-actual-remaining-key-part"; // Apni key rehne dena bhai
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

  // Database Arrays
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<CollegeData[]>(massiveJosaaData);
  const [results, setResults] = useState<ExtendedCollegeData[]>([]);

  const [dynamicSeats, setDynamicSeats] = useState<SeatMatrixRecord[]>([
    { id: 1, institute: 'Indian Institute of Technology Bombay', program: 'Computer Science and Engineering', quota: 'OPEN (Neutral)', seats: 124 },
    { id: 2, institute: 'Indian Institute of Technology Delhi', program: 'Data Science & AI', quota: 'OPEN (Neutral)', seats: 40 },
    { id: 3, institute: 'National Institute of Technology Agartala', program: 'Electronics & Communication Engineering', quota: 'OS (Neutral)', seats: 92 }
  ]);

  const [dynamicDeadlines, setDynamicDeadlines] = useState([
    { id: 1, date: 'June 10, 2026', title: 'JEE Advanced Result & Cut-off Release', desc: 'Organizing IIT ke dwara final rank card aur official qualifying cut-offs publish honge.', status: 'Upcoming' },
    { id: 2, date: 'June 15, 2026', title: 'Online Registration & Preference Choice Filling Starts', desc: 'Students choices online fill karna shuru kar sakte hain.', status: 'Live Soon' },
    { id: 3, date: 'June 25, 2026 (5:00 PM)', title: 'Choice Filling Window Closes & Auto-Locking', desc: 'Bhai, ye sabse critical timestamp hai! Window lock hone se pehle changes save kar lena.', status: 'Strict Warning' }
  ]);

  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPriceToken, setPremiumPriceToken] = useState('99'); 
  const [showQrCheckout, setShowQrCheckout] = useState(false);

  // System meters
  const [totalVisits, setTotalVisits] = useState(1248); 
  const [studentSessions, setStudentSessions] = useState<StudentLog[]>([
    { email: 'student.test@achiver.in', tokenType: 'OTP_EMAIL_OK', queriesCount: 12, status: 'ONLINE', timestamp: '12:15 PM' },
    { email: 'aryan.kumar@nitagartala.in', tokenType: 'REGISTERED_NEW_OK', queriesCount: 15, status: 'ONLINE', timestamp: '01:05 PM' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('IIT'); 

  // Chatbot logic
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey roomie! 👋 Main hoon aapka CollegeAchiver AI Assistant. JoSAA/CSAB counselling ka koi bhi doubt yahan pucho!' }
  ]);

  // Auth Modals
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Control panel view states
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Form inputs
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
      setMessages(prev => [...prev, { sender: 'bot', text: `Bhai query register ho gayi hai, Premium group entry lekar support connect karein! 🚀` }]);
    }, 800);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.toLowerCase() === 'admin@achiver.com' && passwordInput === 'admin123') {
      alert("Welcome Admin Saheb! 👑");
      setActiveTab('AdminPanel');
      setIsSignInOpen(false);
      return;
    }
    setActiveTab('Home');
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
      alert("Database error: " + error.message);
    } else {
      const updated = [{ id: dynamicJosaaRecords.length + 1, ...formData }, ...dynamicJosaaRecords];
      setDynamicJosaaRecords(updated);
      alert("🎉 Success! Record added to Supabase production table.");
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
    }
  };

  const handleAddDeadlineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...dynamicDeadlines, { id: dynamicDeadlines.length + 1, date: newDeadDate, title: newDeadTitle, desc: newDeadDesc, status: newDeadStat }];
    setDynamicDeadlines(updated);
    alert("⏰ Deadline Add Hogayi!");
  };

  const handleAddSeatMatrixRow = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...dynamicSeats, { id: dynamicSeats.length + 1, institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap) }];
    setDynamicSeats(updated);
    alert("🏛️ Seat Row Add Hogayi!");
  };

  const filteredCutoffData = useMemo(() => {
    return dynamicJosaaRecords.filter(item => {
      const matchesType = selectedType === 'IIT' ? item.institute.includes('Indian Institute of Technology') : selectedType === 'NIT' ? item.institute.includes('National Institute of Technology') : true;
      return matchesType && item.institute.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [selectedType, searchQuery, dynamicJosaaRecords]);

  const itemsPerPage = 5;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; return filteredCutoffData.slice(start, start + itemsPerPage);
  }, [filteredCutoffData, currentPage]);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#1e2229] antialiased selection:bg-[#f3cc14]/30">
      
      {/* 🌟 PREMIUM GLOSSY NAVBAR MATCHING MOCKUP */}
      {activeTab !== 'AdminPanel' && (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eef1f6] px-6 py-4 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Brand Identity Logo */}
            <div onClick={() => setActiveTab('Home')} className="flex items-center gap-2 cursor-pointer select-none">
              <div className="w-4 h-1 bg-[#ecd042] rounded-full"></div>
              <div className="text-xl font-bold tracking-tight text-[#111625] font-sans">
                College<span className="text-[#cca01d] font-extrabold">Achiever</span>
              </div>
            </div>

            {/* Navbar Menu Elements Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
              {[
                { id: 'Home', label: 'Home' },
                { id: 'Predictor', label: 'Predictor' },
                { id: 'Counselling Guide', label: 'Roadmap' },
                { id: 'Opening/Closing Ranks', label: 'Ranks' },
                { id: 'Seat Matrix', label: 'Colleges' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setCurrentPage(1); }} 
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-all ${activeTab === item.id ? 'text-[#111625] bg-[#f9db3b]/10 border border-[#f5d020]/30 font-semibold' : 'text-[#616b7c] hover:text-[#111625] hover:bg-[#f4f7fa]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth CTAs */}
            <div className="flex items-center gap-3">
              <button onClick={() => { setIsSignUpMode(false); setIsSignInOpen(true); }} className="text-[13px] font-semibold text-[#485262] hover:text-[#111625] px-3 py-1.5 transition-all">Sign In</button>
              <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-bold text-[12px] px-4 py-2 rounded-lg transition-all shadow-xs">Get Started</button>
            </div>
          </div>
        </nav>
      )}

      {/* 📋 DYNAMIC ACTIVE TAB RENDERING INTERFACES */}
      
      {/* BRAND NEW UPDATED MOCKUP HOME VIEW ACCENT OVERHAUL */}
      {activeTab === 'Home' && (
        <div className="animate-fadeIn pb-20">
          
          {/* Hero Section Container */}
          <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#fbe76c]/15 text-[#977914] text-[11px] font-bold px-3 py-1 rounded-full border border-[#fce95c]/30">
                <span className="w-1.5 h-1.5 bg-[#ebd02c] rounded-full animate-ping"></span> JoSAA 2026 Predictor Live
              </div>
              <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-[#111625] leading-[1.12] font-sans">
                Your journey to the <br />
                <span className="text-[#baa327] underline decoration-[#f5d020]/40 decoration-wavy italic font-serif font-normal">right</span> college starts <br />
                here.
              </h1>
              <p className="text-[#596579] text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Navigate the complexities of Indian college admissions with AI-driven rank predictions and personalized counseling roadmaps.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#fcd71a] text-[#111625] font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:bg-[#ebd02c] transition-all">Start Predicting ➜</button>
                <button onClick={() => setActiveTab('Opening/Closing Ranks')} className="bg-white text-[#414b5a] border border-[#dce2ec] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-[#f4f7fa] transition-all">View Cut-offs</button>
              </div>
            </div>

            {/* Hero Right Media Element Mockup Wrapper */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="bg-white p-3 rounded-2xl shadow-2xl border border-[#ebf0f6] relative max-w-lg w-full overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" 
                  className="rounded-xl h-[340px] md:h-[400px] object-cover w-full grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" 
                  alt="Student Dashboard"
                />
                {/* Embedded Widget Box Badge Layout */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-xl border border-[#ebf0f6] flex items-center gap-3 animate-bounce max-w-[240px]">
                  <div className="p-2 bg-[#fcd71a]/20 rounded-lg text-[#baa327]"><Sparkles size={18} /></div>
                  <div className="text-left"><p className="text-[10px] text-[#6b778c] font-bold uppercase font-mono">Current Rank Likelihood</p><p className="text-sm font-black text-[#111625]">98.2% Accurate</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Core Summary Grid Stats Block */}
          <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#eef2f7] p-8 rounded-xl shadow-xs hover:shadow-md transition-all text-center space-y-2">
              <div className="mx-auto w-8 h-8 rounded-full bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center"><User size={16}/></div>
              <div className="text-3xl font-black text-[#111625] font-mono">10k+</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider">Students Assisted in 2025</p>
            </div>
            <div className="bg-white border border-[#eef2f7] p-8 rounded-xl shadow-xs hover:shadow-md transition-all text-center space-y-2">
              <div className="mx-auto w-8 h-8 rounded-full bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center"><School size={16}/></div>
              <div className="text-3xl font-black text-[#111625] font-mono">500+</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider">Colleges Indexed & Verified</p>
            </div>
            <div className="bg-white border border-[#eef2f7] p-8 rounded-xl shadow-xs hover:shadow-md transition-all text-center space-y-2">
              <div className="mx-auto w-8 h-8 rounded-full bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center"><Percent size={16}/></div>
              <div className="text-3xl font-black text-[#cca01d] font-mono">98%</div>
              <p className="text-[11px] text-[#6c7789] font-bold uppercase tracking-wider">Accuracy in Admission Predictions</p>
            </div>
          </section>

          {/* Core Feature Dynamic Sub Modules Intro Block */}
          <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111625]">Precision Tools for Admissions</h2>
              <p className="text-xs md:text-sm text-[#5d6a7e] leading-relaxed font-medium">Expertly crafted modules designed to remove the guesswork from your engineering and medical career path.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Feature Box 1 */}
              <div className="bg-white border border-[#edf1f6] p-8 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#ebd02c]/50 transition-all">
                <div className="space-y-4 max-w-sm">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold font-mono text-[#cca01d]"><Sparkles size={12}/> AI Powered</span>
                  <h3 className="text-xl font-bold text-[#111625]">Rank Prediction Engine</h3>
                  <p className="text-xs text-[#5e6b7f] leading-relaxed">Leveraging 10+ years of historical data from JoSAA, JAC, and private portals to give you the most accurate college match.</p>
                  <ul className="text-[11px] text-[#687588] space-y-1 font-medium">
                    <li className="flex items-center gap-1.5 text-zinc-900">⚡ Deep historical trend analysis</li>
                    <li className="flex items-center gap-1.5 text-zinc-900">⚡ Category-wise reservation logic</li>
                  </ul>
                </div>
                <div className="w-24 h-24 bg-[#f6f8fb] rounded-xl flex items-center justify-center text-[#cca01d] shrink-0 group-hover:bg-[#fcd71a]/10 transition-all"><BarChart3 size={32}/></div>
              </div>

              {/* Feature Box 2 */}
              <div className="bg-white border border-[#edf1f6] p-8 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#ebd02c]/50 transition-all">
                <div className="space-y-4 max-w-sm">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold font-mono text-[#cca01d]"><Milestone size={12}/> Guidance</span>
                  <h3 className="text-xl font-bold text-[#111625]">Counselling Roadmap</h3>
                  <p className="text-xs text-[#5e6b7f] leading-relaxed">A step-by-step personalized guide through the admission maze. From document verification to final seat allotment.</p>
                  <ul className="text-[11px] text-[#687588] space-y-1 font-medium">
                    <li className="flex items-center gap-1.5 text-zinc-900">⚡ Interactive timeline tracker</li>
                    <li className="flex items-center gap-1.5 text-zinc-900">⚡ Expert choice filling strategy</li>
                  </ul>
                </div>
                <div className="w-24 h-24 bg-[#f6f8fb] rounded-xl flex items-center justify-center text-[#cca01d] shrink-0 group-hover:bg-[#fcd71a]/10 transition-all"><Layers size={32}/></div>
              </div>
            </div>
          </section>

          {/* Testimonials Review Block Section Layout */}
          <section className="bg-[#111625] text-white py-16 px-6">
            <div className="max-w-6xl mx-auto space-y-12 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Trusted by Thousands</h2>
                <p className="text-xs text-zinc-400 font-medium">Hear from the students who found their dream campuses using CollegeAchiever.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { name: "Aryan Sharma", inst: "IIT Delhi, CSE '27", quote: "The rank predictor was surprisingly accurate! It gave me the confidence to apply for IIT Delhi when others were doubtful.", init: "AS" },
                  { name: "Sanya Patel", inst: "NIT Trichy, ECE '27", quote: "The counseling roadmap was saved for entire JoSAA process. I never missed a deadline or document requirement.", init: "SP" },
                  { name: "Rohan Verma", inst: "BITS Pilani, CS '27", quote: "Best platform for college prediction. The clean UI and data-backed results are far better than any other site I used.", init: "RV" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#1a2135] border border-zinc-800 p-6 rounded-xl space-y-4 shadow-sm">
                    <div className="flex gap-1 text-[#fcd71a]">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}</div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium italic">"{item.quote}"</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 rounded-full bg-[#fcd71a] text-[#111625] font-bold text-xs flex items-center justify-center font-mono">{item.init}</div>
                      <div><h4 className="text-xs font-bold text-white">{item.name}</h4><p className="text-[10px] text-zinc-400 font-medium">{item.inst}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Action Core Banner Block Layout */}
          <section className="max-w-5xl mx-auto px-6 pt-16">
            <div className="bg-[#fcd71a] rounded-2xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl border border-[#eed031]">
              <div className="space-y-2 max-w-xl mx-auto relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-[#111625]">Ready to find your college?</h2>
                <p className="text-xs md:text-sm text-[#544811] leading-relaxed font-semibold">Stop guessing and start planning. Join thousands of students making informed decisions today.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <button onClick={() => setActiveTab('Predictor')} className="bg-[#111625] text-white font-bold text-xs px-6 py-3.5 rounded-lg flex items-center gap-1.5 hover:bg-zinc-800 transition-all uppercase tracking-wider">Get Started Free 🚀</button>
                <button onClick={() => setActiveTab('Counselling Guide')} className="bg-white/80 backdrop-blur-xs text-[#111625] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-white transition-all">Book a Consultation</button>
              </div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </section>

          {/* Standard Footer Section Component Wrapper */}
          <footer className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-[#eef2f7] text-left text-xs text-[#626e82]">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10">
              <div className="col-span-2 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-[#111625]">
                  <div className="w-3 h-1 bg-[#fcd71a] rounded-full"></div> CollegeAchiever
                </div>
                <p className="text-[11px] leading-relaxed max-w-xs font-medium">Empowering students with data-driven insights for a brighter academic future.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#111625] text-[11px] uppercase tracking-wider">Product</h4>
                <p className="hover:text-black cursor-pointer" onClick={() => setActiveTab('Predictor')}>Rank Predictor</p>
                <p className="hover:text-black cursor-pointer" onClick={() => setActiveTab('Counselling Guide')}>Counselling Roadmap</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#111625] text-[11px] uppercase tracking-wider">Company</h4>
                <p className="hover:text-black cursor-pointer">About Us</p>
                <p className="hover:text-black cursor-pointer">Privacy Policy</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#111625] text-[11px] uppercase tracking-wider">Support</h4>
                <p className="hover:text-black cursor-pointer">Help Center</p>
                <p className="hover:text-black cursor-pointer">Contact Support</p>
              </div>
            </div>
            <div className="border-t border-[#f4f7fa] py-4 text-center text-[10px] text-zinc-400 font-medium">
              © 2026 CollegeAchiever. All rights reserved. Crafted for ambitious students everywhere.
            </div>
          </footer>

        </div>
      )}

      {/* PUBLIC TAB MODULE: PREDICTOR CALCULATOR */}
      {activeTab === 'Predictor' && (
        <div className="animate-fadeIn pb-10">
          <section className="bg-white border-b py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#e2e2e2] rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
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
                <button type="submit" className="w-full bg-[#fcd71a] text-black font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow-sm hover:opacity-90 transition-all">Calculate Predictions 🚀</button>
              </form>
            </div>
          </section>

          <section ref={predictorRef} className="max-w-4xl mx-auto py-12 px-6 scroll-mt-20 text-left">
            {hasSearched ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">🎯 SUGGESTED ALLOTMENTS GRID ({results.length} Matches)</h3>
                  {results.map(college => (
                    <div key={college.id} className="bg-white border border-[#e2e2e2] rounded-xl p-5 shadow-sm border-l-4 border-l-[#fcd71a]">
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
            <p className="text-sm text-[#5f5e5e] leading-relaxed">Sirf <strong className="text-black">₹{premiumPriceToken} token fee</strong> pay karke humare exclusive premium group circle me join ho jao.</p>
          </div>
          <div className="max-w-md mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">LIMITED ENTRY ENROLLMENT</div>
              <div className="text-5xl font-black text-black font-mono flex items-center justify-center">₹{premiumPriceToken} <span className="text-xs font-normal text-zinc-400 font-sans">/ Token</span></div>
            </div>
            {!showQrCheckout ? (
              <button onClick={() => setShowQrCheckout(true)} className="w-full bg-[#1a1c1c] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-800 transition-all">Get Instant Access 🚀</button>
            ) : (
              <div className="p-4 bg-zinc-50 border rounded-xl space-y-4 animate-scaleUp">
                <div className="flex flex-col items-center gap-2 font-mono"><QrCode size={130} className="text-black border p-2 bg-white rounded-lg" /><span className="text-[10px] font-bold text-zinc-500">SCAN QR TO PAY INSTANT ₹{premiumPriceToken}</span></div>
                <button onClick={() => { alert("Redirecting..."); window.open(premiumGroupUrl, '_blank'); setShowQrCheckout(false); }} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-xs uppercase flex items-center justify-center gap-1">I Paid! Join Group</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* REMAINING AUX TABS RENDER MATRIX LAYOUT PARAMETERS */}
      {activeTab === 'Opening/Closing Ranks' && (
        <section className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Cut-off Ledger</h2>
            <div className="flex gap-2">
              <button onClick={() => setSelectedType('IIT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${selectedType === 'IIT' ? 'bg-[#fcd71a] text-zinc-900' : 'bg-zinc-100'}`}>IITs</button>
              <button onClick={() => setSelectedType('NIT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${selectedType === 'NIT' ? 'bg-[#fcd71a] text-zinc-900' : 'bg-zinc-100'}`}>NITs</button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#5f5e5e] text-white text-xs uppercase font-bold"><th className="px-6 py-4">Institute Entity</th><th className="px-6 py-4">Program Course Stream</th><th className="px-6 py-4">Opening Node</th><th className="px-6 py-4">Closing Node</th></tr>
              </thead>
              <tbody className="divide-y text-sm">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#fcd71a]/5"><td className="px-6 py-4 font-semibold">{item.institute}</td><td className="px-6 py-4 text-xs">{item.program}</td><td className="px-6 py-4 font-mono">{item.opening}</td><td className="px-6 py-4 text-[#705d00] font-mono">{item.closing}</td></tr>
                ))}
              </tbody>
            </table>
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

      {/* 👑 ⚙️ 🌟 BACKDOOR CONTROL PANEL COCKPIT DESK INFRASTRUCTURE */}
      {activeTab === 'AdminPanel' && (
        <div className="flex min-h-screen bg-[#111214] text-zinc-100 animate-fadeIn">
          <aside className="w-64 bg-[#1a1b1e] border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
                <ShieldCheck size={26} className="text-[#fcd71a]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fcd71a] font-mono">Control Desk</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">MASTER DATA ENGINE V4.2</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium text-zinc-400">
                <button onClick={() => setAdminView('Overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Overview' ? 'bg-[#fcd71a] text-black font-bold' : 'hover:bg-zinc-800'}`}><LayoutDashboard size={16} /> Dashboard Overview</button>
                <button onClick={() => setAdminView('Database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${adminView === 'Database' ? 'bg-[#fcd71a] text-black font-bold' : 'hover:bg-zinc-800'}`}><Database size={16} /> Data Entry Workspace</button>
              </div>
            </div>
            <button onClick={() => setActiveTab('Home')} className="w-full bg-zinc-800 hover:bg-red-950 text-zinc-300 font-bold py-2.5 rounded-xl text-xs uppercase font-mono text-center shadow-md"> Exit Control Desk</button>
          </aside>

          <section className="flex-1 p-6 md:p-10 overflow-y-auto text-left">
            {adminView === 'Overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">System Synchronization Desk</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1b1e] border-2 border-[#fcd71a]/40 p-6 rounded-2xl relative shadow-lg">
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Total Website Live Visits</div>
                    <div className="text-4xl font-black text-[#fcd71a] font-mono mt-1">{totalVisits} <span className="text-xs font-normal text-zinc-500">Hits</span></div>
                  </div>
                </div>

                {/* 📝 FORM A INJECTION CODE INSIDE CONTROL DESK PANEL */}
                <div className="bg-[#1a1b1e] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2"><PlusCircle size={18} className="text-[#fcd71a]"/> Form A: Inject New Predictor & Cutoff Record Node</h3>
                  
                  <form onSubmit={handleAddCutoffRecord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Institute Legal Entity Full Name</label>
                      <input type="text" placeholder="e.g. National Institute of Technology Agartala" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#fcd71a]" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 mb-1">Academic Program specialty course stream</label>
                      <input type="text" placeholder="e.g. Electronics and Communication Engineering" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-[#fcd71a]" required />
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
                      <label className="block text-zinc-400 mb-1">Reservation Gender Pool</label>
                      <select value={newGend} onChange={(e) => setNewGend(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-zinc-300 outline-none"><option>Gender-Neutral</option><option>Female-Only</option></select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Opening Rank</label>
                      <input type="number" placeholder="4444" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">JEE Closing Rank</label>
                      <input type="number" placeholder="12500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#111214] border border-zinc-800 rounded-lg p-3 text-white outline-none" required />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-[#fcd71a] text-black font-bold py-3 rounded-xl uppercase font-mono text-xs mt-2 transition-all hover:opacity-90">Compile Cut-off Row Into Database Matrix 🚀</button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* FLOATING AI CHATBOT SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="bg-[#1a1c1c] text-white p-4 rounded-full shadow-2xl border-2 border-[#fcd71a] animate-bounce"><MessageSquare size={24} className="text-[#fcd71a]" /></button>
        )}
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[400px] bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] flex flex-col overflow-hidden animate-slideUp">
            <div className="bg-[#1a1c1c] text-white p-4 flex justify-between items-center border-b border-[#fcd71a]/30"><span className="text-xs font-bold">CollegeAchiver Bot v2.0</span><button onClick={() => setIsChatOpen(false)}><X size={18} /></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-xl p-3 text-xs ${msg.sender === 'user' ? 'bg-[#1a1c1c] text-white' : 'bg-white text-black border'}`}>{msg.text}</div></div>
              ))}
            </div>
            <div className="p-3 bg-white border-t flex items-center gap-2">
              <input type="text" placeholder="Ask AI..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-[#f9f9f9] border rounded-xl px-4 py-2 text-xs outline-none" />
              <button onClick={() => handleSendMessage()} className="p-2 bg-[#fcd71a] rounded-xl"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* 🔐 AUTHENTICATION MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden relative animate-scaleUp">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            <button type="button" onClick={() => setIsSignInOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer"><X size={20} /></button>
            <div className="p-6 md:p-8 text-center pb-4">
              <h3 className="text-xl font-extrabold text-[#1a1c1c] font-display">Welcome Student</h3>
            </div>
            <form onSubmit={handleAuthSubmit} className="px-6 md:px-8 pb-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Email ID Address</label>
                <input type="email" placeholder="e.g. admin@achiver.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border text-xs outline-none rounded-xl text-black font-medium" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4d4732] mb-1.5">Password Token</label>
                <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 bg-[#f9f9f9] border text-xs outline-none rounded-xl text-black font-medium" required />
              </div>
              <button type="submit" className="w-full bg-[#1a1c1c] text-white font-bold py-3.5 rounded-xl text-xs uppercase shadow-md mt-2 transition-all cursor-pointer hover:bg-zinc-800">Access Dashboard 🚀</button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}