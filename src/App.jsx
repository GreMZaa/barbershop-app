import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import Masters from './components/Masters';
import BookingCalendar from './components/BookingCalendar';
import TimePicker from './components/TimePicker';
import BookingButton from './components/BookingButton';
import LangSwitcher from './components/LangSwitcher';
import SuccessScreen from './components/SuccessScreen';
import { useLanguage } from './context/LanguageContext';
import useMiniAppSDK from './hooks/useMiniAppSDK';

function App() {
  const { lang, t } = useLanguage();
  const { triggerHaptic, sendData } = useMiniAppSDK();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0F0F0F');
      tg.setBackgroundColor('#0F0F0F');
    }
  }, []);

  const isValid = selectedService && selectedMaster && selectedDate && selectedTime;

  const handleBooking = () => {
    if (!isValid) return;

    const data = {
      service: selectedService,
      master: selectedMaster,
      date: selectedDate,
      time: selectedTime
    };

    setBookingData(data);
    
    // Prepare data for mini-app
    const miniAppData = {
      service: selectedService.name,
      master: selectedMaster.name,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      total: `${selectedService.price} ${t.currency}`
    };

    sendData(miniAppData);
    triggerHaptic('success');
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-dark pb-32">
      <SuccessScreen 
        isVisible={showSuccess} 
        bookingData={bookingData} 
        onClose={() => setShowSuccess(false)}
      />

      <div className="safe-top">
        <LangSwitcher />
      </div>
      
      <Hero />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Services 
          selectedService={selectedService} 
          onSelect={(s) => {
            setSelectedService(s);
            triggerHaptic('light');
          }} 
        />

        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <Masters 
                selectedMaster={selectedMaster} 
                onSelect={(m) => {
                  setSelectedMaster(m);
                  triggerHaptic('light');
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
            >
              <BookingCalendar 
                selectedDate={selectedDate} 
                onSelect={(d) => {
                  setSelectedDate(d);
                  triggerHaptic('light');
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
          bookingData={{
            service: selectedService,
            master: selectedMaster,
            date: selectedDate,
            time: selectedTime
          }}
          isValid={isValid}
          onBook={handleBooking}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none wood-pattern z-0 opacity-[0.03]" />
    </div>
  );
}

export default App;
