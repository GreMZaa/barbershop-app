import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays, isSameDay } from 'date-fns';
import { ru, vi } from 'date-fns/locale';
import { useLanguage } from '../context/LanguageContext';

const BookingCalendar = ({ selectedDate, onSelect }) => {
  const { lang, t } = useLanguage();
  const locale = lang === 'RU' ? ru : vi;

  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  return (
    <div className="py-6 px-6">
      <h3 className="text-gold/60 text-sm uppercase tracking-widest mb-4">{t.selectDate}</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {dates.map((date, index) => {
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          return (
            <motion.div
              key={date.toString()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(date)}
              className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-gold border-gold text-dark border-shadow-gold ring-1 ring-gold'
                  : 'bg-dark/40 border-gold/10 text-white hover:border-gold/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold opacity-60">
                {format(date, 'EEE', { locale })}
              </span>
              <span className="text-lg font-black tracking-tighter">
                {format(date, 'd')}
              </span>
              <span className="text-[10px] uppercase font-medium opacity-60">
                {format(date, 'MMM', { locale })}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="dateCircle"
                  className="absolute inset-0 bg-gold/20 blur-lg -z-10 rounded-full"
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
