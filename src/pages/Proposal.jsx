import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Star, TrendingUp, Users, ShieldCheck, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import LangSwitcher from '../components/LangSwitcher';

const Proposal = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = t.proposal.slides;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const icons = [
    <Users className="text-gold" size={48} />,
    <Target className="text-gold" size={48} />,
    <TrendingUp className="text-gold" size={48} />,
    <Star className="text-gold" size={48} />
  ];

  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden flex flex-col font-montserrat relative">
      {/* Background patterns */}
      <div className="wood-pattern fixed inset-0 z-0 opacity-5 pointer-events-none" />
      
      {/* Header Info */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-16 pb-6 flex justify-between items-start pointer-events-none bg-gradient-to-b from-dark via-dark/50 to-transparent">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-1 h-8 bg-gold rounded-full shadow-gold-glow" />
          <div>
            <h2 className="text-[7px] font-black uppercase tracking-[0.5em] text-white/30 mb-0.5">
              PROPOSAL • 2024
            </h2>
            <h1 className="text-base font-black text-gold uppercase tracking-widest leading-none">
              {t.proposal.heroTitle}
            </h1>
          </div>
        </div>
        <div className="pointer-events-auto scale-75 origin-top-right mt-1">
          <LangSwitcher />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 flex gap-0.5">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            className={`h-full transition-all duration-700 ${
              idx <= currentSlide ? 'bg-gold flex-1' : 'bg-white/5 w-4'
            }`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col justify-center px-6 md:px-16 pt-24 pb-44 relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="relative">
               {/* Slide Number */}
               <div className="absolute -top-20 -left-2 text-7xl font-black text-white/5 select-none tracking-tighter">
                 0{currentSlide + 1}
               </div>

               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mb-4 shadow-gold-glow"
               >
                 {icons[currentSlide]}
               </motion.div>
               
               <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-4">
                 {slides[currentSlide].title.split(': ').map((part, i) => (
                   <span key={i} className={i === 1 || part.includes('Nghia 79') ? 'text-gold' : 'text-white'}>
                     {part}{i === 0 && <br/>}
                   </span>
                 ))}
               </h2>
               
               <p className="text-base md:text-3xl text-white/60 font-medium leading-[1.6] max-w-2xl mb-6">
                 {slides[currentSlide].desc}
               </p>

               <div className="flex gap-10 items-center">
                  <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                    <span className="text-[7px] uppercase font-black tracking-[0.3em] text-gold block mb-1 opacity-70">Impact</span>
                    <span className="text-xl font-black text-white tracking-tight">{slides[currentSlide].impact}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation and Footer Area */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 md:p-12 z-50 bg-gradient-to-t from-dark via-dark/95 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-6 bg-gold/20" />
             <p className="text-[9px] uppercase font-black tracking-[0.4em] text-gold/60">
               {currentSlide + 1} / {slides.length}
             </p>
             <div className="h-[1px] w-6 bg-gold/20" />
          </div>

          <div className="flex justify-between items-center w-full">
            {/* Nav Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/50 transition-all disabled:opacity-0 active:scale-90 bg-white/5"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/50 transition-all disabled:opacity-0 active:scale-90 bg-white/5"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex-1 px-2 text-center">
               <p className="text-[7px] uppercase font-black tracking-[0.3em] text-white/10 leading-tight">
                 {t.proposal.footer}
               </p>
            </div>

            <div className="min-w-[40px] flex justify-end">
               {currentSlide === slides.length - 1 && (
                 <motion.button
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   onClick={() => navigate('/')}
                   className="bg-gold text-dark p-2.5 rounded-full shadow-gold-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                 >
                   <ArrowRight size={20} />
                 </motion.button>
               )}
            </div>
          </div>
          
          <div className="h-2 w-full" /> {/* Extra spacer for home bar */}
        </div>
      </footer>

      {/* Decorative BG Lights */}
      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default Proposal;
