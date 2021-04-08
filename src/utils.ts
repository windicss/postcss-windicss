import { promises as fs } from 'fs'
import { TouchAsMode } from './context'

const TOUCH_STR = 'WindiCSS-Touch:'
const TOUCH_REG = new RegExp(`\\/\\* ${TOUCH_STR} \\d+ \\*\\/\n*`)

export async function touch(path: string, touchAs: TouchAsMode = TouchAsMode.UTimes) {
  let css = await fs.readFile(path, 'utf-8')
  switch (touchAs) {
    case TouchAsMode.Comment:
      css = css.replace(TOUCH_REG, '')
      css = `/* ${TOUCH_STR} ${Date.now()} */\n${css}`
      break
    case TouchAsMode.UTimes:
    default:
  }
  await fs.writeFile(path, css, 'utf-8')
}
