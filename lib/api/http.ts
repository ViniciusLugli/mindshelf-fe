import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import type { ApiError } from "./types";

export const AUTH_TOKEN_COOKIE_KEY = "mindshelf_token";
const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type CookieOptions = {
  days?: number;
  path?: string;
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
  persistent?: boolean;
};

function isBrowser() {
  return typeof document !== "undefined";
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

export const http = axios.create({
  baseURL: DEFAULT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = getAuthTokenFromCookie();

  if (token) {
    const headers = AxiosHeaders.from(config.headers);

    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    config.headers = headers;
  }

  return config;
});

function throwFormattedApiError(error: unknown): never {
  if (axios.isAxiosError<ApiError>(error)) {
    const status = error.response?.status;
    const payload = error.response?.data;

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

export async function httpGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await http.get<T>(url, config);
    return response.data;
  } catch (error) {
    throwFormattedApiError(error);
  }
}

export async function httpPost<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await http.post<TResponse>(url, body, config);
    return response.data;
  } catch (error) {
    throwFormattedApiError(error);
  }
}

export async function httpPatch<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await http.patch<TResponse>(url, body, config);
    return response.data;
  } catch (error) {
    throwFormattedApiError(error);
  }
}

export async function httpDelete<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await http.delete<TResponse>(url, {
      ...config,
      data: body,
    });

    return response.data;
  } catch (error) {
    throwFormattedApiError(error);
  }
}
