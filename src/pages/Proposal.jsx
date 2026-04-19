import React from 'react';
import { Download, CheckCircle2, Monitor, Globe, BarChart3, Smartphone, ShieldCheck, Languages, Zap, QrCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Proposal = () => {
  const { t, lang, setLang } = useLanguage();
  const p = t.proposal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans print:p-0">
      {/* Controls - Hidden during print */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3 print:hidden">
        <button 
          onClick={() => setLang(lang === 'RU' ? 'VN' : 'RU')}
          className="flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-4 py-3 rounded-full font-bold shadow-xl hover:bg-slate-50 transition-all active:scale-95"
        >
          <Languages size={20} />
          <span>{lang === 'RU' ? 'VN' : 'RU'}</span>
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-full font-bold shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
        >
          <Download size={20} />
          <span>{p.downloadPdf}</span>
        </button>
      </div>

      <div className="max-w-[210mm] mx-auto bg-white p-[20mm] print:p-0">
        {/* Header */}
        <header className="border-b-4 border-slate-900 pb-12 mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900 mb-2">
              Gentleman's <span className="text-amber-500">Cut</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium">{p.subheader}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-900">{p.version}</p>
            <p className="text-slate-500">{p.monthYear}</p>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            {p.heroTitle} <br /> 
            <span className="text-amber-600">{p.heroSubtitle}</span>
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </section>

        {/* Pain vs Solution */}
        <div className="grid grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-black uppercase tracking-widest text-slate-400 mb-6">{p.problemsTitle}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-600">
                <span className="text-red-500 font-bold">✕</span>
                {p.p1}
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-red-500 font-bold">✕</span>
                {p.p2}
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-red-500 font-bold">✕</span>
                {p.p3}
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
            <h3 className="text-xl font-black uppercase tracking-widest text-amber-600 mb-6">{p.solutionsTitle}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-800 font-medium">
                <CheckCircle2 className="text-amber-600 shrink-0" size={20} />
                {p.s1}
              </li>
              <li className="flex gap-3 text-slate-800 font-medium">
                <CheckCircle2 className="text-amber-600 shrink-0" size={20} />
                {p.s2}
              </li>
              <li className="flex gap-3 text-slate-800 font-medium">
                <CheckCircle2 className="text-amber-600 shrink-0" size={20} />
                {p.s3}
              </li>
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-20">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-10 text-center">
            {p.keyFeaturesTitle}
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><Smartphone size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f1Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f1Desc}</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><Zap size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f2Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f2Desc}</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><Globe size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f3Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f3Desc}</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><BarChart3 size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f4Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f4Desc}</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><QrCode size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f5Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f5Desc}</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-amber-600 mb-4"><ShieldCheck size={24} /></div>
              <h4 className="font-bold text-slate-900 mb-2">{p.f6Title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{p.f6Desc}</p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20 page-break-before">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-10">
            {p.planTitle}
          </h3>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
              <div>
                <h4 className="font-bold text-lg text-slate-900">{p.stage1Title}</h4>
                <p className="text-slate-500">{p.stage1Desc}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
              <div>
                <h4 className="font-bold text-lg text-slate-900">{p.stage2Title}</h4>
                <p className="text-slate-500">{p.stage2Desc}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
              <div>
                <h4 className="font-bold text-lg text-slate-900">{p.stage3Title}</h4>
                <p className="text-slate-500">{p.stage3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-16 border-t border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg font-black text-xs uppercase">G-Cut</div>
            <p className="text-xs text-slate-400">© 2026 Gentlemen's Cut Digital Solutions</p>
          </div>
          <div className="text-xs text-slate-400 font-mono">{p.footer}</div>
        </footer>
      </div>

      <style jsx="true">{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white;
            color: black;
          }
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Proposal;
