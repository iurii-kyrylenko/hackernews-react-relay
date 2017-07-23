import { timeDifference } from './timeDiff'

it('should diff [0..20s)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2015-11-22T13:57:32.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('just now')
})

it('should diff [20s..1min)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2015-11-22T13:57:05.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('less than 1 min ago')
})

it('should diff [1min..1hour)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2015-11-22T12:58:23.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('59 min ago')
})

it('should diff [1hour..1day)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2015-11-21T12:58:23.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('23 hours ago')
})

it('should diff [1day..1month)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2015-10-22T12:58:23.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('30 days ago')
})

it('should diff [1month..1year)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2014-11-22T12:58:23.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('11 monts ago')
})

it('should diff [1year..)', () => {
  const curr = new Date("2015-11-22T13:57:35.123Z")
  const prev = new Date("2012-11-22T12:58:23.123Z")
  const result = timeDifference(curr, prev)
  expect(result).toEqual('2 years ago')
})
