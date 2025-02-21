import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import { AccountFavoriteMoviesResponse } from '@/app/shared/types/account';

const accountID = process.env.NEXT_PUBLIC_TMDB_ACCOUNT_ID;

export async function fetchFavoriteMovies(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<AccountFavoriteMoviesResponse>(
    `/account/${accountID}/favorite/movies`,
    config,
  );

  return data;
}
