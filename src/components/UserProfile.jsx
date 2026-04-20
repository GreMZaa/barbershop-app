import React from 'react';
import { motion } from 'framer-motion';
import { X, User as UserIcon, Phone, History, Calendar, Clock, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const UserProfile = () => {
  const { t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { bookingData, userHistory, setIsProfileOpen, setClient } = useBookingStore();
  const userData = bookingData.client;

  const handleClose = () => {
    setIsProfileOpen(false);
    triggerHaptic('light');
  };

  const handleLogout = () => {
    setClient(null);
    triggerHaptic('notification');
    setIsProfileOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-dark/90 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative w-full max-w-md glass-panel rounded-[3.5rem] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-10 pb-6 flex justify-between items-center bg-gradient-to-b from-white/5 to-transparent">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
              {t.profile.title}
            </h2>
            <div className="w-10 h-1 gold-gradient mt-3 rounded-full" />
          </div>
          <button 
            onClick={handleClose}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold transition-premium"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10 pt-4 space-y-10 max-h-[65vh] overflow-y-auto no-scrollbar">
          {/* User Info Card */}
          <div className="relative group">
            <div className="absolute inset-0 gold-gradient blur-2xl opacity-10 group-hover:opacity-20 transition-premium" />
            <div className="relative flex items-center gap-6 p-8 glass-panel-gold rounded-[2.5rem]">
              <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center text-gold shadow-gold-glow border border-gold/20">
                <UserIcon size={40} strokeWidth={1} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-black text-white truncate uppercase tracking-tighter">
                  {userData?.name || 'Gentleman'}
                </h3>
                <div className="flex items-center gap-2 text-gold/60 text-xs font-bold mt-1">
                  <Phone size={14} />
                  <span>{userData?.phone || '—'}</span>
                </div>
              </div>
              {userData && (
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-white/5 hover:bg-red-500/10 text-white/20 hover:text-red-500 rounded-xl transition-premium"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold">
                <History size={16} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
                {t.profile.history}
              </h4>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="space-y-4">
              {userHistory.length === 0 ? (
                <div className="py-12 text-center glass-panel rounded-3xl border-dashed border-white/10">
                  <p className="text-white/20 text-xs font-black uppercase tracking-widest">No previous visits</p>
                </div>
              ) : (
                userHistory.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 glass-panel rounded-[2rem] group hover:border-gold/30 transition-premium"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gold font-black text-lg uppercase tracking-tighter mb-1">
                          {t[item.service] || item.service}
                        </p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-gold/40 rounded-full" />
                          Master: {item.master?.name || item.master}
                        </p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                        item.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gold/10 text-gold border border-gold/20 animate-pulse'
                      }`}>
                        {item.status === 'completed' ? t.profile.completed : (t.pending || 'Confirmed')}
                      </div>
                    </div>
                    
                    <div className="flex gap-6 items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-tight">
                        <Calendar size={14} className="text-gold/40" />
                        <span>{item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-tight">
                        <Clock size={14} className="text-gold/40" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-10 pt-4 pb-12">
           <div className="glass-panel rounded-2xl p-4 text-center border-white/5">
              <p className="text-[10px] text-white/10 uppercase tracking-[0.4em] font-black">
                {t.proposal?.footer || 'Elite Standard Grooming'}
              </p>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
