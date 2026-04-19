import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Calendar, Clock, Scissors, Check, X, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKINGS = [
  { id: 1, name: "Artem S.", service: "haircut", time: "10:30", status: "pending" },
  { id: 2, name: "Nguyen Van A", service: "complex", time: "12:00", status: "confirmed" },
  { id: 3, name: "Dmitry K.", service: "beard", time: "15:00", status: "pending" },
];

const AdminPanel = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

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
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white/5 border border-gold/20 rounded-3xl p-8 backdrop-blur-md"
        >
          <div className="flex justify-center mb-6">
            <Lock className="text-gold" size={48} />
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase mb-8 tracking-tighter">
            {t.adminTitle}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full bg-dark/50 border border-gold/30 rounded-xl px-4 py-3 text-white placeholder:text-gold/30 focus:outline-none focus:border-gold transition-colors"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-dark font-black py-4 rounded-xl uppercase tracking-widest hover:bg-gold-light transition-colors"
            >
              {t.loginButton}
            </button>
          </form>
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-6 text-gold/50 text-xs uppercase flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={14} />
            <span>{t.clientView}</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-4 pb-20">
      <header className="flex justify-between items-center mb-10 pt-4">
        <div>
          <h1 className="text-2xl font-black text-gold uppercase tracking-tighter leading-none">
            {t.adminTitle}
          </h1>
          <p className="text-gold/50 text-[10px] uppercase tracking-widest mt-1">
            {t.todayBookings}
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-white/5 border border-gold/20 p-3 rounded-xl text-gold"
        >
          <User size={20} />
        </button>
      </header>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-gold/10 rounded-2xl p-5 relative overflow-hidden group"
          >
            {booking.status !== 'pending' && (
              <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] uppercase font-black tracking-tighter ${
                booking.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {booking.status === 'confirmed' ? t.confirmed : t.cancelled}
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gold/40 text-[9px] uppercase tracking-widest leading-none mb-1">
                  {t.clientName}
                </p>
                <h3 className="text-white font-bold text-lg">{booking.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-gold/40 text-[9px] uppercase tracking-widest leading-none mb-1">
                  {t.selectTime}
                </p>
                <p className="text-gold font-black text-xl">{booking.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gold/60 text-sm mb-6 pb-4 border-b border-white/5">
              <Scissors size={14} />
              <span>{t[booking.service]}</span>
            </div>

            {booking.status === 'pending' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => updateStatus(booking.id, 'confirmed')}
                  className="flex-1 bg-green-500/10 border border-green-500/20 text-green-500 py-3 rounded-lg flex items-center justify-center space-x-2 font-bold text-xs uppercase"
                >
                  <Check size={16} />
                  <span>{t.confirm}</span>
                </button>
                <button
                  onClick={() => updateStatus(booking.id, 'cancelled')}
                  className="flex-1 bg-red-500/10 border border-red-500/20 text-red-500 py-3 rounded-lg flex items-center justify-center space-x-2 font-bold text-xs uppercase"
                >
                  <X size={16} />
                  <span>{t.cancel}</span>
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-12 opacity-10 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigate('/proposal')}
          className="text-[8px] text-white/50 uppercase tracking-widest flex items-center mx-auto space-x-1"
        >
          <ShieldCheck size={10} />
          <span>Business Solution v1.2</span>
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
