'use client';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Database, UserCog, ShieldCheck, X, MessageSquare, Send, User, Lock, PlusCircle, School, Calendar, Eye } from 'lucide-react';
import { supabase } from './supabaseClient'; 

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [adminView, setAdminView] = useState<'Overview' | 'Database' | 'Users'>('Overview');
  const [totalVisits, setTotalVisits] = useState(1248);

  // Database State
  const [dynamicJosaaRecords, setDynamicJosaaRecords] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('josaa_records').select('*');
      if (data) setDynamicJosaaRecords(data);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      
      {/* NAVBAR WITH FORCE-CLICK SIGNIN */}
      {activeTab !== 'AdminPanel' && (
        <nav className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl cursor-pointer" onClick={() => setActiveTab('Home')}>CollegeAchiver</div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('Home')} className="text-sm font-medium">Home</button>
            <button onClick={() => { 
                console.log("Triggering Sign In"); 
                setIsSignInOpen(true); 
            }} className="bg-yellow-400 px-4 py-2 rounded-lg text-xs font-bold">Sign In</button>
          </div>
        </nav>
      )}

      {/* DASHBOARD CONTENT */}
      {activeTab === 'Home' && <div className="p-10 text-center"><h1>Welcome to CollegeAchiver</h1></div>}
      {activeTab === 'AdminPanel' && (
        <div className="p-10 bg-zinc-950 text-white min-h-screen">
          <h1 className="text-2xl mb-6">Admin Panel</h1>
          <button onClick={() => setActiveTab('Home')} className="bg-red-600 px-4 py-2 rounded">Exit Admin</button>
        </div>
      )}

      {/* 🔐 SIGN IN MODAL - FORCE Z-INDEX */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl relative">
            <button onClick={() => setIsSignInOpen(false)} className="absolute top-4 right-4"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <input className="w-full border p-2 mb-4 rounded" placeholder="Email" />
            <input className="w-full border p-2 mb-4 rounded" type="password" placeholder="Password" />
            <button onClick={() => {
                alert("Admin login detected!");
                setActiveTab('AdminPanel');
                setIsSignInOpen(false);
            }} className="w-full bg-black text-white py-2 rounded">Access Dashboard</button>
          </div>
        </div>
      )}

      {/* 🤖 CHATBOT */}
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full">
        <MessageSquare size={24}/>
      </button>
    </main>
  );
}