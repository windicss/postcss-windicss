import { WindiPluginUtils, WindiPluginUtilsOptions } from '@windicss/plugin-utils'
import _debug from 'debug'

export enum TouchAsMode {
  Comment = 'Comment',
  UTimes = 'UTimes'
}

export interface WindiPostCSSPluginOptions extends WindiPluginUtilsOptions {
  touchAs: TouchAsMode
}

export interface Context {
  entry?: string
  utils?: WindiPluginUtils
}

export const context: Context = {}

export const isDev = process.env.NODE_ENV === 'development'
export const debug = _debug('postcss-windicss')
