'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { addMovieToFavorite } from '@/app/shared/apis/account';
import AppButton from '@/app/shared/components/app-button';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';
import type { MovieForList } from '@/app/shared/types/movie';
import { toFixedIfNecessary } from '@/app/shared/utils/string';
import { useGenreMovie } from '@/app/shared/hooks/use-genre-movie';
import { useToast } from '@/app/shared/hooks/use-toast';

import './styles.scss';

type AppMovieProps = {
  movie: MovieForList;
};

function AppMovie({ movie }: AppMovieProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { getMovieGenre } = useGenreMovie();
  const { toast } = useToast();

  const [added, setAdded] = useState(false);

  const favoriteMovie = async (id: number) => {
    try {
      await addMovieToFavorite(id);

      setAdded(true);
      queryClient.invalidateQueries({ queryKey: ['favorite-movie'] });

      toast.fire({
        icon: 'success',
        title: 'Added to favorites',
      });
    } catch {
      toast.fire({
        icon: 'error',
        title: 'Failed to add to favorites',
      });
    }
  };

  return (
    <div className="movie">
      <div className="movie__poster group/movie">
        {!!movie.poster_path && (
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/w300${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            priority
          />
        )}

        <span className="movie__rating">
          {toFixedIfNecessary(movie.vote_average)}
        </span>

        <div className="movie__hover group-hover/movie:visible">
          <div className="movie__hover-rating">
            <Image src="/icons/star.svg" alt="Icon" height={32} width={32} />

            <span className="ml-2">
              {toFixedIfNecessary(movie.vote_average)}
            </span>
          </div>

          <span className="text-lg font-semibold">
            {getMovieGenre(movie.genre_ids[0])}
          </span>

          <div className="grid gap-4">
            <AppButton
              onClick={() => {
                router.push(`/movie/${movie.id}`);
              }}
            >
              <span className="movie__button-text">View</span>
            </AppButton>

            <AppButton active={added} outline>
              <span
                className="movie__button-text"
                onClick={() => {
                  favoriteMovie(movie.id);
                }}
              >
                {added ? 'Added' : 'Add'}
              </span>
            </AppButton>
          </div>
        </div>
      </div>

      <span className="movie__title">{movie.title}</span>

      <span className="movie__subtitle">
        {new Date(movie.release_date).getFullYear()}
      </span>
    </div>
  );
}

export default AppMovie;
