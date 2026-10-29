import { jolpicaFetch } from "../client";
import type {
  ConstructorStanding,
  ConstructorStandingsResponse,
  DriverStanding,
  DriverStandingsResponse,
} from "../types/standings.types";

export async function fetchDriverStandings(
  signal?: AbortSignal,
): Promise<DriverStanding[]> {
  const data = await jolpicaFetch<DriverStandingsResponse>(
    "/current/driverstandings.json?limit=100",
    signal,
  );
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
}

export async function fetchConstructorStandings(
  signal?: AbortSignal,
): Promise<ConstructorStanding[]> {
  const data = await jolpicaFetch<ConstructorStandingsResponse>(
    "/current/constructorstandings.json?limit=100",
    signal,
  );
  return (
    data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? []
  );
}
