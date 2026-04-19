import { useCallback } from 'react';

const useMiniAppSDK = () => {
  const isTelegram = !!window.Telegram?.WebApp;
  const isZalo = !!window.ZaloPay || !!window.zmpSdk; // Common checks for Zalo environment

  const triggerHaptic = useCallback((style = 'medium') => {
    if (isTelegram) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      console.log('TG Haptic:', style);
    } else if (isZalo && window.zmpSdk?.vibrate) {
      window.zmpSdk.vibrate({ type: 'selection' });
      console.log('Zalo Haptic triggered');
    } else {
      console.log('Browser Haptic simulation:', style);
    }
  }, [isTelegram, isZalo]);

  const closeApp = useCallback(() => {
    if (isTelegram) {
      window.Telegram.WebApp.close();
    } else if (isZalo && window.zmpSdk?.closeApp) {
      window.zmpSdk.closeApp();
    } else {
      console.log('Browser: App closing simulated');
      window.location.href = 'about:blank';
    }
  }, [isTelegram, isZalo]);

  const sendData = useCallback((data) => {
    const jsonStr = JSON.stringify(data);
    if (isTelegram) {
      window.Telegram.WebApp.sendData(jsonStr);
    } else {
      console.log('Universal SendData:', jsonStr);
    }
  }, [isTelegram]);

  return {
    isTelegram,
    isZalo,
    isBrowser: !isTelegram && !isZalo,
    triggerHaptic,
    closeApp,
    sendData
  };
};

export default useMiniAppSDK;
