import type { SessionSlot } from "../types/common.types";

export function sessionStart({ date, time }: SessionSlot): Date {
  return new Date(`${date}T${time ?? "00:00:00Z"}`);
}
