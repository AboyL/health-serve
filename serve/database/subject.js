const database = require('../database.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// database.Subject.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// database.Subject.find({}, function (err, doc) {
//   console.log('find subject')
//   console.log(doc)
// })
// // 新建
// database.Subject.create({
//   label: '外科门诊',
//   value: 'surgery_department',
//   children: [
//     {
//       label: '骨科门诊',
//       value: 'children_bone'
//     }, {
//       label: '疼痛门诊',
//       value: 'children_pain'
//     }
//   ]
// })
// database.Subject.create({
//   label: '儿科门诊',
//   value: 'pediatric_department',
//   children: [
//     {
//       label: '儿科门诊',
//       value: 'children_pediatric_department'
//     }
//   ]
// })

module.exports = {
  getAllSubject: () => {
    return new Promise(function (resolve, reject) {
      database.Subject.find({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}