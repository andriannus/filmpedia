'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { fetchMovie } from '@/app/shared/apis/movie';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';

import './styles.scss';

type DetailMovieProps = {
  id: number;
};

function DetailMovie({ id }: DetailMovieProps) {
  const queryMovie = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
  });

  const genres = (() => {
    if (!queryMovie.data) return '';
    return queryMovie.data.genres.map((genre) => genre.name).join(', ');
  })();

  if (queryMovie.isError || !queryMovie.data) return null;

  return (
    <>
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${TMDB_IMAGE_BASE_URL}/original${queryMovie.data.backdrop_path})`,
        }}
      />

      <div className="detail">
        <div className="detail__layout">
          <div className="detail__poster">
            <Image
              src={`${TMDB_IMAGE_BASE_URL}/w300${queryMovie.data.poster_path}`}
              alt={queryMovie.data.title}
              width={300}
              height={450}
              priority
            />
          </div>

          <div className="detail__content">
            <div className="detail__info">
              <span className="detail_subtitle">
                {new Date(queryMovie.data.release_date).getFullYear()}
              </span>

              <h1 className="detail__title">{queryMovie.data.title}</h1>
              <span className="detail__genre">{genres}</span>
            </div>

            <div>
              <span className="overview__title">OVERVIEW</span>
              <p className="overview__content">{queryMovie.data.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailMovie;
