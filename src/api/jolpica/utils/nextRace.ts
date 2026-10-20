import { sessionStart } from "./sessionStart";
import type { Race } from "../types/race.types";

export function nextRace(races: Race[], now: Date): Race | undefined {
  return races.find((race) => sessionStart(race) > now);
}
