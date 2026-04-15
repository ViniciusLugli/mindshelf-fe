const DEFAULT_API_PORT = process.env.NEXT_PUBLIC_API_PORT ?? "8080";
const DEFAULT_WS_PATH = process.env.NEXT_PUBLIC_WS_PATH ?? "/api/ws";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizePath(value: string) {
  if (!value.startsWith("/")) {
    return `/${value}`;
  }

  return value;
}

function isAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function getBackendOrigin() {
  const configuredOrigin =
    process.env.API_ORIGIN?.trim() ??
    process.env.NEXT_PUBLIC_API_ORIGIN?.trim() ??
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredOrigin && isAbsoluteUrl(configuredOrigin)) {
    return trimTrailingSlash(configuredOrigin);
  }

  return `http://localhost:${DEFAULT_API_PORT}`;
}

export function buildBackendUrl(path: string) {
  return `${getBackendOrigin()}${normalizePath(path)}`;
}

export function buildWebSocketUrl() {
  const explicitWsUrl = process.env.NEXT_PUBLIC_WS_URL?.trim();

  if (explicitWsUrl) {
    return explicitWsUrl;
  }

  const configuredOrigin =
    process.env.NEXT_PUBLIC_API_ORIGIN?.trim() ??
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredOrigin && isAbsoluteUrl(configuredOrigin)) {
    const url = new URL(trimTrailingSlash(configuredOrigin));
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = normalizePath(DEFAULT_WS_PATH);
    return url.toString();
  }

  if (typeof window === "undefined") {
    return `ws://localhost:${DEFAULT_API_PORT}${normalizePath(DEFAULT_WS_PATH)}`;
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.hostname}:${DEFAULT_API_PORT}${normalizePath(DEFAULT_WS_PATH)}`;
}
