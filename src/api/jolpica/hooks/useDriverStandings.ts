import { useQuery } from "@tanstack/react-query";
import { fetchDriverStandings } from "../services/standingsServices";
import { HOUR } from "@/lib/time";

export function useDriverStandings() {
  return useQuery({
    queryKey: ["jolpica", "driverStandings"],
    queryFn: ({ signal }) => fetchDriverStandings(signal),
    staleTime: HOUR,
  });
}
