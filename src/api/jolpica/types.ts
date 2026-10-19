export type SessionSlot = {
  date: string;
  time?: string;
};

export type Circuit = {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
};

export type Race = SessionSlot & {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  FirstPractice?: SessionSlot;
  SecondPractice?: SessionSlot;
  ThirdPractice?: SessionSlot;
  Qualifying?: SessionSlot;
  Sprint?: SessionSlot;
  SprintQualifying?: SessionSlot;
};

export type MRData<Table> = {
  MRData: {
    limit: string;
    offset: string;
    total: string;
  } & Table;
};

export type RaceTableResponse = MRData<{
  RaceTable: { season: string; Races: Race[] };
}>;
