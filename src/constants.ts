export const ONE_SECOND_IN_MILLISECONDS = 1000;
export const ONE_MINUTE_IN_MILLISECONDS = 60 * ONE_SECOND_IN_MILLISECONDS;
export const ONE_HOUR_IN_MILLISECONDS = 60 * ONE_MINUTE_IN_MILLISECONDS;
export const ONE_DAY_IN_MILLISECONDS = 24 * ONE_HOUR_IN_MILLISECONDS;
export const ONE_WEEK_IN_MILLISECONDS = 7 * ONE_DAY_IN_MILLISECONDS;

export const UNIT_TIME = [
  "ms",
  "s",
  "m",
  "h",
  "d",
  "w",
  "milliseconds",
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
] as const;

export type UnitTime = (typeof UNIT_TIME)[number];

export const TIMES: Record<UnitTime, number> = {
  ms: 1,
  milliseconds: 1,
  s: ONE_SECOND_IN_MILLISECONDS,
  seconds: ONE_SECOND_IN_MILLISECONDS,
  m: ONE_MINUTE_IN_MILLISECONDS,
  minutes: ONE_MINUTE_IN_MILLISECONDS,
  h: ONE_HOUR_IN_MILLISECONDS,
  hours: ONE_HOUR_IN_MILLISECONDS,
  d: ONE_DAY_IN_MILLISECONDS,
  days: ONE_DAY_IN_MILLISECONDS,
  w: ONE_WEEK_IN_MILLISECONDS,
  weeks: ONE_WEEK_IN_MILLISECONDS,
};
