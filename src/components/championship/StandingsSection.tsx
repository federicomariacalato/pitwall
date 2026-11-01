import type { ReactNode } from "react";

type StandingsSectionProps = {
  title: string;
  children: ReactNode;
};

export function StandingsSection({ title, children }: StandingsSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-[13px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}
