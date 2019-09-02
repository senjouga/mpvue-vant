/** @description
 * 最后多少条信息
 * 每页显示数
 * 页码
 */
export default class History {
  constructor (source, pageSize = 15) {
    if (!Array.isArray(source)) {
      throw Error('必须传入数组数据!')
    }
    this.source = source
    this.pageIndex = 1
    this.pageSize = pageSize
  }
  getLastRecord () {
    let clone = this.source.slice()
    this.pageIndex++
    return clone.splice(-Math.abs(this.pageSize))
  }
  getPreRecord () {
    let clone = this.source.slice()
    let index = this.pageIndex++
    return clone.splice(-index * this.pageSize, this.pageSize)
  }
  getNextRecord () {
    let clone = this.source.slice()
    let index = this.pageIndex--
    return clone.splice(-index * this.pageSize, this.pageSize)
  }
}
