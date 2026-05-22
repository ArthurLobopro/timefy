# timefy

A simple and intuitive library for time manipulation, timeouts, and intervals in TypeScript/JavaScript.

## Installation

You can install the library using npm or yarn:

```bash
# npm
npm install @arthur-lobo/timefy

# yarn
yarn add @arthur-lobo/timefy
```

## How to use

### The `t` function

The `t` function is a utility to create time objects in a readable way. You can convert values to different units or use them directly in other classes within the library.

```typescript
import { t } from '@arthur-lobo/timefy';

const time = t(5, 'm'); // 5 minutes

console.log(time.toMilliseconds()); // 300000
console.log(time.toSeconds());      // 300
```

Supported units: `ms`, `s`, `m`, `h`, `d`, `w` (and their long forms like `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `weeks`).

### Timeout

The `Timeout` class allows you to execute a function after a specific period. You can pass a number (in milliseconds) or an object created by the `t` function.

```typescript
import { Timeout, t } from '@arthur-lobo/timefy';

const myTimeout = new Timeout(t(2, 's'), () => {
  console.log('Executed after 2 seconds!');
});

myTimeout.start();

// You can also auto-start by passing true as the third parameter
new Timeout(500, () => console.log('Fast!'), true);
```

### Interval

The `Interval` class allows you to execute a function repeatedly at a defined interval. Just like with `Timeout`, you can use the `t` function to define the interval.

```typescript
import { Interval, t } from '@arthur-lobo/timefy';

const myInterval = new Interval(t(1, 'h'), () => {
  console.log('Running every 1 hour');
});

myInterval.start();

// To stop the interval:
// myInterval.stop();
```
