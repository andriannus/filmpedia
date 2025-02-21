'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AppInfiniteQueries from '@/app/shared/components/app-infinite-queries';
import { useDiscover } from '@/app/movie/contexts/discover';

function Content() {
  const { queryDiscover, setGenres } = useDiscover();

  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  useEffect(() => {
    if (!!genre) {
      setGenres([genre]);
    }
  }, [genre, setGenres]);

  return <AppInfiniteQueries grid={4} queryInfinite={queryDiscover} />;
}

export default Content;
