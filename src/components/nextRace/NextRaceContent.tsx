import { Flag } from "lucide-react";
import type { Race } from "@/api/jolpica/types/race.types";
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
  longLabel: string;
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
  longLabel,
  highlight = false,
}: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg bg-secondary py-2.5 sm:flex-row sm:items-baseline sm:gap-0.5 sm:bg-transparent sm:p-0">
      <span
        className={cn(
          "font-heading text-[32px] leading-none font-bold tabular-nums sm:text-[34px]",
          highlight && "text-primary",
        )}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase sm:text-xs sm:tracking-normal">
        <span className="sm:hidden">{longLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}

export function NextRaceContent({ race }: NextRaceContentProps) {
  const startsAt = sessionStart(race);
  const countdown = useCountdown(startsAt);
  const { Location } = race.Circuit;

  return (
    <Card className="w-full flex-row items-center gap-4 py-3.5 text-left shadow-lg shadow-black/40 [--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(5)] max-sm:flex-col max-sm:items-stretch">
      <div className="ml-(--card-spacing) flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary md:size-11 max-sm:hidden">
        <Flag className="size-5 md:size-5.5" />
      </div>
      <CardHeader className="min-w-0 flex-1 gap-0.5 px-0 max-sm:px-(--card-spacing)">
        <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Next race · Round {race.round}
        </p>
        <CardTitle className="truncate font-heading text-2xl leading-tight font-bold tracking-wide uppercase">
          {race.raceName}
        </CardTitle>
        <CardDescription className="truncate">
          {Location.locality}, {Location.country} ·{" "}
          {startFormat.format(startsAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid shrink-0 grid-cols-4 gap-2 sm:flex sm:gap-5 sm:pl-0">
        <CountdownUnit value={countdown.days} label="d" longLabel="days" />
        <CountdownUnit value={countdown.hours} label="h" longLabel="hours" />
        <CountdownUnit value={countdown.minutes} label="m" longLabel="min" />
        <CountdownUnit
          value={countdown.seconds}
          label="s"
          longLabel="sec"
          highlight
        />
      </CardContent>
    </Card>
  );
}
