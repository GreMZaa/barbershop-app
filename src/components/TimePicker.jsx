import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const TimePicker = () => {
  const { t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { bookingData, setBookingData } = useBookingStore();
  const selectedTime = bookingData.time;

  const timeSlots = [];
  for (let hour = 10; hour <= 21; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 21) timeSlots.push(`${hour}:30`);
  }

  const handleSelect = (time) => {
    setBookingData({ time });
    triggerHaptic('light');
  };

  return (
    <div className="py-8 bg-white/[0.02] rounded-[3rem] my-4 border border-white/5">
      <div className="px-8 mb-8">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{t.selectTime}</h3>
        <p className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">Reserve your slot</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 px-8 pb-4">
        {timeSlots.map((time, index) => {
          const isSelected = selectedTime === time;
          return (
            <motion.button
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(time)}
              className={`py-4 rounded-2xl border text-sm font-black transition-premium tracking-tighter ${
                isSelected
                  ? 'glass-panel-gold border-gold text-white shadow-gold-glow scale-105 z-10'
                  : 'glass-panel text-white/40 hover:text-white hover:border-gold/30'
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
