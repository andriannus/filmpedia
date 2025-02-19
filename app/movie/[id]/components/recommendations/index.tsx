'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { fetchMovieRecommendations } from '@/app/shared/apis/movie';
import AppLoader from '@/app/shared/components/app-loader';

import './styles.scss';

const AppMovie = dynamic(() => import('@/app/shared/components/app-movie'), {
  ssr: false,
});

type MovieRecommendationsProps = {
  id: number;
};

function MovieRecommendations({ id }: MovieRecommendationsProps) {
  const queryRecommendation = useQuery({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchMovieRecommendations(id),
  });

  const movies = useMemo(() => {
    if (queryRecommendation.isError || !queryRecommendation.data) return [];

    const tempRecommendations = queryRecommendation.data.results;

    if (queryRecommendation.data.results.length <= 5) {
      return tempRecommendations;
    }

    return tempRecommendations.sort(() => 0.5 - Math.random()).slice(-5);
  }, [queryRecommendation.data, queryRecommendation.isError]);

  if (queryRecommendation.isError || !movies.length) return null;
  if (queryRecommendation.isFetching) return <AppLoader />;

  return (
    <div className="recommendation">
      <div className="recommendation__layout">
        <span className="recommendation__title">
          Recommendation Movies
        </span>

        <div className="recommendation__grid">
          {movies.map((movie) => {
            return <AppMovie key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieRecommendations;
