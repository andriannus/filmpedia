import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchFavoriteMovies } from '@/app/shared/apis/account';

export function useFavoriteMovie() {
  const queryFavoriteMovie = useInfiniteQuery({
    queryKey: ['favorite-movie'],
    queryFn: fetchFavoriteMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  return { queryFavoriteMovie };
}
