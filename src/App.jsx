import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import useMiniAppSDK from './hooks/useMiniAppSDK';
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
  const { isTelegram, sendData, triggerHaptic } = useMiniAppSDK();
  
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    service: null,
    master: null,
    date: null,
    time: null,
    client: JSON.parse(localStorage.getItem('user_profile')) || null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userBookings, setUserBookings] = useState(JSON.parse(localStorage.getItem('user_history')) || []);

  // Use a ref to store the latest booking data and logic for TG callback
  const stateRef = useRef({ step, bookingData, userBookings, showSuccess, showCheckout });
  useEffect(() => {
    stateRef.current = { step, bookingData, userBookings, showSuccess, showCheckout };
  }, [step, bookingData, userBookings, showSuccess, showCheckout]);

  const handleBooking = useCallback(() => {
    const { client } = stateRef.current.bookingData;
    
    if (!client) {
      setShowCheckout(true);
      return;
    }

    const finalBooking = {
      ...stateRef.current.bookingData,
      id: Date.now(),
      status: 'pending',
      timestamp: new Date().toISOString(),
      shopName: "Nghia 79 Barber Shop"
    };

    const history = [...stateRef.current.userBookings, finalBooking];
    setUserBookings(history);
    localStorage.setItem('user_history', JSON.stringify(history));

    sendData(finalBooking);
    triggerHaptic('success');
    setShowSuccess(true);
    
    // Auto-close for Telegram Mini App
    setTimeout(() => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close();
      }
    }, 4000);
  }, [sendData, triggerHaptic]);

  const handleCheckoutSubmit = (clientInfo) => {
    localStorage.setItem('user_profile', JSON.stringify(clientInfo));
    setBookingData(prev => ({ ...prev, client: clientInfo }));
    setShowCheckout(false);
    // Proceed to final booking logic immediately
    setTimeout(() => handleBooking(), 100);
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0F0F0F');
      tg.setBackgroundColor('#0F0F0F');
    }
  }, []);

  const handleMainButtonClick = useCallback(() => {
    const { step, showSuccess, showCheckout } = stateRef.current;
    if (showSuccess || showCheckout) return;

    const isStepValid = () => {
      const { bookingData } = stateRef.current;
      if (step === 0) return true;
      if (step === 1) return !!bookingData.service;
      if (step === 2) return !!bookingData.master;
      if (step === 3) return !!bookingData.date;
      if (step === 4) return !!bookingData.time;
      return false;
    };

    if (isStepValid()) {
      if (step < 4) {
        setStep(prev => prev + 1);
      } else if (step === 4) {
        handleBooking();
      }
    }
  }, [handleBooking]);

  // Sync Telegram MainButton
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.MainButton) return;

    const { step, showSuccess, showCheckout, bookingData } = stateRef.current;
    
    const isStepValid = () => {
      if (step === 0) return true;
      if (step === 1) return !!bookingData.service;
      if (step === 2) return !!bookingData.master;
      if (step === 3) return !!bookingData.date;
      if (step === 4) return !!bookingData.time;
      return false;
    };

    const isVisible = isStepValid() && step > 0 && !showSuccess && !showCheckout;

    if (isVisible) {
      tg.MainButton.setText(step === 4 ? t.confirmBooking.toUpperCase() : t.bookNow.toUpperCase());
      tg.MainButton.show();
      tg.MainButton.enable();
    } else {
      tg.MainButton.hide();
    }

    tg.MainButton.onClick(handleMainButtonClick);
    return () => {
      tg.MainButton.offClick(handleMainButtonClick);
    };
  }, [step, bookingData, showSuccess, showCheckout, t, handleMainButtonClick]);

  // Native app initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0F0F0F');
      tg.setBackgroundColor('#0F0F0F');
    }
  }, []);

    <div className="min-h-screen bg-dark safe-bottom relative overflow-x-hidden select-none pb-32">
      {showSuccess && (
        <SuccessScreen 
          isVisible={true} 
          bookingData={bookingData} 
          onClose={() => {
            setShowSuccess(false);
            setStep(0);
          }} 
        />
      )}
      <div className="wood-pattern fixed inset-0 z-0 opacity-10 pointer-events-none" />
      
      <header className="relative z-[60] px-6 py-6 flex justify-between items-center bg-gradient-to-b from-dark to-transparent backdrop-blur-sm sticky top-0 safe-top">
        <LangSwitcher />
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-12 h-12 bg-white/5 border border-gold/20 rounded-2xl flex items-center justify-center text-gold shadow-gold-glow hover:bg-gold/10 transition-all active:scale-90"
        >
          <UserCircle size={28} strokeWidth={1.5} />
        </button>
      </header>

      <main className="relative z-10 px-4 pt-4">
        <AnimatePresence mode="wait">
          {showCheckout ? (
            <CheckoutForm 
              key="checkout"
              onSubmit={handleCheckoutSubmit}
              onBack={() => setShowCheckout(false)}
              triggerHaptic={triggerHaptic}
            />
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && <Hero onStartBooking={() => setStep(1)} />}
              {step === 1 && (
                <Services 
                  selectedService={bookingData.service}
                  onSelect={(s) => {
                    setBookingData({...bookingData, service: s});
                    setStep(2);
                    triggerHaptic('light');
                  }}
                />
              )}
              {step === 2 && (
                <Masters 
                  selectedMaster={bookingData.master}
                  onSelect={(m) => {
                    setBookingData({...bookingData, master: m});
                    setStep(3);
                    triggerHaptic('light');
                  }}
                />
              )}
              {step === 3 && (
                <BookingCalendar 
                  selectedDate={bookingData.date}
                  onSelect={(d) => {
                    setBookingData({...bookingData, date: d});
                    setStep(4);
                    triggerHaptic('light');
                  }}
                />
              )}
              {step === 4 && (
                <TimePicker 
                  selectedTime={bookingData.time}
                  onSelect={(tm) => {
                    setBookingData({...bookingData, time: tm});
                    triggerHaptic('light');
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isProfileOpen && (
          <UserProfile 
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            userData={bookingData.client}
            bookings={userBookings}
          />
        )}
      </AnimatePresence>

      {/* Browser-only fallback button (Hidden in Telegram) */}
      {!isTelegram && step > 0 && !showSuccess && !showCheckout && (
        <div className="fixed bottom-10 left-0 right-0 px-6 z-50">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => {
              if (step < 4) setStep(prev => prev + 1);
              else handleBooking();
            }}
            disabled={
              (step === 1 && !bookingData.service) ||
              (step === 2 && !bookingData.master) ||
              (step === 3 && !bookingData.date) ||
              (step === 4 && !bookingData.time)
            }
            className="w-full bg-gradient-to-r from-gold to-gold-light text-dark font-black py-5 rounded-2xl uppercase tracking-widest shadow-gold-glow disabled:opacity-50 disabled:shadow-none active:scale-[0.98] transition-all"
          >
            {step === 4 ? t.confirmBooking : t.bookNow}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default App;
