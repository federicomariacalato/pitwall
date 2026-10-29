import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchLastRace } from "./resultsServices";
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
