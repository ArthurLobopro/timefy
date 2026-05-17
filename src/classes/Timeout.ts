import { isTimeLike, type TimeLike } from "../util";
import { AlreadyRunningError, NotRunningError } from "./errors";

export class Timeout {
  private milliseconds: number;
  private timeoutId: NodeJS.Timeout | null = null;

  get isRunning(): boolean {
    return this.timeoutId !== null;
  }

  constructor(
    timeout: number | TimeLike,
    public cb: () => void | Promise<void>,
    autoStart = false,
  ) {
    this.milliseconds = isTimeLike(timeout)
      ? timeout.toMilliseconds()
      : timeout;

    if (autoStart) {
      this.start();
    }
  }

  start() {
    if (this.isRunning) {
      throw new AlreadyRunningError("Timeout is already running.");
    }

    this.timeoutId = setInterval(() => {
      this.cb();
      this.timeoutId = null;
    }, this.milliseconds);
  }

  stop() {
    if (!this.isRunning) {
      throw new NotRunningError("Timeout is not running.");
    }

    // biome-ignore lint/style/noNonNullAssertion: If the timeout is running, the intervalId will never be null.
    clearInterval(this.timeoutId!);
    this.timeoutId = null;
  }
}
