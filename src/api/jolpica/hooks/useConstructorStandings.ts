import { useQuery } from "@tanstack/react-query";
import { fetchConstructorStandings } from "../services/standingsServices";
import { HOUR } from "@/lib/time";

export function useConstructorStandings() {
  return useQuery({
    queryKey: ["jolpica", "constructorStandings"],
    queryFn: ({ signal }) => fetchConstructorStandings(signal),
    staleTime: HOUR,
  });
}
