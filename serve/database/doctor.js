const database = require('../database.js')
const Doctor = database.Doctor
// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// Doctor.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// Doctor.find({}, function (err, doc) {
//   console.log('find Doctor')
//   console.log(doc)
// })
// // 新建
// Doctor.create({
//   subject:'children_bone',
//   name: '刘医生',
//   sex: 1,
//   position: '主治医生',
//   state: 1,
//   introduce: '擅长看病',
// })
// Doctor.create({
//   subject:'children_pain',  
//   name: '王医生',
//   sex: 0,
//   position: '主治医生',
//   state: 0,
//   introduce: '擅长看病',
// })
// Doctor.create({
//   subject:'children_pediatric_department',  
//   name: '李医生',
//   sex: 0,
//   position: '主治医生',
//   state: 0,
//   introduce: '擅长看病',
// })

module.exports = {
  getDoctors: ({ subject }) => {
    return new Promise(function (resolve, reject) {
      Doctor.find({ subject }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getAllDoctor: () => {
    return new Promise(function (resolve, reject) {
      Doctor.find({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getADoctor: () => {
    return new Promise(function (resolve, reject) {
      Doctor.findOne({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}