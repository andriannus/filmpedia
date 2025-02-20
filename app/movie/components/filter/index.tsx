'use client';

import { useState } from 'react';

import AppCheckboxGroup from '@/app/shared/components/app-checkbox-group';
import AppSelect from '@/app/shared/components/app-select';
import { SORT_OPTIONS } from '@/app/shared/constants/discover';
import { useGenreMovie } from '@/app/shared/hooks/use-genre-movie';

import './styles.scss';

function Filter() {
  const { genreOptions } = useGenreMovie();

  const [genres, setGenres] = useState<string[]>([]);

  return (
    <div className="filter">
      <div>
        <div className="filter__title filter__title-sort">Sort Result By</div>

        <div className="p-5">
          <AppSelect
            options={SORT_OPTIONS}
            onChange={() => {}}
          />
        </div>
      </div>

      {genreOptions.length > 0 && (
        <>
          <div className="filter__title filter__title-genre">Genres</div>

          <div className="mt-4 pl-5 pr-5 pb-5">
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
