'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (email === 'admin@achiver.com' && password === 'admin123') {
      setMessage({ text: 'Admin Access Granted! Routing to Dashboard...', type: 'success' });
      setTimeout(() => router.push('/admin'), 1500);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Welcome back! Redirecting...', type: 'success' });
      setTimeout(() => router.push('/'), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4 font-sans selection:bg-[#fcd71a]/30">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-[#eef2f7] p-8 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fcd71a]"></div>
        <div className="text-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fcd71a]/10 text-[#cca01d] mb-4 shadow-sm border border-[#f5d020]/20"><LogIn size={28} /></div>
          <h1 className="text-3xl font-black text-[#111625] tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm font-medium text-[#5e6b7f]">Sign in to continue your college journey</p>
        </div>
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-[#fcd71a]/10 text-[#977914] border border-[#fce95c]/30'}`}>
            {message.type === 'success' && <ShieldCheck size={18} />}
            {message.text}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-[#8492a6]">Email Address</label>
            <div className="relative group">
              <Mail className="w-5 h-5 absolute left-4 top-3.5 text-[#a0abbc] group-focus-within:text-[#cca01d] transition-colors" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#111625] focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="student@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-[#8492a6]">Password</label>
            <div className="relative group">
              <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#a0abbc] group-focus-within:text-[#cca01d] transition-colors" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#111625] focus:border-[#fcd71a] focus:bg-white outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            <div className="text-[10px] text-zinc-400 font-mono tracking-wider">*Admin: <span className="text-[#cca01d] cursor-help" title="Email: admin@achiver.com | Pass: admin123">Hover for Hint</span></div>
            <Link href="/forgot-password" className="text-xs font-bold text-[#cca01d] hover:text-[#977914] transition-colors">Forgot Password?</Link>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#111625] hover:bg-zinc-800 text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 mt-4">
            {loading ? 'Authenticating...' : <>Secure Sign In <ArrowRight size={16} /></>}
          </button>
        </form>
        <div className="mt-8 text-center text-xs font-semibold text-[#5e6b7f]">
          Don't have an account?{' '}
          <Link href="/register" className="font-extrabold text-[#111625] hover:text-[#cca01d] transition-colors underline decoration-[#fcd71a]/40 decoration-2 underline-offset-4">Register now</Link>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-[11px] font-bold text-[#8492a6] hover:text-[#111625] transition-colors">← Back to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
