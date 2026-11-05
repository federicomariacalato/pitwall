import { useQuery } from "@tanstack/react-query";
import { fetchRaceWinners } from "../services/resultsServices";
import { HOUR } from "@/lib/time";

export function useRaceWinners() {
  return useQuery({
    queryKey: ["jolpica", "raceWinners"],
    queryFn: ({ signal }) => fetchRaceWinners(signal),
    staleTime: HOUR,
  });
}
