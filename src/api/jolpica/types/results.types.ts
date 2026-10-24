import type { MRData } from "./common.types";
import type { Race } from "./race.types";

export type Driver = {
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
};

export type Constructor = {
  constructorId: string;
  name: string;
};

export type RaceResult = {
  position: string;
  points: string;
  grid: string;
  laps: string;
  status: string;
  Driver: Driver;
  Constructor: Constructor;
  Time?: { millis: string; time: string };
  FastestLap?: { rank: string; lap: string; Time: { time: string } };
};

export type RaceWithResults = Race & {
  Results: RaceResult[];
};

export type RaceResultsResponse = MRData<{
  RaceTable: { season: string; round: string; Races: RaceWithResults[] };
}>;
