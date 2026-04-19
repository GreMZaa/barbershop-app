import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const LangSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex bg-dark/80 backdrop-blur-md rounded-full p-1 border border-gold/30 shadow-gold-glow">
      <button
        onClick={() => setLang('RU')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === 'RU' ? 'bg-gold text-dark' : 'text-gold'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang('VN')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === 'VN' ? 'bg-gold text-dark' : 'text-gold'
        }`}
      >
        VN
      </button>
    </div>
  );
};

export default LangSwitcher;
