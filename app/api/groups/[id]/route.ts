import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { normalizeRouteParam } from "@/lib/utils/route-params";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ id: string | string[] }>;
};

async function handleRequest(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyBackendRequest(request, "/api/groups", [normalizeRouteParam(id)]);
}

export { handleRequest as GET, handleRequest as PATCH, handleRequest as DELETE };
