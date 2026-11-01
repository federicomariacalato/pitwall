import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCalendar } from "@/api/jolpica/hooks/useCalendar";
import { upcomingRaces } from "@/api/jolpica/utils/upcomingRaces";
import { QueryErrorState } from "../QueryErrorState";
import { UpcomingRaceItem } from "./UpcomingRaceItem";

const UPCOMING_COUNT = 4;

const listClass =
  "grid gap-2.5 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:gap-4";

type UpcomingRacesSectionProps = {
  children: ReactNode;
};

function UpcomingRacesSection({ children }: UpcomingRacesSectionProps) {
  return (
    <section className="flex flex-col gap-3.5 md:gap-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-heading text-[28px] leading-[1.05] font-bold tracking-wide uppercase md:text-[32px]">
          Upcoming races
        </h2>
        <Link
          to="/calendar"
          className="text-sm font-medium whitespace-nowrap text-primary hover:underline max-md:hidden"
        >
          Full calendar →
        </Link>
      </div>
      {children}
      <Link
        to="/calendar"
        className="flex min-h-12 items-center justify-center rounded-[10px] bg-secondary font-semibold text-primary md:hidden"
      >
        Full calendar →
      </Link>
    </section>
  );
}

function UpcomingRacesSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading upcoming races"
      className={listClass}
    >
      {Array.from({ length: UPCOMING_COUNT }, (_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-xl bg-secondary md:h-36"
        />
      ))}
    </div>
  );
}

export function UpcomingRacesCard() {
  const { data, error, isPending, refetch } = useCalendar();
  const [now] = useState(() => new Date());

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) {
    return (
      <UpcomingRacesSection>
        <UpcomingRacesSkeleton />
      </UpcomingRacesSection>
    );
  }

  const races = upcomingRaces(data, now, UPCOMING_COUNT);

  if (races.length === 0) {
    return (
      <UpcomingRacesSection>
        <p className="text-sm text-muted-foreground">
          No other races scheduled this season.
        </p>
      </UpcomingRacesSection>
    );
  }

  return (
    <UpcomingRacesSection>
      <ul className={listClass}>
        {races.map((race) => (
          <UpcomingRaceItem key={race.round} race={race} now={now} />
        ))}
      </ul>
    </UpcomingRacesSection>
  );
}
