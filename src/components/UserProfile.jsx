import React from 'react';
import { motion } from 'framer-motion';
import { X, User as UserIcon, Phone, History, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const UserProfile = ({ isOpen, onClose, userData, bookings = [] }) => {
  const { t } = useLanguage();

  const mockHistory = [
    {
      id: 'mock-1',
      service: 'complex',
      master: 'Nghia 79',
      date: '10.03.2026',
      time: '11:00',
      status: 'completed'
    },
    ...bookings
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-dark/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-dark border border-gold/20 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-gradient-to-b from-gold/5 to-transparent">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              {t.profile.title}
            </h2>
            <div className="w-8 h-0.5 bg-gold mt-2" />
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          {/* User Info */}
          <div className="flex items-center gap-6 p-6 bg-gold/5 border border-gold/10 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shadow-gold-glow">
              <UserIcon size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white truncate max-w-[200px]">
                {userData?.name || 'Gentleman'}
              </h3>
              <div className="flex items-center gap-2 text-gold/60 text-xs">
                <Phone size={12} />
                <span>{userData?.phone || '—'}</span>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <History size={14} />
                {t.profile.history}
              </h4>
              <div className="h-[1px] flex-1 bg-gold/10 ml-4" />
            </div>

            <div className="space-y-4">
              {mockHistory.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 bg-white/5 border border-white/5 rounded-3xl group hover:border-gold/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-gold font-bold text-sm uppercase tracking-wider">{t[item.service] || item.service}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Master: {item.master}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter ${
                      item.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-gold/20 text-gold animate-pulse'
                    }`}>
                      {item.status === 'completed' ? t.profile.completed : (t.pending || 'In Progress')}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                      <Calendar size={12} className="text-gold/40" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                      <Clock size={12} className="text-gold/40" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 pt-0">
           <div className="bg-gold/5 rounded-2xl p-4 border border-gold/10 text-center">
              <p className="text-[10px] text-gold/60 uppercase tracking-widest font-bold">
                {t.proposal?.footer || 'Nghia 79 Barber Shop'}
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
