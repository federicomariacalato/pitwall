import { useLastRace } from "@/api/jolpica/hooks/useLastRace";
import { LastRaceContent } from "./LastRaceContent";
import { QueryErrorState } from "../QueryErrorState";
import { Flag } from "lucide-react";
import { sectionClass } from "./sectionClass";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


function LastRaceSkeleton() {
  return (
    <Card role="status" aria-label="Loading last race" className={sectionClass}>
      <div className="flex flex-col gap-2 md:px-(--card-spacing)">
        <div className="h-3 w-28 animate-pulse rounded bg-secondary" />
        <div className="h-7 w-64 max-w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-48 max-w-full animate-pulse rounded bg-secondary" />
      </div>
      <div className="flex flex-col gap-2 md:gap-2.5 md:px-(--card-spacing)">
        <div className="h-16 animate-pulse rounded-[10px] bg-secondary" />
        <div className="h-16 animate-pulse rounded-[10px] bg-secondary" />
        <div className="h-16 animate-pulse rounded-[10px] bg-secondary" />
      </div>
    </Card>
  );
}

function NoRaceYet() {
  return (
    <Card className={sectionClass}>
      <CardHeader className="gap-0.5 px-0 md:px-(--card-spacing)">
        <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Last race
        </p>
        <CardTitle className="flex items-center gap-2 font-heading text-xl leading-tight font-bold tracking-wide uppercase">
          <Flag className="size-5 text-primary" />
          No results yet
        </CardTitle>
        <CardDescription>
          The first race of the season hasn't been run yet.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function LastRaceCard() {
  const { data: race, isPending, error, refetch } = useLastRace();

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) return <LastRaceSkeleton />;

  if (!race) return <NoRaceYet />;

  return <LastRaceContent race={race} />;
}
