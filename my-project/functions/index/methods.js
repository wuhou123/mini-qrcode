// 爬虫
const request = require('request-promise')

const URL = {
  tengxunAPI: 'https://api.weixin.qq.com/sns/jscode2session'
}

module.exports = {
  getOpenId (item) {
    let obj = {
      appid: 'wx5691ba964617bf6b',
      secret: '81dd18b267b172cc31b2331c539b3a8b'
    }
    let params = Object.assign(item, obj)
    let options = {
      method: 'GET',
      url: URL.tengxunAPI,
      qs: params,
      json: true,
      allow_redirects: false,
      headers: {
        'content-type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
