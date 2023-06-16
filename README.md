# Async Utils

The `Async` package contains functions that wrap the nastiness of `setTimeout` and allow cleaner code geared towards usage alongside `async/await`, as well as some abstractions that use timeouts and intervals to perform time-sensitive tasks.

## Installation

```
npm i @nolawnchairs/async
yard add @nolawnchairs/async
```

## Usage


### `Async.wait`
```typescript
async (ms: number) => Promise<void>
```
An asynchrounous function that waits for a given number of milliseconds `ms` and resolves. This is a convenience wrapper around `setTimeout`
```typescript
async function foo() {
    console.log('Before')
    await Async.wait(1000)
    console.log('This prints one second later')
}
```

### `Async.delayed`
```typescript
async <T>(ms: number, callback: AsyncSupplier<T>) => Promise<T>
```

Delays execution of a function `callback` for a given amount of milliseconds `ms`, then returns the result of the callback.

```typescript
function foo() {
    console.log('Before')
    Async.delayed(1000, () => console.log('This prints one second later'))
    const result = await Async.delayed(1000, () => 1 + 1)
    console.log(result) // 2
}
```

### `Async.scheduled`
```typescript
async (date: Date, callback: VoidFunction) => void
```

Schedules execution of a function `callback` to a specific date. This is a simple wrapper around `setTimeout` that does not save state, and should only be used on the backend, as using it on the front end will not re-schedule tasks after a page reload.

```typescript
const date = new Date((Date.now() + 3600) * 1000)
Async.scheduled(date, () => console.log('This will be called in one hour'))
```

### `Async.waitUntil`
```typescript
async (condition: AsyncSupplier<boolean>, waitInterval?: number) => Promise<void>
```
For usage in an `async` function, this will delay progression of the async function until the boolean result of `condition` resolves to true. If the supplier never resolves, the function will not continue. Internally, this uses `setInterval` to check the truthiness of the supplier's outcome. The default interval frequency is `1` millisecond, but can be changed to a more lazy frequency by passing a millisecond value to `waitInterval`.

```typescript
async function foo() {
    console.log('Before')
    await Async.waitUntil(() => resourcesAreLoaded())
    console.log('This will print when resources are loaded')
}
```

### `Async.waitUntilResolved`
```typescript
async (timeout: number, condition: AsyncSupplier<boolean>, waitInterval?: number) => Promise<void>
```
This does the same thing as `Async.waitUntil`, except that it takes a `timeout` in milliseconds as the first agument and will reject if the condition is not met before the timeout expires. Use inside of a `try/catch` block.

```typescript
async function foo() {
    console.log('Before')
    try {
        await Async.waitUntilResolved(2000, () => resourcesAreLoaded())
        console.log('Resources loaded within 2 seconds')
    } catch {
        console.error('Resources were not loaded within 2 seconds')
    }
}
```

### `Async.awaitWithTimeout`
```typescript
async <T>(timeout: number, runner: AsyncSupplier<T>) => Promise<T>
```
For usage in an `async` function, this calls an async supplier function and will attempt to return its resolved value within the allotted timeout. If the function does not resolve before the timeout expires, an error is thrown. Use inside of a `try/catch` block.

```typescript
try {
    const value = await Async.awaitWithTimeout<any>(10000, () => somePromiseThatMayNeverResolve())
    console.log('It resolved, we got the value!')
} catch {
    console.error('It never resolved, so timed out after 10000ms 💩')
}
```