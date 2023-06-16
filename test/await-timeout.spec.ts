
import { Async } from '../src'

describe('Async.awaitWithTimeout', () => {

  it('should await and resolve', async () => {
    const fn = async () => await Async.wait(200)
    expect(Async.awaitWithTimeout(500, fn)).resolves.toBeUndefined()
  })

  it('should await and reject if the timeout is reached', async () => {
    const fn = async () => await Async.wait(500)
    expect(Async.awaitWithTimeout(100, fn)).rejects.toThrowError()
  })
})
