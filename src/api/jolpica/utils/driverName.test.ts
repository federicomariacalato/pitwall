import { describe, it, expect } from "vitest";
import { driverName } from "./driverName";
import type { Driver } from "../types/results.types";

function makeDriver(givenName: string, familyName: string): Driver {
  return { givenName, familyName } as Driver;
}

describe("driverName", () => {
  it("returns the given name followed by the family name", () => {
    const result = driverName(makeDriver("Max", "Verstappen"));

    expect(result).toBe("Max Verstappen");
  });

  it("keeps a compound given name in front of the family name", () => {
    const result = driverName(makeDriver("Andrea Kimi", "Antonelli"));

    expect(result).toBe("Andrea Kimi Antonelli");
  });

  it("keeps accented letters unchanged", () => {
    const result = driverName(makeDriver("Nico", "Hülkenberg"));

    expect(result).toBe("Nico Hülkenberg");
  });
});
