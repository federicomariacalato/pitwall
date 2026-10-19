import { useCalendar } from "@/api/jolpica/queries";
import { NextRaceContent } from "./NextRaceContent";
import { nextRace } from "@/api/jolpica/nextRace";
import { useState } from "react";
import { QueryErrorState } from "../QueryErrorState";

export function NextRaceCard() {
  const { data, isPending, error, refetch } = useCalendar();
  const [now] = useState(() => new Date());

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) return <span>Loading...</span>;

  const race = nextRace(data, now);

  if (!race) return <span>Season finished</span>;

  return <NextRaceContent race={race} />;
}
