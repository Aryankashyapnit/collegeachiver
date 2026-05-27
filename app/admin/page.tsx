"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Trash2, Edit } from 'lucide-react';
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
    const { data, error } = await supabase.from('colleges').select('*').order('id', { ascending: false });
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

    const { data, error } = await supabase.from('colleges').insert([newRecord]).select();

    if (error) {
      console.error("Error inserting data:", error);
      setMessage("Error adding data: " + error.message);
    } else {
      setMessage("College Data added successfully!");
      setFormData({
        institute: '', program: '', quota: '', category: '', gender: '',
        opening: '', closing: '', fee: '', placement: '', nirf: ''
      });
      fetchColleges(); // Refresh data
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    const { error } = await supabase.from('colleges').delete().eq('id', id);
    if (error) {
      alert("Error deleting record.");
    } else {
      fetchColleges();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Admin Panel - College Data
          </h1>
          <Link href="/" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors">
            Back to Website
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Record Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New Record
            </h2>
            
            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                <input required name="institute" value={formData.institute} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. IIT Bombay" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input required name="program" value={formData.program} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Computer Science" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quota</label>
                  <select required name="quota" value={formData.quota} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select</option>
                    <option value="AI">AI</option>
                    <option value="OS">OS</option>
                    <option value="HS">HS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select</option>
                    <option value="Gender-Neutral">Neutral</option>
                    <option value="Female-Only">Female Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIRF Rank</label>
                  <input type="number" required name="nirf" value={formData.nirf} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Rank</label>
                  <input type="number" required name="opening" value={formData.opening} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Closing Rank</label>
                  <input type="number" required name="closing" value={formData.closing} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee (per year)</label>
                  <input required name="fee" value={formData.fee} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 2.5L/yr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avg Placement</label>
                  <input required name="placement" value={formData.placement} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 15 LPA" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
                Add Record
              </button>
            </form>
          </div>

          {/* Records Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Existing Records in Database</h2>
                <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{colleges.length} total</span>
             </div>
             <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
               {loading ? (
                 <div className="p-12 text-center text-gray-500">Loading data from Supabase...</div>
               ) : colleges.length === 0 ? (
                 <div className="p-12 text-center text-gray-500">No records found. Add some from the form.</div>
               ) : (
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-gray-50 sticky top-0 border-b border-gray-200">
                     <tr>
                       <th className="px-4 py-3 font-medium text-gray-600">ID</th>
                       <th className="px-4 py-3 font-medium text-gray-600">Institute</th>
                       <th className="px-4 py-3 font-medium text-gray-600">Program</th>
                       <th className="px-4 py-3 font-medium text-gray-600">Ranks</th>
                       <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {colleges.map((c) => (
                       <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                         <td className="px-4 py-3 text-gray-500">#{c.id}</td>
                         <td className="px-4 py-3 font-medium max-w-xs truncate" title={c.institute}>{c.institute}</td>
                         <td className="px-4 py-3 text-gray-500 max-w-xs truncate" title={c.program}>{c.program}</td>
                         <td className="px-4 py-3">
                            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded mr-2 text-xs border border-green-200">{c.opening}</span>
                            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs border border-red-200">{c.closing}</span>
                         </td>
                         <td className="px-4 py-3">
                           <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete Record">
                             <Trash2 className="w-4 h-4" />
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
