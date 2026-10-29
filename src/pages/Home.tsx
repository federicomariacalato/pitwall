import { LastRaceCard } from "@/components/lastRace/LastRaceCard";
import { NextRaceCard } from "@/components/nextRace/NextRaceCard";

export function Home() {
  return (
    <div className="flex flex-col gap-7 md:gap-10">
      <NextRaceCard />
      <div className="grid items-start gap-6 lg:grid-cols-[560fr_460fr]">
        <LastRaceCard />
      </div>
    </div>
  );
}
