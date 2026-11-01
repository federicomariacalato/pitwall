import { sessionStart } from "./sessionStart";
import type { Race } from "../types/race.types";

export function upcomingRaces(races: Race[], now: Date, count: number): Race[] {
  return races.filter((race) => sessionStart(race) > now).slice(1, 1 + count);
}
