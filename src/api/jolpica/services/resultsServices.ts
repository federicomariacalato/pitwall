import { jolpicaFetch } from "../client";
import type {
  RaceResultsResponse,
  RaceWithResults,
} from "../types/results.types";

export async function fetchLastRace(
  signal?: AbortSignal,
): Promise<RaceWithResults | undefined> {
  const data = await jolpicaFetch<RaceResultsResponse>(
    "/current/last/results.json?limit=100",
    signal,
  );
  return data.MRData.RaceTable.Races[0];
}
