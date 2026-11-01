import { describe, expect, it } from "vitest";
import { standingBar } from "./standingBar";

describe("standingBar", () => {
  it("returns 100 for the leader", () => {
    const result = standingBar("100", "100");

    expect(result).toBe(100);
  });

  it("returns the share of the leader's points", () => {
    const result = standingBar("238", "340");

    expect(result).toBeCloseTo(70);
  });

  it("returns 0 when the leader has no points", () => {
    const result = standingBar("0", "0");

    expect(result).toBe(0);
  });
});
