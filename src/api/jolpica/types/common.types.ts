export type SessionSlot = {
  date: string;
  time?: string;
};

export type MRData<Table> = {
  MRData: {
    limit: string;
    offset: string;
    total: string;
  } & Table;
};
