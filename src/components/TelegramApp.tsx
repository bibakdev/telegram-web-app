'use client';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { useEffect } from 'react';

export default function TelegramApp() {
  const { webApp, user, isReady } = useTelegramWebApp();

  useEffect(() => {
    console.log('isReady:', isReady);
    console.log('user:', user);
    console.log('webApp:', webApp);
    console.log('Telegram object:', (window as any).Telegram);
  }, [isReady, user, webApp]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-2">در حال بارگذاری...</p>
          <p className="text-sm text-gray-500">isReady: {String(isReady)}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center min-h-screen flex flex-col justify-center">
        <p className="text-lg mb-2">⚠️ کاربر یافت نشد</p>
        <p className="text-sm text-gray-600">
          لطفاً این اپلیکیشن را از داخل تلگرام باز کنید
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Console را برای جزئیات بیشتر چک کنید
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          سلام {user.first_name}! 👋
        </h1>
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between">
            <strong>نام:</strong>
            <span>
              {user.first_name} {user.last_name || ''}
            </span>
          </div>
          {user.username && (
            <div className="flex justify-between">
              <strong>نام کاربری:</strong>
              <span>@{user.username}</span>
            </div>
          )}
          <div className="flex justify-between">
            <strong>شناسه:</strong>
            <span>{user.id}</span>
          </div>
          {user.is_premium && (
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                Premium ⭐
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
