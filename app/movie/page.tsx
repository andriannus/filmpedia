import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';

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
      <main className="main">
        <div className="main__layout">
          <div className="main__heading">
            <h1 className="main__title">Discover Movies</h1>

            <div className="main__info">
              <span>My Movies</span>

              <div className="chip">
                <span className="chip__count">2</span>
                <span>movies</span>
              </div>
            </div>
          </div>

          <div className="main__filter">
            <div>Filter</div>
          </div>

          <div className="main__discover">
            <DiscoverMovie />
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default PageDiscover;
