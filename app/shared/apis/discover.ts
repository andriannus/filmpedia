import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import type { DiscoverResponse } from '@/app/shared/types/discover';

export async function fetchDiscoverMovie(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<DiscoverResponse>(
    '/discover/movie',
    config,
  );

  return data;
}
