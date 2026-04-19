import { proxyBackendRequest } from "@/lib/server/backend-proxy";
import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
  return proxyBackendRequest(request, "/api/shared-tasks/import");
}
