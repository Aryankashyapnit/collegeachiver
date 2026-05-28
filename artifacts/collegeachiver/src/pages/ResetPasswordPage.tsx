// @ts-ignore
import { useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabaseClient';
import { Lock, Save, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [, setLocation] = useLocation();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setMessage({ text: error.message, type: 'error' }); }
    else {
      setMessage({ text: 'Password has been updated successfully!', type: 'success' });
      setTimeout(() => setLocation('/login'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4 font-sans selection:bg-[#fcd71a]/30">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-[#eef2f7] p-8 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
        <div className="text-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fcd71a]/10 text-[#cca01d] mb-4 shadow-sm border border-[#f5d020]/20"><ShieldCheck size={28} /></div>
          <h1 className="text-3xl font-black text-[#111625] tracking-tight mb-2">New Password</h1>
          <p className="text-sm font-medium text-[#5e6b7f]">Please enter your new password below</p>
        </div>
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-[#fcd71a]/10 text-[#977914] border border-[#fce95c]/30'}`}>
            {message.type === 'success' && <ShieldCheck size={18} />}
            {message.text}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-[#8492a6]">New Password</label>
            <div className="relative group">
              <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#a0abbc] group-focus-within:text-[#cca01d] transition-colors" />
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#111625] focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#fcd71a] hover:bg-[#ebd02c] text-[#111625] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 mt-6">
            {loading ? 'Updating...' : <><Save size={16} /> Save New Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}
