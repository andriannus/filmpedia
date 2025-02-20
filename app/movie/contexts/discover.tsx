'use client';

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { fetchDiscoverMovie } from '@/app/shared/apis/discover';
import { DiscoverResponse } from '@/app/shared/types/discover';

type DiscoverContextProps = {
  genres: string[];
  queryDiscover: Partial<
    UseInfiniteQueryResult<InfiniteData<DiscoverResponse, unknown>, Error>
  >;
  setGenres: Dispatch<SetStateAction<string[]>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortBy: string;
};

const DiscoverContext = createContext<DiscoverContextProps>({
  genres: [],
  queryDiscover: {},
  setGenres: () => null,
  setSortBy: () => null,
  sortBy: '',
});

export const useDiscover = () => useContext(DiscoverContext);

export function DiscoverProvider({ children }: PropsWithChildren) {
  const [genres, setGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');

  const queryDiscover = useInfiniteQuery({
    queryKey: ['discover-movie', genres, sortBy],
    queryFn: ({ pageParam }) => {
      return fetchDiscoverMovie({
        params: {
          with_genres: genres.join(','),
          page: pageParam,
          sort_by: sortBy,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const value = useMemo(() => {
    return {
      genres,
      queryDiscover,
      setGenres,
      setSortBy,
      sortBy,
    };
  }, [genres, queryDiscover, sortBy]);

  return (
    <DiscoverContext.Provider value={value}>
      {children}
    </DiscoverContext.Provider>
  );
}
