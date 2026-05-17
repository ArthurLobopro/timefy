import { describe, expect, it } from "vitest";
import { t } from "../src";

describe("Timefy tests", () => {
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
