import { performance } from 'perf_hooks'

const extractFunctionName = <T>(fn: () => T) => {
  const fnStr = fn.toString()
  const name = fnStr.substring(9, fnStr.indexOf('('))

  return name
}

export const performanceMeasure = async <T>(fn: () => T): Promise<T> => {
  const start = performance.now()
  const result = await fn()

  const end = performance.now()
  const executionTime = end - start

  const functionName = extractFunctionName(fn)
  console.log(`${functionName}: finished in: ${executionTime}ms`)
  return result
}
