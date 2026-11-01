import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { sectionClass } from "../sectionClass";
import { DriverStandingsList } from "./DriverStandingsList";
import { ConstructorStandingsList } from "./ConstructorStandingsList";

export function ChampionshipCard() {
  return (
    <Card className={sectionClass}>
      <CardHeader className="flex items-end justify-between gap-4 px-0 md:px-(--card-spacing)">
        <h2 className="font-heading text-[28px] leading-[1.05] font-bold tracking-wide uppercase md:text-[32px]">
          Championship
        </h2>
        <Link
          to="/standings"
          className="text-sm font-medium whitespace-nowrap text-primary hover:underline max-md:hidden"
        >
          Full standings →
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 max-md:rounded-xl max-md:border max-md:border-border max-md:bg-card max-md:p-4 md:gap-6">
        <DriverStandingsList />
        <ConstructorStandingsList />
      </CardContent>
      <Link
        to="/standings"
        className="flex min-h-12 items-center justify-center rounded-[10px] bg-secondary font-semibold text-primary md:hidden"
      >
        Full standings →
      </Link>
    </Card>
  );
}
