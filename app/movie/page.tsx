import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';

import Discover from './components/discover';
import Filter from './components/filter';
import { DiscoverProvider } from './contexts/discover';
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
    <DiscoverProvider>
      <AppLayout>
        <div className="home">
          <div className="home__layout">
            <div className="home__heading">
              <h1 className="home__title">Discover Movies</h1>

              <div className="home__info">
                <span>My Movies</span>

                <div className="chip">
                  <span className="chip__count">2</span>
                  <span>movies</span>
                </div>
              </div>
            </div>

            <div className="home__filter">
              <Filter />
            </div>

            <div className="home__discover">
              <Discover />
            </div>
          </div>
        </div>
      </AppLayout>
    </DiscoverProvider>
  );
}

export default PageDiscover;
