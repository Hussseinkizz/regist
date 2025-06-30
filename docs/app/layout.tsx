// app/layout.tsx
import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title:
    'Regist - A declarative, type-safe, and human-readable library for string validation and transformation.',
  description:
    'Regist is a declarative, type-safe, and human-readable library for string validation and transformation.',
  keywords:
    'regist, string validation, string transformation, typescript, javascript',
  openGraph: {
    title:
      'Regist - A declarative, type-safe, and human-readable library for string validation and transformation.',
    description:
      'Regist is a declarative, type-safe, and human-readable library for string validation and transformation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Regist - A declarative, type-safe, and human-readable library for string validation and transformation.',
    description:
      'Regist is a declarative, type-safe, and human-readable library for string validation and transformation.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className='flex min-h-screen flex-col' suppressHydrationWarning>
        <RootProvider
          search={{
            options: {
              type: 'static',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
