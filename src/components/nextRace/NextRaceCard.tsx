import { Trophy } from "lucide-react";
import { useCalendar } from "@/api/jolpica/queries";
import { NextRaceContent } from "./NextRaceContent";
import { nextRace } from "@/api/jolpica/utils/nextRace";
import { useState } from "react";
import { QueryErrorState } from "../QueryErrorState";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const bannerClass =
  "w-full flex-row items-center gap-4 py-3.5 text-left shadow-lg shadow-black/40 [--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(5)] max-sm:flex-col max-sm:items-stretch";

function NextRaceSkeleton() {
  return (
    <Card role="status" aria-label="Loading next race" className={bannerClass}>
      <div className="ml-(--card-spacing) size-10 shrink-0 animate-pulse rounded-lg bg-secondary md:size-11 max-sm:hidden" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 max-sm:px-4">
        <div className="h-3 w-28 animate-pulse rounded bg-secondary" />
        <div className="h-5 w-56 max-w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-40 max-w-full animate-pulse rounded bg-secondary" />
      </div>
      <div className="mx-(--card-spacing) flex shrink-0 gap-3 sm:ml-0">
        <div className="h-7 w-10 animate-pulse rounded bg-secondary" />
        <div className="h-7 w-10 animate-pulse rounded bg-secondary" />
        <div className="h-7 w-10 animate-pulse rounded bg-secondary" />
        <div className="h-7 w-10 animate-pulse rounded bg-secondary" />
      </div>
    </Card>
  );
}

function SeasonFinished() {
  return (
    <Card className={bannerClass}>
      <div className="ml-(--card-spacing) flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary md:size-11 max-sm:hidden">
        <Trophy className="size-5" />
      </div>
      <CardHeader className="min-w-0 flex-1 gap-0.5 px-0 max-sm:px-(--card-spacing)">
        <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Season complete
        </p>
        <CardTitle className="font-heading text-xl leading-tight font-bold tracking-wide uppercase">
          Season finished
        </CardTitle>
        <CardDescription>
          No more races on the calendar. See you next season.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function NextRaceCard() {
  const { data, isPending, error, refetch } = useCalendar();
  const [now] = useState(() => new Date());

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) return <NextRaceSkeleton />;

  const race = nextRace(data, now);

  if (!race) return <SeasonFinished />;

  return <NextRaceContent race={race} />;
}
