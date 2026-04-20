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
      <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-12 pb-6 flex justify-between items-start pointer-events-none bg-gradient-to-b from-dark via-dark/50 to-transparent">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-1 h-10 bg-gold rounded-full shadow-gold-glow" />
          <div>
            <h2 className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30 mb-0.5">
              PROPOSAL • 2024
            </h2>
            <h1 className="text-lg font-black text-gold uppercase tracking-widest leading-none">
              {t.proposal.heroTitle}
            </h1>
          </div>
        </div>
        <div className="pointer-events-auto scale-90 origin-top-right">
          <LangSwitcher />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 flex gap-0.5">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            className={`h-full transition-all duration-700 ${
              idx <= currentSlide ? 'bg-gold flex-1' : 'bg-white/5 w-4'
            }`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col justify-center px-6 md:px-16 pt-32 pb-48 relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="relative">
               {/* Slide Number */}
               <div className="absolute -top-16 -left-2 text-6xl font-black text-white/5 select-none tracking-tighter">
                 0{currentSlide + 1}
               </div>

               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mb-6 shadow-gold-glow"
               >
                 {icons[currentSlide]}
               </motion.div>
               
               <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
                 {slides[currentSlide].title.split(': ').map((part, i) => (
                   <span key={i} className={i === 1 || part.includes('Nghia 79') ? 'text-gold' : 'text-white'}>
                     {part}{i === 0 && <br/>}
                   </span>
                 ))}
               </h2>
               
               <p className="text-lg md:text-3xl text-white/50 font-medium leading-relaxed max-w-2xl mb-8">
                 {slides[currentSlide].desc}
               </p>

               <div className="flex gap-10 items-center">
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <span className="text-[8px] uppercase font-black tracking-[0.3em] text-gold block mb-1 opacity-70">Impact</span>
                    <span className="text-2xl font-black text-white tracking-tight">{slides[currentSlide].impact}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation and Footer Area */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 md:p-12 z-50 bg-gradient-to-t from-dark via-dark/95 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-8 bg-gold/20" />
             <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gold">
               {currentSlide + 1} / {slides.length}
             </p>
             <div className="h-[1px] w-8 bg-gold/20" />
          </div>

          <div className="flex justify-between items-center w-full">
            {/* Nav Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/50 transition-all disabled:opacity-0 active:scale-90 bg-white/5"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/50 transition-all disabled:opacity-0 active:scale-90 bg-white/5"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex-1 px-4 text-center">
               <p className="text-[8px] uppercase font-black tracking-[0.4em] text-white/20 leading-tight">
                 {t.proposal.footer}
               </p>
            </div>

            <div className="min-w-[48px] flex justify-end">
               {currentSlide === slides.length - 1 && (
                 <motion.button
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   onClick={() => navigate('/')}
                   className="bg-gold text-dark p-3 rounded-full shadow-gold-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                 >
                   <ArrowRight size={24} />
                 </motion.button>
               )}
            </div>
          </div>
        </div>
      </footer>

      {/* Decorative BG Lights */}
      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default Proposal;
