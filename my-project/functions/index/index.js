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
      break
    case 'del':
      let obj = cloud.database()
      res = await new Promise((resolve, reject) => {
        obj
          .collection('list')
          .doc(event.id)
          .remove({
            success: res => {
              resolve(res)
            },
            fail: err => {
              reject(err)
            }
          })
      })
      break
    case 'renewName':
      let run = cloud.database()
      res = await new Promise((resolve, reject) => {
        run
          .collection('list')
          .doc(event.list.id)
          .update({
            data: {
              url: {
                name: event.list.name
              }
            }
          })
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
      break
  }
  return {
    home: res
  }
}
