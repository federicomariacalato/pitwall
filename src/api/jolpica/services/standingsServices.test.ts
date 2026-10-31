import { describe, expect, it, afterEach, vi } from "vitest";
import {
  fetchDriverStandings,
  fetchConstructorStandings,
} from "./standingsServices";
import { mockFetch } from "@/test/mockFetch";
import type {
  ConstructorStanding,
  DriverStanding,
} from "../types/standings.types";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchDriverStandings", () => {
  it("returns the driver standings of the response", async () => {
    const driversStanding: DriverStanding[] = [
      {
        Driver: {
          driverId: "antonelli",
          code: "ANT",
          givenName: "Kimi",
          familyName: "Antonelli",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            name: "Mercedes",
          },
        ],
        position: "1",
        points: "300",
      },
      {
        Driver: {
          driverId: "russell",
          code: "RUS",
          givenName: "George",
          familyName: "Russell",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            name: "Mercedes",
          },
        ],
        position: "2",
        points: "280",
      },
    ];

    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          StandingsTable: {
            season: "2026",
            StandingsLists: [
              {
                season: "2026",
                round: "25",
                DriverStandings: driversStanding,
              },
            ],
          },
        },
      }),
    });

    await expect(fetchDriverStandings()).resolves.toEqual(driversStanding);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.jolpi.ca/ergast/f1/current/driverstandings.json?limit=100",
    );
  });

  it("returns an empty array when there are no standings", async () => {
    mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          StandingsTable: {
            season: "2026",
            StandingsLists: [],
          },
        },
      }),
    });

    await expect(fetchDriverStandings()).resolves.toEqual([]);
  });

  it("rejects when the request fails", async () => {
    mockFetch({
      ok: false,
      status: 500,
      statusText: "Server error",
    });

    await expect(fetchDriverStandings()).rejects.toThrow("Request failed: 500");
  });
});

describe("fetchConstructorStandings", () => {
  it("returns the constructor standings of the response", async () => {
    const constructorStandings: ConstructorStanding[] = [
      {
        Constructor: {
          constructorId: "mercedes",
          name: "Mercedes",
        },
        position: "1",
        points: "300",
      },
      {
        Constructor: {
          constructorId: "ferrari",
          name: "Ferrari",
        },
        position: "2",
        points: "280",
      },
    ];

    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          StandingsTable: {
            season: "2026",
            StandingsLists: [
              {
                season: "2026",
                round: "25",
                ConstructorStandings: constructorStandings,
              },
            ],
          },
        },
      }),
    });

    await expect(fetchConstructorStandings()).resolves.toEqual(
      constructorStandings,
    );
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.jolpi.ca/ergast/f1/current/constructorstandings.json?limit=100",
    );
  });

  it("returns an empty array when there are no standings", async () => {
    mockFetch({
      ok: true,
      json: async () => ({
        MRData: {
          StandingsTable: {
            season: "2026",
            StandingsLists: [],
          },
        },
      }),
    });

    await expect(fetchConstructorStandings()).resolves.toEqual([]);
  });

  it("rejects when the request fails", async () => {
    mockFetch({
      ok: false,
      status: 500,
      statusText: "Server error",
    });

    await expect(fetchConstructorStandings()).rejects.toThrow(
      "Request failed: 500",
    );
  });
});
