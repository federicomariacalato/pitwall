import { useDriverStandings } from "@/api/jolpica/hooks/useDriverStandings";
import { standingBar } from "@/api/jolpica/utils/standingBar";
import { teamColor } from "@/lib/teamColors";
import { QueryErrorState } from "../QueryErrorState";
import { StandingBar } from "./StandingBar";
import { StandingsSection } from "./StandingsSection";

const rowClass =
  "grid grid-cols-[18px_44px_minmax(0,1fr)_40px] items-center gap-2.5 md:grid-cols-[22px_52px_minmax(0,1fr)_44px] md:gap-3";

export function DriverStandingsList() {
  const { data: drivers, error, isPending, refetch } = useDriverStandings();

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) {
    return (
      <StandingsSection title="Drivers">
        <div
          role="status"
          aria-label="Loading driver standings"
          className="flex flex-col gap-3"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="h-6 animate-pulse rounded bg-secondary"
            />
          ))}
        </div>
      </StandingsSection>
    );
  }

  if (drivers.length === 0) {
    return (
      <StandingsSection title="Drivers">
        <p className="text-sm text-muted-foreground">No standings yet.</p>
      </StandingsSection>
    );
  }

  return (
    <StandingsSection title="Drivers">
      <ol className="flex flex-col gap-3">
        {drivers.slice(0, 5).map((driver) => (
          <li key={driver.Driver.driverId} className={rowClass}>
            <span className="font-semibold text-muted-foreground">
              {driver.position}
            </span>
            <span className="font-heading text-xl font-bold tracking-[0.04em]">
              {driver.Driver.code}
            </span>
            <StandingBar
              percent={standingBar(driver.points, drivers[0].points)}
              color={teamColor(driver.Constructors[0].constructorId)}
            />
            <span className="text-right font-semibold tabular-nums">
              {driver.points}
            </span>
          </li>
        ))}
      </ol>
    </StandingsSection>
  );
}
