export function getTimeLeft(target: Date, now: Date) {
  const remainingTime = Math.max(0, target.getTime() - now.getTime());

  const totalSeconds = Math.floor(remainingTime / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const secondsAfterDays = totalSeconds % 86400;

  const hours = Math.floor(secondsAfterDays / 3600);

  const secondsAfterHours = secondsAfterDays % 3600;

  const minutes = Math.floor(secondsAfterHours / 60);

  const seconds = secondsAfterHours % 60;

  return { days, hours, minutes, seconds };
}
