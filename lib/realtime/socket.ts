import { buildWebSocketUrl as buildConfiguredWebSocketUrl } from "@/lib/api/config";

export function buildWebSocketUrl() {
  return buildConfiguredWebSocketUrl();
}
