import { useConstructorStandings } from "@/api/jolpica/hooks/useConstructorStandings";
import { standingBar } from "@/api/jolpica/utils/standingBar";
import { teamColor } from "@/lib/teamColors";
import { QueryErrorState } from "../QueryErrorState";
import { StandingBar } from "./StandingBar";
import { StandingsSection } from "./StandingsSection";

const rowClass =
  "grid grid-cols-[18px_84px_minmax(0,1fr)_40px] items-center gap-2.5 md:grid-cols-[22px_96px_minmax(0,1fr)_44px] md:gap-3";

export function ConstructorStandingsList() {
  const {
    data: constructors,
    error,
    isPending,
    refetch,
  } = useConstructorStandings();

  if (error) return <QueryErrorState error={error} refetch={refetch} />;

  if (isPending) {
    return (
      <StandingsSection title="Constructors">
        <div
          role="status"
          aria-label="Loading constructor standings"
          className="flex flex-col gap-3"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-6 animate-pulse rounded bg-secondary"
            />
          ))}
        </div>
      </StandingsSection>
    );
  }

  if (constructors.length === 0) {
    return (
      <StandingsSection title="Constructors">
        <p className="text-sm text-muted-foreground">No standings yet.</p>
      </StandingsSection>
    );
  }

  return (
    <StandingsSection title="Constructors">
      <ol className="flex flex-col gap-3">
        {constructors.slice(0, 4).map((constructor) => (
          <li key={constructor.Constructor.constructorId} className={rowClass}>
            <span className="font-semibold text-muted-foreground">
              {constructor.position}
            </span>
            <span className="truncate font-semibold">
              {constructor.Constructor.name}
            </span>
            <StandingBar
              percent={standingBar(constructor.points, constructors[0].points)}
              color={teamColor(constructor.Constructor.constructorId)}
            />
            <span className="text-right font-semibold tabular-nums">
              {constructor.points}
            </span>
          </li>
        ))}
      </ol>
    </StandingsSection>
  );
}
