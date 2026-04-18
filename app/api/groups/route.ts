import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { NextRequest } from "next/server";

function handleRequest(request: NextRequest) {
  return proxyBackendRequest(request, "/api/groups");
}

export { handleRequest as GET, handleRequest as POST };
