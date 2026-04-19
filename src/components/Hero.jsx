import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 wood-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/80 to-dark" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gold tracking-tighter uppercase mb-4 text-shadow-gold">
          {t.heroTitle}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gold-light/80 text-lg md:text-xl font-light tracking-[0.2em] uppercase italic"
        >
          {t.heroSubtitle}
        </motion.p>
      </motion.div>

      {/* Backdrop elements for depth */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
    </section>
  );
};

export default Hero;
