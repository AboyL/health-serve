const database = require('../database.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// database.Doctor.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// database.Doctor.find({}, function (err, doc) {
//   console.log('find Doctor')
//   console.log(doc)
// })
// // 新建
// database.Doctor.create({
//   subject:'children_bone',
//   name: '笑嘻嘻',
//   sex: 1,
//   position: '主治医生',
//   state: 1,
//   introduce: '擅长看病',
// })
// database.Doctor.create({
//   subject:'children_pain',  
//   name: 'mmp',
//   sex: 0,
//   position: '主治医生',
//   state: 0,
//   introduce: '擅长看病',
// })
// database.Doctor.create({
//   subject:'children_pediatric_department',  
//   name: '再见啦',
//   sex: 0,
//   position: '主治医生',
//   state: 0,
//   introduce: '擅长看病',
// })

module.exports = {
  getDoctors: ({ subject }) => {
    return new Promise(function (resolve, reject) {
      database.Doctor.find({subject}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}