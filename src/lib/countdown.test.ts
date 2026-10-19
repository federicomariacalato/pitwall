import { describe, it, expect } from "vitest";
import { getTimeLeft } from "./countdown";

describe("getTimeLeft", () => {
  it("returns the time remaining until the target is reached", () => {
    const result = getTimeLeft(
      new Date("2027-01-01T00:00:00Z"),
      new Date("2026-10-19T20:30:00Z"),
    );

    expect(result).toEqual({ days: 73, hours: 3, minutes: 30, seconds: 0 });
  });

  it("returns zero days when less than a day is left", () => {
    const result = getTimeLeft(
      new Date("2026-01-01T04:00:00Z"),
      new Date("2026-01-01T02:30:20Z"),
    );

    expect(result).toEqual({ days: 0, hours: 1, minutes: 29, seconds: 40 });
  });

  it("returns all zeros when the target is equal to the current time", () => {
    const result = getTimeLeft(
      new Date("2026-03-03T04:00:00Z"),
      new Date("2026-03-03T04:00:00Z"),
    );

    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("returns all zeros when the target is in the past", () => {
    const result = getTimeLeft(
      new Date("2026-03-03T04:00:00Z"),
      new Date("2026-04-01T00:00:00Z"),
    );

    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
