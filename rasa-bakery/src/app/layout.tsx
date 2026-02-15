import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rasa Essence - Cakes & Cookies | Crafted with Love',
  description: 'Handmade cakes and cookies, fresh flavors every day. Order online for fast delivery.',
  keywords: ['cakes', 'bakery', 'cookies', 'custom cakes', 'birthday cakes', 'wedding cakes'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
