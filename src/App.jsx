import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import useMiniAppSDK from './hooks/useMiniAppSDK';
import useBookingStore from './store/useBookingStore';
import Hero from './components/Hero';
import Services from './components/Services';
import Masters from './components/Masters';
import BookingCalendar from './components/BookingCalendar';
import TimePicker from './components/TimePicker';
import SuccessScreen from './components/SuccessScreen';
import LangSwitcher from './components/LangSwitcher';
import CheckoutForm from './components/CheckoutForm';
import UserProfile from './components/UserProfile';
import { UserCircle } from 'lucide-react';

const App = () => {
  const { t } = useLanguage();
  const { isTelegram, triggerHaptic, tg } = useMiniAppSDK();
  
  const { 
    step, setStep, nextStep, isStepValid, 
    bookingData,
    showSuccess, setShowSuccess, 
    showCheckout, setShowCheckout,
    isProfileOpen, setIsProfileOpen,
    userHistory, initializeDemoData
  } = useBookingStore();


  // Telegram SDK Init
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0F0F0F');
      tg.setBackgroundColor('#0F0F0F');
    }
  }, [tg]);

  // Handle Main Button Click
  const handleMainAction = useCallback(() => {
    if (showSuccess || showCheckout) return;
    
    if (isStepValid()) {
      if (step < 4) {
        nextStep();
        triggerHaptic('light');
      } else {
        setShowCheckout(true);
        triggerHaptic('medium');
      }
    }
  }, [step, isStepValid, showSuccess, showCheckout, nextStep, triggerHaptic, setShowCheckout]);

  // Sync Telegram MainButton
  useEffect(() => {
    if (!tg?.MainButton) return;

    const valid = isStepValid();
    const isVisible = step > 0 && !showSuccess && !showCheckout;

    if (isVisible) {
      tg.MainButton.setText(step === 4 ? t.confirmBooking.toUpperCase() : t.bookNow.toUpperCase());
      tg.MainButton.setParams({
        color: valid ? '#D4AF37' : '#222222',
        text_color: valid ? '#0F0F0F' : '#555555',
        is_active: valid,
        is_visible: true
      });
      if (valid) {
        tg.MainButton.enable();
      } else {
        tg.MainButton.disable();
      }
    } else {
      tg.MainButton.hide();
    }

    tg.MainButton.onClick(handleMainAction);
    return () => tg.MainButton.offClick(handleMainAction);
  }, [step, bookingData, isStepValid, showSuccess, showCheckout, t, handleMainAction, tg]);

  return (
    <div className="min-h-screen bg-dark mesh-bg safe-bottom relative overflow-x-hidden selection:bg-gold selection:text-dark pb-32">
      <div className="wood-pattern fixed inset-0 z-0 opacity-10 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-[60] px-8 py-8 flex justify-between items-center bg-gradient-to-b from-dark to-transparent backdrop-blur-sm sticky top-0 safe-top">
        <LangSwitcher />
        <button 
          onClick={() => {
            setIsProfileOpen(true);
            triggerHaptic('light');
          }}
          className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gold shadow-gold-glow hover:bg-gold/10 transition-premium active:scale-90"
        >
          <UserCircle size={32} strokeWidth={1} />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pt-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {showCheckout ? (
            <CheckoutForm key="checkout" />
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && <Hero onStartBooking={() => setStep(1)} />}
              {step === 1 && <Services />}
              {step === 2 && <Masters />}
              {step === 3 && <BookingCalendar />}
              {step === 4 && <TimePicker />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {isProfileOpen && <UserProfile key="user-profile" />}
        {showSuccess && <SuccessScreen key="success-screen" />}
      </AnimatePresence>

      {/* Browser Fallback Button */}
      {!isTelegram && step > 0 && !showSuccess && !showCheckout && (
        <div className="fixed bottom-12 left-0 right-0 px-8 z-50 max-w-md mx-auto">
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={handleMainAction}
            disabled={!isStepValid()}
            className="w-full gold-gradient text-dark font-black py-6 rounded-[2rem] uppercase tracking-[0.2em] shadow-gold-glow disabled:opacity-30 disabled:shadow-none active:scale-95 transition-premium text-lg"
          >
            {step === 4 ? t.confirmBooking : t.bookNow}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default App;
