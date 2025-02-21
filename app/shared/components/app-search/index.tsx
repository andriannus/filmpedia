'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { searchMovie } from '@/app/shared/apis/search';
import useDebounce from '@/app/shared/hooks/use-debounce';

import './styles.scss';

function AppSearch() {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const querySearch = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => searchMovie(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  const movies = useMemo(() => {
    if (querySearch.isError || !querySearch.data) return [];

    const tempRecommendations = querySearch.data.results;

    if (querySearch.data.results.length <= 5) {
      return tempRecommendations;
    }

    return tempRecommendations.sort(() => 0.5 - Math.random()).slice(-10);
  }, [querySearch.data, querySearch.isError]);

  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 100);
  };

  return (
    <>
      <div className="search">
        <Image src="/icons/movie.svg" alt="Icon" height={20} width={20} />

        <input
          className="search__input"
          placeholder="Find movie"
          type="text"
          onBlur={handleBlur}
          onFocus={() => {
            setFocused(true);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <Image src="/icons/search.svg" alt="Icon" height={20} width={20} />

        {focused && querySearch.isSuccess && (
          <ul className="search__results">
            {movies.length < 1 ? (
              <span className="search__results-empty">Data not found</span>
            ) : (
              movies.map((movie) => (
                <li key={movie.id} className="search__results-item">
                  <Link className="search__link" href={`/movie/${movie.id}`}>
                    <Highlighter
                      highlightClassName="search--active"
                      searchWords={[search]}
                      textToHighlight={movie.title}
                    />
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="search__suffix">
        <Link className="search__button" href="/search">
          <Image src="/icons/search.svg" alt="Icon" height={16} width={16} />
        </Link>
      </div>
    </>
  );
}

export default AppSearch;
