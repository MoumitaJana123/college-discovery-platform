

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function ComparePage({ clearSelection }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ids = params.get('ids');

    if (ids) {
      fetch(`${process.env.REACT_APP_API_URL}/api/colleges/compare?ids=${ids}`)
        .then(res => res.json())
        .then(data => {
          setColleges(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Comparison fetch error:", err);
          setLoading(false);
        });
    }
  }, [location]);

  const handleBackToDiscovery = (e) => {
    e.preventDefault();
    if (clearSelection) clearSelection();
    navigate('/');
  };

  // Helper to clear selection when navigating to a specific college
  const handleViewCampus = (id) => {
    if (clearSelection) clearSelection();
    navigate(`/college/${id}`);
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Comparison...</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={handleBackToDiscovery}
          className="text-blue-600 font-bold flex items-center gap-2 mb-8 hover:underline"
        >
          ← Back to Discovery
        </button>

        <h1 className="text-4xl font-black text-slate-900 mb-12 text-center md:text-left">Compare Colleges</h1>

        <div className="overflow-x-auto shadow-2xl shadow-slate-200 rounded-[3rem] border border-slate-100">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="p-8 text-left bg-slate-50/50 border-b-2 border-slate-100 text-slate-400 uppercase tracking-widest text-[10px] font-black">Feature</th>
                {colleges.map(c => (
                  <th key={c.id} className="p-8 text-center border-b-2 border-slate-100 min-w-[280px]">
                    <div className="text-3xl mb-3">🏫</div>
                    <div className="text-xl font-black text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{c.location}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Fees Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8 font-black text-slate-500 text-sm border-b border-slate-50">Annual Fees</td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center border-b border-slate-50">
                    <span className="text-2xl font-black text-slate-900">₹{Number(c.fees).toLocaleString('en-IN')}</span>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8 font-black text-slate-500 text-sm border-b border-slate-50">Student Rating</td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center border-b border-slate-50">
                    <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl font-black text-lg">
                      {c.rating} ★
                    </div>
                  </td>
                ))}
              </tr>

              {/* Placement Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8 font-black text-slate-500 text-sm border-b border-slate-50">Placement Rate</td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center border-b border-slate-50">
                    <span className="text-2xl font-black text-emerald-600">
                      {c.placement_rate ? `${c.placement_rate}%` : "N/A"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Highest CTC Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8 font-black text-slate-500 text-sm border-b border-slate-50">Highest Package</td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center border-b border-slate-50">
                    <span className="text-xl font-black text-blue-600">
                      {c.highest_ctc || "N/A"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Location Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8 font-black text-slate-500 text-sm border-b border-slate-50">Campus Location</td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center border-b border-slate-50 font-bold text-slate-600">
                    {c.location}
                  </td>
                ))}
              </tr>

              {/* Action Row */}
              <tr>
                <td className="p-8"></td>
                {colleges.map(c => (
                  <td key={c.id} className="p-8 text-center">
                    {/* UPDATED: Changed Link to button to handle the clearSelection logic */}
                    <button 
                      onClick={() => handleViewCampus(c.id)}
                      className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-lg shadow-slate-200"
                    >
                      View Campus
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
