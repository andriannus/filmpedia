'use client';

import Image from 'next/image';

import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';
import type { MovieForList } from '@/app/shared/types/movie';
import { toFixedIfNecessary } from '@/app/shared/utils/string';

import './styles.scss';

type AppMovieProps = {
  movie: MovieForList;
};

function AppMovie({ movie }: AppMovieProps) {
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

          <span className="text-lg font-semibold">Genre</span>

          <div className="grid gap-4">
            <button>
              <span className="font-bold uppercase">View</span>
            </button>

            <button>
              <span className="font-bold uppercase">Add</span>
            </button>
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
