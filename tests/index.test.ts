import { describe, expect, it } from "vitest";
import { delay, Interval, t } from "../src";

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
    const interval = new Interval(100, () => {
      count++;
    });

    interval.start();
    await delay(350);
    expect(interval.isRunning).toBe(true);
    interval.stop();
    expect(interval.isRunning).toBe(false);

    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(4);
  });
});
