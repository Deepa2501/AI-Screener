
import React, { useState } from 'react';

interface SettingsProps {
  onLogout?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [sensitivity, setSensitivity] = useState(75);
  const [strictMatching, setStrictMatching] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Analysis Parameters</h3>
          <p className="text-sm text-slate-500">Tune the AI's matching behavior to your specific hiring needs.</p>
        </div>
        
        <div className="p-8 space-y-8">
          <section>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Match Sensitivity</label>
              <span className="text-sm font-black text-indigo-600">{sensitivity}%</span>
            </div>
            <input 
              type="range" 
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={sensitivity}
              onChange={e => setSensitivity(parseInt(e.target.value))}
            />
            <p className="mt-2 text-xs text-slate-400">Controls how strictly the AI penalizes missing keywords vs. conceptual alignment.</p>
          </section>

          <div className="h-[1px] bg-slate-100"></div>

          <section className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Strict Skill Matching</h4>
              <p className="text-xs text-slate-500">Only count skills that appear explicitly in the resume text.</p>
            </div>
            <button 
              onClick={() => setStrictMatching(!strictMatching)}
              className={`w-12 h-6 rounded-full transition-colors relative ${strictMatching ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${strictMatching ? 'right-1' : 'left-1'}`}></div>
            </button>
          </section>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-key text-indigo-500"></i>
          Integrations
        </h3>
        <div className="space-y-4">
          <IntegrationRow icon="fa-brands fa-linkedin" name="LinkedIn Recruiter" status="Connected" active />
          <IntegrationRow icon="fa-solid fa-cloud" name="AWS S3 Backup" status="Pending Setup" />
        </div>
      </div>

      <div className="bg-rose-50 rounded-2xl border border-rose-100 p-8">
        <h3 className="text-lg font-bold text-rose-800 mb-2">Danger Zone</h3>
        <p className="text-sm text-rose-600/70 mb-6">Security actions for your administrative session.</p>
        <button 
          onClick={onLogout}
          className="px-6 py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Sign Out of System
        </button>
      </div>
    </div>
  );
};

const IntegrationRow = ({ icon, name, status, active }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${active ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'bg-slate-100 text-slate-400'}`}>
        <i className={icon}></i>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">{status}</p>
      </div>
    </div>
    <button className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${active ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
      {active ? 'Manage' : 'Connect'}
    </button>
  </div>
);

export default Settings;
