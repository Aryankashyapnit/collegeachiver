"use client";
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Code2, Rocket, Github, Linkedin, Mail, Heart, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#111625] antialiased font-sans">
      
      {/* MINIMAL NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#eef1f6] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-[#111625] flex items-center justify-center shadow-md">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M18 8L4 15L18 22L32 15L18 8Z" fill="#fcd71a" stroke="#fcd71a" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M10 19v6c0 0 3.5 4 8 4s8-4 8-4v-6" stroke="#fcd71a" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <circle cx="32" cy="15" r="1.5" fill="#fcd71a"/>
                <line x1="32" y1="15" x2="32" y2="22" stroke="#fcd71a" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight text-[#111625]">College<span className="text-[#cca01d]">Achiver</span></span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-[#5e6b7f] hover:text-[#111625] transition-colors bg-[#f4f7fa] px-4 py-2 rounded-xl">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fadeIn space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#fcd71a]/15 text-[#8a6d00] border border-[#f5d020]/40 rounded-full px-4 py-1.5 text-xs font-bold font-mono uppercase tracking-wider">
            <Code2 size={14} /> The Brain Behind The Code
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111625]">Meet the Developer</h1>
          <p className="text-[#5e6b7f] font-medium max-w-xl mx-auto leading-relaxed">
            Built by a student, for the students. Demystifying the JoSAA counselling process with clean data and seamless tech.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-[#eef2f7] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#111625] via-[#fcd71a] to-[#111625]"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar - Updated with your photo */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gradient-to-br from-[#111625] to-[#2a3655] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-[#fcd71a] overflow-hidden">
               {/* 📸 YOUR PHOTO IS HERE 📸 */}
               <img src="/aryan_profile.jpg" alt="Aryan Kumar" className="w-full h-full object-cover"/>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-black text-[#111625]">Aryan Kumar</h2>
                <p className="text-sm font-bold text-[#cca01d] uppercase tracking-widest mt-1">Founder & Lead Developer</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-semibold text-[#5e6b7f]">
                <span className="flex items-center gap-1.5 bg-[#f4f7fa] px-3 py-1.5 rounded-lg border border-[#e2e8f0]">
                  <GraduationCap size={14} className="text-blue-600"/> NIT Agartala
                </span>
                <span className="flex items-center gap-1.5 bg-[#f4f7fa] px-3 py-1.5 rounded-lg border border-[#e2e8f0]">
                  <Cpu size={14} className="text-purple-600"/> Full-Stack Developer
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[#485363] pt-2">
                Hey there! 👋 I built CollegeAchiver because I know exactly how stressful the JoSAA counselling phase can be. Staring at endless PDFs and trying to guess which college you&apos;ll get is overwhelming. I wanted to use my skills in full-stack development to create a clean, lightning-fast, and data-driven tool that gives students clarity and confidence in their college choices.
              </p>

              {/* SOCIAL LINKS - (Customize these links to point to your real profiles) */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
                <a href="https://github.com/aryankumardev" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#111625] text-white flex items-center justify-center hover:bg-zinc-800 transition-all shadow-md">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/aryankumardev" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#0077b5] text-white flex items-center justify-center hover:bg-[#006396] transition-all shadow-md">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:aryan.kumar@nitagartala.in" className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-md">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TECH STACK / MISSION SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111625] rounded-3xl p-8 text-white space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#1a2235] flex items-center justify-center border border-zinc-700/50">
              <Rocket size={24} className="text-[#fcd71a]" />
            </div>
            <h3 className="text-xl font-black">The Mission</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              To democratize college admission data. Every JEE aspirant deserves free, immediate, and highly accurate insights to plan their future without paying hefty sums to private counsellors.
            </p>
          </div>
          <div className="bg-white border border-[#eef2f7] rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <Code2 size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-[#111625]">Tech Stack</h3>
            <p className="text-sm text-[#5e6b7f] leading-relaxed">
              CollegeAchiver is engineered for speed and scale. Built using modern web technologies including <strong>Next.js, React, Tailwind CSS</strong>, and powered by a robust <strong>Supabase</strong> PostgreSQL database backend.
            </p>
          </div>
        </div>

        {/* CLOSING NOTE */}
        <div className="text-center pt-8 pb-12">
          <p className="text-sm font-bold text-[#5e6b7f] flex items-center justify-center gap-2">
            Built with <Heart size={16} className="text-red-500 fill-red-500" /> and lots of coffee.
          </p>
        </div>

      </div>
    </main>
  );
}