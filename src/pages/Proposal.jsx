import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Star, TrendingUp, Users, ShieldCheck, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Proposal = () => {
  const { t } = useLanguage();
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
    <div className="min-h-screen bg-dark text-white overflow-hidden flex flex-col font-montserrat">
      {/* Header Info */}
      <div className="absolute top-8 left-10 z-20">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">
              Proposal 2024
            </h2>
            <h1 className="text-lg font-bold text-gold uppercase tracking-widest">
              {t.proposal.heroTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-30 flex gap-1">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            className={`h-full transition-all duration-500 rounded-r-full ${
              idx <= currentSlide ? 'bg-gold flex-1' : 'bg-white/10 w-4'
            }`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col justify-center px-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="max-w-4xl"
          >
            <div className="mb-8">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="p-4 bg-gold/10 inline-block rounded-3xl mb-8 border border-gold/20 shadow-gold-glow"
               >
                 {icons[currentSlide]}
               </motion.div>
               
               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                 {slides[currentSlide].title.split(': ').map((part, i) => (
                   <span key={i} className={i === 1 ? 'text-gold' : ''}>{part}<br/></span>
                 ))}
               </h2>
               
               <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl mb-12">
                 {slides[currentSlide].desc}
               </p>

               <div className="flex gap-8 items-center">
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold block mb-1">Impact</span>
                    <span className="text-2xl font-black text-white">{slides[currentSlide].impact}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Controls */}
        <div className="absolute bottom-12 left-10 right-10 flex justify-between items-end">
           <div className="flex gap-4">
             <button 
               onClick={prevSlide}
               disabled={currentSlide === 0}
               className="w-14 h-14 border border-white/20 rounded-2xl flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all disabled:opacity-0 active:scale-90"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               onClick={nextSlide}
               disabled={currentSlide === slides.length - 1}
               className="w-14 h-14 border border-white/20 rounded-2xl flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all disabled:opacity-0 active:scale-90"
             >
               <ChevronRight size={24} />
             </button>
           </div>

           {currentSlide === slides.length - 1 ? (
             <motion.button
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               onClick={() => navigate('/')}
               className="bg-gold text-dark px-10 py-6 rounded-3xl font-black uppercase tracking-widest shadow-gold-glow flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
             >
               {t.proposal.cta}
               <ArrowRight size={20} />
             </motion.button>
           ) : (
             <p className="text-[10px] uppercase font-black tracking-[0.5em] text-white/20">
               {t.proposal.footer}
             </p>
           )}
        </div>
      </main>

      {/* Decorative BG */}
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Proposal;
