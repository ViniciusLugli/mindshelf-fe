import { buildBackendUrl } from "@/lib/api/config";
import { NextRequest, NextResponse } from "next/server";

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "authorization",
  "content-type",
  "cookie",
  "user-agent",
  "x-requested-with",
] as const;

const BLOCKED_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "content-length",
  "connection",
  "keep-alive",
  "transfer-encoding",
]);

function buildForwardHeaders(request: NextRequest) {
  const headers = new Headers();

  FORWARDED_REQUEST_HEADERS.forEach((headerName) => {
    const value = request.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  });

  return headers;
}

function buildBackendPath(basePath: string, segments: string[] = []) {
  if (!segments.length) {
    return basePath;
  }

  const normalizedBasePath = basePath.replace(/\/+$/, "");
  return `${normalizedBasePath}/${segments.join("/")}`;
}

async function buildRequestBody(request: NextRequest) {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  return request.arrayBuffer();
}

function buildResponseHeaders(response: Response) {
  const headers = new Headers();

  response.headers.forEach((value, key) => {
    if (!BLOCKED_RESPONSE_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  return headers;
}

export async function proxyBackendRequest(
  request: NextRequest,
  basePath: string,
  segments: string[] = [],
) {
  const targetUrl = new URL(buildBackendUrl(buildBackendPath(basePath, segments)));
  targetUrl.search = request.nextUrl.search;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: buildForwardHeaders(request),
      body: await buildRequestBody(request),
      cache: "no-store",
    });

    const headers = buildResponseHeaders(response);
    const body = response.status === 204 ? null : await response.arrayBuffer();

    return new NextResponse(body, {
      status: response.status,
      headers,
    });
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel conectar ao backend." },
      { status: 502 },
    );
  }
}
