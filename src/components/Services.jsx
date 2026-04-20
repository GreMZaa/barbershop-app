import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Ruler, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useBookingStore from '../store/useBookingStore';
import useMiniAppSDK from '../hooks/useMiniAppSDK';

const Services = () => {
  const { t } = useLanguage();
  const { triggerHaptic } = useMiniAppSDK();
  const { bookingData, setBookingData, nextStep } = useBookingStore();
  const selectedService = bookingData.service;

  const services = [
    { id: 'haircut', name: t.haircut, price: t.prices.haircut, icon: Scissors, desc: t.haircutDesc || "Classic cut & style" },
    { id: 'beard', name: t.beard, price: t.prices.beard, icon: Ruler, desc: t.beardDesc || "Trim & contour" },
    { id: 'complex', name: t.complex, price: t.prices.complex, icon: Sparkles, desc: t.complexDesc || "Full grooming ritual" },
  ];

  const handleSelect = (service) => {
    setBookingData({ service });
    triggerHaptic('light');
    setTimeout(nextStep, 300);
  };

  return (
    <section className="py-8 px-2">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{t.servicesTitle}</h2>
        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handleSelect(service)}
            className={`group relative overflow-hidden p-6 rounded-[2rem] transition-premium cursor-pointer ${
              selectedService?.id === service.id
                ? 'glass-panel-gold border-gold scale-[1.02]'
                : 'glass-panel hover:border-gold/30'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-premium ${
                  selectedService?.id === service.id ? 'bg-gold text-dark' : 'bg-white/5 text-gold'
                }`}>
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`text-xl font-black uppercase tracking-tight transition-premium ${
                    selectedService?.id === service.id ? 'text-gold' : 'text-white'
                  }`}>
                    {service.name}
                  </h3>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {service.desc}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className={`text-2xl font-black tracking-tighter transition-premium ${
                    selectedService?.id === service.id ? 'text-white' : 'text-gold'
                  }`}>
                    {service.price}
                  </span>
                  <span className="text-white/20 text-[10px] font-bold uppercase">{t.currency}</span>
                </div>
                {selectedService?.id === service.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-6 h-6 bg-gold rounded-full flex items-center justify-center text-dark"
                  >
                    <Check size={14} strokeWidth={4} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Selection Highlight */}
            {selectedService?.id === service.id && (
              <motion.div
                layoutId="serviceActive"
                className="absolute inset-0 bg-gold/5 pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
