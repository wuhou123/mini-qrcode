const cloud = require('wx-server-sdk')
const methods = require('./methods.js')
cloud.init()

exports.main = async (event, context) => {
  let res = {}
  switch (event.type) {
    case 'addUrl':
      let db = cloud.database()
      let List = db.collection('list')
      res = await new Promise((resolve, reject) => {
        List.add({
          data: event.list,
          success: function (res) {
            resolve(event)
          },
          fail: function (error) {
            reject(error)
          }
        })
      })
      break
    case 'getOpenId':
      res = await methods.getOpenId(event)
  }
  return {
    home: res
  }
}
