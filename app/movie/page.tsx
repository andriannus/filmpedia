import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';
import SuspenseFallback from '@/app/shared/components/app-suspense-fallback';

import Content from './components/content';
import Filter from './components/filter';
import './styles.scss';
import Favorite from './components/favorite';

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
      <div className="home">
        <div className="home__layout">
          <div className="home__heading">
            <h1 className="home__title">Discover Movies</h1>

            <div className="home__info">
              <Favorite />
            </div>
          </div>

          <div className="home__filter">
            <Filter />
          </div>

          <div className="home__discover">
            <SuspenseFallback>
              <Content />
            </SuspenseFallback>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default PageDiscover;
