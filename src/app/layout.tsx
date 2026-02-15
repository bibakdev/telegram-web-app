import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const vazirmatn = localFont({
  src: '../node_modules/vazirmatn/Vazirmatn-RD[wght].woff2',
  variable: '--font-vazirmatn',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'نبرد قبیله‌ها - Group Battle',
  description: 'Telegram Mini App'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={vazirmatn.variable}
    >
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
