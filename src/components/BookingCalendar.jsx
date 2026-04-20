import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays, isSameDay } from 'date-fns';
import { ru, vi } from 'date-fns/locale';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const BookingCalendar = () => {
  const { lang, t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { bookingData, setBookingData, nextStep } = useBookingStore();
  const selectedDate = bookingData.date;
  
  const locale = lang === 'RU' ? ru : vi;

  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  const handleSelect = (date) => {
    setBookingData({ date });
    triggerHaptic('light');
    setTimeout(nextStep, 300);
  };

  return (
    <div className="py-8 bg-white/[0.02] rounded-[3rem] my-4 border border-white/5">
      <div className="px-8 mb-8">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{t.selectDate}</h3>
        <p className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">{t.checkAvailability}</p>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar px-8 pb-4 pt-2">
        {dates.map((date, index) => {
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          return (
            <motion.div
              key={date.toString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(date)}
              className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center rounded-[2rem] border transition-premium relative overflow-hidden ${
                isSelected
                  ? 'glass-panel-gold border-gold scale-105 z-10'
                  : 'glass-panel hover:border-gold/30'
              }`}
            >
              <span className={`text-[10px] uppercase font-black mb-2 tracking-tighter ${isSelected ? 'text-gold' : 'text-white/30'}`}>
                {format(date, 'EEE', { locale })}
              </span>
              <span className={`text-2xl font-black tracking-tighter leading-none mb-1 ${isSelected ? 'text-white' : 'text-white/60'}`}>
                {format(date, 'd')}
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-gold/80' : 'text-white/20'}`}>
                {format(date, 'MMM', { locale })}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="dateHighlight"
                  className="absolute inset-0 bg-gold/5 pointer-events-none"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
