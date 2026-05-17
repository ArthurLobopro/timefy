export interface TimeLike {
  toMilliseconds(): number;
}

export function delay(time: TimeLike | number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, asMilliseconds(time)));
}

export function isTimeLike(value: unknown): value is TimeLike {
  try {
    return typeof (value as TimeLike).toMilliseconds() === "number";
  } catch {
    return false;
  }
}

export function asMilliseconds(value: TimeLike | number) {
  return isTimeLike(value) ? value.toMilliseconds() : value;
}
