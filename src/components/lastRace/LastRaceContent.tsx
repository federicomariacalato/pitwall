import type {
  RaceResult,
  RaceWithResults,
} from "@/api/jolpica/types/results.types";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { sessionStart } from "@/api/jolpica/utils/sessionStart";
import { Link } from "react-router-dom";
import { driverName } from "@/api/jolpica/utils/driverName";
import { cn } from "@/lib/utils";
import { teamColor } from "@/lib/teamColors";
import { sectionClass } from "./sectionClass";

type LastRaceContentProps = {
  race: RaceWithResults;
};

type PodiumRowProps = {
  result: RaceResult;
};

const startFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

function PodiumRow({ result }: PodiumRowProps) {
  const isWinner = result.position === "1";

  return (
    <li className="flex min-h-16 items-center gap-3 rounded-[10px] border border-border bg-card px-3.5 py-3 md:gap-4 md:border-0 md:bg-secondary md:px-4 md:py-3.5">
      <span
        className={cn(
          "w-[22px] font-heading text-[32px] leading-none font-bold md:w-7 md:text-4xl",
          isWinner && "text-primary",
        )}
      >
        {result.position}
      </span>
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: teamColor(result.Constructor.constructorId) }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold md:text-lg">
          {driverName(result.Driver)}
        </span>
        <span className="text-[13px] text-muted-foreground md:text-sm">
          {result.Constructor.name}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium tabular-nums md:text-base">
          {result.Time?.time}
        </span>
        <span className="text-[13px] text-muted-foreground max-md:hidden">
          {result.points} pts
        </span>
      </div>
    </li>
  );
}

export function LastRaceContent({ race }: LastRaceContentProps) {
  const startsAt = sessionStart(race);

  return (
    <Card className={sectionClass}>
      <CardHeader className="flex items-end justify-between gap-4 px-0 md:px-(--card-spacing)">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Last race · Round {race.round}
          </p>
          <CardTitle className="font-heading text-[28px] leading-[1.05] font-bold tracking-wide uppercase md:text-[32px]">
            {race.raceName}
          </CardTitle>
          <CardDescription>
            <span className="max-md:hidden">{race.Circuit.circuitName}</span>
            <span className="md:hidden">{race.Circuit.Location.locality}</span>
            {" · "}
            {startFormat.format(startsAt)} · {race.Results[0].laps} laps
          </CardDescription>
        </div>
        <Link
          to="/race/last"
          className="text-sm font-medium whitespace-nowrap text-primary hover:underline max-md:hidden"
        >
          Full results →
        </Link>
      </CardHeader>
      <CardContent className="px-0 md:px-(--card-spacing)">
        <ol className="flex flex-col gap-2 md:gap-2.5">
          {race.Results.slice(0, 3).map((result) => (
            <PodiumRow key={result.Driver.driverId} result={result} />
          ))}
        </ol>
      </CardContent>
      <Link
        to="/race/last"
        className="flex min-h-12 items-center justify-center rounded-[10px] bg-secondary font-semibold text-primary md:hidden"
      >
        Full race details →
      </Link>
    </Card>
  );
}
