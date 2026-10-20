import { jolpicaFetch } from "./client.ts";
import type { SessionSlot } from "./types/common.types";
import type { Race, RaceTableResponse } from "./types/race.types";

export async function fetchCalendar(season = "current", signal?: AbortSignal): Promise<Race[]> {
  const data = await jolpicaFetch<RaceTableResponse>(`/${season}.json?limit=100`, signal);
  return data.MRData.RaceTable.Races;
}

export function sessionStart({ date, time }: SessionSlot): Date {
  return new Date(`${date}T${time ?? "00:00:00Z"}`);
}
