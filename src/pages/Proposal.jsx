import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  Globe, 
  BarChart3, 
  QrCode, 
  ShieldCheck, 
  Languages,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Proposal = () => {
  const { t, lang, setLang } = useLanguage();
  const p = t.proposal;

  const handlePrint = () => {
    window.print();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-montserrat selection:bg-gold selection:text-dark pb-20 overflow-x-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 wood-pattern opacity-5 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      {/* Header Controls */}
      <div className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md safe-top px-6 py-4 flex justify-between items-center border-b border-gold/10">
        <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
          G-<span className="text-gold">Cut</span>
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setLang(lang === 'RU' ? 'VN' : 'RU')}
            className="flex items-center gap-2 bg-white/5 border border-gold/20 text-gold px-3 py-2 rounded-xl font-bold text-xs hover:bg-gold/10 transition-all active:scale-95"
          >
            <Languages size={14} />
            <span>{lang === 'RU' ? 'VN' : 'RU'}</span>
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gold text-dark px-4 py-2 rounded-xl font-bold text-xs shadow-gold-glow hover:scale-105 transition-all active:scale-95 print:hidden"
          >
            <Download size={14} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 pt-12"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-20 text-center">
          <div className="inline-block px-4 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-black uppercase tracking-widest mb-6">
            Digital Solution 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            {p.heroTitle} <br /> 
            <span className="text-gold">{p.heroSubtitle}</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full shadow-gold-glow"></div>
        </motion.section>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
            <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {p.problemsTitle}
            </h3>
            <ul className="space-y-6">
              {[p.p1, p.p2, p.p3].map((text, i) => (
                <li key={i} className="flex gap-4 text-white/70 text-sm leading-relaxed">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gold/5 border border-gold/20 rounded-[2.5rem] p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/20 transition-all" />
            <h3 className="text-gold text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              {p.solutionsTitle}
            </h3>
            <ul className="space-y-6">
              {[p.s1, p.s2, p.s3].map((text, i) => (
                <li key={i} className="flex gap-4 text-white font-medium text-sm leading-relaxed">
                  <CheckCircle2 className="text-gold shrink-0" size={18} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Key Features */}
        <section className="mb-20">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl font-black uppercase tracking-widest text-white">{p.keyFeaturesTitle}</h3>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Smartphone, title: p.f1Title, desc: p.f1Desc },
              { icon: Zap, title: p.f2Title, desc: p.f2Desc },
              { icon: Globe, title: p.f3Title, desc: p.f3Desc },
              { icon: BarChart3, title: p.f4Title, desc: p.f4Desc },
              { icon: QrCode, title: p.f5Title, desc: p.f5Desc },
              { icon: ShieldCheck, title: p.f6Title, desc: p.f6Desc }
            ].map((f, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-gold/30 transition-all group"
              >
                <div className="bg-gold/10 w-10 h-10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={20} />
                </div>
                <h4 className="font-bold text-white mb-2 text-sm">{f.title}</h4>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl font-black uppercase tracking-widest text-white">{p.planTitle}</h3>
            <div className="flex-1 h-[1px] bg-gold/20" />
          </motion.div>
          
          <div className="space-y-4">
            {[
              { step: '01', title: p.stage1Title, desc: p.stage1Desc },
              { step: '02', title: p.stage2Title, desc: p.stage2Desc },
              { step: '03', title: p.stage3Title, desc: p.stage3Desc }
            ].map((s, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="flex gap-6 items-center p-6 bg-white/5 border border-white/5 rounded-3xl group cursor-pointer hover:bg-white/[0.07] transition-all"
              >
                <div className="text-3xl font-black text-white/10 group-hover:text-gold/20 transition-colors w-12">{s.step}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white group-hover:text-gold transition-colors">{s.title}</h4>
                  <p className="text-xs text-white/40 mt-1">{s.desc}</p>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" size={20} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Footer */}
        <footer className="pt-20 border-t border-white/10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="bg-gold text-dark px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-tighter">Gentleman's Cut</div>
             <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none">© 2026 Digital Solutions</p>
          </div>
          <div className="text-[10px] text-gold/30 font-mono tracking-tighter">{p.footer}</div>
        </footer>
      </motion.div>

      <style jsx="true">{`
        @media print {
          .min-h-screen { background: white !important; color: black !important; }
          .bg-dark { background: white !important; }
          .text-white { color: black !important; }
          .text-gold { color: #8b6b0d !important; }
          .bg-white\/5 { background: #f8f8f8 !important; border: 1px solid #ddd !important; }
          .print-hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Proposal;
