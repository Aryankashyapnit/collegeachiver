// @ts-ignore
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, School, Clock, ShieldCheck, BarChart3, Users, Database, Calendar, LogOut, ChevronRight, TrendingUp } from 'lucide-react';

const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type AdminView = 'overview' | 'cutoffs' | 'seats' | 'deadlines' | 'settings' | 'setup';

const TABLE_MISSING_CODE = 'PGRST204';

const isTableMissing = (msg: string) =>
  msg.includes('does not exist') || msg.includes('schema cache') || msg.includes('relation') || msg.includes('PGRST');

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('overview');
  const [counts, setCounts] = useState({ cutoffs: 0, seats: 0, deadlines: 0 });
  const [toast, setToast] = useState('');
  const [missingTables, setMissingTables] = useState<string[]>([]);

  // Cutoff form
  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newExamType, setNewExamType] = useState('JEE Advanced');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('2,25,000');

  // Seat matrix form
  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  // Deadline form
  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  // Settings
  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPrice, setPremiumPrice] = useState('99');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const missing: string[] = [];
      const [r1, r2, r3] = await Promise.all([
        supabase.from('josaadata_record').select('*', { count: 'exact', head: true }),
        supabase.from('seat_matrices').select('*', { count: 'exact', head: true }),
        supabase.from('admission_schedules').select('*', { count: 'exact', head: true }),
      ]);
      if (r1.error && isTableMissing(r1.error.message)) missing.push('josaadata_record');
      if (r2.error && isTableMissing(r2.error.message)) missing.push('seat_matrices');
      if (r3.error && isTableMissing(r3.error.message)) missing.push('admission_schedules');
      if (missing.length > 0) {
        setMissingTables(missing);
        setView('setup');
      }
      setCounts({ cutoffs: r1.count || 0, seats: r2.count || 0, deadlines: r3.count || 0 });
    };
    fetchCounts();
  }, []);

  const handleAddCutoff = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('josaadata_record').insert([{
      institute: newInst, program: newProg, exam_type: newExamType,
      quota: newQuota, category: newCat, gender: newGend,
      opening: parseInt(newOpenRank), closing: parseInt(newCloseRank),
      fee: `${newFee} / Year`, placement: "16.4 LPA", nirf: 42
    }]);
    if (error) {
      if (isTableMissing(error.message)) { setView('setup'); }
      else { showToast('❌ Error: ' + error.message); }
    } else {
      showToast('✅ Cutoff record added to Supabase!');
      setCounts(c => ({ ...c, cutoffs: c.cutoffs + 1 }));
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
    }
  };

  const handleAddSeat = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('seat_matrices').insert([{
      institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap)
    }]);
    if (error) {
      if (isTableMissing(error.message)) { setView('setup'); }
      else { showToast('❌ Error: ' + error.message); }
    } else {
      showToast('✅ Seat matrix row added!');
      setCounts(c => ({ ...c, seats: c.seats + 1 }));
      setNewSeatInst(''); setNewSeatProg(''); setNewSeatCap('');
    }
  };

  const handleAddDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('admission_schedules').insert([{
      date: newDeadDate, title: newDeadTitle, description: newDeadDesc, status: newDeadStat
    }]);
    if (error) {
      if (isTableMissing(error.message)) { setView('setup'); }
      else { showToast('❌ Error: ' + error.message); }
    } else {
      showToast('✅ Deadline added to schedule!');
      setCounts(c => ({ ...c, deadlines: c.deadlines + 1 }));
      setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
    }
  };

  const navItems: { id: AdminView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'cutoffs', label: 'Cutoff Data', icon: <Database size={16} /> },
    { id: 'seats', label: 'Seat Matrix', icon: <School size={16} /> },
    { id: 'deadlines', label: 'Key Deadlines', icon: <Calendar size={16} /> },
    { id: 'settings', label: 'Settings', icon: <ShieldCheck size={16} /> },
    ...(missingTables.length > 0 ? [{ id: 'setup' as AdminView, label: '⚠ DB Setup', icon: <Database size={16} /> }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#fcd71a] text-[#111625] text-xs font-black px-5 py-3 rounded-xl shadow-2xl border border-[#eed031] animate-slideUp">
          {toast}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 bg-[#0d0f14] border-r border-zinc-800/60 flex flex-col">
          <div className="p-5 border-b border-zinc-800/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#fcd71a] flex items-center justify-center">
                <span className="text-[#111625] font-black text-xs">CA</span>
              </div>
              <div>
                <p className="text-[11px] font-black text-white tracking-wider">CollegeAchiver</p>
                <p className="text-[9px] text-zinc-500 font-mono">Admin Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${view === item.id ? 'bg-[#fcd71a] text-[#111625]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-zinc-800/60">
            <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-white hover:bg-zinc-800/60 transition-all">
              <LogOut size={16} /> Back to Site
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 bg-[#0a0c10]/90 backdrop-blur-md border-b border-zinc-800/60 px-8 py-4 flex justify-between items-center z-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-0.5">
                <span>Admin</span><ChevronRight size={10}/><span className="text-[#fcd71a] capitalize">{view}</span>
              </div>
              <h1 className="text-lg font-black text-white capitalize">{view === 'overview' ? 'Dashboard Overview' : view === 'cutoffs' ? 'Inject Cutoff Records' : view === 'seats' ? 'Inject Seat Matrix Rows' : view === 'deadlines' ? 'Inject Key Deadlines' : view === 'setup' ? 'Database Setup Required' : 'Gateway Settings'}</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-zinc-400">admin@achiver.com</span>
            </div>
          </header>

          <div className="p-8">
            {/* OVERVIEW */}
            {view === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Cutoff Records', val: counts.cutoffs, icon: <Database size={18}/>, color: 'text-blue-400' },
                    { label: 'Seat Matrix Rows', val: counts.seats, icon: <School size={18}/>, color: 'text-purple-400' },
                    { label: 'Deadlines Set', val: counts.deadlines, icon: <Calendar size={18}/>, color: 'text-emerald-400' },
                    { label: 'Live Users', val: '3', icon: <Users size={18}/>, color: 'text-[#fcd71a]' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0d1117] border border-zinc-800/80 p-5 rounded-2xl hover:border-zinc-700 transition-all">
                      <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                      <p className="text-2xl font-black text-white font-mono">{stat.val}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Add Cutoff Data', desc: 'Inject JoSAA opening/closing ranks', action: 'cutoffs' as AdminView, color: 'border-blue-800/40 hover:border-blue-600/50' },
                    { label: 'Add Seat Matrix', desc: 'Add institute seat capacity rows', action: 'seats' as AdminView, color: 'border-purple-800/40 hover:border-purple-600/50' },
                    { label: 'Add Deadline', desc: 'Schedule counselling timeline events', action: 'deadlines' as AdminView, color: 'border-emerald-800/40 hover:border-emerald-600/50' },
                  ].map((card, i) => (
                    <button key={i} onClick={() => setView(card.action)}
                      className={`bg-[#0d1117] border ${card.color} p-5 rounded-2xl text-left space-y-2 transition-all group`}>
                      <p className="text-sm font-black text-white group-hover:text-[#fcd71a] transition-colors">{card.label}</p>
                      <p className="text-xs text-zinc-500">{card.desc}</p>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-600 group-hover:text-[#fcd71a] transition-colors font-mono">Go to form <ChevronRight size={10}/></div>
                    </button>
                  ))}
                </div>
                <div className="bg-[#0d1117] border border-zinc-800/80 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-zinc-400 mb-4 uppercase tracking-widest font-mono">Quick Tips</p>
                  <ul className="space-y-2 text-xs text-zinc-500">
                    <li className="flex items-start gap-2"><span className="text-[#fcd71a] mt-0.5">→</span> Use the sidebar to navigate between data injection forms</li>
                    <li className="flex items-start gap-2"><span className="text-[#fcd71a] mt-0.5">→</span> All data is written live to Supabase production tables</li>
                    <li className="flex items-start gap-2"><span className="text-[#fcd71a] mt-0.5">→</span> Seat Matrix and Deadlines data appears immediately on the public site</li>
                    <li className="flex items-start gap-2"><span className="text-[#fcd71a] mt-0.5">→</span> Configure the WhatsApp group link and premium price in Settings</li>
                  </ul>
                </div>
              </div>
            )}

            {/* CUTOFFS FORM */}
            {view === 'cutoffs' && (
              <div className="max-w-2xl animate-fadeIn">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><PlusCircle size={16} className="text-[#fcd71a]"/> New Cutoff Record</h3>
                  <form onSubmit={handleAddCutoff} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Institute Name</label>
                      <input type="text" placeholder="Indian Institute of Technology Bombay" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none text-sm transition-colors" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Program / Branch</label>
                      <input type="text" placeholder="Computer Science and Engineering" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none text-sm transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Exam Type</label>
                      <select value={newExamType} onChange={(e) => setNewExamType(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option value="JEE Advanced">JEE Advanced (IITs)</option>
                        <option value="JEE Mains">JEE Mains (NITs / IIITs)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Quota</label>
                      <select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option value="AI">All India (AI)</option><option value="OS">Other State (OS)</option><option value="HS">Home State (HS)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Category</label>
                      <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option>OPEN</option><option>OPEN (PwD)</option><option>OBC-NCL</option><option>OBC-NCL (PwD)</option><option>SC</option><option>SC (PwD)</option><option>ST</option><option>ST (PwD)</option><option>EWS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Gender</label>
                      <select value={newGend} onChange={(e) => setNewGend(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option>Gender-Neutral</option><option>Female-Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Opening Rank</label>
                      <input type="number" placeholder="e.g. 1200" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Closing Rank</label>
                      <input type="number" placeholder="e.g. 4500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Annual Fee (₹)</label>
                      <input type="text" placeholder="2,25,000" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2">
                      <PlusCircle size={14}/> Add Cutoff Record to Database
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* SEAT MATRIX FORM */}
            {view === 'seats' && (
              <div className="max-w-2xl animate-fadeIn">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><School size={16} className="text-purple-400"/> New Seat Matrix Row</h3>
                  <form onSubmit={handleAddSeat} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Institute Name</label>
                      <input type="text" placeholder="NIT Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Program / Branch</label>
                      <input type="text" placeholder="Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Quota / Category</label>
                      <input type="text" placeholder="OPEN (Neutral)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Total Seats</label>
                      <input type="number" placeholder="e.g. 92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2">
                      <School size={14}/> Add Seat Row to Database
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* DEADLINES FORM */}
            {view === 'deadlines' && (
              <div className="max-w-2xl animate-fadeIn">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><Clock size={16} className="text-emerald-400"/> New Deadline / Schedule Entry</h3>
                  <form onSubmit={handleAddDeadline} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Date</label>
                      <input type="text" placeholder="June 10, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Status</label>
                      <select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option value="Upcoming">Upcoming</option>
                        <option value="Live Soon">Live Soon</option>
                        <option value="Strict Warning">Strict Warning</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Event Title</label>
                      <input type="text" placeholder="JoSAA Round 1 Result Declaration" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Description (optional)</label>
                      <textarea rows={3} placeholder="Additional details about this event..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors resize-none" />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2">
                      <Calendar size={14}/> Add Deadline to Schedule
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* DATABASE SETUP GUIDE */}
            {view === 'setup' && (
              <div className="max-w-3xl animate-fadeIn space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/40 p-5 rounded-2xl flex items-start gap-4">
                  <span className="text-amber-400 text-2xl mt-0.5">⚠</span>
                  <div>
                    <p className="text-amber-300 font-black text-sm mb-1">Supabase Tables Not Found</p>
                    <p className="text-amber-200/70 text-xs">The following tables are missing from your Supabase project: <span className="font-mono text-amber-300">{missingTables.join(', ')}</span>. Run the SQL below in your Supabase SQL Editor to create them.</p>
                  </div>
                </div>

                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">Step 1 — Open Supabase SQL Editor</p>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">Go to <a href="https://supabase.com/dashboard/project/ygyosdmzubwswnhuhere/sql/new" target="_blank" className="text-[#fcd71a] underline hover:text-white">your Supabase SQL Editor</a>, paste the SQL below, and click Run.</p>
                </div>

                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
                    <span className="ml-2 text-[10px] font-mono text-zinc-500">create_tables.sql</span>
                  </div>
                  <pre className="p-5 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">{`-- Run this in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/ygyosdmzubwswnhuhere/sql/new

-- 1. JoSAA Cutoff Data (rank predictor)
CREATE TABLE IF NOT EXISTS public.josaadata_record (
  id          bigserial PRIMARY KEY,
  institute   text NOT NULL,
  program     text NOT NULL,
  exam_type   text DEFAULT 'JEE Advanced',
  quota       text NOT NULL,
  category    text NOT NULL,
  gender      text NOT NULL,
  opening     integer NOT NULL,
  closing     integer NOT NULL,
  fee         text,
  placement   text,
  nirf        integer,
  created_at  timestamptz DEFAULT now()
);

-- 2. Seat Matrix
CREATE TABLE IF NOT EXISTS public.seat_matrices (
  id          bigserial PRIMARY KEY,
  institute   text NOT NULL,
  program     text NOT NULL,
  quota       text NOT NULL,
  seats       integer NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- 3. Admission Schedules / Deadlines
CREATE TABLE IF NOT EXISTS public.admission_schedules (
  id          bigserial PRIMARY KEY,
  date        text NOT NULL,
  title       text NOT NULL,
  description text,
  status      text DEFAULT 'Upcoming',
  created_at  timestamptz DEFAULT now()
);

-- Enable public read access (Row Level Security)
ALTER TABLE public.josaadata_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_matrices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read josaadata" ON public.josaadata_record FOR SELECT USING (true);
CREATE POLICY "public read seats" ON public.seat_matrices FOR SELECT USING (true);
CREATE POLICY "public read schedules" ON public.admission_schedules FOR SELECT USING (true);

CREATE POLICY "anon insert josaadata" ON public.josaadata_record FOR INSERT WITH CHECK (true);
CREATE POLICY "anon insert seats" ON public.seat_matrices FOR INSERT WITH CHECK (true);
CREATE POLICY "anon insert schedules" ON public.admission_schedules FOR INSERT WITH CHECK (true);`}</pre>
                </div>

                <div className="bg-[#0d1117] border border-zinc-800 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono mb-3">Step 2 — Refresh Admin Panel</p>
                  <p className="text-xs text-zinc-500 mb-4">After running the SQL, reload this page and the tables will be detected automatically.</p>
                  <button onClick={() => window.location.reload()}
                    className="bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-black py-3 px-6 rounded-xl uppercase text-xs tracking-wider transition-all">
                    Reload Panel Now
                  </button>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {view === 'settings' && (
              <div className="max-w-2xl animate-fadeIn space-y-6">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><ShieldCheck size={16} className="text-[#fcd71a]"/> Premium Gateway Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">WhatsApp Group Access Link</label>
                      <input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-emerald-400 outline-none transition-colors font-mono text-xs" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Premium Token Price (₹)</label>
                      <input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-[#fcd71a] outline-none transition-colors font-mono text-sm font-bold" />
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono">Note: These settings are session-only. To persist, update the values in HomePage.tsx source code.</p>
                  </div>
                </div>
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-zinc-400"/> Admin Credentials</h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-500">Email</span>
                      <span className="text-zinc-200">admin@achiver.com</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-zinc-500">Password</span>
                      <span className="text-zinc-200">admin123</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
