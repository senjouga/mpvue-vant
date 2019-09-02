// 静态api
const MP_STATIC_API = [
  'stopRecord',
  'pauseVoice',
  'stopVoice',
  'canIUse',
  'onNetworkStatusChange',
  'onUserCaptureScreen',
  'showNavigationBarLoading', // 在当前页面显示导航条加载动画
  'hideNavigationBarLoading',
  'navigateBack',
  'createAnimation',
  'pageScrollTo',
  'stopPullDownRefresh',
  'createSelectorQuery',
  'createIntersectionObserver',
  'getUpdateManager',
  'createWorker',
  'reportMonitor'
]
// promise api
const MP_PROMISE_API = [
  'uploadFile',
  'downloadFile',
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'saveImageToPhotosAlbum',
  'startRecord',
  'playVoice',
  'saveFile',
  'getFileInfo',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'openDocument',
  'setStorage',
  'getStorage',
  'removeStorage',
  'clearStorage',
  'getLocation',
  'chooseLocation',
  'openLocation',
  'getSystemInfo',
  'getNetworkType',
  'makePhoneCall',
  'scanCode',
  'setClipboardData',
  'getClipboardData',
  'addPhoneContact',
  'showToast',
  'showLoading',
  'hideToast',
  'hideLoading',
  'showModal',
  'showActionSheet',
  'setNavigationBarTitle',
  'setNavigationBarColor',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'setTabBarStyle',
  'setTabBarItem',
  'showTabBar',
  'hideTabBar',
  'setTopBarText',
  'setTopBarText',
  'navigateTo',
  'redirectTo',
  'switchTab',
  'reLaunch',
  'startPullDownRefresh',
  'getExtConfig',
  'login',
  'checkSession',
  'authorize',
  'getUserInfo',
  'requestPayment',
  'showShareMenu',
  'hideShareMenu',
  'updateShareMenu',
  'getShareInfo',
  'chooseAddress',
  'addCard',
  'openCard',
  'openSetting',
  'getSetting',
  'getWeRunData',
  'navigateToMiniProgram',
  'navigateBackMiniProgram',
  'chooseInvoiceTitle',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'setEnableDebug',
  'sendSocketMessage'
]
/**
 * 讲带有success属性的方法进行promise转换
 * @param {any} funName 方法名称
 * @param {any} [opts={}] 传递给方法的参数
 * @returns promise
 */
function funTransferPromise (funName, opts = {}) {
  return new Promise((resolve, reject) => {
    opts.success = function (...args) {
      resolve(...args)
    }
    opts.fail = function (args) {
      reject(args)
    }
    wx[funName](opts)
  })
}
let funs = {}
MP_PROMISE_API.forEach(e => {
  funs[e] = function (opts) {
    return funTransferPromise(e, opts)
  }
})
MP_STATIC_API.forEach(e => {
  funs[e] = function (...args) {
    return wx[e](...args)
  }
})
/**
 * @desc 将wx大部分api进行promise封装
 * 不包括
 * getRecorderManager
 * 蓝牙，nfc，罗盘，ibeacon，加速度计，地图组件控制，音视频,绘图，
 */
export default funs
