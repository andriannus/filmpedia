import type { Metadata } from 'next';

import { fetchMovie } from '@/app/shared/apis/movie';
import AppLayout from '@/app/shared/components/app-layout';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';

import MovieDetail from './components/detail';
import MovieRecommendations from './components/recommendations';
import MovieReviews from './components/reviews';

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
  const id = (await params).id;

  return (
    <AppLayout>
      <MovieDetail id={id} />
      <MovieReviews id={id} />
      <MovieRecommendations id={id} />
    </AppLayout>
  );
}

export default PageMovie;
