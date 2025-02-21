import type { MovieForList } from './movie';
import type { PaginationWithResults } from './pagination';

export type AccountFavoriteMoviesResponse = PaginationWithResults<MovieForList>;
