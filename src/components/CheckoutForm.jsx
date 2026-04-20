import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CheckoutForm = ({ onSubmit, onBack, triggerHaptic }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const formatPhone = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Check for VN format (starts with 0, 9-10 digits)
    if (digits.startsWith('0') || (digits.length <= 10 && !digits.startsWith('7'))) {
      if (digits.length <= 10) return digits;
      return digits.slice(0, 10);
    }
    
    // Check for RU format (starts with 7 or 8, 11 digits)
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

    triggerHaptic('medium');
    onSubmit({ name, phone });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto px-6 py-10"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
          {t.checkout.title}
        </h2>
        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold/50 ml-1">
            {t.clientName}
          </label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-colors" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.checkout.namePlaceholder}
              className="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold/50 ml-1">
            {t.checkout.phonePlaceholder}
          </label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-colors" size={18} />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7... / 0..."
              className="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-white/10"
            />
          </div>
          {phone.startsWith('+7') && <p className="text-[8px] text-blue-400 uppercase tracking-widest ml-1">🇷🇺 Russian Format Detected</p>}
          {phone.startsWith('0') && <p className="text-[8px] text-red-400 uppercase tracking-widest ml-1">🇻🇳 Vietnam Format Detected</p>}
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 text-xs font-bold ml-1"
          >
            {error}
          </motion.p>
        )}

        <div className="pt-4 space-y-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gold to-gold-light text-dark font-black py-4 rounded-2xl uppercase tracking-widest shadow-gold-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            {t.checkout.submit}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="w-full text-gold/40 text-[10px] uppercase font-black tracking-widest py-2"
          >
            ← {t.selectTime}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
