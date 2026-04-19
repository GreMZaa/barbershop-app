import { useCallback, useState, useEffect } from 'react';

const useMiniAppSDK = () => {
  const [isTelegram, setIsTelegram] = useState(!!window.Telegram?.WebApp);
  const [isZalo, setIsZalo] = useState(!!window.ZaloPay || !!window.zmpSdk);

  useEffect(() => {
    // Re-check environment on mount and if globals change
    const checkEnv = () => {
      setIsTelegram(!!window.Telegram?.WebApp);
      setIsZalo(!!window.ZaloPay || !!window.zmpSdk);
    };
    
    checkEnv();
    // Add small delay to catch late-injected SDKs
    const timer = setTimeout(checkEnv, 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerHaptic = useCallback((style = 'medium') => {
    if (isTelegram) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      } catch (e) {
        console.warn('Telegram Haptic failed', e);
      }
    } else if (isZalo && window.zmpSdk?.vibrate) {
      window.zmpSdk.vibrate({ type: 'selection' });
    }
  }, [isTelegram, isZalo]);

  const closeApp = useCallback(() => {
    if (isTelegram) {
      window.Telegram.WebApp.close();
    } else if (isZalo && window.zmpSdk?.closeApp) {
      window.zmpSdk.closeApp();
    } else {
      window.location.href = 'about:blank';
    }
  }, [isTelegram, isZalo]);

  const sendData = useCallback((data) => {
    const jsonStr = JSON.stringify(data);
    if (isTelegram) {
      try {
        window.Telegram.WebApp.sendData(jsonStr);
      } catch (e) {
        console.error('Telegram sendData failed:', e);
        // We don't throw here so the UI can proceed to success screen
      }
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
