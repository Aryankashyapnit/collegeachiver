"use client";

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Registration successful! Proceeding to Login.', type: 'success' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex font-sans text-white selection:bg-[#fcd71a]/30">
      {/* Left side - Branding & Image (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#111625]">
        {/* Abstract shapes */}
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#fcd71a]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
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
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Start Your Journey</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight">
            Unlock your <br/> true potential <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#fcd71a]">with Pro Insights.</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">
            Create your free account today and get instant access to 17,000+ data points for JoSAA 2026.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 mt-auto">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full bg-zinc-700`}></div>
            ))}
            <div className={`w-6 h-2 rounded-full bg-[#fcd71a]`}></div>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Join the smartest candidates</p>
        </div>
      </div>

      {/* Right side - Form */}
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
            <h2 className="text-3xl font-black tracking-tight text-white">Create Account</h2>
            <p className="text-zinc-400 font-medium text-sm">Join College Achiver today for free</p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 backdrop-blur-md border ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-[#fcd71a]/10 text-[#fcd71a] border-[#fcd71a]/20'}`}>
              {message.type === 'success' ? <ShieldCheck className="w-5 h-5 shrink-0" /> : <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
              {message.text}
            </div>
          )}

          <div className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-zinc-400">Full Name</label>
                <div className="relative group">
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcd71a] transition-colors" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c] border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-[#fcd71a] focus:ring-1 focus:ring-[#fcd71a]/50 outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="Your Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-zinc-400">Email Address</label>
                <div className="relative group">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcd71a] transition-colors" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c] border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-[#fcd71a] focus:ring-1 focus:ring-[#fcd71a]/50 outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="student@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-zinc-400">Password</label>
                <div className="relative group">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcd71a] transition-colors" />
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c] border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-[#fcd71a] focus:ring-1 focus:ring-[#fcd71a]/50 outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="••••••••" />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-[#fcd71a] hover:bg-white text-[#111625] font-black py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(252,215,26,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] mt-2">
                {loading ? 'Creating...' : <>Register Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </div>

          <div className="text-center text-sm font-medium text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-white hover:text-[#fcd71a] transition-colors underline decoration-zinc-700 underline-offset-4 hover:decoration-[#fcd71a]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
