import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import LangSwitcher from '../components/LangSwitcher';

// Import newly generated assets
import slide1 from '../assets/proposal/slide1.png';
import slide2 from '../assets/proposal/slide2.png';
import slide3 from '../assets/proposal/slide3.png';
import slide4 from '../assets/proposal/slide4.png';

const Proposal = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = t.proposal.slides;
  const slideImages = [slide1, slide2, slide3, slide4];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/');
    }
  };

  const icons = [
    <Target className="text-gold" size={32} />,
    <Zap className="text-gold" size={32} />,
    <TrendingUp className="text-gold" size={32} />,
    <Sparkles className="text-gold" size={32} />
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-montserrat relative">
      {/* Dynamic Background Image with Zoom Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed inset-0 z-0"
        >
          <img 
            src={slideImages[currentSlide]} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="wood-pattern fixed inset-0 z-0 opacity-10 pointer-events-none" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-12 pb-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm safe-top">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gold rounded-full shadow-gold-glow animate-pulse" />
          <div>
            <h2 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-0.5">
              EXECUTIVE PRESENTATION
            </h2>
            <h1 className="text-sm font-black text-gold uppercase tracking-widest leading-none">
              {t.proposal.badge}
            </h1>
          </div>
        </div>
        <LangSwitcher />
      </header>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 flex gap-1 px-1">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              idx <= currentSlide ? 'bg-gold flex-[3] shadow-gold-glow' : 'bg-white/10 flex-1'
            }`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col justify-end px-6 pb-40 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-12 h-12 bg-gold/20 border border-gold/30 rounded-xl flex items-center justify-center mb-6 backdrop-blur-xl"
            >
              {icons[currentSlide]}
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1] mb-6 text-white drop-shadow-2xl">
              {slides[currentSlide].title}
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 font-medium leading-[1.5] mb-8 drop-shadow-lg">
              {slides[currentSlide].desc}
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
                <div>
                  <span className="text-[8px] uppercase font-black tracking-[0.3em] text-gold block mb-1 opacity-80">Impact Factor</span>
                  <span className="text-lg font-black text-white tracking-tight leading-tight">{slides[currentSlide].impact}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Primary Call to Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={nextSlide}
            className="w-full group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-20" />
            <div className="bg-gradient-to-r from-gold to-gold-light text-black font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all">
              <span className="uppercase tracking-[0.2em] text-lg">
                {currentSlide === slides.length - 1 ? t.proposal.viewDemoBtn : t.proposal.wantBtn}
              </span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>
          
          <div className="mt-6 flex items-center justify-between w-full opacity-30">
            <p className="text-[7px] uppercase font-black tracking-[0.4em]">
              {currentSlide + 1} / {slides.length}
            </p>
            <div className="h-[1px] flex-1 mx-4 bg-white/20" />
            <p className="text-[7px] uppercase font-black tracking-[0.4em]">
              Director Only
            </p>
          </div>
        </div>
      </footer>

      {/* Decorative Glows */}
      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default Proposal;
