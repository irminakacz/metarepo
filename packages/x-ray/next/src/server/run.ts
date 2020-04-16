import http from 'http'
import url, { UrlWithParsedQuery } from 'url'
import { isDefined } from 'tsfn'
import { unchunkJson } from 'unchunk'
import { TGetResponseQuery, TTotalResults } from '../types'
import { UI_HOST, UI_PORT, SERVER_PORT, SERVER_HOST } from '../constants'
import { getList } from './get-list'
import { getResult } from './get-result'
import { save } from './save'
import { TResultsType } from './types'

export type TRunServerOptions = {
  results: TTotalResults<TResultsType>,
  type: string,
  encoding: 'image' | 'text',
}

export const runServer = (options: TRunServerOptions) => new Promise<() => Promise<void>>((serverResolve, serverReject) => {
  const pathsMap = new Map<string, string>()

  for (const [key, value] of options.results) {
    pathsMap.set(key, value.name)
    pathsMap.set(value.name, key)
  }

  const savePromise = new Promise<void>((saveResolve, saveReject) => {
    const server = http
      .createServer(async (req, res) => {
        try {
          res.setHeader('Access-Control-Allow-Origin', `http://${UI_HOST}:${UI_PORT}`)

          if (isDefined(req.url)) {
            const urlData = url.parse(req.url, true) as UrlWithParsedQuery & {
              query: TGetResponseQuery,
            }

            if (req.method === 'GET' && urlData.pathname === '/list') {
              const list = getList({
                results: options.results,
                encoding: options.encoding,
              })

              res.end(JSON.stringify(list))

              return
            }

            if (req.method === 'GET' && urlData.pathname === '/get') {
              const result = getResult({
                results: options.results,
                pathsMap,
                query: urlData.query,
              })

              if (result === null) {
                throw new Error(`Invalid get request: ${req.url}`)
              }

              if (options.encoding === 'image') {
                res.setHeader('Content-Type', 'image/png')
                res.end(Buffer.from(result), 'binary')
              } else {
                res.end(result)
              }

              return
            }

            if (req.method === 'POST' && req.url === '/save') {
              const keys = await unchunkJson<string[]>(req)

              await save({
                results: options.results,
                pathsMap,
                keys,
                type: options.type,
                encoding: options.encoding,
              })

              res.end()
              server.close((error) => {
                if (error) {
                  saveReject(error)
                } else {
                  saveResolve()
                }
              })

              return
            }
          }

          res.end()
        } catch (error) {
          res.end()
          server.close()
          saveReject(error)
        }
      })
      .once('error', serverReject)
      .listen(SERVER_PORT, SERVER_HOST, () => {
        serverResolve(() => savePromise)
      })
  })
})
