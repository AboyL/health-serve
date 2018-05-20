const database = require('../database.js')
const CheckSheet = database.CheckSheet
// const util = require('../util/util.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// CheckSheet.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// CheckSheet.find({}, function (err, doc) {
//   console.log('find CheckSheet')
//   console.log(doc)
// })
// // 新建
// CheckSheet.create(  {
//   createTime: util.getFormatDate(new Date()),
//   result:[
//     {
//       name:'白细胞',//项目名称
//       key:'white_blood_cells',
//       unit: '10^9/L',
//       count:'10.06',//数值
//     },{
//       name:'红细胞数',//项目名称
//       key:'red_blood_cells',
//       unit: '10^12/L',
//       count:'5.00',//数值
//     },{
//       name:'血红蛋白浓度',//项目名称
//       key:'hemoglobin',
//       unit: 'g/L',
//       count:'158',//数值
//     }
//   ]
// })


module.exports = {
  getCheckSheet: ({_id}) => {
    return new Promise(function (resolve, reject) {
      CheckSheet.findOne({_id}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}