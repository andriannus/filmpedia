import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';
import AppHeader from '@/app/shared/components/app-header';

import DiscoverMovie from './components/discover-movie';
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

function PageDiscover() {
  return (
    <AppLayout>
      <AppHeader />

      <main className="main">
        <div className="main__layout">
          <div className="main__heading">
            <h1 className="font-semibold text-2xl">Discover Movies</h1>

            <div className="flex items-center">
              <span className="mr-3">My Movies</span>

              <div className="Chip">
                <span className="font-semibold mr-1">2</span>
                <span>movies</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div>Filter</div>
          </div>

          <div className="col-span-4 md:col-span-3">
            <DiscoverMovie />
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default PageDiscover;
