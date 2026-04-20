import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Calendar } from 'lucide-react';

const Hero = ({ onStartBooking }) => {
  const { t } = useLanguage();

  const titleWords = t.heroTitle ? t.heroTitle.split(' ') : ['Premium', 'Barber'];
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden mesh-bg rounded-[3rem] mb-12 shadow-2xl">
      <div className="absolute inset-0 wood-pattern opacity-[0.05] pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-gradient-to-b from-gold/10 via-transparent to-transparent opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
        >
          <Sparkles size={14} className="text-gold" />
          <span className="text-gold/80 text-[10px] uppercase font-black tracking-[0.3em]">
            Elite Standard
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
          <span className="text-transparent bg-clip-text gold-gradient">
            {firstWord}
          </span>
          <br />
          {restOfTitle}
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-white/40 text-[10px] md:text-sm font-black tracking-[0.4em] uppercase mb-12 max-w-[280px] mx-auto leading-relaxed"
        >
          {t.heroSubtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartBooking}
          className="group relative inline-flex items-center gap-3 bg-white text-dark px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest transition-premium hover:shadow-gold-glow overflow-hidden active:scale-95"
        >
          <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-premium" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-dark transition-premium">
            <Calendar size={18} strokeWidth={2.5} />
            {t.bookNow}
          </span>
        </motion.button>
      </motion.div>

      {/* Floating depth elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/10 rounded-full blur-[120px]" 
      />
    </section>
  );
};

export default Hero;
