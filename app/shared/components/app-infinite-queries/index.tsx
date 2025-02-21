'use client';

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import cc from 'classcat';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import AppLoader from '@/app/shared/components/app-loader';
import SuspenseFallback from '@/app/shared/components/app-suspense-fallback';
import type { MovieForList } from '@/app/shared/types/movie';
import type { PaginationWithResults } from '@/app/shared/types/pagination';

const AppMovie = dynamic(() => import('@/app/shared/components/app-movie'), {
  ssr: false,
});
const AppButton = dynamic(() => import('@/app/shared/components/app-button'), {
  ssr: false,
});

import './styles.scss';

type AppInfiniteQueriesProps = {
  grid: 4 | 5;
  queryInfinite: Partial<
    UseInfiniteQueryResult<
      InfiniteData<PaginationWithResults<MovieForList>, unknown>,
      Error
    >
  >;
};

function AppInfiniteQueries({
  grid = 4,
  queryInfinite,
}: AppInfiniteQueriesProps) {
  if (queryInfinite.isFetching && !queryInfinite.isFetchingNextPage) {
    return <AppLoader />;
  }

  if (queryInfinite.isError) return null;

  return (
    <>
      {queryInfinite.data?.pages[0].results.length === 0 ? (
        <span className="infinite__empty">Data not found.</span>
      ) : (
        <>
          <div className={cc(['infinite__content', `infinite--grid-${grid}`])}>
            {queryInfinite.data?.pages.map((group, index) => {
              return (
                <Fragment key={index}>
                  <SuspenseFallback>
                    {group.results.map((movie) => {
                      return <AppMovie key={movie.id} movie={movie} />;
                    })}
                  </SuspenseFallback>
                </Fragment>
              );
            })}
          </div>

          {queryInfinite.isFetchingNextPage && (
            <div className="infinite__footer">
              <AppLoader />
            </div>
          )}

          {!queryInfinite.isFetchingNextPage && queryInfinite.hasNextPage && (
            <div className="infinite__footer">
              <AppButton
                onClick={() => {
                  queryInfinite.fetchNextPage?.();
                }}
              >
                Load More
              </AppButton>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AppInfiniteQueries;
