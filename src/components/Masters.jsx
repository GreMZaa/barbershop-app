import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const masters = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'Senior Barber',
    photo: 'https://images.unsplash.com/photo-1503467913725-8484b65b0715?auto=format&fit=crop&w=400&h=500'
  },
  {
    id: 'marco',
    name: 'Marco',
    role: 'Top Stylist',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&h=500'
  },
  {
    id: 'viktor',
    name: 'Viktor',
    role: 'Beard Master',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500'
  }
];

const Masters = ({ selectedMaster, onSelect }) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-dark/20 overflow-hidden">
      <h2 className="text-2xl font-bold text-gold mb-8 px-6 uppercase tracking-widest">{t.mastersTitle}</h2>
      
      <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-4">
        {masters.map((master, index) => (
          <motion.div
            key={master.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onSelect(master)}
            className="flex-shrink-0 relative w-48 aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300"
            style={{
              borderColor: selectedMaster?.id === master.id ? '#D4AF37' : 'rgba(212, 175, 55, 0.1)'
            }}
          >
            <img 
              src={master.photo} 
              alt={master.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                selectedMaster?.id === master.id ? 'scale-110' : 'grayscale hover:grayscale-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gold font-bold text-lg">{master.name}</p>
              <p className="text-white/60 text-xs uppercase tracking-tight">{master.role}</p>
            </div>

            {selectedMaster?.id === master.id && (
              <motion.div
                layoutId="masterCheck"
                className="absolute top-4 right-4 bg-gold text-dark p-1 rounded-full shadow-lg"
              >
                <div className="w-4 h-4 rounded-full border-2 border-dark" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Masters;
