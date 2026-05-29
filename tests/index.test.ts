import { describe, expect, it } from "vitest";
import {
  AlreadyRunningError,
  delay,
  Interval,
  InvalidOptionsError,
  isTimeLike,
  NotRunningError,
  Timeout,
  t,
} from "../src";

const doNothing = () => {};

describe("Time class tests", () => {
  it("Should return the correct time in milliseconds", () => {
    const time = t(1, "w");

    expect(time.toWeeks()).toBe(1);
    expect(time.toDays()).toBe(7);
    expect(time.toHours()).toBe(7 * 24);
    expect(time.toMinutes()).toBe(7 * 24 * 60);
    expect(time.toSeconds()).toBe(7 * 24 * 60 * 60);
    expect(time.toMilliseconds()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it("Should correctly sum time", () => {
    expect(t(1, "h").add(30, "m").toHours()).toBe(1.5);
  });

  it("Should correctly remove time", () => {
    expect(t(1, "h").remove(30, "m").toHours()).toBe(0.5);
  });

  it("Should correctly copy time", () => {
    const time = t(1, "h");
    const copy = time.copy();
    time.add(30, "m");
    expect(copy.toHours()).toBe(1);
  });
});

describe("Interval class tests", () => {
  it("Should start and stop the interval correctly", async () => {
    let count = 0;
    const interval = new Interval(t(100, "ms"), () => {
      count++;
    });

    interval.start();
    await delay(t(350, "ms"));
    expect(interval.isRunning).toBe(true);
    interval.stop();
    expect(interval.isRunning).toBe(false);

    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(4);
    expect(interval.count).toBe(count);
  });

  it("Should respect the limit", async () => {
    const TIME = 150;
    const interval = new Interval(TIME, doNothing, {
      autoStart: true,
      limit: 4,
    });

    await delay(TIME * 4 + TIME / 2);

    expect(interval.isRunning).toBe(false);
    expect(interval.count).toBe(4);
  });

  it("Should throw errors", () => {
    const interval = new Interval(100, doNothing, { autoStart: true });

    expect(() => {
      interval.start();
    }).throw(AlreadyRunningError);

    interval.stop();

    expect(() => {
      interval.stop();
    }).toThrow(NotRunningError);

    expect(() => new Interval(100, doNothing, { limit: -1 })).toThrow(
      InvalidOptionsError,
    );
  });
});

describe("Timeout class tests", () => {
  it("Should exec timeout correctly", async () => {
    let value = false;
    const timeout = new Timeout(
      t(100, "ms"),
      () => {
        value = true;
      },
      true,
    );

    await delay(t(120, "ms"));

    expect(timeout.isRunning).toBe(false);
    expect(value).toBe(true);
  });

  it("Should stop timeout", async () => {
    let value = false;
    const timeout = new Timeout(
      t(100, "ms"),
      () => {
        value = true;
      },
      true,
    );

    await delay(t(80, "ms"));

    expect(timeout.isRunning).toBe(true);
    timeout.cancel();
    expect(timeout.isRunning).toBe(false);

    await delay(t(30, "ms"));

    expect(value).toBe(false);
  });

  it("Should throw errors", () => {
    const timeout = new Timeout(100, doNothing);

    timeout.start();

    expect(() => {
      timeout.start();
    }).throw(AlreadyRunningError);

    timeout.cancel();

    expect(() => {
      timeout.cancel();
    }).toThrow(NotRunningError);
  });
});

describe("TimeLike typeguard tests", () => {
  it("Should return if a value is a TimeLike or not", () => {
    expect(isTimeLike(t(1, "seconds"))).toBe(true);
    expect(isTimeLike(null)).toBe(false);
  });
});
