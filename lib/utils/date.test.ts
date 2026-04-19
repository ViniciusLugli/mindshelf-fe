import { describe, expect, it } from "vitest";
import { formatDateTime, formatTime } from "./date";

describe("formatDateTime", () => {
  it("returns fallback when value is missing or invalid", () => {
    expect(formatDateTime()).toBe("Agora");
    expect(formatDateTime("invalid-date")).toBe("Agora");
  });

  it("formats valid dates with pt-BR locale", () => {
    const value = "2026-04-18T13:45:00.000Z";
    const expected = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));

    expect(formatDateTime(value)).toBe(expected);
  });
});

describe("formatTime", () => {
  it("returns fallback when value is missing or invalid", () => {
    expect(formatTime()).toBe("--:--");
    expect(formatTime("invalid-date")).toBe("--:--");
  });

  it("formats valid times with pt-BR locale", () => {
    const value = "2026-04-18T13:45:00.000Z";
    const expected = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));

    expect(formatTime(value)).toBe(expected);
  });
});
