import { Flag } from "lucide-react";
import type { Race } from "@/api/jolpica/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCountdown";
import { sessionStart } from "@/api/jolpica/calendar";
import { cn } from "@/lib/utils";

type NextRaceContentProps = {
  race: Race;
};

type CountdownUnitProps = {
  value: number;
  label: string;
  highlight?: boolean;
};

const startFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function CountdownUnit({
  value,
  label,
  highlight = false,
}: CountdownUnitProps) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span
        className={cn(
          "font-heading text-2xl leading-none font-bold tabular-nums",
          highlight && "text-primary",
        )}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs font-medium text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}

export function NextRaceContent({ race }: NextRaceContentProps) {
  const startsAt = sessionStart(race);
  const countdown = useCountdown(startsAt);
  const { Location } = race.Circuit;

  return (
    <Card className="w-xl max-w-[calc(100vw-2rem)] flex-row items-center gap-4 py-3 text-left shadow-lg shadow-black/40 [--card-spacing:--spacing(4)] max-sm:flex-col max-sm:items-stretch">
      <div className="ml-4 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary max-sm:hidden">
        <Flag className="size-5" />
      </div>
      <CardHeader className="min-w-0 flex-1 gap-0.5 px-0 max-sm:px-(--card-spacing)">
        <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Next race · Round {race.round}
        </p>
        <CardTitle className="truncate font-heading text-xl leading-tight font-bold tracking-wide uppercase">
          {race.raceName}
        </CardTitle>
        <CardDescription className="truncate">
          {Location.locality}, {Location.country} ·{" "}
          {startFormat.format(startsAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex shrink-0 gap-3 sm:pl-0">
        <CountdownUnit value={countdown.days} label="d" />
        <CountdownUnit value={countdown.hours} label="h" />
        <CountdownUnit value={countdown.minutes} label="m" />
        <CountdownUnit value={countdown.seconds} label="s" highlight />
      </CardContent>
    </Card>
  );
}
