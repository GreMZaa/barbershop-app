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
        client: {
          name: "Alexander G.",
          phone: "+84 90 123 4567",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander"
        },
      },
      userHistory: [
        {
          id: 'prev-1',
          service: { id: 1, name: 'Executive Combo', price: 600000 },
          master: { id: 1, name: 'Alex' },
          date: '2024-04-15',
          time: '14:30',
          status: 'completed'
        },
        {
          id: 'prev-2',
          service: { id: 2, name: 'Classic Haircut', price: 350000 },
          master: { id: 2, name: 'Max' },
          date: '2024-03-20',
          time: '11:00',
          status: 'completed'
        },
        {
          id: 'prev-3',
          service: { id: 3, name: 'Beard Trim & Shape', price: 250000 },
          master: { id: 3, name: 'Dmitry' },
          date: '2024-02-10',
          time: '16:00',
          status: 'completed'
        }
      ],
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
      setShowCheckout: (setShowCheckout) => set({ setShowCheckout }),
      setIsProfileOpen: (isProfileOpen) => set({ isProfileOpen }),

      initializeDemoData: () => {
        const demoClient = {
          name: "Alexander G.",
          phone: "+84 90 123 4567",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander"
        };

        const demoHistory = [
          {
            id: 'prev-1',
            service: { id: 1, name: 'Executive Combo', price: 600000 },
            master: { id: 1, name: 'Alex' },
            date: '2024-04-15',
            time: '14:30',
            status: 'completed'
          },
          {
            id: 'prev-2',
            service: { id: 2, name: 'Classic Haircut', price: 350000 },
            master: { id: 2, name: 'Max' },
            date: '2024-03-20',
            time: '11:00',
            status: 'completed'
          },
          {
            id: 'prev-3',
            service: { id: 3, name: 'Beard Trim & Shape', price: 250000 },
            master: { id: 3, name: 'Dmitry' },
            date: '2024-02-10',
            time: '16:00',
            status: 'completed'
          }
        ];

        set((state) => ({
          bookingData: { ...state.bookingData, client: demoClient },
          userHistory: demoHistory
        }));
      },

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
