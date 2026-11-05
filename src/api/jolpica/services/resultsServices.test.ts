import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchLastRace, fetchRaceWinners } from "./resultsServices";
import type { Race } from "../types/race.types";
import { mockFetch } from "@/test/mockFetch";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchLastRace", () => {
  it("returns the first race of the response", async () => {
    const races = [
      { season: "2026", round: "1", raceName: "Italian Grand Prix" },
      { season: "2026", round: "2", raceName: "Japanese Grand Prix" },
    ];
    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: { RaceTable: { season: "2026", Races: races } },
      }),
    });

    await expect(fetchLastRace()).resolves.toEqual(races[0]);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.jolpi.ca/ergast/f1/current/last/results.json?limit=100",
    );
  });

  it("returns undefined when there are no races", async () => {
    const races: Race[] = [];
    mockFetch({
      ok: true,
      json: async () => ({
        MRData: { RaceTable: { season: "2026", Races: races } },
      }),
    });

    await expect(fetchLastRace()).resolves.toBeUndefined();
  });

  it("rejects when the request fails", async () => {
    mockFetch({
      ok: false,
      status: 500,
      statusText: "Server error",
    });

    await expect(fetchLastRace()).rejects.toThrow("Request failed: 500");
  });
});

describe("fetchRaceWinners", () => {
  it("returns the race winners of the response", async () => {
    const raceWinners = [
      {
        season: "2026",
        round: "1",
        raceName: "Italian Grand Prix",
        Results: [{ position: "1", Driver: { code: "ANT" } }],
      },
      {
        season: "2026",
        round: "2",
        raceName: "Japanese Grand Prix",
        Results: [{ position: "1", Driver: { code: "LEC" } }],
      },
    ];

    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          RaceTable: {
            season: "2026",
            Races: raceWinners,
          },
        },
      }),
    });

    await expect(fetchRaceWinners()).resolves.toEqual(raceWinners);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.jolpi.ca/ergast/f1/current/results/1.json?limit=100",
    );
  });

  it("returns an empty array when there are no race winners", async () => {
    mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          RaceTable: {
            season: "2026",
            Races: [],
          },
        },
      }),
    });

    await expect(fetchRaceWinners()).resolves.toEqual([]);
  });

  it("rejects when the request fails", async () => {
    mockFetch({
      ok: false,
      status: 500,
      statusText: "Server error",
    });

    await expect(fetchRaceWinners()).rejects.toThrow("Request failed: 500");
  });
});
