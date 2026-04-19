import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from "axios";
import type { ApiError } from "./types";

export const AUTH_TOKEN_COOKIE_KEY = "mindshelf_token";

type CookieOptions = {
  days?: number;
  path?: string;
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
  persistent?: boolean;
};

type ApiRequestConfig<TBody = unknown> = Omit<
  AxiosRequestConfig<TBody>,
  "url"
> & {
  url: string;
};

function isBrowser() {
  return typeof document !== "undefined";
}

function isAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function normalizeApiPath(value: string) {
  if (isAbsoluteUrl(value)) {
    return value;
  }

  return value.startsWith("/") ? value : `/${value}`;
}

function createRequestHeaders(headers?: AxiosRequestConfig["headers"]) {
  const normalizedHeaders =
    headers instanceof AxiosHeaders
      ? headers
      : AxiosHeaders.from((headers ?? {}) as Record<string, string>);
  const token = getAuthTokenFromCookie();

  if (token && !normalizedHeaders.has("Authorization")) {
    normalizedHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (!normalizedHeaders.has("Content-Type")) {
    normalizedHeaders.set("Content-Type", "application/json");
  }

  return normalizedHeaders;
}

function isHtmlResponse(
  payload: unknown,
  headers?: AxiosResponseHeaders | Record<string, unknown>,
) {
  const contentType = headers?.["content-type"];
  return (
    typeof payload === "string" &&
    typeof contentType === "string" &&
    contentType.includes("text/html")
  );
}

function formatApiError(error: unknown): never {
  if (axios.isAxiosError<ApiError>(error)) {
    const status = error.response?.status;
    const payload = error.response?.data;

    if (
      status &&
      isHtmlResponse(
        payload,
        error.response?.headers as
          | AxiosResponseHeaders
          | Record<string, unknown>
          | undefined,
      )
    ) {
      throw new Error(
        `API ${status}: o frontend recebeu HTML em vez de JSON. Verifique se a rota /api do Next esta proxyando corretamente para o backend.`,
      );
    }

    if (status && payload) {
      throw new Error(`API ${status}: ${JSON.stringify(payload)}`);
    }

    if (status) {
      throw new Error(`API ${status}: ${error.message}`);
    }

    throw new Error(`API error: ${error.message}`);
  }

  throw error;
}

async function requestApi<TResponse, TBody = unknown>({
  headers,
  withCredentials = true,
  ...config
}: ApiRequestConfig<TBody>): Promise<TResponse> {
  const resolvedUrl = normalizeApiPath(config.url);

  try {
    const response = await axios.request<
      TResponse,
      AxiosResponse<TResponse>,
      TBody
    >({
      ...config,
      url: resolvedUrl,
      withCredentials,
      headers: createRequestHeaders(headers),
    });

    return response.data;
  } catch (error) {
    formatApiError(error);
  }
}

export function getAuthTokenFromCookie(): string | null {
  if (!isBrowser()) {
    return null;
  }

  const allCookies = document.cookie ? document.cookie.split("; ") : [];
  const tokenCookie = allCookies.find((entry) =>
    entry.startsWith(`${AUTH_TOKEN_COOKIE_KEY}=`),
  );

  if (!tokenCookie) {
    return null;
  }

  const token = tokenCookie.slice(AUTH_TOKEN_COOKIE_KEY.length + 1);
  return token ? decodeURIComponent(token) : null;
}

export function setAuthTokenCookie(token: string, options?: CookieOptions) {
  if (!isBrowser()) {
    return;
  }

  const persistent = options?.persistent ?? true;
  const days = options?.days ?? 7;
  const path = options?.path ?? "/";
  const sameSite = options?.sameSite ?? "Lax";
  const secure =
    options?.secure ??
    (typeof window !== "undefined" && window.location.protocol === "https:");
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  const expiresPart = persistent ? `; Expires=${expires}` : "";
  const securePart = secure ? "; Secure" : "";

  document.cookie = `${AUTH_TOKEN_COOKIE_KEY}=${encodeURIComponent(token)}${expiresPart}; Path=${path}; SameSite=${sameSite}${securePart}`;
}

export function clearAuthTokenCookie(path = "/") {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_TOKEN_COOKIE_KEY}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}; SameSite=Lax`;
}

export function httpGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return requestApi<T>({
    ...(config ?? {}),
    method: "GET",
    url,
  });
}

export function httpPost<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> {
  return requestApi<TResponse, TBody>({
    ...(config ?? {}),
    method: "POST",
    url,
    data: body,
  });
}

export function httpPatch<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> {
  return requestApi<TResponse, TBody>({
    ...(config ?? {}),
    method: "PATCH",
    url,
    data: body,
  });
}

export function httpDelete<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> {
  return requestApi<TResponse, TBody>({
    ...(config ?? {}),
    method: "DELETE",
    url,
    data: body,
  });
}
