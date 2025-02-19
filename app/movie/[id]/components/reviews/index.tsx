'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { fetchMovieReviews } from '@/app/shared/apis/movie';
import { TMDB_IMAGE_BASE_URL } from '@/app/shared/constants/movie';
import { transformToReviewDate } from '@/app/shared/utils/date';

import './styles.scss';

type MovieReviewsProps = {
  id: number;
};

function MovieReviews({ id }: MovieReviewsProps) {
  const queryReview = useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
  });

  const reviews = useMemo(() => {
    if (queryReview.isError || !queryReview.data) return [];

    const tempReviews = queryReview.data.results;

    if (queryReview.data.results.length <= 2) {
      return tempReviews;
    }

    return tempReviews.sort(() => 0.5 - Math.random()).slice(-2);
  }, [queryReview.data, queryReview.isError]);

  const [shouldFullContents, setShouldFullContents] = useState<boolean[]>([]);

  useEffect(() => {
    setShouldFullContents(new Array(reviews.length).fill(false));
  }, [reviews]);

  const readMoreContent = (index: number) => {
    const tempShouldFullContents = [...shouldFullContents];
    tempShouldFullContents[index] = !tempShouldFullContents[index];

    setShouldFullContents(tempShouldFullContents);
  };

  const transformContent = (index: number, content: string) => {
    if (shouldFullContents[index]) {
      return content;
    }

    return `${content.substring(0, 300)}...`;
  };

  if (queryReview.isError || !queryReview.data) return null;

  return (
    <div className="review">
      <div className="review__layout">
        <span className="block font-semibold mb-6 text-sm text-red-500">
          REVIEWS
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => {
            return (
              <div key={review.id} className="review__card">
                <div className="flex mb-6">
                  <div className="w-12 h-12 bg-gray-300 mr-4 overflow-hidden rounded-full">
                    <Image
                      src={`${TMDB_IMAGE_BASE_URL}/original${review.author_details.avatar_path}`}
                      alt={review.author_details.name}
                      width={48}
                      height={48}
                    />
                  </div>

                  <div className="flex flex-col grow justify-center">
                    <span className="font-bold">
                      {review.author_details.username}
                    </span>

                    <span className="text-xs">
                      {transformToReviewDate(review.created_at)}
                    </span>
                  </div>

                  {review.author_details.rating && (
                    <div className="review__rating">
                      <Image
                        src="/icons/star.svg"
                        alt="Icon"
                        height={16}
                        width={16}
                      />

                      <span className="font-semibold text-4xl ml-1.5">
                        {review.author_details.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <span className='text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: transformContent(index, review.content),
                    }}
                  />

                  <button
                    className="text-red-500 italic underline cursor-pointer"
                    onClick={() => {
                      readMoreContent(index);
                    }}
                  >
                    {shouldFullContents[index]
                      ? 'read the less.'
                      : 'read the more.'}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieReviews;
