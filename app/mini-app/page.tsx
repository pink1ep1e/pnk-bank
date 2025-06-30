'use client';

import { useEffect } from 'react';
import { initTelegramWebApp, tgWebApp } from '@/lib/telegram';

export default function Home() {
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  const handleButtonClick = () => {
    if (tgWebApp) {
      tgWebApp.showAlert(`Hello, ${tgWebApp.initDataUnsafe.user?.first_name || 'User'}!`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Telegram Mini App</h1>
      <p className="mb-6">This is a Next.js app running inside Telegram!</p>
      
      <button 
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Say Hello
      </button>
      
      {tgWebApp?.initDataUnsafe.user && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="font-medium mb-2">User Info:</h2>
          <p>Name: {tgWebApp.initDataUnsafe.user.first_name}</p>
          {tgWebApp.initDataUnsafe.user.last_name && (
            <p>Last Name: {tgWebApp.initDataUnsafe.user.last_name}</p>
          )}
          {tgWebApp.initDataUnsafe.user.username && (
            <p>Username: @{tgWebApp.initDataUnsafe.user.username}</p>
          )}
        </div>
      )}
    </main>
  );
}