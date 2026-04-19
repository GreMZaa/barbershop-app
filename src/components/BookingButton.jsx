import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BookingButton = ({ bookingData, isValid, isVisible = true, onBook }) => {
  const { t } = useLanguage();

  if (!isVisible) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onBook) {
      onBook();
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark via-dark to-transparent z-50 pointer-events-auto"
      style={{ zIndex: 9999 }}
    >
      <motion.button
        type="button"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-gold-glow transition-all duration-500 overflow-hidden relative cursor-pointer pointer-events-auto ${
          isValid 
            ? 'bg-gold text-dark' 
            : 'bg-gold/10 text-gold/40 border border-gold/10 hover:bg-gold/20'
        }`}
      >
        <AnimatePresence mode="wait">
          {isValid ? (
            <motion.div
              key="book"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              {t.bookNow}
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t.confirmBooking}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shiny effect */}
        {isValid && (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
        )}
      </motion.button>
    </div>
  );
};

export default BookingButton;
