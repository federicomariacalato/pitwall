import { describe, expect, it } from "vitest";
import { sessionStart } from "./sessionStart";

describe("sessionStart", () => {
  it("combines date and UTC time", () => {
    expect(sessionStart({ date: "2026-03-08", time: "04:00:00Z" }).toISOString()).toBe(
      "2026-03-08T04:00:00.000Z",
    );
  });

  it("falls back to midnight UTC when the time is missing", () => {
    expect(sessionStart({ date: "2003-03-09" }).toISOString()).toBe("2003-03-09T00:00:00.000Z");
  });
});
