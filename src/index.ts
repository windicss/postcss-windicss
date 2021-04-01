import type { Plugin } from 'postcss'
import { parse } from 'postcss'
import { createUtils, WindiPluginUtilsOptions } from '@windicss/plugin-utils'
import { startDevWatcher } from './dev'
import { context, debug, isDev } from './context'

const plugin = (options: WindiPluginUtilsOptions = {}): Plugin => {
  if (!context.utils) {
    context.utils = createUtils({
      ...options,
      onOptionsResolved() {
        if (isDev)
          setTimeout(() => startDevWatcher())
      },
    }, {
      name: 'postcss-windicss',
    })

    if (isDev)
      debug('development mode')
    else
      debug('production mode')
  }

  const utils = context.utils

  return {
    postcssPlugin: 'postcss-windicss',
    async AtRule(atRule) {
      if (atRule.name === 'windicss') {
        context.entry = atRule.root().source?.input.from
        atRule.replaceWith(parse(await utils.generateCSS()))
      }
      else if (['apply', 'screen'].includes(atRule.name)) {
        const rule = atRule.parent!
        if (!rule)
          return

        await utils.ensureInit()
        const css = rule.toString()
        const transformed = css ? utils.transformCSS(css) : undefined
        if (transformed)
          rule.replaceWith(parse(transformed))
      }
    },
  }
}

export const postcss = true

plugin.postcss = true

module.exports = plugin
