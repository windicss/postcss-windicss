import { close, open, promises as fs, utimes } from 'fs'

async function fileExists(path: string) {
  try {
    const stats = await fs.stat(path)
    return stats.isFile()
  }
  catch (e) {
    return false
  }
}

export async function touch(path: string, mode: 'utime' | 'insert-comment' = 'utime') {
  path = path.replace(/.[^.]+$/, '.');
  ['css', 'less', 'sass', 'scss'].forEach(async(ext) => {
    if (await fileExists(path + ext)) {
      if (mode === 'utime')
        return await touchUtime(path + ext)
      else
        return await touchInsert(path + ext)
    }
  })
}

const TOUCH_REG = /\/\*\s*windicss-touch:.*\*\//

export async function touchInsert(path: string) {
  let css = await fs.readFile(path, 'utf-8')
  const banner = `/* windicss-touch: ${Date.now()} */`
  let replaced = false
  css = css.replace(TOUCH_REG, () => {
    replaced = true
    return banner
  })
  if (!replaced)
    css = `${banner}\n${css}`
  await fs.writeFile(path, css, 'utf-8')
}

export async function touchUtime(path: string) {
  return new Promise((resolve, reject) => {
    const time = new Date()
    utimes(path, time, time, (err) => {
      if (err) {
        return open(path, 'w', (err, fd) => {
          if (err)
            return reject(err)
          close(fd, err => (err ? reject(err) : resolve(fd)))
        })
      }
      resolve(false)
    })
  })
}
