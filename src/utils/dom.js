/**
 * 获取元素的几何属性
 * @param {*} el 需要查找的元素
 */
export async function getBound (el) {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery()
    query.select(el).boundingClientRect()
    query.exec(res => {
      if (!res[0]) {
        reject(Error('未找到'))
      } else {
        resolve(res[0])
      }
    })
  })
}
