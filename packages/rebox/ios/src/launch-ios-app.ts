import { spawnChildProcess } from 'spown'
import { isUndefined } from 'tsfn'

export type TLaunchIosAppOptions = {
  appId: string,
  deviceId?: string,
}

export const launchIosApp = async (options: TLaunchIosAppOptions): Promise<void> => {
  await spawnChildProcess(
    `xcrun simctl launch ${isUndefined(options.deviceId) ? 'booted' : options.deviceId} ${options.appId}`,
    {
      stdout: null,
      stderr: process.stderr,
    }
  )
}
