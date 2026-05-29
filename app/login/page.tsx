'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabaseClient';
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

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

    if (!password) {
      // Demo Login flow
      setMessage({ text: 'Demo Access Granted! Redirecting...', type: 'success' });
      localStorage.setItem('demo_session', 'true');
      setTimeout(() => router.push('/dashboard'), 1500);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Welcome back! Redirecting...', type: 'success' });
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex font-sans text-white selection:bg-[#fcd71a]/30">
      {/* Left side - Branding & Image (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-gradient-to-br from-[#111625] to-[#0a0f1c]">
        {/* Abstract shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#fcd71a]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fcd71a] flex items-center justify-center shadow-[0_0_20px_rgba(252,215,26,0.3)]">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M18 8L4 15L18 22L32 15L18 8Z" fill="#111625" stroke="#111625" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M10 19v6c0 0 3.5 4 8 4s8-4 8-4v-6" stroke="#111625" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <circle cx="32" cy="15" r="1.5" fill="#111625"/>
                <line x1="32" y1="15" x2="32" y2="22" stroke="#111625" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">College<span className="text-[#fcd71a]">Achiver</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#fcd71a]" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">JoSAA 2026 Counselling</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight">
            Predict your <br/> future college <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcd71a] to-[#ffaa00]">with accuracy.</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">
            Join thousands of students who trust CollegeAchiver for data-driven seat matrix forecasting and cutoff insights.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 mt-auto">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0a0f1c] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-[10px] font-bold text-white shadow-lg`}>
                User
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-400 font-medium">Over <strong className="text-white">10,000+</strong> students joined</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="max-w-md w-full space-y-8 relative z-10">
          
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#fcd71a] flex items-center justify-center">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M18 8L4 15L18 22L32 15L18 8Z" fill="#111625" stroke="#111625" strokeWidth="1" strokeLinejoin="round"/>
                  <path d="M10 19v6c0 0 3.5 4 8 4s8-4 8-4v-6" stroke="#111625" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">College<span className="text-[#fcd71a]">Achiver</span></span>
            </Link>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-white">Welcome Back</h2>
            <p className="text-zinc-400 font-medium text-sm">Sign in to your account to continue</p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 backdrop-blur-md border ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-[#fcd71a]/10 text-[#fcd71a] border-[#fcd71a]/20'}`}>
              {message.type === 'success' ? <ShieldCheck className="w-5 h-5 shrink-0" /> : <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
              {message.text}
            </div>
          )}

          <div className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-zinc-400">Email or Phone Number</label>
                <div className="relative group">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcd71a] transition-colors" />
                  <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c] border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-[#fcd71a] focus:ring-1 focus:ring-[#fcd71a]/50 outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="student@example.com or 9876543210" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-zinc-400">Password (Optional for Demo)</label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-[#fcd71a] hover:text-white transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcd71a] transition-colors" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c] border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-[#fcd71a] focus:ring-1 focus:ring-[#fcd71a]/50 outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="Leave blank for Demo Login" />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-[#fcd71a] hover:bg-white text-[#111625] font-black py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(252,215,26,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                {loading ? 'Authenticating...' : <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </div>

          <div className="text-center text-sm font-medium text-zinc-400">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-white hover:text-[#fcd71a] transition-colors underline decoration-zinc-700 underline-offset-4 hover:decoration-[#fcd71a]">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
