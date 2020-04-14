import path from 'path'
import { reduce } from 'iterama'
import { TListItems, TResults } from '../types'

type TIterableType<T> = T extends Iterable<infer U> ? U : never

export type TListResponse = {
  type: 'image',
  files: string[],
  items: TListItems,
}

export const getList = (results: TResults, pathMap: Map<string, string>): TListResponse => {
  const shortPaths = []

  for (const longPath of results.keys()) {
    const shortPath = path.basename(longPath, '.tsx')

    pathMap.set(shortPath, longPath)
    pathMap.set(longPath, shortPath)

    shortPaths.push(shortPath)
  }

  // TODO
  // const shortPaths = await pAll<string>(
  //   Object.keys(results).map((longPath) => async () => {
  //     // const packageDir = await pkgDir(path.dirname(longPath))

  //     // if (isUndefined(packageDir)) {
  //     //   throw new Error(`Cannot find package dir for "${longPath}"`)
  //     // }

  //     // const shortPath = path.relative(path.resolve('packages/'), packageDir)
  //     const shortPath = path.basename(longPath, '.tsx')

  //     pathMap.set(shortPath, longPath)
  //     pathMap.set(longPath, shortPath)

  //     return shortPath
  //   }),
  //   { concurrency: SHORT_PATH_CONCURRENCY }
  // )

  const items = reduce((acc, [longPath, checkResults]: TIterableType<TResults>) => {
    for (const [id, result] of checkResults.entries()) {
      const key = `${pathMap.get(longPath)}:${id}`

      switch (result.type) {
        case 'NEW': {
          acc[key] = {
            type: 'NEW',
            width: result.width,
            height: result.height,
          }

          break
        }
        case 'DIFF': {
          acc[key] = {
            type: 'DIFF',
            newWidth: result.newWidth,
            newHeight: result.newHeight,
            origWidth: result.origWidth,
            origHeight: result.origHeight,
          }

          break
        }
        case 'DELETED': {
          acc[key] = {
            type: 'DELETED',
            width: result.width,
            height: result.height,
          }

          break
        }
      }
    }

    return acc
  },
  {} as TListItems)(results)

  return {
    type: 'image',
    files: shortPaths,
    items,
  }
}
