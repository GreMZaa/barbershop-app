import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';
import { Award, Star, Check } from 'lucide-react';

const masters = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'Senior Barber',
    rating: '5.0',
    exp: '8 years',
    photo: 'https://images.unsplash.com/photo-1503467913725-8484b65b0715?auto=format&fit=crop&w=400&h=500'
  },
  {
    id: 'marco',
    name: 'Marco',
    role: 'Top Stylist',
    rating: '4.9',
    exp: '6 years',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&h=500'
  },
  {
    id: 'viktor',
    name: 'Viktor',
    role: 'Beard Master',
    rating: '5.0',
    exp: '10 years',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500'
  }
];

const Masters = () => {
  const { t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { bookingData, setBookingData, nextStep } = useBookingStore();
  const selectedMaster = bookingData.master;

  const handleSelect = (master) => {
    setBookingData({ master });
    triggerHaptic('light');
    setTimeout(nextStep, 300);
  };

  return (
    <section className="py-8 bg-white/[0.02] rounded-[3rem] my-4 overflow-hidden border border-white/5">
      <div className="px-8 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{t.mastersTitle}</h2>
          <p className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">Select your professional</p>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto px-8 no-scrollbar pb-8 pt-2">
        {masters.map((master, index) => (
          <motion.div
            key={master.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            onClick={() => handleSelect(master)}
            className="flex-shrink-0 relative w-64 aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-premium active:scale-95"
          >
            <img 
              src={master.photo} 
              alt={master.name}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                selectedMaster?.id === master.id ? 'scale-110 brightness-110' : 'grayscale-50 group-hover:grayscale-0'
              }`}
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <Star size={10} className="text-gold fill-gold" />
                <span className="text-white font-black text-[10px]">{master.rating}</span>
              </div>
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-gold">
                <Award size={16} />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-black text-2xl tracking-tighter uppercase mb-1">{master.name}</p>
              <div className="flex items-center gap-3">
                <span className="text-gold/80 text-[10px] font-black uppercase tracking-widest">{master.role}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white/40 text-[9px] font-bold">{master.exp}</span>
              </div>
            </div>

            {selectedMaster?.id === master.id && (
              <motion.div
                layoutId="masterCheck"
                className="absolute inset-0 bg-gold/10 border-4 border-gold rounded-[2.5rem] flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-gold text-dark rounded-full flex items-center justify-center shadow-gold-glow">
                  <Check size={24} strokeWidth={4} />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Masters;
