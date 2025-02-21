'use client';

import AppInfiniteQueries from '@/app/shared/components/app-infinite-queries';
import { useFavoriteMovie } from '@/app/shared/hooks/use-favorite-movie';

function Content() {
  const { queryFavoriteMovie } = useFavoriteMovie();

  return <AppInfiniteQueries grid={5} queryInfinite={queryFavoriteMovie} />;
}

export default Content;
