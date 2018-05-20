const database = require('../database.js')
const MedicalHistory=database.MedicalHistory
// const util = require('../util/util.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// MedicalHistory.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// MedicalHistory.find({}, function (err, doc) {
//   console.log('find MedicalHistory')
//   console.log(doc)
//   console.log( util.getFormatDate(new Date()))
// })
// // 新建
// MedicalHistory.create({
//   userId: '5af90f1ace75de2ee01bd736',
//   doctorId: '5af931e8c7a87a2220bf5a46',
//   checkSheetId:'5b01a969009fd131cc126988',
//   symptom: '发烧10天',
//   result: '流行性感冒',
//   recipe: [
//     {
//       name: '阿莫西林',
//       number: 3,
//       unit: '盒',
//       frequency: 3
//     }
//   ],
//   createTime: util.getFormatDate(new Date()),
// })


module.exports = {
  getMedicalHistorys: ({ userId }) => {
    return new Promise(function (resolve, reject) {
      MedicalHistory.find({ userId }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}