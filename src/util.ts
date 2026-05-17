import { isNumber } from "./guards";

export interface TimeLike {
    toMilliseconds(): number;
}


export function delay(time: TimeLike | number): Promise<void> {
    const milliseconds = isNumber(time) ? time : time.toMilliseconds();
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}