import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const SuccessScreen = () => {
  const { t } = useLanguage();
  const { closeApp, triggerHaptic } = useMiniAppSDK();
  const { bookingData, showSuccess, resetBooking } = useBookingStore();

  useEffect(() => {
    if (showSuccess) {
      triggerHaptic('success');
      const timer = setTimeout(() => {
        closeApp();
        // Fallback for browser testing
        setTimeout(resetBooking, 1000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, closeApp, triggerHaptic, resetBooking]);

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] mesh-bg flex flex-col items-center justify-center p-8 text-center overscroll-none"
        >
          <div className="absolute inset-0 wood-pattern opacity-10 pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            className="mb-10 relative"
          >
            <div className="absolute inset-0 bg-gold blur-[60px] opacity-40 rounded-full animate-pulse" />
            <div className="relative w-32 h-32 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center">
              <CheckCircle size={80} className="text-gold" strokeWidth={1} />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-2 -right-2 bg-white text-dark p-2 rounded-full shadow-gold-glow"
            >
              <ShieldCheck size={20} className="text-gold" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
              {t.success}
            </h2>
            <p className="text-gold/60 text-xs font-black uppercase tracking-[0.4em] mb-12">Elite Status Confirmed</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-sm glass-panel-gold rounded-[3rem] p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-40" />
            
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
              Booking Receipt
            </p>
            
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center group">
                <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{t.selectMaster}</span>
                <span className="text-white font-black uppercase text-sm tracking-tight group-hover:text-gold transition-premium">
                  {bookingData?.master?.name || '—'}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{t.servicesTitle}</span>
                <span className="text-white font-black uppercase text-sm tracking-tight group-hover:text-gold transition-premium">
                  {bookingData?.service?.name || '—'}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{t.selectDate}</span>
                <span className="text-white font-black uppercase text-sm tracking-tight group-hover:text-gold transition-premium">
                  {bookingData?.date instanceof Date ? bookingData.date.toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center group pt-4 border-t border-white/5">
                <span className="text-gold/40 text-[10px] font-black uppercase tracking-widest">Appointment Window</span>
                <span className="text-gold font-black text-2xl tracking-tighter shadow-gold-glow">
                  {bookingData?.time || '—'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 space-y-4"
          >
            <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em] animate-pulse">
              {t.autoclose}...
            </p>
            <div className="flex gap-1 justify-center">
               <div className="w-1.5 h-1.5 bg-gold/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
               <div className="w-1.5 h-1.5 bg-gold/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
               <div className="w-1.5 h-1.5 bg-gold/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessScreen;
