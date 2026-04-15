import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

async function handleRequest(request: NextRequest, context: RouteContext) {
  const { path = [] } = await context.params;
  return proxyBackendRequest(request, "/api/task/", path);
}

export { handleRequest as GET, handleRequest as POST, handleRequest as PATCH, handleRequest as DELETE };
