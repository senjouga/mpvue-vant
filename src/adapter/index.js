// 桥接层 代码复用

export {default as Http} from './mp/http'

// if (process.env.NODE_ENV === 'test') {
//   exports.Http = require('./h5').Http
// }
export {
  updateTitle,
  Loading,
  Toast,
  Alert,
  Confirm
} from './mp'
