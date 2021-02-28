import path from 'path'
import plugin from '@start/plugin'
import type { StartPlugin } from '@start/plugin'
import copy from '@start/plugin-copy'
import env from '@start/plugin-env'
import find from '@start/plugin-find'
import inputFiles from '@start/plugin-input-files'
import babel from '@start/plugin-lib-babel'
import typescriptGenerate from '@start/plugin-lib-typescript-generate'
import parallel from '@start/plugin-parallel'
import read from '@start/plugin-read'
import remove from '@start/plugin-remove'
import rename from '@start/plugin-rename'
import sequence from '@start/plugin-sequence'
import write from '@start/plugin-write'
import copyAssets from './plugins/copy-assets'

export const buildAssets = async (dir: string) => {
  const packageJsonPath = path.resolve(dir, 'package.json')
  const { default: packageJson } = await import(packageJsonPath)

  return copyAssets(dir, packageJson.buildAssets)
}

export const buildWeb = async (dir: string): Promise<StartPlugin<{}, {}>> => {
  const { babelConfigWebBuild } = await import('@nextools/babel-config')

  return sequence(
    find([
      `${dir}/src/**/*.{js,ts,tsx}`,
      `!${dir}/src/**/*.{native,ios,android}.{js,ts,tsx}`,
      `!${dir}/src/**/*.d.ts`,
    ]),
    read,
    babel(babelConfigWebBuild),
    rename((file) => file.replace(/\.(ts|tsx)$/, '.js')),
    write(`${dir}/build/web/`)
  )
}

export const buildReactNative = async (dir: string): Promise<StartPlugin<{}, {}>> => {
  const { babelConfigReactNativeBuild } = await import('@nextools/babel-config')
  const { default: globby } = await import('globby')
  const allFiles = await globby(
    [
      `${dir}/src/**/*.{js,ts,tsx}`,
      `!${dir}/src/**/*.d.ts`,
    ],
    {
      ignore: ['node_modules/**'],
      deep: Infinity,
      onlyFiles: true,
    }
  )
  const extRegExp = /\.(js|ts|tsx)$/
  const nativeFiles = allFiles.filter((file) => {
    if (allFiles.includes(file.replace(extRegExp, '.native.$1'))) {
      return false
    }

    if (allFiles.includes(file.replace(extRegExp, '.ios.$1'))) {
      return false
    }

    if (allFiles.includes(file.replace(extRegExp, '.android.$1'))) {
      return false
    }

    return true
  })

  return inputFiles(
    sequence(
      read,
      babel(babelConfigReactNativeBuild),
      rename((file) => file.replace(/(\.native)?\.(ts|tsx)$/, '.js')),
      write(`${dir}/build/native/`)
    )
  )(...nativeFiles)
}

export const buildNode = async (dir: string): Promise<StartPlugin<{}, {}>> => {
  const { babelConfigNodeBuild } = await import('@nextools/babel-config')

  return sequence(
    env({ BABEL_ENV: 'production' }),
    find([
      `${dir}/src/**/*.{js,ts,tsx}`,
      `!${dir}/src/**/*.{native,ios,android}.{js,ts,tsx}`,
      `!${dir}/src/**/*.d.ts`,
    ]),
    read,
    babel(babelConfigNodeBuild),
    rename((file) => file.replace(/\.(ts|tsx)$/, '.js')),
    write(`${dir}/build/node/`),
    plugin('test', () => async () => {
      const path = await import('path')
      const { access } = await import('pifs')
      const fullPath = path.resolve(`${dir}/build/node/index.js`)
      let hasFile = false

      try {
        await access(fullPath)
        hasFile = true
      } catch {}

      if (hasFile) {
        await import(fullPath)
      }
    })
  )
}

export const buildNodeESM = async (dir: string): Promise<StartPlugin<{}, {}>> => {
  const { babelConfigNodeESMBuild } = await import('@nextools/babel-config')

  return sequence(
    env({ BABEL_ENV: 'production' }),
    find([
      `${dir}/src/**/*.{js,ts,tsx}`,
      `!${dir}/src/**/*.{native,ios,android}.{js,ts,tsx}`,
      `!${dir}/src/**/*.d.ts`,
    ]),
    read,
    babel(babelConfigNodeESMBuild),
    rename((file) => file.replace(/\.(ts|tsx)$/, '.js')),
    write(`${dir}/build/node/`)
  )
}

export const buildTypes = (dir: string): StartPlugin<{}, {}> =>
  sequence(
    typescriptGenerate(`${dir}/src/`, `${dir}/build/types/`),
    find(`${dir}/src/**/*.d.ts`),
    copy(`${dir}/build/types/`)
  )

export const buildPackage = async (packageDir: string): Promise<StartPlugin<{}, {}>> => {
  const dir = path.join('packages', packageDir)
  const packageJsonPath = path.resolve(dir, 'package.json')
  const { default: packageJson } = await import(packageJsonPath)

  const tasks = []

  if (Reflect.has(packageJson, 'main') || Reflect.has(packageJson, 'bin')) {
    if (packageJson.type === 'module') {
      tasks.push('buildNodeESM')
    } else {
      tasks.push('buildNode')
    }
  }

  if (Reflect.has(packageJson, 'browser')) {
    tasks.push('buildWeb')
  }

  if (Reflect.has(packageJson, 'react-native')) {
    tasks.push('buildReactNative')
  }

  if (Reflect.has(packageJson, 'buildAssets')) {
    tasks.push('buildAssets')
  }

  if (Reflect.has(packageJson, 'buildTasks')) {
    tasks.push(...packageJson.buildTasks)
  }

  if (Reflect.has(packageJson, 'main') || Reflect.has(packageJson, 'browser') || Reflect.has(packageJson, 'react-native') || Reflect.has(packageJson, 'types')) {
    tasks.push('buildTypes')
  }

  return sequence(
    env({ NODE_ENV: 'production' }),
    find(`${dir}/build/`),
    remove,
    parallel(tasks)(dir)
  )
}

export const build = async (...packageDirs: string[]): Promise<StartPlugin<{}, {}>> => {
  if (packageDirs.length > 0) {
    return sequence(
      // @ts-ignore
      ...packageDirs.map(buildPackage)
    )
  }

  const { default: prompts } = await import('prompts')
  const { getPackages } = await import('@auto/fs')
  const { suggestFilter, makeRegExp } = await import('./utils')

  const baseDir = path.resolve('packages')
  const packages = await getPackages()
  const choices = Object.keys(packages)
    .map((name) => ({
      title: name.replace(/^@/, ''),
      value: path.relative(baseDir, packages[name].dir),
    }))
  const packageNames: string[] = []

  while (true) {
    const { packageName } = await prompts({
      type: 'autocomplete',
      name: 'packageName',
      message: 'Type package name',
      limit: 20,
      choices: choices.filter((choice) => !packageNames.includes(choice.value)),
      suggest: suggestFilter(packageNames.length > 0 ? '(done)' : null),
    }) as { packageName?: string }

    if (typeof packageName === 'undefined') {
      throw new Error('Package name is required')
    }

    if (packageName === '-') {
      break
    }

    if (packageName === '*') {
      return sequence(
        // @ts-ignore
        ...choices.map(({ value }) => buildPackage(value))
      )
    }

    if (packageName.includes('*')) {
      const regExp = makeRegExp(packageName)
      const filteredpackages = choices
        .map(({ value }) => value)
        .filter((value) => regExp.test(value))

      packageNames.push(...filteredpackages)

      continue
    }

    packageNames.push(packageName)
  }

  return sequence(
    // @ts-ignore
    ...packageNames.map(buildPackage)
  )
}
