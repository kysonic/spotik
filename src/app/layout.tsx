import { use } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css';
import { authMiddleware } from '@/middlewares/authMiddleware';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotik',
  description: 'Spotify clone for learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NextJS middleware works only on edge, that means we cannot use our postgre client, I don't want to use their @vercel/postgre
  // In this case we are going to use middlewares in layout... 
  // Let's use webhooks
  // use(authMiddleware());

  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: 'hidden',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

export const runtime = 'nodejs';
