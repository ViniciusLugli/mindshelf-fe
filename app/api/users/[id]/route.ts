import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { normalizeRouteParam } from "@/lib/utils/route-params";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ id: string | string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyBackendRequest(request, "/api/users", [normalizeRouteParam(id)]);
}
