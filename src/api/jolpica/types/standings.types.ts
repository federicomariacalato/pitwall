import type { MRData } from "./common.types";
import type { Constructor, Driver } from "./results.types";

export type DriverStanding = {
  position: string;
  Driver: Driver;
  Constructors: Constructor[];
  points: string;
};

export type ConstructorStanding = {
  position: string;
  Constructor: Constructor;
  points: string;
};

export type DriverStandingsResponse = MRData<{
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: {
      season: string;
      round: string;
      DriverStandings: DriverStanding[];
    }[];
  };
}>;

export type ConstructorStandingsResponse = MRData<{
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: {
      season: string;
      round: string;
      ConstructorStandings: ConstructorStanding[];
    }[];
  };
}>;
