import { promises as fs, utimes, open, close } from 'fs'

export async function touch(path: string, mode: 'utime' | 'insert-comment' = 'utime') {
  if (mode === 'utime')
    return await touchUtime(path)
  else
    return await touchInsert(path)
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
