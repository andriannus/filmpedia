import { useQuery } from '@tanstack/react-query';

import { fetchMovieGenres } from '@/app/shared/apis/genre';
import { Option } from '@/app/shared/types/utility';
import { printString } from '@/app/shared/utils/string';

export function useGenreMovie() {
  const queryGenreMovie = useQuery({
    queryKey: ['genre-movie'],
    queryFn: fetchMovieGenres,
    staleTime: Infinity,
  });

  const genreOptions = (() => {
    if (!queryGenreMovie.data) return [];

    return queryGenreMovie.data.genres.slice(0, 10).map<Option>((genre) => ({
      label: genre.name,
      value: genre.id.toString(),
    }));
  })();

  const getMovieGenre = (id: number) => {
    const genre = queryGenreMovie.data?.genres.find((genre) => genre.id === id);
    return printString(genre?.name);
  };

  return { genreOptions, getMovieGenre, queryGenreMovie };
}
