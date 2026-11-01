type StandingBarProps = {
  percent: number;
  color: string;
};

export function StandingBar({ percent, color }: StandingBarProps) {
  return (
    <span className="block h-2 rounded-full bg-secondary">
      <span
        className="block h-2 rounded-full"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </span>
  );
}
