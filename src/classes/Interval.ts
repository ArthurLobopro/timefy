import { asMilliseconds, type TimeLike } from "../util";
import { AlreadyRunningError, NotRunningError } from "./errors";

export class Interval {
  private milliseconds: number;
  private intervalId: NodeJS.Timeout | null = null;

  get isRunning(): boolean {
    return this.intervalId !== null;
  }

  /**
   * @param interval - The delay between executions. Numbers are treated as milliseconds.
   * @param cb - The callback function to execute.
   * @param autoStart - Whether to start the interval automatically (default: false).
   */
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

  /**
   * @throws {AlreadyRunningError} If the interval is already running.
   */
  start() {
    if (this.isRunning) {
      throw new AlreadyRunningError("Interval is already running.");
    }

    this.intervalId = setInterval(() => this.cb(), this.milliseconds);
  }

  /**
   * @throws {NotRunningError} If the interval is not running.
   */
  stop() {
    if (!this.isRunning) {
      throw new NotRunningError("Interval is not running.");
    }

    // biome-ignore lint/style/noNonNullAssertion: If the interval is running, the intervalId will never be null.
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }
}
