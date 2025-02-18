import type { Metadata } from 'next';

import { fetchMovie } from '@/app/shared/apis/movie';
import AppHeader from '@/app/shared/components/app-header';
import AppLayout from '@/app/shared/components/app-layout';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';

import DetailMovie from './components/detail';

type PageMovieProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({
  params,
}: PageMovieProps): Promise<Metadata> {
  const id = (await params).id;

  const movie = await fetchMovie(id);

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: {
        url: `${TMDB_IMAGE_BASE_URL}/w300${movie.poster_path}`,
      },
    },
    twitter: {
      title: movie.title,
      description: movie.overview,
      images: {
        url: `${TMDB_IMAGE_BASE_URL}/w300${movie.poster_path}`,
      },
    },
  };
}

async function PageMovie({ params }: PageMovieProps) {
  return (
    <AppLayout>
      <AppHeader />
      <DetailMovie id={(await params).id} />
    </AppLayout>
  );
}

export default PageMovie;
