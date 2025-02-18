import { apiTMDBService } from '@/app/shared/services/tmdb-service';
import type { MovieDetail } from '@/app/shared/types/movie';

export async function fetchMovie(id: number) {
  const { data } = await apiTMDBService.get<MovieDetail>(`/movie/${id}`);

  return data;
}
