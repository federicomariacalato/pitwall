import { useCalendar } from "@/api/jolpica/queries";
import { NextRaceContent } from "./NextRaceContent";
import { nextRace } from "@/api/jolpica/nextRace";
import { useState } from "react";

export function NextRaceCard() {
  const { data, isPending, error } = useCalendar();
  const [now] = useState(() => new Date());

  if (error) return <span>{error.message}</span>;

  if (isPending) return <span>Loading...</span>;

  const race = nextRace(data, now);

  if (!race) return <span>Season finished</span>;

  return <NextRaceContent race={race} />;
}
