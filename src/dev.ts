import { promises as fs } from 'fs'
import chokidar from 'chokidar'
import { touch } from './utils'
import { context, debug } from './context'

export async function startDevServer() {
  const utils = context.utils!
  await utils.ensureInit()

  chokidar
    .watch(utils.options.scanOptions.include, {
      ignored: utils.options.scanOptions.exclude,
      ignoreInitial: true,
    })
    .on('change', async(path) => {
      debug('update from', path)
      await utils!.extractFile(await fs.readFile(path, 'utf-8'))
      if (context.entry)
        touch(context.entry)
    })
}
