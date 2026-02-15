'use client';
import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<any>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;

    if (app) {
      app.ready();
      app.expand();
      setWebApp(app);
      setUser(app.initDataUnsafe?.user || null);
      setIsReady(true);
    } else {
      // Mock data برای تست محلی (خارج از تلگرام)
      console.log('Telegram WebApp not found - using mock data');
      setUser({
        id: 123456789,
        first_name: 'تست',
        last_name: 'کاربر',
        username: 'testuser',
        is_premium: false
      });
      setIsReady(true);
    }
  }, []);

  return { webApp, user, isReady };
}
