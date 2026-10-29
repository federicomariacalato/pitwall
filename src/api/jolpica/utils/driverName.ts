import type { Driver } from "../types/results.types";

export function driverName(driver: Driver) {
  return `${driver.givenName} ${driver.familyName}`;
}
