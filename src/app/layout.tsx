import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
