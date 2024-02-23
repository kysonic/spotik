import { use } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import { clerkClient } from "@clerk/nextjs/server";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotik',
  description: 'Spotify clone for learning',
};

async function middleware() {
  const user = auth();
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(middleware());

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
