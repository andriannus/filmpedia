import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';

import { DiscoverProvider } from '@/app/movie/contexts/discover';

import ReactQueryProvider from './provider';
import './main.scss';

const montserrat = localFont({
  src: [
    {
      path: '../public/fonts/montserrat-v29-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/montserrat-v29-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/montserrat-v29-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/montserrat-v29-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReactQueryProvider>
          <DiscoverProvider>{children}</DiscoverProvider>
        </ReactQueryProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
