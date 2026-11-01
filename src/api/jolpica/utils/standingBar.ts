export function standingBar(points: string, leaderPoints: string): number {
  const numberPoints = Number(points);
  const numberLeaderPoints = Number(leaderPoints);

  if (numberLeaderPoints === 0) return 0;

  return (numberPoints / numberLeaderPoints) * 100;
}
