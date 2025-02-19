'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { fetchMovieReviews } from '@/app/shared/apis/movie';
import AppLoader from '@/app/shared/components/app-loader';
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

  if (queryReview.isError || !reviews.length) return null;
  if (queryReview.isFetching) return <AppLoader />;

  return (
    <div className="review">
      <div className="review__layout">
        <span className="review__title">REVIEWS</span>

        <div className="review__grid">
          {reviews.map((review, index) => {
            return (
              <div key={review.id} className="review__card">
                <div className="review__header">
                  <div className="review__avatar">
                    {review.author_details.avatar_path && (
                      <Image
                        src={`${TMDB_IMAGE_BASE_URL}/original${review.author_details.avatar_path}`}
                        alt={review.author_details.name}
                        width={48}
                        height={48}
                      />
                    )}
                  </div>

                  <div className="review__info">
                    <span className="review__info-title">
                      {review.author_details.username}
                    </span>

                    <span className="review__info-subtitle">
                      {transformToReviewDate(review.created_at)}
                    </span>
                  </div>

                  {review.author_details.rating && (
                    <div className="review__rating">
                      <Image
                        src="/icons/star.svg"
                        alt="Icon"
                        className="review__rating-icon"
                        height={16}
                        width={16}
                      />

                      <span className="review__rating-number">
                        {review.author_details.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <span className="review__content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: transformContent(index, review.content),
                    }}
                  />

                  <button
                    className="review__button"
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
