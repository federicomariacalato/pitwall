import { describe, it, expect } from "vitest";
import { nextRace } from "./nextRace";
import type { Race } from "./types/race.types";

function makeRace(round: string, date: string, time: string): Race {
  return { round, date, time } as Race;
}

const races = [
  makeRace("1", "2026-06-05", "04:00:00Z"),
  makeRace("2", "2026-06-12", "04:00:00Z"),
  makeRace("3", "2026-06-29", "04:00:00Z"),
];

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
    const result = nextRace(races, new Date("2026-06-05T04:00:00Z"));

    expect(result).toEqual({
      round: "2",
      date: "2026-06-12",
      time: "04:00:00Z",
    });
  });

  it("returns the first race after the given time", () => {
    const result = nextRace(races, new Date("2026-06-27T04:00:00Z"));

    expect(result).toEqual({
      round: "3",
      date: "2026-06-29",
      time: "04:00:00Z",
    });
  });

  it("returns the first race when the given time is before the season starts", () => {
    const result = nextRace(races, new Date("2026-05-01T04:00:00Z"));

    expect(result).toEqual({
      round: "1",
      date: "2026-06-05",
      time: "04:00:00Z",
    });
  });

  it("uses the start time, not just the date, to pick the next race", () => {
    const result = nextRace(
      [
        makeRace("1", "2026-01-01", "04:00:00Z"),
        makeRace("2", "2026-01-01", "10:00:00Z"),
        makeRace("3", "2026-01-05", "04:00:00Z"),
      ],
      new Date("2026-01-01T08:00:00Z"),
    );

    expect(result).toEqual({
      round: "2",
      date: "2026-01-01",
      time: "10:00:00Z",
    });
  });
});
