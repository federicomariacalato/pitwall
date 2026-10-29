import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchCalendar } from "./calendarServices";
import { isJolpicaError } from "../client";
import { mockFetch } from "@/test/mockFetch";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchCalendar", () => {
  it("requests the season and unwraps the races", async () => {
    const races = [
      { season: "2026", round: "1", raceName: "Australian Grand Prix" },
    ];
    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: { RaceTable: { season: "2026", Races: races } },
      }),
    });

    await expect(fetchCalendar("2026")).resolves.toEqual(races);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.jolpi.ca/ergast/f1/2026.json?limit=100",
    );
  });

  it("defaults to the current season", async () => {
    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: { RaceTable: { season: "2026", Races: [] } },
      }),
    });

    await fetchCalendar();
    expect(fetchMock.mock.calls[0][0]).toContain("/current.json");
  });

  it("throws a JolpicaError carrying the status on a failed request", async () => {
    mockFetch({ ok: false, status: 500, statusText: "Server Error" });

    const error = await fetchCalendar("2026").catch((e: unknown) => e);
    expect(isJolpicaError(error)).toBe(true);
    expect(isJolpicaError(error) && error.status).toBe(500);
  });

  it("explains rate limiting on a 429", async () => {
    mockFetch({ ok: false, status: 429, statusText: "Too Many Requests" });

    await expect(fetchCalendar("2026")).rejects.toThrow(/rate limit/i);
  });
});
