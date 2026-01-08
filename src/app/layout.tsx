import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AuthContextProvider } from '@/client-auth/authContext';
import { CartContextProvider } from '@/cartContext';
import './globals.css';
import { Toaster } from '@/components/shadcn/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'laracraft.io',
  description: 'shop for lara`s crafts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-Y3R6E2K1Y8" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <AuthContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
