const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function safelyDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeRouteParam(value?: string | string[]): string {
  if (Array.isArray(value)) {
    return normalizeRouteParam(value[0]);
  }

  if (!value) {
    return "";
  }

  const trimmedValue = value.trim();
  const decodedValue = safelyDecodeURIComponent(trimmedValue).trim();
  const normalizedValue = decodedValue || trimmedValue;

  if (!normalizedValue) {
    return "";
  }

  if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) {
    try {
      const parsedValue = JSON.parse(normalizedValue) as unknown;

      if (Array.isArray(parsedValue)) {
        const firstValue = parsedValue.find(
          (entry): entry is string => typeof entry === "string" && entry.trim().length > 0,
        );

        return normalizeRouteParam(firstValue);
      }
    } catch {
      return "";
    }
  }

  if (
    (normalizedValue.startsWith('"') && normalizedValue.endsWith('"')) ||
    (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
  ) {
    return normalizeRouteParam(normalizedValue.slice(1, -1));
  }

  return normalizedValue;
}

export function isUuidLike(value: string): boolean {
  return UUID_PATTERN.test(value.trim());
}
