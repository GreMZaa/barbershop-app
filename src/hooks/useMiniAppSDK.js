import { useCallback, useState, useEffect } from 'react';

const useMiniAppSDK = () => {
  const [isTelegram, setIsTelegram] = useState(!!(window.Telegram?.WebApp?.initData && window.Telegram?.WebApp?.platform !== 'unknown'));
  const [isZalo, setIsZalo] = useState(!!window.ZaloPay || !!window.zmpSdk);

  useEffect(() => {
    const checkEnv = () => {
      const tg = window.Telegram?.WebApp;
      const isTG = !!(tg && tg.initData && tg.platform !== 'unknown');
      setIsTelegram(isTG);
      setIsZalo(!!window.ZaloPay || !!window.zmpSdk);
    };
    
    checkEnv();
    const timer = setTimeout(checkEnv, 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerHaptic = useCallback((style = 'medium') => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      } catch (e) {
        console.warn('Telegram Haptic failed', e);
      }
    } else if (isZalo && window.zmpSdk?.vibrate) {
      window.zmpSdk.vibrate({ type: 'selection' });
    }
  }, [isZalo]);

  const closeApp = useCallback(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    } else if (isZalo && window.zmpSdk?.closeApp) {
      window.zmpSdk.closeApp();
    } else {
      window.close();
    }
  }, [isZalo]);

  const sendData = useCallback((data) => {
    const jsonStr = JSON.stringify(data);
    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.sendData(jsonStr);
      } catch (e) {
        console.error('Telegram sendData failed:', e);
      }
    } else {
      console.log('Universal SendData:', jsonStr);
    }
  }, []);

  return {
    isTelegram,
    isZalo,
    isBrowser: !isTelegram && !isZalo,
    triggerHaptic,
    closeApp,
    sendData,
    tg: window.Telegram?.WebApp
  };
};

export default useMiniAppSDK;
