import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import type { AccountFavoriteMoviesResponse } from '@/app/shared/types/account';
import type { ResponsePostSuccess } from '@/app/shared/types/api';

const accountID = process.env.NEXT_PUBLIC_TMDB_ACCOUNT_ID;

export async function fetchFavoriteMovies(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<AccountFavoriteMoviesResponse>(
    `/account/${accountID}/favorite/movies`,
    config,
  );

  return data;
}

export async function addMovieToFavorite(movieID: number) {
  const { data } = await apiTMDBService.post<ResponsePostSuccess>(
    `/account/${accountID}/favorite`,
    {
      media_type: 'movie',
      media_id: movieID,
      favorite: true,
    },
  );

  return data;
}
