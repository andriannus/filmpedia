import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import type { SearchMovieResponse } from '@/app/shared/types/search';

export async function searchMovie(query: string) {
  const { data } = await apiTMDBService.get<SearchMovieResponse>(
    '/search/movie',
    {
      params: { query },
    },
  );

  return data;
}
