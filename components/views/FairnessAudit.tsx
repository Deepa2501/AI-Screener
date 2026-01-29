
import React from 'react';

const FairnessAudit: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-indigo-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Bias-Free Recruitment</h2>
          <p className="text-indigo-100/70 text-lg leading-relaxed max-w-2xl mb-8">
            Our MatchPoint AI uses strictly defined NLP parameters to ignore demographic variables like names, genders, ages, and addresses, focusing exclusively on skills and career progression.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase">GDPR Compliant</div>
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase">Blind-Screening Active</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <AuditPoint 
          icon="fa-solid fa-fingerprint" 
          title="Identity Stripping" 
          desc="The model automatically strips potential identifying markers from the screening context before calculating match scores." 
        />
        <AuditPoint 
          icon="fa-solid fa-code-compare" 
          title="Objective Ontology" 
          desc="Skill matching relies on a massive industry-standard ontology of 50k+ technical and soft skills to ensure synonym recognition." 
        />
        <AuditPoint 
          icon="fa-solid fa-balance-scale" 
          title="Weighted Fairness" 
          desc="Seniority levels are calculated based on accomplishment density rather than years of service, promoting merit-based evaluation." 
        />
        <AuditPoint 
          icon="fa-solid fa-file-shield" 
          title="Explainability" 
          desc="Every result generates a human-readable Fairness Verdict explaining the specific data points used for the decision." 
        />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-microchip text-indigo-500"></i>
          Recent Logic Updates
        </h3>
        <div className="space-y-4">
          <UpdateRow date="Oct 2024" title="v2.5 Skill Parity" text="Improved recognition of transferrable skills in cross-industry applicants." />
          <UpdateRow date="Sep 2024" title="Bias Filter 09" text="Strengthened defense against gendered pronouns in recommendation summaries." />
        </div>
      </div>
    </div>
  );
};

const AuditPoint = ({ icon, title, desc }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-slate-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 text-xl">
      <i className={icon}></i>
    </div>
    <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const UpdateRow = ({ date, title, text }: any) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
    <div className="shrink-0 px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded uppercase">{date}</div>
    <div>
      <h4 className="text-sm font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500">{text}</p>
    </div>
  </div>
);

export default FairnessAudit;
