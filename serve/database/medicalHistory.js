const database = require('../database.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// database.MedicalHistory.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
database.MedicalHistory.find({}, function (err, doc) {
  console.log('find MedicalHistory')
  console.log(doc)
})
// // 新建
// database.MedicalHistory.create({
//   userId: '5aee6372e512b826ec3e4295',
//   doctorId: '5aeecc272e0876496cc01f78',
//   symptom: '发烧10天',
//   result: '流行性感冒',
//   introduce: '擅长看病',
//   recipe: [
//     {
//       name: '阿莫西林',
//       number: 3,
//       unit: '盒',
//       frequency: 3
//     }
//   ],
//   createTime: '2017-12-12 12:15:12'
// })


module.exports = {
  getMedicalHistorys: ({ userId }) => {
    return new Promise(function (resolve, reject) {
      database.MedicalHistory.find({ userId }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}