
/**
 * 节流函数
 */
export default function throttle (fun, wait = 200) {
  let clock
  return function (...args) {
    if (clock) clearTimeout(clock)
    clock = setTimeout(() => {
      fun.apply(this, args)
    }, wait)
  }
}
