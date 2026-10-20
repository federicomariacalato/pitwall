import { useQuery } from "@tanstack/react-query";
import { fetchCalendar } from "./services/calendarServices";

const HOUR = 60 * 60 * 1000;

function calendarStaleTime(season: string): number {
  const year = Number(season);
  return Number.isInteger(year) && year < new Date().getFullYear() ? Infinity : HOUR;
}

export function useCalendar(season = "current") {
  return useQuery({
    queryKey: ["jolpica", "calendar", season],
    queryFn: ({ signal }) => fetchCalendar(season, signal),
    staleTime: calendarStaleTime(season),
  });
}
