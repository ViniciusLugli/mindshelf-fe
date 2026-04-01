export type ApiError = Record<string, string>;
export type SimpleMessageResponse = Record<string, string>;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type PaginatedResponse<T> = PaginationMeta & {
  data: T[];
};

export type RequiredPaginationQuery = {
  page: number;
  limit: number;
};

export type OptionalPaginationQuery = {
  page?: number;
  limit?: number;
};
