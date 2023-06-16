
import { Async } from '../src'

describe('Async.waitUntil', () => {

  it('should wait until the condition is true', async () => {
    let i = 0
    const start = new Date().getTime()
    await Async.waitUntil(() => {
      i++
      return i === 3
    }, 100)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(200)
  })

  it('should wait until the condition is true asynchronously', async () => {
    const fn = async () => {
      await Async.wait(500)
      return true
    }
    const start = new Date().getTime()
    await Async.waitUntil(fn, 100)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(500)
  })
})

describe('Async.waitUntilResolved', () => {

  it('should wait until the promise is resolved', async () => {
    const fn = async () => {
      await Async.wait(500)
      return true
    }
    const start = new Date().getTime()
    await Async.waitUntilResolved(1000, fn)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(500)
  })

  it('should time out and reject the promise', async () => {
    let i = 0
    const fn = async () => {
      await Async.wait(500)
      i++
      return i === 3
    }
    await expect(() => Async.waitUntilResolved(500, fn)).rejects.toThrowError()
  })
})
