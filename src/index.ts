import type { Plugin } from 'postcss'
import { parse } from 'postcss'
import { createUtils, WindiPluginUtilsOptions } from '@windicss/plugin-utils'
import { startDevServer } from './dev'
import { context, debug } from './context'

export type { defineConfig } from 'windicss/helpers'

const isDev = process.env.NODE_ENV === 'development'

const plugin = (options: WindiPluginUtilsOptions = {}): Plugin => {
  const utils = context.utils = createUtils(options, { name: 'postcss-windicss' })

  if (isDev) {
    debug('start dev server', options)
    startDevServer()
  }
  else {
    debug('production mode')
  }

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

plugin.postcss = true

module.exports = plugin
