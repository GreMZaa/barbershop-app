import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Award, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Proposal = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const advantages = [
    {
      icon: <Zap className="text-gold" />,
      title: t.proposal.automationTitle,
      desc: t.proposal.automationDesc
    },
    {
      icon: <TrendingUp className="text-gold" />,
      title: t.proposal.revenueTitle,
      desc: t.proposal.revenueDesc
    },
    {
      icon: <Award className="text-gold" />,
      title: t.proposal.professionalismTitle,
      desc: t.proposal.professionalismDesc
    }
  ];

  const comparison = [
    { label: t.proposal.zaloComparison.title, paper: false, app: true },
    { label: t.proposal.zaloComparison.manual, paper: true, app: false },
    { label: t.proposal.zaloComparison.auto, paper: false, app: true },
    { label: t.proposal.zaloComparison.history, paper: true, app: false },
    { label: t.proposal.zaloComparison.crm, paper: false, app: true },
    { label: t.proposal.zaloComparison.realtime, paper: false, app: true },
  ];

  return (
    <div className="min-h-screen bg-dark text-white p-6 pb-20 max-w-2xl mx-auto overflow-x-hidden">
      {/* Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-16"
      >
        <button onClick={() => navigate('/')} className="text-gold/50 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
          <ArrowRight className="rotate-180" size={14} /> {t.clientView}
        </button>
        <div className="px-4 py-1.5 bg-gold/10 border border-gold/30 rounded-full">
          <span className="text-gold text-[8px] font-black uppercase tracking-widest">{t.proposal.badge}</span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative mb-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold/10 blur-[60px] rounded-full"
        />
        <motion.h1 
          className="text-4xl font-black uppercase tracking-tighter mb-4 leading-[0.9]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {t.proposal.heroTitle} <br/>
          <span className="text-gold">{t.proposal.heroSubtitle}</span>
        </motion.h1>
      </div>

      {/* Value Grid */}
      <div className="grid gap-6 mb-20">
        {advantages.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white/5 border border-white/5 rounded-3xl relative group hover:border-gold/30 transition-all"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-gold-glow transition-all">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h2 className="text-2xl font-black uppercase tracking-tighter text-center mb-10">{t.proposal.zaloComparison.title}</h2>
        <div className="bg-white/5 border border-gold/20 rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-[1fr,80px,80px] p-4 border-b border-gold/10 bg-gold/5">
            <div className="text-[10px] font-black text-gold/50 uppercase tracking-widest pt-2">Feature</div>
            <div className="text-center text-[10px] font-black text-white/50 uppercase tracking-widest pb-1">Giấy Bút</div>
            <div className="text-center text-[10px] font-black text-gold uppercase tracking-widest pb-1 border-b-2 border-gold pb-2">Nghia 79</div>
          </div>
          {comparison.slice(1).map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr,80px,80px] p-6 border-b border-white/5 items-center">
              <div className="text-sm font-medium text-white/80">{row.label}</div>
              <div className="flex justify-center">{row.paper ? <XCircle size={18} className="text-red-500/50" /> : <CheckCircle2 size={18} className="text-green-500/20" />}</div>
              <div className="flex justify-center">{!row.paper ? <CheckCircle2 size={18} className="text-gold" /> : <XCircle size={18} className="text-white/10" />}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Final Action */}
      <motion.div 
        className="text-center pb-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-dark font-black py-6 rounded-[2rem] uppercase tracking-widest shadow-gold-glow active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {t.bookNow}
          <ArrowRight size={20} />
        </button>
        <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">
          {t.proposal.footer}
        </p>
      </motion.div>
    </div>
  );
};

export default Proposal;
