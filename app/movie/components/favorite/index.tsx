'use client';

import Link from 'next/link';

import { useFavoriteMovie } from '@/app/shared/hooks/use-favorite-movie';

import './styles.scss';

function Favorite() {
  const { queryFavoriteMovie } = useFavoriteMovie();

  if (queryFavoriteMovie.isFetching || queryFavoriteMovie.isError) return null;

  return (
    <>
      <span>My Movies</span>

      <Link className="chip" href="/favorite">
        <span className="chip__count">
          {queryFavoriteMovie.data?.pages[0].total_results}
        </span>

        <span>movies</span>
      </Link>
    </>
  );
}

export default Favorite;
