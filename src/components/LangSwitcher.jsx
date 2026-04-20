import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const LangSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 border border-gold/20 shadow-gold-glow pointer-events-auto">
      <button
        onClick={() => setLang('RU')}
        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${
          lang === 'RU' ? 'bg-gold text-dark' : 'text-gold/60 hover:text-gold'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang('VN')}
        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${
          lang === 'VN' ? 'bg-gold text-dark' : 'text-gold/60 hover:text-gold'
        }`}
      >
        VN
      </button>
    </div>
  );
};

export default LangSwitcher;
