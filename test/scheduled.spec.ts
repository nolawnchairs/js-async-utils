
import { Async } from '../src'

describe('Async.scheduled', () => {

  it('should throw an error if the date is in the past', async () => {
    const past = new Date(Date.now() - 1000)
    expect(() => Async.scheduled(past, () => { })).toThrowError()
  })

  it('should not throw an error if the date is in the future', async () => {
    const future = new Date(Date.now() + 1000)
    expect(() => Async.scheduled(future, () => { })).not.toThrowError()
  })

  it('should call the function at the specified date', async () => {
    const start = Date.now()
    const date = new Date(start + 100)
    Async.scheduled(date, () => {
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(100)
      expect(end - start).toBeLessThan(110)
    })
  })
})
