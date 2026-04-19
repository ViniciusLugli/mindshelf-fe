import { describe, expect, it } from "vitest";
import { stripHtml, truncateText } from "./text";

describe("stripHtml", () => {
  it("returns empty string for falsy values", () => {
    expect(stripHtml()).toBe("");
    expect(stripHtml(null)).toBe("");
    expect(stripHtml("")).toBe("");
  });

  it("removes tags, scripts, styles and normalizes whitespace", () => {
    const value = `
      <div>Hello <strong>world</strong></div>
      <style>.hidden { display: none; }</style>
      <script>console.log("ignored")</script>
      <p>from   MindShelf</p>
    `;

    expect(stripHtml(value)).toBe("Hello world from MindShelf");
  });
});

describe("truncateText", () => {
  it("keeps text unchanged when it is within max length", () => {
    expect(truncateText("MindShelf", 9)).toBe("MindShelf");
  });

  it("truncates long text and appends ellipsis", () => {
    expect(truncateText("abcdefghij", 5)).toBe("abcd...");
  });
});
