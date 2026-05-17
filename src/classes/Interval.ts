import { asMilliseconds, type TimeLike } from "../util";
import { AlreadyRunningError, NotRunningError } from "./errors";

export class Interval {
  private milliseconds: number;
  private intervalId: NodeJS.Timeout | null = null;

  get isRunning(): boolean {
    return this.intervalId !== null;
  }

  constructor(
    interval: number | TimeLike,
    public cb: () => void | Promise<void>,
    autoStart = false,
  ) {
    this.milliseconds = asMilliseconds(interval);

    if (autoStart) {
      this.start();
    }
  }

  start() {
    if (this.isRunning) {
      throw new AlreadyRunningError("Interval is already running.");
    }

    this.intervalId = setInterval(() => this.cb(), this.milliseconds);
  }

  stop() {
    if (!this.isRunning) {
      throw new NotRunningError("Interval is not running.");
    }

    // biome-ignore lint/style/noNonNullAssertion: If the interval is running, the intervalId will never be null.
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }
}
