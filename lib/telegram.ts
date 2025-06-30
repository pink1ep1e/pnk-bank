import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined') {
    WebApp.ready();
    WebApp.expand();
  }
};

export const tgWebApp = typeof window !== 'undefined' ? WebApp : null;