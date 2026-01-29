
import React, { useState } from 'react';

interface AnalysisFormProps {
  onSubmit: (resume: string, jobDesc: string) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim() && jobDescription.trim()) {
      onSubmit(resumeText, jobDescription);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setter(text);
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-indigo-500"></i>
              Job Description
            </label>
            <span className="text-xs text-slate-400 italic">Paste text or upload .txt</span>
          </div>
          <textarea
            className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none bg-slate-50"
            placeholder="Paste the full job requirements, responsibilities, and qualifications here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <input 
            type="file" 
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setJobDescription)}
            className="mt-2 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-indigo-500"></i>
              Candidate Resume
            </label>
            <span className="text-xs text-slate-400 italic">Paste text or upload .txt</span>
          </div>
          <textarea
            className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none bg-slate-50"
            placeholder="Paste candidate resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <input 
            type="file" 
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setResumeText)}
            className="mt-2 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </section>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={!resumeText || !jobDescription}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 flex items-center gap-3"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          Screen Candidate
        </button>
      </div>
    </form>
  );
};

export default AnalysisForm;
