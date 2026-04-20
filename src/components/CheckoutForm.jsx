import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const CheckoutForm = () => {
  const { t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { setClient, setShowCheckout, setShowSuccess, addBookingToHistory, bookingData, resetBooking } = useBookingStore();
  
  const [name, setName] = useState(bookingData.client?.name || '');
  const [phone, setPhone] = useState(bookingData.client?.phone || '');
  const [error, setError] = useState('');

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('0') || (digits.length <= 10 && !digits.startsWith('7'))) {
      if (digits.length <= 10) return digits;
      return digits.slice(0, 10);
    }
    if (digits.startsWith('7') || digits.startsWith('8')) {
      if (digits.length <= 11) return '+' + digits;
      return '+' + digits.slice(0, 11);
    }
    return digits;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t.checkout.errorName);
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) {
      setError(t.checkout.errorPhone);
      return;
    }

    const clientInfo = { name, phone };
    setClient(clientInfo);
    
    // Simulate booking finalization
    const finalBooking = {
      ...bookingData,
      client: clientInfo,
      id: Date.now(),
      status: 'confirmed',
      timestamp: new Date().toISOString(),
      shopName: "Elite Barber Shop"
    };

    triggerHaptic('success');
    addBookingToHistory(finalBooking);
    setShowCheckout(false);
    setShowSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto px-6 py-10"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
          {t.checkout.title}
        </h2>
        <div className="w-16 h-1.5 gold-gradient mx-auto rounded-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-black ml-4">
            {t.clientName}
          </label>
          <div className="relative group">
            <div className={`absolute inset-0 gold-gradient blur-xl opacity-0 group-focus-within:opacity-10 transition-premium`} />
            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-premium" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.checkout.namePlaceholder}
              className="w-full glass-panel-gold rounded-3xl py-6 pl-14 pr-6 text-white text-lg font-bold focus:border-gold transition-premium placeholder:text-white/10"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-black ml-4">
            {t.checkout.phonePlaceholder}
          </label>
          <div className="relative group">
            <div className={`absolute inset-0 gold-gradient blur-xl opacity-0 group-focus-within:opacity-10 transition-premium`} />
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-premium" size={20} />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7... / 0..."
              className="w-full glass-panel-gold rounded-3xl py-6 pl-14 pr-6 text-white text-lg font-bold focus:border-gold transition-premium placeholder:text-white/10"
            />
          </div>
          <div className="flex gap-4 ml-4">
            {phone.startsWith('+7') && <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">🇷🇺 Russian Standard</p>}
            {phone.startsWith('0') && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">🇻🇳 Vietnam Standard</p>}
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="pt-6 space-y-6">
          <button
            type="submit"
            className="w-full gold-gradient text-dark font-black py-6 rounded-[2rem] uppercase tracking-[0.2em] shadow-gold-glow active:scale-95 transition-premium flex items-center justify-center gap-3 text-lg"
          >
            <CheckCircle size={22} strokeWidth={3} />
            {t.checkout.submit}
          </button>
          
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setShowCheckout(false);
            }}
            className="w-full text-white/20 hover:text-gold text-[10px] uppercase font-black tracking-[0.3em] py-4 transition-premium flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            {t.selectTime}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
