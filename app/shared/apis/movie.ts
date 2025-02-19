import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import type {
  MovieDetail,
  MovieReviewResponse,
} from '@/app/shared/types/movie';

export async function fetchMovie(id: number) {
  const { data } = await apiTMDBService.get<MovieDetail>(`/movie/${id}`);

  return data;
}

export async function fetchMovieReviews(id: number) {
  const { data } = await apiTMDBService.get<MovieReviewResponse>(
    `/movie/${id}/reviews`,
  );

  return data;
}
