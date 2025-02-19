'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { fetchDiscoverMovie } from '@/app/shared/apis/discover';
import AppLoader from '@/app/shared/components/app-loader';

import './styles.scss';

const AppMovie = dynamic(() => import('@/app/shared/components/app-movie'), {
  ssr: false,
});
const AppButton = dynamic(() => import('@/app/shared/components/app-button'), {
  ssr: false,
});

function DiscoverMovie() {
  const queryDiscover = useInfiniteQuery({
    queryKey: ['discover-movie'],
    queryFn: ({ pageParam }) => {
      return fetchDiscoverMovie({
        params: {
          page: pageParam,
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

  if (queryDiscover.isError) return null;

  if (queryDiscover.isFetching && !queryDiscover.isFetchingNextPage) {
    return <AppLoader />;
  }

  return (
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
              queryDiscover.fetchNextPage();
            }}
          >
            Load More
          </AppButton>
        )}
      </div>
    </>
  );
}

export default DiscoverMovie;
