import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Ruler, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services = ({ selectedService, onSelect }) => {
  const { t } = useLanguage();

  const services = [
    { id: 'haircut', name: t.haircut, price: t.prices.haircut, icon: Scissors },
    { id: 'beard', name: t.beard, price: t.prices.beard, icon: Ruler },
    { id: 'complex', name: t.complex, price: t.prices.complex, icon: Sparkles },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-gold mb-8 text-center uppercase tracking-widest">{t.servicesTitle}</h2>
      <div className="grid grid-cols-1 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onSelect(service)}
            className={`relative overflow-hidden group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
              selectedService?.id === service.id
                ? 'bg-gold border-gold text-dark'
                : 'bg-dark/40 border-gold/20 text-white hover:border-gold/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${selectedService?.id === service.id ? 'bg-dark/10' : 'bg-gold/10'}`}>
                  <service.icon size={24} className={selectedService?.id === service.id ? 'text-dark' : 'text-gold'} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{service.name}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {service.price} {t.currency}
                </p>
              </div>
            </div>
            
            {/* Subtle glow on selection */}
            {selectedService?.id === service.id && (
              <motion.div
                layoutId="serviceGlow"
                className="absolute inset-0 bg-white/10 blur-xl pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
