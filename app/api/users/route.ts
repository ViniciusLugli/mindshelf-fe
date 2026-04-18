import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return proxyBackendRequest(request, "/api/users");
}
