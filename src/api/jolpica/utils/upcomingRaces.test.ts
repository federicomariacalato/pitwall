import { describe, it, expect } from "vitest";
import { upcomingRaces } from "./upcomingRaces";
import type { Race } from "../types/race.types";

function makeRace(round: string, date: string, time: string): Race {
  return { round, date, time } as Race;
}

const now = new Date("2026-06-27T00:00:00Z");

describe("upcomingRaces", () => {
  it("returns an empty array on an empty list", () => {
    const result = upcomingRaces([], now, 4);

    expect(result).toEqual([]);
  });

  it("returns an empty array when every race is in the past", () => {
    const result = upcomingRaces(
      [
        makeRace("1", "2026-06-05", "04:00:00Z"),
        makeRace("2", "2026-06-12", "04:00:00Z"),
      ],
      now,
      4,
    );

    expect(result).toEqual([]);
  });

  it("returns an empty array when the only future race is the next one", () => {
    const result = upcomingRaces(
      [
        makeRace("1", "2026-06-05", "04:00:00Z"),
        makeRace("2", "2026-06-12", "04:00:00Z"),
        makeRace("3", "2026-06-29", "04:00:00Z"),
      ],
      now,
      4,
    );

    expect(result).toEqual([]);
  });

  it("returns fewer than count races when not enough are left", () => {
    const result = upcomingRaces(
      [
        makeRace("3", "2026-06-29", "04:00:00Z"),
        makeRace("4", "2026-07-05", "04:00:00Z"),
        makeRace("5", "2026-07-11", "04:00:00Z"),
      ],
      now,
      4,
    );

    expect(result).toEqual([
      { round: "4", date: "2026-07-05", time: "04:00:00Z" },
      { round: "5", date: "2026-07-11", time: "04:00:00Z" },
    ]);
  });

  it("returns at most count races", () => {
    const result = upcomingRaces(
      [
        makeRace("3", "2026-06-29", "04:00:00Z"),
        makeRace("4", "2026-07-05", "04:00:00Z"),
        makeRace("5", "2026-07-11", "04:00:00Z"),
        makeRace("6", "2026-07-18", "04:00:00Z"),
        makeRace("7", "2026-07-25", "04:00:00Z"),
      ],
      now,
      2,
    );

    expect(result).toEqual([
      { round: "4", date: "2026-07-05", time: "04:00:00Z" },
      { round: "5", date: "2026-07-11", time: "04:00:00Z" },
    ]);
  });
});
