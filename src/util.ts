export interface TimeLike {
  toMilliseconds(): number;
}

export function delay(time: TimeLike | number): Promise<void> {
  const milliseconds = isTimeLike(time) ? time.toMilliseconds() : time;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function isTimeLike(value: unknown): value is TimeLike {
  try {
    return typeof (value as TimeLike).toMilliseconds() === "number";
  } catch {
    return false;
  }
}
