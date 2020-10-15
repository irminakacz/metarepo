import plugin from '@start/plugin'
import type { StartDataFile, StartDataFilesProps } from '@start/plugin'

export default (callback: (file: string) => string) =>
  plugin('rename', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
    const path = await import('path')
    const { isDefined } = await import('tsfn')

    return {
      files: files.map((file): StartDataFile => {
        const newPath = callback(file.path)

        if (file.path === newPath) {
          return file
        }

        logPath(newPath)

        if (isDefined(file.map)) {
          return {
            path: newPath,
            data: file.data,
            map: {
              ...file.map,
              file: path.basename(newPath),
            },
          }
        }

        return {
          path: newPath,
          data: file.data,
        }
      }),
    }
  })
