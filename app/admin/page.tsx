"use client";
// @ts-nocheck
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { supabase } from '../supabaseClient';
import { PlusCircle, School, Clock, ShieldCheck, BarChart3, Users, Database, Calendar, LogOut, ChevronRight, TrendingUp, Upload, Download, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type AdminView = 'overview' | 'cutoffs' | 'csv' | 'seats' | 'deadlines' | 'users' | 'settings';

interface TrackedUser {
  id: string;
  email: string;
  name: string;
  type: string;
  createdAt: string;
}

function AdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<AdminView>('overview');
  const [counts, setCounts] = useState({ cutoffs: 0, seats: 0, deadlines: 0 });
  const [toast, setToast] = useState('');
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [trackedUsers, setTrackedUsers] = useState<TrackedUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [newInst, setNewInst] = useState('');
  const [newProg, setNewProg] = useState('');
  const [newQuota, setNewQuota] = useState('OS');
  const [newCat, setNewCat] = useState('OPEN');
  const [newGend, setNewGend] = useState('Gender-Neutral');
  const [newOpenRank, setNewOpenRank] = useState('');
  const [newCloseRank, setNewCloseRank] = useState('');
  const [newFee, setNewFee] = useState('₹2,25,000/year');
  const [newPlacement, setNewPlacement] = useState('₹12.0 LPA');
  const [newNirf, setNewNirf] = useState('');
  const [recentCutoffs, setRecentCutoffs] = useState<any[]>([]);

  const [newSeatInst, setNewSeatInst] = useState('');
  const [newSeatProg, setNewSeatProg] = useState('');
  const [newSeatQuota, setNewSeatQuota] = useState('OPEN (Neutral)');
  const [newSeatCap, setNewSeatCap] = useState('');

  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTitle, setNewDeadTitle] = useState('');
  const [newDeadDesc, setNewDeadDesc] = useState('');
  const [newDeadStat, setNewDeadStat] = useState('Upcoming');

  const [premiumGroupUrl, setPremiumGroupUrl] = useState('https://chat.whatsapp.com/secret-counselling-group-link');
  const [premiumPrice, setPremiumPrice] = useState('99');

  // Seat Matrix CSV Import state
  const [seatCsvRaw, setSeatCsvRaw] = useState('');
  const [seatCsvRows, setSeatCsvRows] = useState<any[]>([]);
  const [seatCsvErrors, setSeatCsvErrors] = useState<string[]>([]);
  const [seatCsvImporting, setSeatCsvImporting] = useState(false);
  const [seatCsvProgress, setSeatCsvProgress] = useState(0);
  const [seatCsvDone, setSeatCsvDone] = useState<{ ok: number; fail: number } | null>(null);
  const [seatCsvDragOver, setSeatCsvDragOver] = useState(false);

  // CSV Import state
  const [csvRaw, setCsvRaw] = useState('');
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);
  const [csvDone, setCsvDone] = useState<{ ok: number; fail: number } | null>(null);
  const [csvDragOver, setCsvDragOver] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const SEAT_CSV_EXAMPLE = [
    'institute,program,quota,seats',
    'Indian Institute of Technology Bombay,Computer Science and Engineering,OPEN (AI),59',
    'National Institute of Technology Trichy,Computer Science and Engineering,OPEN (OS),45',
    'Indian Institute of Information Technology Allahabad,Computer Science and Engineering,OPEN (AI),60',
  ].join('\n');

  const downloadSeatTemplate = () => {
    const blob = new Blob([SEAT_CSV_EXAMPLE], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'collegeachiver_seat_matrix_template.csv';
    a.click();
  };

  const parseSeatCSV = (text: string) => {
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) { setSeatCsvErrors(['Kam se kam 1 data row honi chahiye']); setSeatCsvRows([]); return; }
    const header = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
    const required = ['institute', 'program', 'quota', 'seats'];
    const missing = required.filter(r => !header.includes(r));
    if (missing.length > 0) { setSeatCsvErrors([`Missing columns: ${missing.join(', ')}`]); setSeatCsvRows([]); return; }
    const errs: string[] = [];
    const rows: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const row: any = {};
      header.forEach((h, idx) => { row[h] = vals[idx] ?? ''; });
      const seats = parseInt(row.seats);
      if (!row.institute) { errs.push(`Row ${i}: institute missing`); continue; }
      if (!row.program) { errs.push(`Row ${i}: program missing`); continue; }
      if (isNaN(seats)) { errs.push(`Row ${i}: seats must be a number (got: ${row.seats})`); continue; }
      rows.push({ institute: row.institute, program: row.program, quota: row.quota || 'OPEN (AI)', seats });
    }
    setSeatCsvErrors(errs);
    setSeatCsvRows(rows);
  };

  const handleSeatCsvFile = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') { setSeatCsvErrors(['Sirf .csv files allowed hain']); return; }
    const reader = new FileReader();
    reader.onload = (e) => { const text = e.target?.result as string; setSeatCsvRaw(text); setSeatCsvDone(null); parseSeatCSV(text); };
    reader.readAsText(file);
  };

  const handleSeatCsvImport = async () => {
    if (seatCsvRows.length === 0) return;
    setSeatCsvImporting(true);
    setSeatCsvProgress(0);
    setSeatCsvDone(null);
    const BATCH = 100;
    let ok = 0, fail = 0;
    for (let i = 0; i < seatCsvRows.length; i += BATCH) {
      const batch = seatCsvRows.slice(i, i + BATCH);
      const { error } = await supabase.from('seat_matrices').insert(batch);
      if (error) { fail += batch.length; } else { ok += batch.length; }
      setSeatCsvProgress(Math.round(((i + batch.length) / seatCsvRows.length) * 100));
    }
    setSeatCsvImporting(false);
    setSeatCsvDone({ ok, fail });
    setCounts(c => ({ ...c, seats: c.seats + ok }));
    if (ok > 0) showToast(`✅ ${ok} seat rows import ho gaye!`);
  };

  const CSV_TEMPLATE_HEADERS = 'institute,program,quota,category,gender,opening,closing,fee,placement,nirf';
  const CSV_TEMPLATE_EXAMPLE = [
    CSV_TEMPLATE_HEADERS,
    'Indian Institute of Technology Bombay,Computer Science and Engineering,AI,OPEN,Gender-Neutral,87,342,₹2,25,000/year,₹42 LPA,3',
    'National Institute of Technology Trichy,Computer Science and Engineering,OS,OPEN,Gender-Neutral,4500,8200,₹1,25,000/year,₹18 LPA,8',
    'Indian Institute of Information Technology Allahabad,Computer Science and Engineering,AI,OPEN,Gender-Neutral,8000,14500,₹1,00,000/year,₹12 LPA,28',
  ].join('\n');

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE_EXAMPLE], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'collegeachiver_cutoff_template.csv';
    a.click();
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) { setCsvErrors(['CSV mein kam se kam 1 data row honi chahiye (header ke baad)']); setCsvRows([]); return; }
    const header = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
    const required = ['institute', 'program', 'quota', 'category', 'gender', 'opening', 'closing'];
    const missing = required.filter(r => !header.includes(r));
    if (missing.length > 0) { setCsvErrors([`Missing columns: ${missing.join(', ')}`]); setCsvRows([]); return; }

    const errs: string[] = [];
    const rows: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const row: any = {};
      header.forEach((h, idx) => { row[h] = vals[idx] ?? ''; });
      const open = parseInt(row.opening);
      const close = parseInt(row.closing);
      if (!row.institute) { errs.push(`Row ${i}: institute missing`); continue; }
      if (!row.program) { errs.push(`Row ${i}: program missing`); continue; }
      if (isNaN(open) || isNaN(close)) { errs.push(`Row ${i}: opening/closing ranks must be numbers`); continue; }
      rows.push({
        institute: row.institute,
        program: row.program,
        quota: row.quota || 'AI',
        category: row.category || 'OPEN',
        gender: row.gender || 'Gender-Neutral',
        opening: open,
        closing: close,
        fee: row.fee || null,
        placement: row.placement || null,
        nirf: row.nirf && !isNaN(parseInt(row.nirf)) ? parseInt(row.nirf) : null,
      });
    }
    setCsvErrors(errs);
    setCsvRows(rows);
  };

  const handleCsvFile = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setCsvErrors(['Sirf .csv files allowed hain']);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvRaw(text);
      setCsvDone(null);
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const handleCsvImport = async () => {
    if (csvRows.length === 0) return;
    setCsvImporting(true);
    setCsvProgress(0);
    setCsvDone(null);
    const BATCH = 100;
    let ok = 0, fail = 0;
    for (let i = 0; i < csvRows.length; i += BATCH) {
      const batch = csvRows.slice(i, i + BATCH);
      const { error } = await supabase.from('josaadata_record').insert(batch);
      if (error) { fail += batch.length; } else { ok += batch.length; }
      setCsvProgress(Math.round(((i + batch.length) / csvRows.length) * 100));
    }
    setCsvImporting(false);
    setCsvDone({ ok, fail });
    setCounts(c => ({ ...c, cutoffs: c.cutoffs + ok }));
    if (ok > 0) showToast(`✅ ${ok} records import ho gaye!`);
  };

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
      setCounts({ cutoffs: r1.count || 0, seats: r2.count || 0, deadlines: r3.count || 0 });
    };
    fetchCounts();
  }, []);

  const fetchTrackedUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (Array.isArray(data)) setTrackedUsers(data);
    } catch (e) {}
    setUsersLoading(false);
  };

  useEffect(() => {
    if (view === 'cutoffs') fetchRecentCutoffs();
    if (view === 'users' || view === 'overview') fetchTrackedUsers();
  }, [view]);

  const fetchRecentCutoffs = async () => {
    const { data } = await supabase.from('josaadata_record').select('*').order('id', { ascending: false }).limit(8);
    if (data) setRecentCutoffs(data);
  };

  const handleAddCutoff = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('josaadata_record').insert([{
      institute: newInst,
      program: newProg,
      quota: newQuota,
      category: newCat,
      gender: newGend,
      opening: parseInt(newOpenRank),
      closing: parseInt(newCloseRank),
      fee: newFee,
      placement: newPlacement,
      nirf: newNirf ? parseInt(newNirf) : null,
    }]);
    if (error) {
      showToast('❌ Error: ' + error.message);
    } else {
      showToast('✅ Cutoff record added to Supabase!');
      setCounts(c => ({ ...c, cutoffs: c.cutoffs + 1 }));
      setNewInst(''); setNewProg(''); setNewOpenRank(''); setNewCloseRank('');
      fetchRecentCutoffs();
    }
  };

  const handleAddSeat = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('seat_matrices').insert([{
      institute: newSeatInst, program: newSeatProg, quota: newSeatQuota, seats: parseInt(newSeatCap)
    }]);
    if (error) {
      showToast('❌ Error: ' + error.message);
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
      showToast('❌ Error: ' + error.message);
    } else {
      showToast('✅ Deadline added to schedule!');
      setCounts(c => ({ ...c, deadlines: c.deadlines + 1 }));
      setNewDeadDate(''); setNewDeadTitle(''); setNewDeadDesc('');
    }
  };

  const navItems: { id: AdminView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'users', label: 'Users', icon: <Users size={16} /> },
    { id: 'cutoffs', label: 'Cutoff Data', icon: <Database size={16} /> },
    { id: 'csv', label: 'CSV Bulk Import', icon: <Upload size={16} /> },
    { id: 'seats', label: 'Seat Matrix', icon: <School size={16} /> },
    { id: 'deadlines', label: 'Key Deadlines', icon: <Calendar size={16} /> },
    { id: 'settings', label: 'Settings', icon: <ShieldCheck size={16} /> },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#fcd71a] text-[#111625] text-xs font-black px-5 py-3 rounded-xl shadow-2xl border border-[#eed031]">
          {toast}
        </div>
      )}
      <div className="flex min-h-screen">
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

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 bg-[#0a0c10]/90 backdrop-blur-md border-b border-zinc-800/60 px-8 py-4 flex justify-between items-center z-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-0.5">
                <span>Admin</span><ChevronRight size={10}/><span className="text-[#fcd71a] capitalize">{view}</span>
              </div>
              <h1 className="text-lg font-black text-white capitalize">
                {view === 'overview' ? 'Dashboard Overview' : view === 'users' ? 'Registered Users' : view === 'cutoffs' ? 'Inject Cutoff Records' : view === 'csv' ? 'CSV Bulk Import' : view === 'seats' ? 'Inject Seat Matrix Rows' : view === 'deadlines' ? 'Inject Key Deadlines' : 'Gateway Settings'}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-zinc-400">admin@achiver.com</span>
            </div>
          </header>

          <div className="p-8">
            {view === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Cutoff Records', val: counts.cutoffs, icon: <Database size={18}/>, color: 'text-blue-400' },
                    { label: 'Seat Matrix Rows', val: counts.seats, icon: <School size={18}/>, color: 'text-purple-400' },
                    { label: 'Deadlines Set', val: counts.deadlines, icon: <Calendar size={18}/>, color: 'text-emerald-400' },
                    { label: 'Total Users', val: trackedUsers.length, icon: <Users size={18}/>, color: 'text-[#fcd71a]' },
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
              </div>
            )}

            {view === 'users' && (
              <div className="animate-fadeIn space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fcd71a]/10 border border-[#fcd71a]/30 flex items-center justify-center">
                      <Users size={18} className="text-[#fcd71a]"/>
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">All Registered Users</p>
                      <p className="text-[10px] text-zinc-500 font-mono">Demo + Login + Signup — sabka record yahan hai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#fcd71a] bg-[#fcd71a]/10 px-3 py-1.5 rounded-lg border border-[#fcd71a]/20">{trackedUsers.length} users</span>
                    <button onClick={fetchTrackedUsers} className="text-[10px] font-mono text-zinc-500 hover:text-[#fcd71a] transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-800 border border-zinc-800">↻ Refresh</button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Demo Logins', val: trackedUsers.filter(u => u.type === 'demo').length, color: 'text-amber-400', bg: 'bg-amber-950/30 border-amber-800/40' },
                    { label: 'Full Logins', val: trackedUsers.filter(u => u.type === 'login').length, color: 'text-blue-400', bg: 'bg-blue-950/30 border-blue-800/40' },
                    { label: 'Registrations', val: trackedUsers.filter(u => u.type === 'register').length, color: 'text-emerald-400', bg: 'bg-emerald-950/30 border-emerald-800/40' },
                  ].map((s, i) => (
                    <div key={i} className={`${s.bg} border p-4 rounded-2xl text-center`}>
                      <p className={`text-2xl font-black font-mono ${s.color}`}>{s.val}</p>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Users Table */}
                {usersLoading ? (
                  <div className="text-center py-12 text-zinc-500 text-sm font-mono">Loading users...</div>
                ) : trackedUsers.length === 0 ? (
                  <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl p-12 text-center">
                    <Users size={32} className="text-zinc-700 mx-auto mb-3"/>
                    <p className="text-sm font-bold text-zinc-400">Abhi tak koi user nahi aaya</p>
                    <p className="text-xs text-zinc-600 mt-1">Jab koi login/register/demo karega, yahan dikhega</p>
                  </div>
                ) : (
                  <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="text-left px-5 py-3 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">#</th>
                            <th className="text-left px-5 py-3 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Email / Phone</th>
                            <th className="text-left px-5 py-3 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Name</th>
                            <th className="text-left px-5 py-3 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Type</th>
                            <th className="text-left px-5 py-3 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trackedUsers.map((user, i) => (
                            <tr key={user.id} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-[#0a0c10]/40' : ''} hover:bg-zinc-800/30 transition-colors`}>
                              <td className="px-5 py-3 text-zinc-600 font-mono">{i + 1}</td>
                              <td className="px-5 py-3 text-white font-bold">{user.email}</td>
                              <td className="px-5 py-3 text-zinc-400">{user.name}</td>
                              <td className="px-5 py-3">
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                  user.type === 'demo' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                  user.type === 'register' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>{user.type}</span>
                              </td>
                              <td className="px-5 py-3 text-zinc-500 font-mono text-[10px]">{new Date(user.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'cutoffs' && (
              <div className="max-w-3xl animate-fadeIn space-y-6">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2"><PlusCircle size={16} className="text-[#fcd71a]"/> Add New Cutoff Record</h3>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded-lg">Total: {counts.cutoffs.toLocaleString()}</span>
                  </div>
                  <form onSubmit={handleAddCutoff} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Institute Name *</label>
                      <input type="text" placeholder="Indian Institute of Technology Bombay" value={newInst} onChange={(e) => setNewInst(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none text-sm transition-colors" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Program / Branch *</label>
                      <input type="text" placeholder="Computer Science and Engineering" value={newProg} onChange={(e) => setNewProg(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none text-sm transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Quota *</label>
                      <select value={newQuota} onChange={(e) => setNewQuota(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option value="AI">All India (AI) — IITs / IIITs</option>
                        <option value="OS">Other State (OS) — NITs</option>
                        <option value="HS">Home State (HS) — NITs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Category *</label>
                      <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option>OPEN</option><option>OPEN (PwD)</option><option>OBC-NCL</option><option>OBC-NCL (PwD)</option><option>SC</option><option>SC (PwD)</option><option>ST</option><option>ST (PwD)</option><option>EWS</option><option>EWS (PwD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Gender Pool *</label>
                      <select value={newGend} onChange={(e) => setNewGend(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-zinc-300 outline-none text-xs">
                        <option>Gender-Neutral</option><option>Female-Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">NIRF Rank</label>
                      <input type="number" placeholder="e.g. 5" value={newNirf} onChange={(e) => setNewNirf(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Opening Rank *</label>
                      <input type="number" placeholder="e.g. 1200" value={newOpenRank} onChange={(e) => setNewOpenRank(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Closing Rank *</label>
                      <input type="number" placeholder="e.g. 4500" value={newCloseRank} onChange={(e) => setNewCloseRank(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Annual Fee</label>
                      <input type="text" placeholder="₹2,25,000/year" value={newFee} onChange={(e) => setNewFee(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Avg. Placement</label>
                      <input type="text" placeholder="₹12.0 LPA" value={newPlacement} onChange={(e) => setNewPlacement(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-white outline-none transition-colors" />
                    </div>
                    <button type="submit" className="sm:col-span-2 bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2">
                      <PlusCircle size={14}/> Inject Cutoff Record into Database
                    </button>
                  </form>
                </div>

                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2"><Database size={13} className="text-[#fcd71a]"/> Recently Added Records</h4>
                    <button onClick={fetchRecentCutoffs} className="text-[10px] font-mono text-zinc-500 hover:text-[#fcd71a] transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800">↻ Refresh</button>
                  </div>
                  {recentCutoffs.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <p className="text-xs text-zinc-600">Click Refresh to load recent records</p>
                      <button onClick={fetchRecentCutoffs} className="mt-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold px-4 py-2 rounded-xl transition-all">Load Recent</button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="text-left px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Institute</th>
                            <th className="text-left px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Program</th>
                            <th className="text-left px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Quota</th>
                            <th className="text-left px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Cat</th>
                            <th className="text-right px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Open</th>
                            <th className="text-right px-4 py-2.5 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Close</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentCutoffs.map((row, i) => (
                            <tr key={row.id} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-[#0a0c10]/40' : ''} hover:bg-zinc-800/30 transition-colors`}>
                              <td className="px-4 py-2.5 text-zinc-300 font-medium max-w-[180px] truncate">
                                {row.institute.replace('Indian Institute of Technology', 'IIT').replace('National Institute of Technology', 'NIT').replace('Indian Institute of Information Technology', 'IIIT')}
                              </td>
                              <td className="px-4 py-2.5 text-zinc-400 max-w-[160px] truncate">{row.program}</td>
                              <td className="px-4 py-2.5"><span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md font-mono">{row.quota}</span></td>
                              <td className="px-4 py-2.5 text-zinc-400 font-mono">{row.category}</td>
                              <td className="px-4 py-2.5 text-right text-emerald-400 font-mono font-bold">{row.opening?.toLocaleString()}</td>
                              <td className="px-4 py-2.5 text-right text-[#fcd71a] font-mono font-bold">{row.closing?.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {view === 'csv' && (
              <div className="max-w-3xl animate-fadeIn space-y-6">

                {/* Step 1 — Download Template */}
                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#fcd71a]/10 border border-[#fcd71a]/30 flex items-center justify-center shrink-0">
                    <Download size={18} className="text-[#fcd71a]"/>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-white">Step 1 — CSV Template Download karo</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Isme sahi columns hain: <span className="font-mono text-zinc-300">institute, program, quota, category, gender, opening, closing, fee, placement, nirf</span></p>
                  </div>
                  <button onClick={downloadTemplate} className="shrink-0 flex items-center gap-2 bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-black text-xs px-4 py-2.5 rounded-xl transition-all">
                    <Download size={13}/> Download Template
                  </button>
                </div>

                {/* CSV Format reference */}
                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
                    <FileText size={13} className="text-zinc-500"/>
                    <span className="text-[10px] font-mono text-zinc-500">CSV format — columns ki jankari</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="border-b border-zinc-800/60">
                          {['Column', 'Required?', 'Example', 'Notes'].map(h => (
                            <th key={h} className="px-4 py-2.5 text-left text-zinc-500 font-bold uppercase text-[10px] tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['institute', '✅ Yes', 'Indian Institute of Technology Bombay', 'Full name likho'],
                          ['program', '✅ Yes', 'Computer Science and Engineering', 'Branch ka pura naam'],
                          ['quota', '✅ Yes', 'AI / OS / HS', 'AI=IITs, OS/HS=NITs'],
                          ['category', '✅ Yes', 'OPEN / OBC-NCL / SC / ST / EWS', 'Category as per JoSAA'],
                          ['gender', '✅ Yes', 'Gender-Neutral / Female-Only', 'Pool type'],
                          ['opening', '✅ Yes', '87', 'Opening rank (number)'],
                          ['closing', '✅ Yes', '342', 'Closing rank (number)'],
                          ['fee', '⬜ Optional', '₹2,25,000/year', 'Annual fee (text)'],
                          ['placement', '⬜ Optional', '₹42 LPA', 'Avg placement (text)'],
                          ['nirf', '⬜ Optional', '3', 'NIRF rank (number)'],
                        ].map(([col, req, ex, note], i) => (
                          <tr key={i} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-[#0a0c10]/30' : ''}`}>
                            <td className="px-4 py-2.5 font-mono text-[#fcd71a] font-bold">{col}</td>
                            <td className="px-4 py-2.5 text-zinc-400">{req}</td>
                            <td className="px-4 py-2.5 font-mono text-zinc-300 text-[10px]">{ex}</td>
                            <td className="px-4 py-2.5 text-zinc-500 text-[10px]">{note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Step 2 — File Upload */}
                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <p className="text-sm font-black text-white flex items-center gap-2"><Upload size={15} className="text-[#fcd71a]"/> Step 2 — CSV File Upload karo</p>
                  <label
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all ${csvDragOver ? 'border-[#fcd71a] bg-[#fcd71a]/5' : 'border-zinc-700 hover:border-zinc-500 bg-[#0a0c10]/50'}`}
                    onDragOver={(e) => { e.preventDefault(); setCsvDragOver(true); }}
                    onDragLeave={() => setCsvDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setCsvDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleCsvFile(f); }}
                  >
                    <input type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCsvFile(f); }}/>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${csvDragOver ? 'bg-[#fcd71a]/20' : 'bg-zinc-800'}`}>
                      <Upload size={22} className={csvDragOver ? 'text-[#fcd71a]' : 'text-zinc-400'}/>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-300">Drag & drop karo ya click karke select karo</p>
                      <p className="text-xs text-zinc-600 mt-1">Sirf .csv files — Excel mein "Save As CSV" karke use karo</p>
                    </div>
                    {csvRaw && (
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-800/40">
                        <CheckCircle2 size={13}/> File loaded — {csvRows.length} valid rows parsed
                      </div>
                    )}
                  </label>

                  {/* Paste CSV manually */}
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-wider">Ya seedha paste karo (CSV text):</p>
                    <textarea
                      rows={5}
                      placeholder={`institute,program,quota,category,gender,opening,closing,fee,placement,nirf\nIndian Institute of Technology Bombay,Computer Science and Engineering,AI,OPEN,Gender-Neutral,87,342,₹2,25,000/year,₹42 LPA,3`}
                      value={csvRaw}
                      onChange={(e) => { setCsvRaw(e.target.value); setCsvDone(null); parseCSV(e.target.value); }}
                      className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-zinc-300 font-mono text-[11px] outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Errors */}
                {csvErrors.length > 0 && (
                  <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-4 space-y-2">
                    <p className="text-xs font-black text-red-400 flex items-center gap-2"><XCircle size={14}/> {csvErrors.length} parsing error{csvErrors.length > 1 ? 's' : ''}</p>
                    <ul className="space-y-1">
                      {csvErrors.slice(0, 8).map((e, i) => <li key={i} className="text-[11px] font-mono text-red-300">{e}</li>)}
                      {csvErrors.length > 8 && <li className="text-[11px] text-red-400">...aur {csvErrors.length - 8} errors</li>}
                    </ul>
                  </div>
                )}

                {/* Preview Table */}
                {csvRows.length > 0 && (
                  <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
                      <p className="text-xs font-black text-white flex items-center gap-2"><Database size={13} className="text-emerald-400"/> Preview — first {Math.min(csvRows.length, 8)} of {csvRows.length} rows</p>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-800/30">{csvRows.length} rows ready</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-zinc-800/60">
                            {['Institute', 'Program', 'Quota', 'Cat', 'Gender', 'Open', 'Close', 'NIRF'].map(h => (
                              <th key={h} className="px-3 py-2.5 text-left text-zinc-500 font-bold uppercase text-[9px] tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvRows.slice(0, 8).map((row, i) => (
                            <tr key={i} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-[#0a0c10]/30' : ''}`}>
                              <td className="px-3 py-2 text-zinc-200 max-w-[180px] truncate font-medium">
                                {row.institute.replace('Indian Institute of Technology', 'IIT').replace('National Institute of Technology', 'NIT').replace('Indian Institute of Information Technology', 'IIIT')}
                              </td>
                              <td className="px-3 py-2 text-zinc-400 max-w-[140px] truncate">{row.program}</td>
                              <td className="px-3 py-2"><span className="font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">{row.quota}</span></td>
                              <td className="px-3 py-2 text-zinc-400 font-mono">{row.category}</td>
                              <td className="px-3 py-2 text-zinc-500 text-[10px]">{row.gender === 'Gender-Neutral' ? 'GN' : 'FO'}</td>
                              <td className="px-3 py-2 text-emerald-400 font-mono font-bold">{row.opening?.toLocaleString()}</td>
                              <td className="px-3 py-2 text-[#fcd71a] font-mono font-bold">{row.closing?.toLocaleString()}</td>
                              <td className="px-3 py-2 text-zinc-500 font-mono">{row.nirf ?? '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {csvRows.length > 8 && (
                      <div className="px-5 py-2.5 border-t border-zinc-800/60 text-[10px] text-zinc-600 font-mono">
                        + {csvRows.length - 8} more rows (sabhi import honge)
                      </div>
                    )}
                  </div>
                )}

                {/* Import Button + Progress */}
                {csvRows.length > 0 && !csvDone && (
                  <div className="space-y-3">
                    {csvImporting && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                          <span>Importing... {csvProgress}%</span>
                          <span>{Math.round(csvRows.length * csvProgress / 100)}/{csvRows.length} rows</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#fcd71a] transition-all duration-300 rounded-full" style={{ width: `${csvProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleCsvImport}
                      disabled={csvImporting}
                      className="w-full flex items-center justify-center gap-2 bg-[#fcd71a] hover:bg-[#ebd02c] disabled:opacity-50 disabled:cursor-wait text-[#111625] font-black py-4 rounded-xl uppercase text-xs tracking-wider transition-all"
                    >
                      {csvImporting ? (
                        <><span className="animate-spin">⟳</span> Importing {csvRows.length} records...</>
                      ) : (
                        <><Upload size={14}/> Import {csvRows.length} Records into Database</>
                      )}
                    </button>
                  </div>
                )}

                {/* Success State */}
                {csvDone && (
                  <div className={`rounded-2xl p-6 border text-center space-y-3 ${csvDone.fail === 0 ? 'bg-emerald-950/30 border-emerald-800/50' : 'bg-amber-950/30 border-amber-800/50'}`}>
                    <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-emerald-900/40 border border-emerald-700/40">
                      <CheckCircle2 size={22} className="text-emerald-400"/>
                    </div>
                    <p className="text-base font-black text-white">{csvDone.ok} records import ho gaye! 🎉</p>
                    {csvDone.fail > 0 && <p className="text-xs text-amber-400">{csvDone.fail} records fail hue (duplicate ya missing fields)</p>}
                    <div className="flex gap-3 justify-center pt-2">
                      <button onClick={() => { setCsvRaw(''); setCsvRows([]); setCsvErrors([]); setCsvDone(null); setCsvProgress(0); }}
                        className="text-xs font-black px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all">
                        Naya CSV Upload karo
                      </button>
                      <button onClick={() => setView('cutoffs')}
                        className="text-xs font-black px-5 py-2.5 rounded-xl bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] transition-all">
                        Records Dekho
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'seats' && (
              <div className="max-w-3xl animate-fadeIn space-y-6">

                {/* Single row form */}
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><School size={16} className="text-purple-400"/> Single Row — New Seat Entry</h3>
                  <form onSubmit={handleAddSeat} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Institute Name</label><input type="text" placeholder="National Institute of Technology Agartala" value={newSeatInst} onChange={(e) => setNewSeatInst(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Program / Branch</label><input type="text" placeholder="Electrical Engineering" value={newSeatProg} onChange={(e) => setNewSeatProg(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Quota / Category</label><input type="text" placeholder="OPEN (OS)" value={newSeatQuota} onChange={(e) => setNewSeatQuota(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Total Seats</label><input type="number" placeholder="e.g. 92" value={newSeatCap} onChange={(e) => setNewSeatCap(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <button type="submit" className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2"><School size={14}/> Add Row to Database</button>
                  </form>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-zinc-800"></div>
                  <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest">Ya bulk CSV se</span>
                  <div className="h-px flex-1 bg-zinc-800"></div>
                </div>

                {/* Template download */}
                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Download size={18} className="text-purple-400"/>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-white">Step 1 — Template Download karo</p>
                    <p className="text-xs text-zinc-400 mt-0.5">CSV columns: <span className="font-mono text-zinc-300">institute, program, quota, seats</span></p>
                  </div>
                  <button onClick={downloadSeatTemplate} className="shrink-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all">
                    <Download size={13}/> Download Template
                  </button>
                </div>

                {/* Upload zone */}
                <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <p className="text-sm font-black text-white flex items-center gap-2"><Upload size={15} className="text-purple-400"/> Step 2 — CSV Upload karo</p>
                  <label
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl py-10 cursor-pointer transition-all ${seatCsvDragOver ? 'border-purple-500 bg-purple-500/5' : 'border-zinc-700 hover:border-zinc-500 bg-[#0a0c10]/50'}`}
                    onDragOver={(e) => { e.preventDefault(); setSeatCsvDragOver(true); }}
                    onDragLeave={() => setSeatCsvDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setSeatCsvDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleSeatCsvFile(f); }}
                  >
                    <input type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSeatCsvFile(f); }}/>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${seatCsvDragOver ? 'bg-purple-500/20' : 'bg-zinc-800'}`}>
                      <Upload size={22} className={seatCsvDragOver ? 'text-purple-400' : 'text-zinc-400'}/>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-300">Drag & drop ya click karke select karo</p>
                      <p className="text-xs text-zinc-600 mt-1">Sirf .csv files</p>
                    </div>
                    {seatCsvRaw && (
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 px-4 py-2 rounded-xl border border-purple-800/40">
                        <CheckCircle2 size={13}/> {seatCsvRows.length} valid rows parsed
                      </div>
                    )}
                  </label>
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-wider">Ya seedha paste karo:</p>
                    <textarea
                      rows={4}
                      placeholder={`institute,program,quota,seats\nNational Institute of Technology Trichy,Computer Science and Engineering,OPEN (OS),45`}
                      value={seatCsvRaw}
                      onChange={(e) => { setSeatCsvRaw(e.target.value); setSeatCsvDone(null); parseSeatCSV(e.target.value); }}
                      className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-zinc-300 font-mono text-[11px] outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Errors */}
                {seatCsvErrors.length > 0 && (
                  <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-4 space-y-2">
                    <p className="text-xs font-black text-red-400 flex items-center gap-2"><XCircle size={14}/> {seatCsvErrors.length} error{seatCsvErrors.length > 1 ? 's' : ''}</p>
                    <ul className="space-y-1">
                      {seatCsvErrors.slice(0, 6).map((e, i) => <li key={i} className="text-[11px] font-mono text-red-300">{e}</li>)}
                    </ul>
                  </div>
                )}

                {/* Preview */}
                {seatCsvRows.length > 0 && (
                  <div className="bg-[#0d1117] border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
                      <p className="text-xs font-black text-white">Preview — first {Math.min(seatCsvRows.length, 8)} of {seatCsvRows.length} rows</p>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-3 py-1 rounded-lg border border-purple-800/30">{seatCsvRows.length} rows ready</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-zinc-800/60">
                            {['Institute', 'Program', 'Quota', 'Seats'].map(h => (
                              <th key={h} className="px-4 py-2.5 text-left text-zinc-500 font-bold uppercase text-[10px] tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {seatCsvRows.slice(0, 8).map((row, i) => (
                            <tr key={i} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-[#0a0c10]/30' : ''}`}>
                              <td className="px-4 py-2.5 text-zinc-200 max-w-[200px] truncate font-medium">
                                {row.institute.replace('Indian Institute of Technology', 'IIT').replace('National Institute of Technology', 'NIT').replace('Indian Institute of Information Technology', 'IIIT')}
                              </td>
                              <td className="px-4 py-2.5 text-zinc-400 max-w-[160px] truncate">{row.program}</td>
                              <td className="px-4 py-2.5"><span className="font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">{row.quota}</span></td>
                              <td className="px-4 py-2.5 text-purple-400 font-mono font-black">{row.seats}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {seatCsvRows.length > 8 && (
                      <div className="px-5 py-2.5 border-t border-zinc-800/60 text-[10px] text-zinc-600 font-mono">+ {seatCsvRows.length - 8} more rows</div>
                    )}
                  </div>
                )}

                {/* Import button */}
                {seatCsvRows.length > 0 && !seatCsvDone && (
                  <div className="space-y-3">
                    {seatCsvImporting && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                          <span>Importing... {seatCsvProgress}%</span>
                          <span>{Math.round(seatCsvRows.length * seatCsvProgress / 100)}/{seatCsvRows.length} rows</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 transition-all duration-300 rounded-full" style={{ width: `${seatCsvProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                    <button onClick={handleSeatCsvImport} disabled={seatCsvImporting}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-wait text-white font-black py-4 rounded-xl uppercase text-xs tracking-wider transition-all">
                      {seatCsvImporting ? <><span className="animate-spin">⟳</span> Importing {seatCsvRows.length} rows...</> : <><Upload size={14}/> Import {seatCsvRows.length} Seat Rows</>}
                    </button>
                  </div>
                )}

                {/* Success */}
                {seatCsvDone && (
                  <div className="bg-purple-950/30 border border-purple-800/50 rounded-2xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-purple-900/40 border border-purple-700/40">
                      <CheckCircle2 size={22} className="text-purple-400"/>
                    </div>
                    <p className="text-base font-black text-white">{seatCsvDone.ok} seat rows import ho gaye! 🎉</p>
                    {seatCsvDone.fail > 0 && <p className="text-xs text-amber-400">{seatCsvDone.fail} rows fail hue</p>}
                    <button onClick={() => { setSeatCsvRaw(''); setSeatCsvRows([]); setSeatCsvErrors([]); setSeatCsvDone(null); setSeatCsvProgress(0); }}
                      className="text-xs font-black px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all">
                      Naya CSV Upload karo
                    </button>
                  </div>
                )}
              </div>
            )}

            {view === 'deadlines' && (
              <div className="max-w-2xl animate-fadeIn">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><Clock size={16} className="text-emerald-400"/> New Deadline / Schedule Entry</h3>
                  <form onSubmit={handleAddDeadline} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Date</label><input type="text" placeholder="June 10, 2026" value={newDeadDate} onChange={(e) => setNewDeadDate(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Status</label><select value={newDeadStat} onChange={(e) => setNewDeadStat(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 rounded-xl p-3 text-zinc-300 outline-none text-xs"><option value="Upcoming">Upcoming</option><option value="Live Soon">Live Soon</option><option value="Strict Warning">Strict Warning</option></select></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Event Title</label><input type="text" placeholder="JoSAA Round 1 Result Declaration" value={newDeadTitle} onChange={(e) => setNewDeadTitle(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors" required /></div>
                    <div className="sm:col-span-2"><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Description (optional)</label><textarea rows={3} placeholder="Additional details..." value={newDeadDesc} onChange={(e) => setNewDeadDesc(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none transition-colors resize-none" /></div>
                    <button type="submit" className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 mt-2"><Calendar size={14}/> Add Deadline to Schedule</button>
                  </form>
                </div>
              </div>
            )}

            {view === 'settings' && (
              <div className="max-w-2xl animate-fadeIn space-y-6">
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fcd71a]"></div>
                  <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2"><ShieldCheck size={16} className="text-[#fcd71a]"/> Premium Gateway Settings</h3>
                  <div className="space-y-4">
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">WhatsApp Group Access Link</label><input type="text" value={premiumGroupUrl} onChange={(e) => setPremiumGroupUrl(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-emerald-400 outline-none transition-colors font-mono text-xs" /></div>
                    <div><label className="block mb-1.5 text-zinc-400 uppercase text-[10px] tracking-wider">Premium Token Price (₹)</label><input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} className="w-full bg-[#0a0c10] border border-zinc-800 focus:border-[#fcd71a] rounded-xl p-3 text-[#fcd71a] outline-none transition-colors font-mono text-sm font-bold" /></div>
                  </div>
                </div>
                <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-zinc-400"/> Admin Credentials</h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-zinc-800/50"><span className="text-zinc-500">Email</span><span className="text-zinc-200">admin@achiver.com</span></div>
                    <div className="flex justify-between py-2"><span className="text-zinc-500">Password</span><span className="text-zinc-200">admin123</span></div>
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

export default dynamic(() => Promise.resolve(AdminPage), { ssr: false });