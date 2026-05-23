import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_HOUR_IN_MILLISECONDS,
  ONE_MINUTE_IN_MILLISECONDS,
  ONE_SECOND_IN_MILLISECONDS,
  ONE_WEEK_IN_MILLISECONDS,
  TIMES,
  type UnitTime,
} from "../constants";

/**
 * Represents a duration of time and provides methods to manipulate and convert it.
 */
export class Time {
  private ms: number;

  /**
   * @param time - The amount of time.
   * @param unit - The unit of time (e.g., 'ms', 's', 'm', 'h', 'd', 'w').
   */
  constructor(time: number, unit: UnitTime) {
    this.ms = TIMES[unit] * time;
  }

  /**
   * @returns The updated Time instance for chaining.
   */
  add(time: number, unit: UnitTime) {
    this.ms += TIMES[unit] * time;
    return this;
  }

  /**
   * @returns The updated Time instance for chaining.
   */
  remove(time: number, unit: UnitTime) {
    this.ms -= TIMES[unit] * time;
    return this;
  }

  copy() {
    return new Time(this.ms, "ms");
  }

  toMilliseconds() {
    return this.ms;
  }

  toSeconds() {
    return this.ms / ONE_SECOND_IN_MILLISECONDS;
  }

  toMinutes() {
    return this.ms / ONE_MINUTE_IN_MILLISECONDS;
  }

  toHours() {
    return this.ms / ONE_HOUR_IN_MILLISECONDS;
  }

  toDays() {
    return this.ms / ONE_DAY_IN_MILLISECONDS;
  }

  toWeeks() {
    return this.ms / ONE_WEEK_IN_MILLISECONDS;
  }
}

export const t = (time: number, unit: UnitTime) => new Time(time, unit);
