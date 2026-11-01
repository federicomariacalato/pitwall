import type { Race } from "@/api/jolpica/types/race.types";
import { sessionStart } from "@/api/jolpica/utils/sessionStart";
import { getTimeLeft } from "@/lib/countdown";
import { startFormat } from "@/lib/dateFormat";

type UpcomingRaceItemProps = {
  race: Race;
  now: Date;
};

function daysLabel(days: number): string {
  if (days === 0) return "in less than a day";
  if (days === 1) return "in 1 day";
  return `in ${days} days`;
}

export function UpcomingRaceItem({ race, now }: UpcomingRaceItemProps) {
  const startsAt = sessionStart(race);
  const { days } = getTimeLeft(startsAt, now);
  const { Location } = race.Circuit;

  return (
    <li className="flex flex-col gap-1.5 rounded-xl border border-border bg-card px-4 py-3.5 md:gap-2.5 md:px-5 md:py-4.5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-heading text-[13px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Round {race.round}
        </span>
        <span className="text-[13px] font-medium text-muted-foreground">
          {daysLabel(days)}
        </span>
      </div>
      <h3 className="font-heading text-[22px] leading-[1.1] font-bold tracking-wide uppercase md:text-2xl">
        {race.raceName}
      </h3>
      <p className="text-sm text-muted-foreground md:flex md:flex-col">
        <span>
          {Location.locality}
          <span className="max-md:hidden">, {Location.country}</span>
        </span>
        <span className="md:hidden">{" · "}</span>
        <span>{startFormat.format(startsAt)}</span>
      </p>
    </li>
  );
}
