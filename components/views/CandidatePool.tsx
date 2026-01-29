
import React from 'react';
import { Candidate } from '../../types';

interface CandidatePoolProps {
  candidates: Candidate[];
  onDelete: (id: string) => void;
}

const CandidatePool: React.FC<CandidatePoolProps> = ({ candidates, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {candidates.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-users text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Pool is Empty</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Start screening resumes to build your talent database. All matched profiles will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Target Role</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Match Score</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Screened</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {candidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">{c.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-black border ${
                        c.matchScore >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        c.matchScore >= 60 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {c.matchScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        Screened
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">{c.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onDelete(c.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatePool;
