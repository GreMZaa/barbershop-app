import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookingStore = create(
  persist(
    (set, get) => ({
      // State
      step: 0,
      bookingData: {
        service: null,
        master: null,
        date: null,
        time: null,
        client: null,
      },
      userHistory: [],
      showSuccess: false,
      showCheckout: false,
      isProfileOpen: false,

      // Actions
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      
      setBookingData: (data) => set((state) => ({
        bookingData: { ...state.bookingData, ...data }
      })),
      
      resetBooking: () => set((state) => ({
        step: 0,
        bookingData: {
          service: null,
          master: null,
          date: null,
          time: null,
          client: state.bookingData.client, // Maintain client profile
        },
        showSuccess: false,
        showCheckout: false,
      })),

      setClient: (client) => set((state) => ({
        bookingData: { ...state.bookingData, client }
      })),

      addBookingToHistory: (booking) => set((state) => ({
        userHistory: [booking, ...state.userHistory]
      })),

      setShowSuccess: (showSuccess) => set({ showSuccess }),
      setShowCheckout: (showCheckout) => set({ showCheckout }),
      setIsProfileOpen: (isProfileOpen) => set({ isProfileOpen }),

      // Computed/Helpers
      isStepValid: () => {
        const { step, bookingData } = get();
        if (step === 0) return true;
        if (step === 1) return !!bookingData.service;
        if (step === 2) return !!bookingData.master;
        if (step === 3) return !!bookingData.date;
        if (step === 4) return !!bookingData.time;
        return false;
      }
    }),
    {
      name: 'barber-booking-storage',
      // Only persist specific keys
      partialize: (state) => ({ 
        bookingData: { client: state.bookingData.client },
        userHistory: state.userHistory 
      }),
    }
  )
);

export default useBookingStore;
