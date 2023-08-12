
type VoidFunction = () => void
type Supplier<T> = () => T
type AsyncSupplier<T> = () => Promise<T>

/**
 * A collection of utility functions for working with asynchronous code and
 * time-based operations
 */
export namespace Async {

  /**
   * Delay by a given amount of milliseconds. This is a Promise-based wrapper
   * around setTimeout
   *
   * @export
   * @param {number} ms the amount of milliseconds to wait
   * @returns {Promise<void>}
   */
  export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Delays execution of a function for a given amount of milliseconds and
   * returns the result from that function. This is a Promise-based wrapper
   * around setTimeout
   *
   * @export
   * @param {number} delay the amount of milliseconds to wait
   * @param {AsyncSupplier<T> | Supplier<T>} callback the supplier function to be called
   * @returns {Promise<T>}
   */
  export async function delayed<T>(delay: number, callback: AsyncSupplier<T> | Supplier<T>): Promise<T> {
    await wait(delay)
    return callback()
  }

  /**
   * Schedules a function to be called at some date in the future
   *
   * @export
   * @param {Date} date the date to call the function
   * @param {VoidFunction} callback the function to be called
   */
  export function scheduled(date: Date, callback: VoidFunction) {
    const now = Date.now()
    const delay = date.getTime() - now
    if (delay < 0) {
      const attempt = date.getTime()
      const diff = attempt - now
      throw new Error(`Cannot schedule a task for a date in the past. Attempted to schedule for ${attempt} (${diff}ms)`)
    }
    wait(delay).then(callback)
  }

  /**
   * Waits until the provided condition is met. This will not resolve until the
   * condition is true. To use a timeout or handle a condition that may return
   * false, use Futures.waitUntilResolved instead
   *
   * @export
   * @param {(Supplier<boolean | Promise<boolean>>)} condition the condition to be met
   * @param {number} [pollInterval=1] the time in milliseconds between intervals
   * @returns {*}  {Promise<void>}
   */
  export async function waitUntil(condition: Supplier<boolean | Promise<boolean>>, pollInterval: number = 1): Promise<void> {
    return new Promise(resolve => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        }
      }, pollInterval)
    })
  }

  /**
   * Waits until the provided condition is met, then resolves unless the
   * condition returns false or timeout is reached, then will reject. Use inside
   * a try/catch
   *
   * @export
   * @param {number} timeout the amount in milliseconds to wait
   * @param {(Supplier<boolean | Promise<boolean>>)} condition the condition to be met
   * @param {number} [pollInterval=1] the time in milliseconds between intervals
   * @returns {*}  {Promise<void>}
   */
  export async function waitUntilResolved(timeout: number, condition: Supplier<boolean | Promise<boolean>>, pollInterval: number = 1): Promise<void> {
    const start = new Date().getTime()
    return new Promise((resolve, reject) => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        } else {
          const countdown = (start + timeout) - new Date().getTime()
          if (countdown < 0) {
            clearInterval(i)
            reject(new Error(`Timeout of ${timeout}ms expired while awaiting condition to resolve`))
          }
        }
      }, pollInterval)
    })
  }

  /**
   * Calls an async supplier function and will attempt to return its resolved
   * value within the allotted timeout. If the function does not resolve before
   * the timeout expires, an error is thrown. If the function throws an error
   * before the timeout expires, that error is thrown.
   *
   * @export
   * @template T
   * @param {number} timeout
   * @param {AsyncSupplier<T>} runner
   * @return {*}  {Promise<T>}
   */
  export async function awaitWithTimeout<T>(timeout: number, runner: AsyncSupplier<T>): Promise<T> {
    return Promise.race([
      new Promise<T>((resolve, reject) => runner()
        .then(resolve)
        .catch(reject)
      ),
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout of ${timeout} expired while awaiting runner function to resolve`)), timeout)
      })
    ])
  }
}
