import type { Metadata } from 'next';

import AppLayout from '@/app/components/app-layout';
import AppHeader from '@/app/components/app-header';

import './styles.scss';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Find your favorite movies!',
  openGraph: {
    title: 'Home',
    description: 'Find your favorite movies!',
  },
  twitter: {
    title: 'Home',
    description: 'Find your favorite movies!',
  },
};

function Discover() {
  return (
    <AppLayout>
      <AppHeader />
    </AppLayout>
  );
}

export default Discover;
