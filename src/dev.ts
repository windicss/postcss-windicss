import { promises as fs } from 'fs'
import chokidar, { FSWatcher } from 'chokidar'
import exitHook from 'exit-hook'
import { touch } from './utils'
import { context, debug, WindiPostCSSPluginOptions } from './context'

let watcher: FSWatcher | undefined

export function shutdownWatcher() {
  if (watcher) {
    debug('shutting down watcher')
    watcher.close()
    watcher = undefined
  }
}
exitHook(shutdownWatcher)

export async function startDevWatcher(options: WindiPostCSSPluginOptions) {
  shutdownWatcher()

  debug('starting dev watcher')
  const utils = context.utils!
  await utils.ensureInit()

  const {
    touchMode = 'utime',
  } = options

  watcher = chokidar
    .watch(utils.options.scanOptions.include, {
      ignored: utils.options.scanOptions.exclude,
      ignoreInitial: true,
    })

  if (utils.configFilePath)
    watcher.add(utils.configFilePath)

  watcher
    .on('change', async(path) => {
      if (path === utils.configFilePath) {
        debug('reload config', utils.configFilePath)
        utils.init()
        return
      }

      debug('update from', path)
      await utils!.extractFile(await fs.readFile(path, 'utf-8'))
      if (context.entry)
        await touch(context.entry, touchMode)
    })

  if (context.entry)
    await touch(context.entry, touchMode)
}
