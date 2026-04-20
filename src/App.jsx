import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import { useMiniAppSDK } from './hooks/useMiniAppSDK';
import Hero from './components/Hero';
import Services from './components/Services';
import Masters from './components/Masters';
import BookingCalendar from './components/BookingCalendar';
import TimePicker from './components/TimePicker';
import SuccessScreen from './components/SuccessScreen';
import LanguageSwitcher from './components/LanguageSwitcher';
import CheckoutForm from './components/CheckoutForm';
import UserProfile from './components/UserProfile';
import { UserCircle } from 'lucide-react';

const App = () => {
  const { t } = useLanguage();
  const { sdk, sendData, triggerHaptic } = useMiniAppSDK();
  
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    service: null,
    master: null,
    date: null,
    time: null,
    client: JSON.parse(localStorage.getItem('user_profile')) || null
  });
  const [showSuccess, setShowSuccess] = useState(false);
      tg.setHeaderColor('#0F0F0F');
      tg.setBackgroundColor('#0F0F0F');
    }
  }, []);

  const isValid = selectedService && selectedMaster && selectedDate && selectedTime;

  const handleBooking = useCallback(() => {
    if (!isValid) {
      if (!selectedService) scrollTo(servicesRef);
      else if (!selectedMaster) scrollTo(mastersRef);
      else if (!selectedDate) scrollTo(calendarRef);
      else if (!selectedTime) scrollTo(timeRef);
      return;
    }

    const data = {
      service: selectedService,
      master: selectedMaster,
      date: selectedDate,
      time: selectedTime
    };

    setBookingData(data);
    
    // Send data to Telegram Bot (wrapped in SDK logic)
    sendData(data);
    
    triggerHaptic('success');
    setShowSuccess(true);
  }, [isValid, selectedService, selectedMaster, selectedDate, selectedTime, sendData, triggerHaptic]);

  // Telegram MainButton integration
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.MainButton) {
      const mb = tg.MainButton;
      
      const onMainButtonClick = () => {
        triggerHaptic('medium'); // Immediate feedback
        handleBooking();
      };

      if (isValid && !showSuccess) {
        mb.setParams({
          text: t.bookNow.toUpperCase(),
          color: '#D4AF37',
          text_color: '#0F0F0F',
          is_visible: true,
          is_active: true
        });
        mb.onClick(onMainButtonClick);
      } else {
        mb.hide();
      }

      return () => {
        mb.offClick(onMainButtonClick);
      };
    }
  }, [isValid, showSuccess, t.bookNow, handleBooking, triggerHaptic]);

  return (
    <div className="min-h-screen bg-dark pb-60">
      <SuccessScreen 
        isVisible={showSuccess} 
        bookingData={bookingData} 
        onClose={() => setShowSuccess(false)}
      />

      <div className="safe-top">
        <LangSwitcher />
      </div>
      
      <Hero onStartBooking={() => scrollTo(servicesRef)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div ref={servicesRef} id="services-section">
          <Services 
            selectedService={selectedService} 
            onSelect={(s) => {
              setSelectedService(s);
              triggerHaptic('light');
              // Small delay to allow the next section to appear in DOM before scrolling
              setTimeout(() => scrollTo(mastersRef), 100);
            }} 
          />
        </div>

        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              ref={mastersRef}
            >
              <Masters 
                selectedMaster={selectedMaster} 
                onSelect={(m) => {
                  setSelectedMaster(m);
                  triggerHaptic('light');
                  setTimeout(() => scrollTo(calendarRef), 100);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedMaster && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              ref={calendarRef}
            >
              <BookingCalendar 
                selectedDate={selectedDate} 
                onSelect={(d) => {
                  setSelectedDate(d);
                  triggerHaptic('light');
                  setTimeout(() => scrollTo(timeRef), 100);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              ref={timeRef}
            >
              <TimePicker 
                selectedTime={selectedTime} 
                onSelect={(t) => {
                  setSelectedTime(t);
                  triggerHaptic('light');
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="safe-bottom">
        <BookingButton 
          bookingData={bookingData} 
          isValid={isValid} 
          isVisible={!(isTelegram && isValid)}
          onBook={handleBooking} 
        />
      </div>

      <div className="fixed inset-0 pointer-events-none wood-pattern z-0 opacity-[0.03]" />
    </div>
  );
}

export default App;
