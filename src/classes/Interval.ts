import { asMilliseconds, type TimeLike } from "../util";
import { AlreadyRunningError, InvalidOptionsError, NotRunningError } from "./errors";

interface IntervalOptions {
  /**
   * Controls if the Interval should auto start
   */
  autoStart?: boolean
  /**
   * Controls if the Interval must have a limit.
   * Should be a integer or false. By default it's `false`.
   * Decimal values will be converted to a lower integer and `0` will be converted to `false`
   * @throws {InvalidOptionsError} when receive negative numbers
   */
  limit?: number | false
}

export class Interval {
  private milliseconds: number;
  private intervalId: NodeJS.Timeout | null = null;
  private options: IntervalOptions

  get isRunning(): boolean {
    return this.intervalId !== null;
  }

  private _count = 0
  
  get count(){
    return this._count
  }

  private set count(v: number){
    this._count = v

    if(this.options.limit && this.count >= this.options.limit){
      this.stop()
    }
  }

  /**
   * @param interval - The delay between executions. Numbers are treated as milliseconds.
   * @param cb - The callback function to execute.
   * @param autoStart - Whether to start the interval automatically (default: false).
   */
  constructor(
    interval: number | TimeLike,
    public cb: () => void | Promise<void>,
    {autoStart = false, limit = false}: IntervalOptions = {}
  ) {
    this.milliseconds = asMilliseconds(interval);

    if(isNumber(limit)) validateLimit(limit)

    this.options = {
      autoStart,
      limit: limit ? Math.ceil(limit) : false
    }  

    if (this.options.autoStart) {
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

    this.intervalId = setInterval(() => {
      this.cb()
      this.count++
    }, this.milliseconds);
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

function validateLimit(limit: number) {
  if(limit < 0){
    throw new InvalidOptionsError("Interval limit must be greater than 0.")
    
  }
}

function isNumber(v: unknown) : v is number{
  return typeof v === "number"
}