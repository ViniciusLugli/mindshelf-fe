import type {
  OptionalPaginationQuery,
  RequiredPaginationQuery,
} from "../types";

export const toPathSegment = (value: string) => encodeURIComponent(value);

export const withRequiredPagination = ({
  page,
  limit,
}: RequiredPaginationQuery) => ({
  params: { page, limit },
});

export const withOptionalPagination = ({
  page,
  limit,
}: OptionalPaginationQuery) => ({
  params: { page, limit },
});
