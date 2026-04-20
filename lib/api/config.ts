const DEFAULT_API_PORT = process.env.NEXT_PUBLIC_API_PORT ?? "8080";
const DEFAULT_WS_PATH = process.env.NEXT_PUBLIC_WS_PATH ?? "/api/ws";
const DEFAULT_API_SUBDOMAIN =
  process.env.API_SUBDOMAIN?.trim() ??
  process.env.NEXT_PUBLIC_API_SUBDOMAIN?.trim() ??
  "api";

type BackendOriginOptions = {
  requestHost?: string;
  requestProtocol?: string;
};

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

function splitHostAndPort(value: string) {
  const sanitized = value.replace(/^[a-z]+:\/\//i, "").split("/")[0].trim();

  if (!sanitized) {
    return { hostname: "", port: "" };
  }

  const match = sanitized.match(/^(.*?)(?::(\d+))?$/);

  return {
    hostname: match?.[1] ?? sanitized,
    port: match?.[2] ?? "",
  };
}

function normalizeProtocol(value: string | undefined, fallback: "http" | "https") {
  const normalized = value?.trim().toLowerCase().replace(/:$/, "");

  if (normalized === "http" || normalized === "https") {
    return normalized;
  }

  return fallback;
}

function isLoopbackHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function getExplicitBackendOrigin() {
  const configuredOrigin =
    process.env.API_ORIGIN?.trim() ??
    process.env.NEXT_PUBLIC_API_ORIGIN?.trim() ??
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredOrigin && isAbsoluteUrl(configuredOrigin)) {
    return trimTrailingSlash(configuredOrigin);
  }

  return "";
}

function deriveBackendHost(appHost: string) {
  const { hostname } = splitHostAndPort(appHost);

  if (!hostname) {
    return "";
  }

  if (isLoopbackHost(hostname)) {
    return `${hostname}:${DEFAULT_API_PORT}`;
  }

  if (hostname.startsWith(`${DEFAULT_API_SUBDOMAIN}.`)) {
    return hostname;
  }

  const baseHost = hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  return `${DEFAULT_API_SUBDOMAIN}.${baseHost}`;
}

function deriveBackendOrigin(appHost: string, protocol: "http" | "https") {
  const backendHost = deriveBackendHost(appHost);

  if (!backendHost) {
    return "";
  }

  return `${protocol}://${backendHost}`;
}

export function getBackendOrigin(options: BackendOriginOptions = {}) {
  const explicitOrigin = getExplicitBackendOrigin();

  if (explicitOrigin) {
    return explicitOrigin;
  }

  if (options.requestHost) {
    const derivedOrigin = deriveBackendOrigin(
      options.requestHost,
      normalizeProtocol(options.requestProtocol, "https"),
    );

    if (derivedOrigin) {
      return derivedOrigin;
    }
  }

  return `http://localhost:${DEFAULT_API_PORT}`;
}

export function buildBackendUrl(
  path: string,
  options: BackendOriginOptions = {},
) {
  return `${getBackendOrigin(options)}${normalizePath(path)}`;
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

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol === "https:" ? "https" : "http";
    const backendOrigin = deriveBackendOrigin(window.location.host, protocol);

    if (backendOrigin) {
      const url = new URL(trimTrailingSlash(backendOrigin));
      url.protocol = protocol === "https" ? "wss:" : "ws:";
      url.pathname = normalizePath(DEFAULT_WS_PATH);
      return url.toString();
    }
  }

  return `ws://localhost:${DEFAULT_API_PORT}${normalizePath(DEFAULT_WS_PATH)}`;
}
