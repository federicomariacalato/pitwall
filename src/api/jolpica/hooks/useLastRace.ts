import { useQuery } from "@tanstack/react-query";
import { fetchLastRace } from "../services/resultsServices";
import { HOUR } from "@/lib/time";

export function useLastRace() {
  return useQuery({
    queryKey: ["jolpica", "lastRace"],
    queryFn: ({ signal }) => fetchLastRace(signal),
    staleTime: HOUR,
  });
}
