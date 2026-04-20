import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Calendar, Clock, Scissors, Check, X, ArrowLeft, ShieldCheck, Phone, DollarSign, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKINGS = [
  { id: 1, name: "Artem S.", phone: "+79110000000", service: "haircut", master: "Alex", date: "20.04", time: "10:30", price: "250", status: "pending", isNew: true },
  { id: 2, name: "Nguyen Van A", phone: "0987654321", service: "complex", master: "Hoang", date: "20.04", time: "12:00", price: "100.000", status: "confirmed", isNew: false },
  { id: 3, name: "Dmitry K.", phone: "+79220000000", service: "beard", master: "Dmitry", date: "20.04", time: "15:00", price: "125", status: "pending", isNew: false },
];

const AdminPanel = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsLogged(true);
      setError('');
    } else {
      setError(t.wrongPassword);
    }
  };

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status, isNew: false } : b));
    if (selectedBooking?.id === id) {
      setSelectedBooking(prev => ({ ...prev, status, isNew: false }));
    }
  };

  const openBooking = (booking) => {
    setSelectedBooking(booking);
    if (booking.isNew) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, isNew: false } : b));
    }
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-white/5 border border-gold/20 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex justify-center mb-10">
            <div className="p-4 bg-gold/10 rounded-3xl shadow-gold-glow">
              <Lock className="text-gold" size={40} />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase mb-10 tracking-tighter">
            {t.adminTitle}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full bg-dark/50 border border-gold/30 rounded-2xl px-6 py-4 text-white placeholder:text-gold/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-gold-light text-dark font-black py-4 rounded-2xl uppercase tracking-widest shadow-gold-glow active:scale-[0.98] transition-all"
            >
              {t.loginButton}
            </button>
          </form>
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-8 text-gold/30 text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>{t.clientView}</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-6 pb-24 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-black text-gold uppercase tracking-tighter leading-none">
            {t.adminTitle}
          </h1>
          <p className="text-gold/30 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
            {t.todayBookings}
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-white/5 border border-gold/20 rounded-2xl flex items-center justify-center text-gold shadow-gold-glow"
        >
          <User size={20} />
        </button>
      </header>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openBooking(booking)}
            className="bg-white/5 border border-white/5 rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-gold/30 transition-all active:scale-[0.99]"
          >
            {booking.isNew && (
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter rounded-bl-xl shadow-lg animate-pulse">
                {t.admin.new}
              </div>
            )}
            {!booking.isNew && booking.status !== 'pending' && (
              <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] uppercase font-black tracking-tighter ${
                booking.status === 'confirmed' ? 'text-green-500' : 'text-red-500'
              }`}>
                {booking.status === 'confirmed' ? t.confirmed : t.cancelled}
              </div>
            )}
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gold/40 text-[9px] uppercase tracking-widest leading-none mb-2 font-bold">
                  {t.clientName}
                </p>
                <h3 className="text-white font-bold text-xl">{booking.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-white/30 text-xs">
                  <Scissors size={12} />
                  <span>{t[booking.service]}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/20 text-[9px] uppercase tracking-widest leading-none mb-1 font-bold">
                  {booking.date}
                </p>
                <p className="text-gold font-black text-2xl tracking-tighter">{booking.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-dark/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white/5 border-t sm:border border-gold/20 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">{t.admin.details}</h2>
                <button onClick={() => setSelectedBooking(null)} className="text-white/30"><X /></button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><User /></div>
                  <div className="flex-1">
                    <p className="text-white font-bold">{selectedBooking.name}</p>
                    <a href={`tel:${selectedBooking.phone}`} className="text-gold text-xs flex items-center gap-1 mt-1">
                      <Phone size={12} /> {selectedBooking.phone}
                    </a>
                  </div>
                  <a href={`tel:${selectedBooking.phone}`} className="p-3 bg-gold text-dark rounded-xl font-black text-xs uppercase tracking-widest shadow-gold-glow">
                    {t.admin.call}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{t.admin.service}</p>
                    <p className="text-white font-bold text-sm tracking-tight">{t[selectedBooking.service]}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{t.admin.master}</p>
                    <p className="text-white font-bold text-sm tracking-tight">{selectedBooking.master}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{t.bookingTitle}</p>
                    <p className="text-gold font-black text-lg">{selectedBooking.date} / {selectedBooking.time}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{t.admin.price}</p>
                    <p className="text-white font-black text-lg">{selectedBooking.price} {t.currency}</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  {selectedBooking.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                        className="flex-1 bg-green-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg shadow-green-500/20"
                      >
                        {t.confirm}
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                        className="flex-1 bg-red-500/10 border border-red-500/30 text-red-500 font-bold py-4 rounded-2xl uppercase tracking-widest text-xs"
                      >
                        {t.cancel}
                      </button>
                    </>
                  ) : (
                    <div className={`w-full py-4 rounded-2xl border flex items-center justify-center font-black uppercase tracking-widest text-xs ${
                      selectedBooking.status === 'confirmed' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}>
                      {selectedBooking.status === 'confirmed' ? t.confirmed : t.cancelled}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-16 opacity-20 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigate('/proposal')}
          className="text-[10px] text-white uppercase tracking-[0.3em] font-black flex items-center mx-auto gap-2 border border-white/10 px-6 py-2 rounded-full"
        >
          <ShieldCheck size={14} className="text-gold" />
          <span>{t.proposal.badge}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
