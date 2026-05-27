"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Trash2, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPanel() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    institute: '',
    program: '',
    quota: '',
    category: '',
    gender: '',
    opening: '',
    closing: '',
    fee: '',
    placement: '',
    nirf: ''
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('josaadata_record').select('*').order('id', { ascending: false });
    if (error) {
      console.error("Error fetching colleges:", error);
    } else {
      setColleges(data || []);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Adding...");

    const newRecord = {
      ...formData,
      opening: parseInt(formData.opening) || 0,
      closing: parseInt(formData.closing) || 0,
      nirf: parseInt(formData.nirf) || 0,
    };

    const { data, error } = await supabase.from('josaadata_record').insert([newRecord]).select();

    if (error) {
      console.error("Error inserting data:", error);
      setMessage("Error adding data: " + error.message);
    } else {
      setMessage("College Data added successfully!");
      setFormData({
        institute: '', program: '', quota: '', category: '', gender: '',
        opening: '', closing: '', fee: '', placement: '', nirf: ''
      });
      fetchColleges(); 
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    const { error } = await supabase.from('josaadata_record').delete().eq('id', id);
    if (error) {
      alert("Error deleting record.");
    } else {
      fetchColleges();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#111625] font-sans selection:bg-[#fcd71a]/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/20 shadow-xs mb-3">
               <ShieldAlert size={12}/> Admin Controls Active
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111625]">
              Master Database Panel
            </h1>
          </div>
          <Link href="/" className="px-5 py-2.5 bg-white border border-[#eef2f7] hover:border-[#fcd71a] rounded-xl text-xs font-extrabold tracking-widest uppercase transition-all shadow-sm flex items-center gap-2 hover:bg-[#fafbfc]">
            <ArrowLeft size={16}/> Back to Website
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Record Form */}
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-[#eef2f7] relative overflow-hidden h-fit">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
            
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#fcd71a]/10 text-[#cca01d] flex items-center justify-center"><Plus size={20} /></div>
              Add New Cutoff
            </h2>
            
            {message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-bold border ${message.includes('Error') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Institute Name</label>
                <input required name="institute" value={formData.institute} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. IIT Bombay" />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Program Name</label>
                <input required name="program" value={formData.program} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. Computer Science" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Quota</label>
                  <select required name="quota" value={formData.quota} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all">
                    <option value="">Select</option>
                    <option value="AI">AI (All India)</option>
                    <option value="OS">OS (Other State)</option>
                    <option value="HS">HS (Home State)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Category</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all">
                    <option value="">Select</option>
                    <option value="OPEN">OPEN</option>
                    <option value="OBC-NCL">OBC-NCL</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Gender</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all">
                    <option value="">Select</option>
                    <option value="Gender-Neutral">Neutral</option>
                    <option value="Female-Only">Female Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">NIRF Rank</label>
                  <input type="number" required name="nirf" value={formData.nirf} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. 1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Opening Rank</label>
                  <input type="number" required name="opening" value={formData.opening} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. 100" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Closing Rank</label>
                  <input type="number" required name="closing" value={formData.closing} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. 500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Fee (per year)</label>
                  <input required name="fee" value={formData.fee} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. 2.5L/yr" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#8492a6] mb-1.5">Avg Placement</label>
                  <input required name="placement" value={formData.placement} onChange={handleChange} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="e.g. 15 LPA" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#111625] hover:bg-zinc-800 text-[#fcd71a] font-extrabold py-4 px-4 rounded-xl transition-all shadow-md mt-6 uppercase tracking-widest text-[11px]">
                Add to Database
              </button>
            </form>
          </div>

          {/* Records Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-[#eef2f7] overflow-hidden flex flex-col h-[850px]">
             <div className="p-6 border-b border-[#eef2f7] bg-[#fcfdfd] flex justify-between items-center shrink-0">
                <h2 className="text-xl font-black">Database Entries</h2>
                <span className="text-[11px] font-mono font-bold text-[#8492a6] bg-[#f8fafc] border border-slate-200 px-3 py-1.5 rounded-full uppercase tracking-wider">{colleges.length} Total Records</span>
             </div>
             <div className="overflow-x-auto overflow-y-auto flex-1">
               {loading ? (
                 <div className="p-12 text-center text-[#8492a6] font-mono text-sm font-bold">Syncing with Supabase...</div>
               ) : colleges.length === 0 ? (
                 <div className="p-12 text-center text-[#8492a6] font-mono text-sm font-bold">Database empty. Start by adding a record.</div>
               ) : (
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-[#f8fafc] sticky top-0 border-b border-[#e2e8f0] z-10">
                     <tr>
                       <th className="px-6 py-4 font-black text-[11px] uppercase tracking-widest text-[#8492a6]">ID</th>
                       <th className="px-6 py-4 font-black text-[11px] uppercase tracking-widest text-[#8492a6]">Institute</th>
                       <th className="px-6 py-4 font-black text-[11px] uppercase tracking-widest text-[#8492a6]">Program</th>
                       <th className="px-6 py-4 font-black text-[11px] uppercase tracking-widest text-[#8492a6]">Ranks (Open-Close)</th>
                       <th className="px-6 py-4 font-black text-[11px] uppercase tracking-widest text-[#8492a6]">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#eef2f7]">
                     {colleges.map((c) => (
                       <tr key={c.id} className="hover:bg-[#fcd71a]/5 transition-colors group">
                         <td className="px-6 py-4 text-[#a0abbc] font-mono text-xs">#{c.id}</td>
                         <td className="px-6 py-4 font-bold text-[#111625] max-w-[200px] truncate" title={c.institute}>{c.institute}</td>
                         <td className="px-6 py-4 text-[#5e6b7f] font-medium max-w-[150px] truncate" title={c.program}>{c.program}</td>
                         <td className="px-6 py-4">
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-mono font-bold mr-2 text-[11px] border border-emerald-200">{c.opening}</span>
                            <span className="text-amber-700 bg-amber-50 px-2 py-1 rounded font-mono font-bold text-[11px] border border-amber-200">{c.closing}</span>
                         </td>
                         <td className="px-6 py-4">
                           <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete Record">
                             <Trash2 size={16} />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
