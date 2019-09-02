import {APP_ID, APP_KEY} from '../config'
import CryptoJS from 'crypto-js'

export function formatePayData (res) {
  let prepayId = res.packagedate.split('=')[1]
  let key = APP_KEY // 商户key必填，在商户后台获得
  let appId = APP_ID // appid必填
  let timeStamp = createTimeStamp()
  let nonceStr = randomString()
  let stringSignTemp = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=prepay_id=' + prepayId + '&signType=MD5&timeStamp=' + timeStamp + '&key=' + key
  console.log('签名字符串', stringSignTemp)
  let sign = CryptoJS.MD5(stringSignTemp).toString().toUpperCase()
  // let sign = md5.md5(stringSignTemp).toUpperCase()
  console.log('签名', sign)
  let param = { 'timeStamp': timeStamp, 'package': 'prepay_id=' + prepayId, 'paySign': sign, 'signType': 'MD5', 'nonceStr': nonceStr }
  console.log('param小程序支付接口参数', param)
  return param
}

function createTimeStamp () {
  return parseInt(new Date().getTime() / 1000) + ''
}
/* 随机数 */
function randomString () {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  let maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
