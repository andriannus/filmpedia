import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import { GenreMovieResponse } from '@/app/shared/types/genre';

export async function fetchMovieGenres(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<GenreMovieResponse>(
    '/genre/movie/list',
    config,
  );

  return data;
}
