const DEFAULT_SOCKET_PATH = "/ms-api/api/ws";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function buildWebSocketUrl() {
  const explicitWsUrl = process.env.NEXT_PUBLIC_WS_URL;

  if (explicitWsUrl) {
    return explicitWsUrl;
  }

  if (typeof window === "undefined") {
    return DEFAULT_SOCKET_PATH;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/ms-api";
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://")) {
    const url = new URL(trimTrailingSlash(baseUrl));
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = `${trimTrailingSlash(url.pathname)}/api/ws`;
    return url.toString();
  }

  return `${protocol}//${window.location.host}${trimTrailingSlash(baseUrl)}/api/ws`;
}
