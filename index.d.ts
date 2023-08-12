/**
 * A collection of utility functions for working with asynchronous code and
 * time-based operations
 */
export declare namespace Async {
  /**
	 * Delay by a given amount of milliseconds. This is a Promise-based wrapper
	 * around setTimeout
	 *
	 * @export
	 * @param {number} ms the amount of milliseconds to wait
	 * @returns {Promise<void>}
	 */
  function wait(ms: number): Promise<void>
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
  function delayed<T>(delay: number, callback: AsyncSupplier<T> | Supplier<T>): Promise<T>
  /**
	 * Schedules a function to be called at some date in the future
	 *
	 * @export
	 * @param {Date} date the date to call the function
	 * @param {VoidFunction} callback the function to be called
	 */
  function scheduled(date: Date, callback: VoidFunction): void
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
  function waitUntil(condition: Supplier<boolean | Promise<boolean>>, pollInterval?: number): Promise<void>
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
  function waitUntilResolved(timeout: number, condition: Supplier<boolean | Promise<boolean>>, pollInterval?: number): Promise<void>
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
  function awaitWithTimeout<T>(timeout: number, runner: AsyncSupplier<T>): Promise<T>
}
export type AsyncSupplier<T> = () => Promise<T>
export type Supplier<T> = () => T
export type VoidFunction = () => void

export {}
