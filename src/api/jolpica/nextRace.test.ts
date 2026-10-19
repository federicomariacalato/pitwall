import { describe, it, expect } from "vitest";
import { nextRace } from "./nextRace";
import type { Race } from "./types";

function makeRace(round: string, date: string, time: string): Race {
  return { round, date, time } as Race;
}

describe("nextRace", () => {
  it("returns undefined on an empty list", () => {
    const result = nextRace([], new Date("2026-03-08T04:00:00Z"));

    expect(result).toBeUndefined();
  });

  it("returns undefined when every race is in the past", () => {
    const result = nextRace(
      [makeRace("1", "2026-03-08", "04:00:00Z")],
      new Date("2026-12-01T00:00:00Z"),
    );

    expect(result).toBeUndefined();
  });

  it("excludes a race starting exactly at the given time", () => {
    const result = nextRace(
      [
        makeRace("1", "2026-03-08", "04:00:00Z"),
        makeRace("2", "2026-03-15", "04:00:00Z"),
      ],
      new Date("2026-03-08T04:00:00Z"),
    );

    expect(result).toEqual({
      round: "2",
      date: "2026-03-15",
      time: "04:00:00Z",
    });
  });
});
