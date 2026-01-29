
import React, { useState } from 'react';
import { AnalysisResult } from '../types';

interface DashboardProps {
  result: AnalysisResult;
  onSave: (name: string, role: string) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onSave, onReset }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [targetRole, setTargetRole] = useState('');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-100 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onReset} className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Discard
          </button>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">MATCH COMPLETE</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {isSaving ? (
            <div className="flex gap-2 w-full">
              <input 
                autoFocus
                className="px-3 py-2 border rounded-lg text-sm flex-1 outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Candidate Name"
                value={candidateName}
                onChange={e => setCandidateName(e.target.value)}
              />
              <input 
                className="px-3 py-2 border rounded-lg text-sm flex-1 outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Role"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
              />
              <button 
                onClick={() => onSave(candidateName || 'Unnamed', targetRole || 'Role')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                Confirm
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSaving(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i> Save to Pool
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Match Score</h3>
            <div className={`w-36 h-36 rounded-full border-[10px] mx-auto flex flex-col items-center justify-center mb-6 ${getScoreColor(result.matchScore).split(' ').slice(2).join(' ')}`}>
              <span className={`text-4xl font-black ${getScoreColor(result.matchScore).split(' ')[0]}`}>{result.matchScore}%</span>
              <span className="text-[10px] font-bold text-slate-400">PRECISION</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Highest correlation found in <span className="font-bold text-slate-700">Hard Skills</span> and <span className="font-bold text-slate-700">Experience Density</span>.
            </p>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${getProgressColor(result.matchScore)} transition-all duration-1000`} style={{ width: `${result.matchScore}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-award text-amber-500"></i>
              Top Strengths
            </h3>
            <div className="space-y-3">
              {result.candidateStrengths.map((s, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Professional Summary</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg mb-8 italic">"{result.summary}"</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-check-double"></i> Keyword Matches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((sk, i) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 uppercase tracking-wider">{sk}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i> Gaps Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((sk, i) => (
                    <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-100 uppercase tracking-wider">{sk}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <i className="fa-solid fa-user-shield text-indigo-400"></i>
                  Fairness Protocol Verdict
                </h3>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase rounded-full border border-indigo-500/30">Verified AI Logic</span>
              </div>
              <p className="text-indigo-100/80 leading-relaxed font-medium">
                {result.unbiasedVerdict}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
