
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col shrink-0 border-r border-slate-800">
      <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => onNavigate('SCREENER')}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
          <i className="fa-solid fa-bullseye text-xl"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">MatchPoint</span>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem 
          icon="fa-solid fa-magnifying-glass" 
          label="Screener" 
          active={activeView === 'SCREENER'} 
          onClick={() => onNavigate('SCREENER')} 
        />
        <NavItem 
          icon="fa-solid fa-users" 
          label="Candidate Pool" 
          active={activeView === 'POOL'} 
          onClick={() => onNavigate('POOL')} 
        />
        <NavItem 
          icon="fa-solid fa-chart-line" 
          label="Analytics" 
          active={activeView === 'ANALYTICS'} 
          onClick={() => onNavigate('ANALYTICS')} 
        />
        <NavItem 
          icon="fa-solid fa-shield-halved" 
          label="Fairness Audit" 
          active={activeView === 'FAIRNESS'} 
          onClick={() => onNavigate('FAIRNESS')} 
        />
        <NavItem 
          icon="fa-solid fa-gear" 
          label="Settings" 
          active={activeView === 'SETTINGS'} 
          onClick={() => onNavigate('SETTINGS')} 
        />
      </nav>

      <div className="mt-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium">Gemini Pro 2.5 Active</span>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active 
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`}
  >
    <i className={`${icon} w-5 text-sm ${active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}></i>
    <span className="text-sm font-semibold tracking-wide">{label}</span>
  </button>
);

export default Sidebar;
