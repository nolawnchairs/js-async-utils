
import { Async } from '../src'

describe('Async.scheduled', () => {

  it('should throw an error if the date is in the past', async () => {
    const past = new Date(Date.now() - 100)
    expect(() => Async.scheduled(past, () => { })).toThrowError()
  })

  it('should call the function at the specified date', async () => {
    const start = Date.now()
    const date = new Date(start + 100)
    Async.scheduled(date, async () => {
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(100)
    })
  })
})
