'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';

import { useDiscover } from '@/app/movie/contexts/discover';
import AppLoader from '@/app/shared/components/app-loader';

import './styles.scss';

const AppMovie = dynamic(() => import('@/app/shared/components/app-movie'), {
  ssr: false,
});
const AppButton = dynamic(() => import('@/app/shared/components/app-button'), {
  ssr: false,
});

function Discover() {
  const { queryDiscover, setGenres } = useDiscover();

  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  useEffect(() => {
    if (!!genre) {
      setGenres([genre]);
    }
  }, [genre, setGenres]);

  if (queryDiscover.isFetching && !queryDiscover.isFetchingNextPage) {
    return <AppLoader />;
  }

  if (queryDiscover.isError) return null;

  return (
    <>
      {queryDiscover.data?.pages[0].results.length === 0 ? (
        <span className="discover__empty">Data not found.</span>
      ) : (
        <>
          <div className="discover">
            {queryDiscover.data?.pages.map((group, index) => {
              return (
                <Fragment key={index}>
                  {group.results.map((movie) => {
                    return <AppMovie key={movie.id} movie={movie} />;
                  })}
                </Fragment>
              );
            })}
          </div>

          <div className="discover__action">
            {queryDiscover.isFetchingNextPage && <AppLoader />}

            {!queryDiscover.isFetchingNextPage && queryDiscover.hasNextPage && (
              <AppButton
                onClick={() => {
                  queryDiscover.fetchNextPage?.();
                }}
              >
                Load More
              </AppButton>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Discover;
