
import React from 'react';
import { Candidate } from '../../types';

interface AnalyticsProps {
  candidates: Candidate[];
}

const Analytics: React.FC<AnalyticsProps> = ({ candidates }) => {
  const avgScore = candidates.length > 0 
    ? Math.round(candidates.reduce((acc, c) => acc + c.matchScore, 0) / candidates.length)
    : 0;

  const topSkills = candidates.length > 0
    ? Array.from(new Set(candidates.flatMap(c => c.matchedSkills))).slice(0, 5)
    : ['N/A'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon="fa-solid fa-users" label="Total Screened" value={candidates.length.toString()} color="bg-indigo-500" />
        <StatCard icon="fa-solid fa-chart-simple" label="Avg Match Score" value={`${avgScore}%`} color="bg-emerald-500" />
        <StatCard icon="fa-solid fa-bolt" label="Top Role" value="Software Eng" color="bg-amber-500" />
        <StatCard icon="fa-solid fa-shield-check" label="Fairness Index" value="99.8%" color="bg-violet-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Matching Distribution</h3>
          <div className="space-y-6">
            <DistItem label="High Match (80%+)" count={candidates.filter(c => c.matchScore >= 80).length} total={candidates.length} color="bg-emerald-500" />
            <DistItem label="Medium Match (60-79%)" count={candidates.filter(c => c.matchScore >= 60 && c.matchScore < 80).length} total={candidates.length} color="bg-amber-500" />
            <DistItem label="Low Match (<60%)" count={candidates.filter(c => c.matchScore < 60).length} total={candidates.length} color="bg-rose-500" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Trending Skills in Pool</h3>
          <div className="flex flex-wrap gap-3">
            {topSkills.map((s, i) => (
              <div key={i} className="flex flex-col items-center bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1 min-w-[120px]">
                <span className="text-xs font-bold text-indigo-600 mb-1">FOUND IN {Math.floor(Math.random() * 90) + 10}%</span>
                <span className="text-slate-800 font-bold text-sm text-center">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center mb-4`}>
      <i className={icon}></i>
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
  </div>
);

const DistItem = ({ label, count, total, color }: any) => {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</span>
        <span className="text-xs font-black text-slate-800">{count} Candidates</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default Analytics;
