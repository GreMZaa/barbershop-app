import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const TimePicker = ({ selectedTime, onSelect }) => {
  const { t } = useLanguage();

  const timeSlots = [];
  for (let hour = 10; hour <= 21; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 21) timeSlots.push(`${hour}:30`);
  }

  return (
    <div className="py-6 px-6">
      <h3 className="text-gold/60 text-sm uppercase tracking-widest mb-4">{t.selectTime}</h3>
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((time, index) => {
          const isSelected = selectedTime === time;
          return (
            <motion.button
              key={time}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(time)}
              className={`py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${
                isSelected
                  ? 'bg-gold border-gold text-dark'
                  : 'bg-dark/40 border-gold/10 text-white/80 hover:border-gold/30'
              }`}
            >
              {time}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TimePicker;
