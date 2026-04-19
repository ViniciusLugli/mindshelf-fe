import { describe, expect, it } from "vitest";
import { isUuidLike, normalizeRouteParam } from "./route-params";

describe("normalizeRouteParam", () => {
  it("returns empty string for missing values", () => {
    expect(normalizeRouteParam()).toBe("");
    expect(normalizeRouteParam("   ")).toBe("");
  });

  it("normalizes arrays, quoted strings and encoded values", () => {
    expect(normalizeRouteParam(["  first-value  ", "second-value"])).toBe("first-value");
    expect(normalizeRouteParam('"quoted-value"')).toBe("quoted-value");
    expect(normalizeRouteParam("friend%20123")).toBe("friend 123");
  });

  it("reads the first valid string from JSON arrays", () => {
    expect(normalizeRouteParam('["", "task-123", "task-456"]')).toBe("task-123");
  });

  it("returns empty string for malformed JSON arrays", () => {
    expect(normalizeRouteParam("[invalid-json]")).toBe("");
  });
});

describe("isUuidLike", () => {
  it("accepts valid UUIDs even with surrounding spaces", () => {
    expect(isUuidLike("  550e8400-e29b-41d4-a716-446655440000  ")).toBe(true);
  });

  it("rejects invalid UUIDs", () => {
    expect(isUuidLike("not-a-uuid")).toBe(false);
    expect(isUuidLike("550e8400-e29b-41d4-7716-446655440000")).toBe(false);
  });
});
