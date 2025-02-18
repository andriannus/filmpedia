import { useQuery } from '@tanstack/react-query';

import { fetchMovieGenres } from '@/app/shared/apis/genre';
import { printString } from '@/app/shared/utils/string';

export function useGenreMovie() {
  const queryGenreMovie = useQuery({
    queryKey: ['genre-movie'],
    queryFn: fetchMovieGenres,
    staleTime: Infinity,
  });

  const getMovieGenre = (id: number) => {
    const genre = queryGenreMovie.data?.genres.find((genre) => genre.id === id);
    return printString(genre?.name);
  };

  return { getMovieGenre, queryGenreMovie };
}
