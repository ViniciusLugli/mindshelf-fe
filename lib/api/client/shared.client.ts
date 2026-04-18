import { normalizeRouteParam } from "@/lib/utils/route-params";
import type {
  OptionalPaginationQuery,
  RequiredPaginationQuery,
} from "../types";

export const toPathSegment = (value: string) => encodeURIComponent(normalizeRouteParam(value));

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
