import { useQuery } from "@tanstack/react-query";
import { fetchCalendar } from "../services/calendarServices";
import { HOUR } from "@/lib/time";

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
