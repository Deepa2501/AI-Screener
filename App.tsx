
import React, { useState, useEffect } from 'react';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult, AppState, ViewType, Candidate } from './types';
import Sidebar from './components/Sidebar';
import AnalysisForm from './components/AnalysisForm';
import Dashboard from './components/Dashboard';
import CandidatePool from './components/views/CandidatePool';
import Analytics from './components/views/Analytics';
import FairnessAudit from './components/views/FairnessAudit';
import Settings from './components/views/Settings';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('matchpoint_session') === 'active';
  });
  
  const [currentView, setCurrentView] = useState<ViewType>('SCREENER');
  const [state, setState] = useState<AppState>('IDLE');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('matchpoint_candidates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('matchpoint_candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleLogin = (user: string, pass: string) => {
    // Hardcoded credentials as requested
    if (user === 'admin' && pass === 'password123') {
      setIsAuthenticated(true);
      localStorage.setItem('matchpoint_session', 'active');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('matchpoint_session');
  };

  const handleStartAnalysis = async (resumeText: string, jobDescription: string) => {
    setState('LOADING');
    setError(null);
    try {
      const data = await analyzeResume({ resumeText, jobDescription });
      setResult(data);
      setState('SUCCESS');
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the resume. Please check your inputs.");
      setState('ERROR');
    }
  };

  const saveCandidate = (name: string, role: string) => {
    if (result) {
      const newCandidate: Candidate = {
        ...result,
        id: Math.random().toString(36).substr(2, 9),
        name,
        role,
        date: new Date().toLocaleDateString(),
      };
      setCandidates([...candidates, newCandidate]);
      reset();
      setCurrentView('POOL');
    }
  };

  const reset = () => {
    setState('IDLE');
    setResult(null);
    setError(null);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (currentView === 'SCREENER') {
      if (state === 'IDLE') {
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                <h2 className="text-xl font-semibold text-slate-800 mb-1 text-center">Screen New Talent</h2>
                <p className="text-slate-500 text-sm text-center">Analyze candidate alignment with unbiased AI intelligence.</p>
              </div>
              <AnalysisForm onSubmit={handleStartAnalysis} />
            </div>
          </div>
        );
      }
      if (state === 'LOADING') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Profile...</h2>
            <p className="text-slate-500 animate-pulse text-center max-w-sm">Comparing skills, calculating relevance, and auditing for fairness.</p>
          </div>
        );
      }
      if (state === 'SUCCESS' && result) {
        return <Dashboard result={result} onSave={saveCandidate} onReset={reset} />;
      }
      if (state === 'ERROR') {
        return (
          <div className="max-w-md mx-auto mt-12 text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Analysis Failed</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <button onClick={reset} className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">Try Again</button>
          </div>
        );
      }
    }

    switch (currentView) {
      case 'POOL': return <CandidatePool candidates={candidates} onDelete={(id) => setCandidates(candidates.filter(c => c.id !== id))} />;
      case 'ANALYTICS': return <Analytics candidates={candidates} />;
      case 'FAIRNESS': return <FairnessAudit />;
      case 'SETTINGS': return <Settings onLogout={handleLogout} />;
      default: return null;
    }
  };

  const getHeaderInfo = () => {
    switch(currentView) {
      case 'SCREENER': return { title: 'Resume Screener', sub: 'Unbiased matching at scale.' };
      case 'POOL': return { title: 'Candidate Pool', sub: 'Managing your screened talent.' };
      case 'ANALYTICS': return { title: 'Insights & Analytics', sub: 'Hiring pipeline performance.' };
      case 'FAIRNESS': return { title: 'Fairness & Compliance', sub: 'AI Ethics and transparency logs.' };
      case 'SETTINGS': return { title: 'System Settings', sub: 'Configure screening parameters.' };
    }
  };

  const { title, sub } = getHeaderInfo();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar activeView={currentView} onNavigate={(v) => { setCurrentView(v); reset(); }} />
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h1>
            <p className="text-slate-500">{sub}</p>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
