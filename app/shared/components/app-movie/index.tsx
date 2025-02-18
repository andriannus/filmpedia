'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AppButton from '@/app/shared/components/app-button';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';
import type { MovieForList } from '@/app/shared/types/movie';
import { toFixedIfNecessary } from '@/app/shared/utils/string';
import { useGenreMovie } from '@/app/shared/hooks/use-genre-movie';

import './styles.scss';

type AppMovieProps = {
  movie: MovieForList;
};

function AppMovie({ movie }: AppMovieProps) {
  const router = useRouter();
  const { getMovieGenre } = useGenreMovie();

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
          <div className="flex font-semibold items-center text-2xl">
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

            <AppButton outline>
              <span className="movie__button-text">Add</span>
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
