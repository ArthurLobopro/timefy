import { asMilliseconds, type TimeLike } from "../util";
import { AlreadyRunningError, NotRunningError } from "./errors";

export class Timeout {
  private milliseconds: number;
  private timeoutId: NodeJS.Timeout | null = null;

  get isRunning(): boolean {
    return this.timeoutId !== null;
  }

  /**
   * @param timeout - The delay before execution. Numbers are treated as milliseconds.
   * @param cb - The callback function to execute.
   * @param autoStart - Whether to start the timeout automatically (default: false).
   */
  constructor(
    timeout: number | TimeLike,
    public cb: () => void | Promise<void>,
    autoStart = false,
  ) {
    this.milliseconds = asMilliseconds(timeout);

    if (autoStart) {
      this.start();
    }
  }

  /**
   * @throws {AlreadyRunningError} If the timeout is already running.
   */
  start() {
    if (this.isRunning) {
      throw new AlreadyRunningError("Timeout is already running.");
    }

    this.timeoutId = setInterval(() => {
      this.cb();
      this.timeoutId = null;
    }, this.milliseconds);
  }

  /**
   * @throws {NotRunningError} If the timeout is not running.
   */
  stop() {
    if (!this.isRunning) {
      throw new NotRunningError("Timeout is not running.");
    }

    // biome-ignore lint/style/noNonNullAssertion: If the timeout is running, the intervalId will never be null.
    clearInterval(this.timeoutId!);
    this.timeoutId = null;
  }
}
