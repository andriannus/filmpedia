'use client';

import { useDiscover } from '@/app/movie/contexts/discover';
import AppCheckboxGroup from '@/app/shared/components/app-checkbox-group';
import AppSelect from '@/app/shared/components/app-select';
import { SORT_OPTIONS } from '@/app/shared/constants/discover';
import { useGenreMovie } from '@/app/shared/hooks/use-genre-movie';

import './styles.scss';

function Filter() {
  const { genres, setGenres, setSortBy, sortBy } = useDiscover();
  const { genreOptions } = useGenreMovie();

  return (
    <div className="filter">
      <div>
        <div className="filter__title filter__title-sort">Sort Result By</div>

        <div className="p-5">
          <AppSelect
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={(value) => {
              setSortBy(value);
            }}
          />
        </div>
      </div>

      {genreOptions.length > 0 && (
        <>
          <div className="filter__title filter__title-genre">Genres</div>

          <div className="filter__checkbox">
            <AppCheckboxGroup
              value={genres}
              options={genreOptions}
              onChange={(value) => {
                setGenres(value);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Filter;
