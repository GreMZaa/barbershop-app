import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const SuccessScreen = ({ bookingData, isVisible }) => {
  const { t } = useLanguage();
  const { closeApp, triggerHaptic } = useMiniAppSDK();

  useEffect(() => {
    if (isVisible) {
      triggerHaptic('success');
      const timer = setTimeout(() => {
        closeApp();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, closeApp, triggerHaptic]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="absolute inset-0 wood-pattern opacity-20" />
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-8 relative z-10"
          >
            <div className="absolute inset-0 bg-gold blur-2xl opacity-20 rounded-full animate-pulse" />
            <CheckCircle size={120} className="text-gold relative z-10" strokeWidth={1.5} />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black text-gold uppercase tracking-[0.2em] mb-2"
          >
            {t.success}
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-sm bg-white/5 border border-gold/20 rounded-3xl p-6 backdrop-blur-xl relative z-10"
          >
            <p className="text-gold/50 text-xs uppercase tracking-widest mb-4 border-b border-gold/10 pb-2">
              {t.bookingSummary}
            </p>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-baseline">
                <span className="text-gold/40 text-[10px] uppercase">{t.selectMaster}</span>
                <span className="text-white font-bold">{bookingData.master.name}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gold/40 text-[10px] uppercase">{t.servicesTitle}</span>
                <span className="text-white font-bold">{bookingData.service.name}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gold/40 text-[10px] uppercase">{t.selectDate}</span>
                <span className="text-white font-bold">
                  {bookingData.date?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gold/40 text-[10px] uppercase">{t.selectTime}</span>
                <span className="text-white font-bold text-xl text-gold">{bookingData.time}</span>
              </div>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-gold/30 text-xs italic"
          >
            {t.autoclose}...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessScreen;
