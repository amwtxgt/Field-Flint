const child = require('child_process')

/**
 * @用途 结束掉f2所有进程，预防没有关闭干净
 * @author 黄敏
 * @创建时间 2022-10-26 17:20
 **/

export default function killF2(name: string, cb: Function) {
  let cmd = process.platform === 'win32' ? 'tasklist' : 'ps aux'
  child.exec(cmd, function (err: string, stdout: string) {
    if (err) {
      console.error(err)
    }

    stdout.split('\n').forEach((line: string) => {
      let processMessage = line.trim().split(/\s+/)
      let processName = processMessage[0] //processMessage[0]进程名称 ， processMessage[1]进程id
      if (processName === name) {
        try {
          console.log('关闭进程', processMessage[1])
          process.kill(Number(processMessage[1]))
        } catch (e: unknown) {
          console.log('关闭线程错误', e.toString())
        }
      }
    })

    cb()
  })
}
