

import { Async } from '../src'

describe('Async.wait', () => {

  it('should wait for 100ms', async () => {
    const start = new Date().getTime()
    await Async.wait(100)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(100)
  })
})

describe('Async.delayed', () => {

  it('should wait for 100ms and return the result', async () => {
    const start = new Date().getTime()
    const result = await Async.delayed(100, () => 1 + 1)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(100)
    expect(result).toBe(2)
  })

  it('should wait for 100ms and return a promise that resolves after another 100ms', async () => {
    const start = new Date().getTime()
    const result = await Async.delayed(100, () => Async.delayed(100, () => 1 + 1))
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(200)
    expect(result).toBe(2)
  })
})
