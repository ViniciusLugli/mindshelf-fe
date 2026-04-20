type ContrastTextOptions = {
  dark?: string;
  light?: string;
  threshold?: number;
};

function parseHexColor(color?: string) {
  if (!color) {
    return null;
  }

  const normalized = color.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => `${value}${value}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return null;
  }

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

export function getContrastTextColor(
  color?: string,
  options?: ContrastTextOptions,
) {
  const rgb = parseHexColor(color);
  const light = options?.light ?? "#FFFDF8";
  const dark = options?.dark ?? "#171717";
  const threshold = options?.threshold ?? 0.64;

  if (!rgb) {
    return light;
  }

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  return luminance > threshold ? dark : light;
}
