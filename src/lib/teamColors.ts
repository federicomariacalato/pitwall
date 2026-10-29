const teamColors: Record<string, string> = {
  alpine: "#00A1E8",
  aston_martin: "#229971",
  audi: "#F50537",
  cadillac: "#909090",
  ferrari: "#ED1131",
  haas: "#9C9FA2",
  mclaren: "#F47600",
  mercedes: "#00D7B6",
  rb: "#6C98FF",
  red_bull: "#4781D7",
  williams: "#1868DB",
};

export function teamColor(constructorId: string): string {
  return teamColors[constructorId] ?? "#9AA1AD";
}
