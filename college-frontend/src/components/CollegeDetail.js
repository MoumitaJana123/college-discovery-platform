

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CollegeDetail({ clearSelection }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    fetch(`http://localhost:5000/api/colleges/${id}`)
      .then(res => res.json())
      .then(data => setCollege(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  const handleBack = () => {
    if (clearSelection) clearSelection(); 
    navigate('/');
  };

  const getProgramsByCourse = (course) => {
    switch (course) {
      case 'MBBS':
        return ['General Medicine', 'Anatomy & Physiology', 'Biochemistry', 'Community Medicine'];
      case 'MBA':
        return ['Marketing Management', 'Financial Analytics', 'Operations & Supply Chain', 'Human Resources'];
      case 'B.Des':
        return ['Fashion Communication', 'Textile Design', 'Interaction Design', 'Product Styling'];
      case 'B.Com':
        return ['Advanced Accountancy', 'Business Law', 'Corporate Finance', 'Economics'];
      case 'LLB':
        return ['Constitutional Law', 'Criminal Justice', 'Corporate Law', 'Family Law'];
      case 'B.Tech':
      default:
        return ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering'];
    }
  };

  if (!college) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-bounce text-blue-600 font-black text-2xl">Loading Campus...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 pt-10 pb-10 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={handleBack} 
            className="mb-8 flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            ← Back to College List
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight mb-3">{college.name}</h1>
              <div className="flex items-center gap-4 text-slate-500 font-bold">
                <span>📍 {college.location}, India</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                   {college.course} Degree
                </span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                  {college.rating} ★ Student Rating
                </span>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-200 border-4 border-blue-600/20">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Annual Tuition Fees</p>
              <p className="text-4xl font-black">₹{Number(college.fees).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto flex gap-10 px-6">
          {['courses', 'placements', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-5 text-sm font-black uppercase tracking-widest transition-all border-b-4 ${
                activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {activeTab === 'courses' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl font-black text-slate-900 mb-8">Specializations in {college.course}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getProgramsByCourse(college.course).map(courseName => (
                  <div key={courseName} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-default">
                    <span className="font-bold text-slate-700 text-lg">{courseName}</span>
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">FULL TIME</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl font-black text-slate-900 mb-10">Placement Report (2024-25)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-10 bg-blue-50 rounded-[2.5rem] border border-blue-100 text-center hover:scale-105 transition-transform">
                  <p className="text-4xl font-black text-blue-700 mb-2">{college.highest_ctc || 'N/A'}</p>
                  <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Highest CTC</p>
                </div>

                <div className="p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center hover:scale-105 transition-transform">
                  <p className="text-5xl font-black text-emerald-700 mb-2">{college.placement_rate || '0'}%</p>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Placement Rate</p>
                </div>

                <div className="p-10 bg-amber-50 rounded-[2.5rem] border border-amber-100 text-center hover:scale-105 transition-transform">
                  <p className="text-5xl font-black text-amber-700 mb-2">{college.recruiters_count || '0'}+</p>
                  <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Recruiters</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <h3 className="text-3xl font-black text-slate-900 mb-4">Student Experiences</h3>
              <div className="grid grid-cols-1 gap-6">
                {[0, 1].map(r => {
                  const reviews = [
                    `Studying at ${college.name} has been transformative. The ${college.course} program culture is vibrant, and the campus infrastructure provides amazing exposure.`,
                    `The faculty for ${college.course} at ${college.name} are truly helpful. The peer environment is competitive yet supportive, making it a great place to grow.`
                  ];
                  return (
                    <div key={r} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group hover:bg-white hover:border-blue-100 transition-all">
                      <div className="text-amber-400 text-xl mb-4">★★★★★</div>
                      <p className="text-slate-600 leading-relaxed font-medium text-xl italic mb-6">
                        "{reviews[r]}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">{r === 0 ? 'A' : 'S'}</div>
                        <div>
                          <p className="font-black text-slate-900">{r === 0 ? 'Recent Graduate' : 'Final Year Student'}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Alumni</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CollegeDetail;
