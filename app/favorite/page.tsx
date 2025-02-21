import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';

import Content from './components/content';
import './styles.scss';

export const metadata: Metadata = {
  title: 'Favorite',
  description: 'Your favorite movies!',
  openGraph: {
    title: 'Favorite',
    description: 'Your favorite movies!',
  },
  twitter: {
    title: 'Favorite',
    description: 'Your favorite movies!',
  },
};

function PageFavorite() {
  return (
    <AppLayout>
      <div className="favorite">
        <div className="favorite__layout">
          <div className="favorite__heading">
            <h1 className="favorite__title">Favorite Movies</h1>
          </div>

          <div className="favorite__content">
            <Content />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default PageFavorite;
