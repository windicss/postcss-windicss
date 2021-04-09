import { WindiPluginUtils, WindiPluginUtilsOptions } from '@windicss/plugin-utils'
import _debug from 'debug'

export interface WindiPostCSSPluginOptions extends WindiPluginUtilsOptions {
  /**
   * By default, this plugin "touches" your css entry by updating the file's
   * "updated time" (utime) to trigger the hot reload without changing its content.
   *
   * It should work most of the time. But for some tools, they might also compare
   * the file's content to avoid unnecessary hot reloads. In that cases, you will
   * need to specify this option to "insert-comment" to get proper style updates with
   * those tools.
   *
   * @default 'utime'
   */
  touchMode?: 'utime' | 'insert-comment'
}

export interface Context {
  entry?: string
  utils?: WindiPluginUtils
}

export const context: Context = {}

export const isDev = process.env.NODE_ENV === 'development'
export const debug = _debug('postcss-windicss')
