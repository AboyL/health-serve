const database = require('../database.js')
const util = require('../util/util.js')
// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// database.Counsel.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
database.Counsel.find({}, function (err, doc) {
  console.log('find Counsel')
  console.log(doc)
})
// // 新建
// database.Counsel.create({
//   userId:'5aee6372e512b826ec3e4295',
//   doctorId:'5aeecc272e0876496cc01f78',
//   question: '我也不知道怎么办',
//   isReply: true,
//   answer: '你说怎么办就怎么办',
//   createTime: '2018-12-8 12:12:12',
//   introduce: '擅长看病',
// })

module.exports = {
  createCounsel: ({ question, userId, doctorId }) => {
    let createTime = util.getFormatDate()
    let isReply = false
    return new Promise(function (resolve, reject) {
      database.Counsel.create({ question, userId, doctorId, createTime, isReply }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getCounsels: ({ userId }) => {
    return new Promise(function (resolve, reject) {
      database.Counsel.find({ userId, isReply: true }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}