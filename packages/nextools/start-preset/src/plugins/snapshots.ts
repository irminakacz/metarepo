import plugin from '@start/plugin'
import type { StartFilesProps } from '@start/plugin'
import type { TOptions } from '@x-ray/common-utils'

export default (options: TOptions) =>
  plugin<StartFilesProps, void>('x-ray-snapshots', () => async ({ files }) => {
    const { runFiles } = await import('@x-ray/snapshots')

    return runFiles(files.map((file) => file.path), options)
  })
