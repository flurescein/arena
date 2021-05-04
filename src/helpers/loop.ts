export function loop(callback: (delta: number) => void) {
  let prev = Date.now()

  function loopedFunction() {
    requestAnimationFrame(() => {
      const now = Date.now()
      const delta = now - prev
      prev = now
      callback(delta)
      loopedFunction()
    })
  }
  loopedFunction()
}
