export function normalizeHexColor(value: string): string | null {
  const cleaned = value.trim().replace(/^#/, "");
  const isValidHex = /^(?:[\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/.test(cleaned);

  if (!isValidHex) {
    return null;
  }

  return `#${cleaned.toUpperCase()}`;
}
