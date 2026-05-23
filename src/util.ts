/**
 * Interface for objects that can be converted to milliseconds.
 */
export interface TimeLike {
  toMilliseconds(): number;
}

/**
 * @param time - The delay duration. Numbers are treated as milliseconds.
 */
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

/**
 * @param value - The value to convert. Numbers are treated as milliseconds.
 * @returns The value in milliseconds.
 */
export function asMilliseconds(value: TimeLike | number) {
  return isTimeLike(value) ? value.toMilliseconds() : value;
}
