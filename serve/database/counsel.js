const database = require('../database.js')
const util = require('../util/util.js')
const Counsel = database.Counsel
// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// Counsel.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// Counsel.find({}, function (err, doc) {
//   console.log('find Counsel')
//   console.log(doc)
// })
// // 新建
// Counsel.create({
//   userId:'5af90f1ace75de2ee01bd736',
//   doctorId:'5aeecc272e0876496cc01f78',
//   question: '中暑怎么办啊',
//   isReply: true,
//   answer: `
//   1、发现自己和其他人有先兆中暑和轻症中暑表现时，首先要做的是迅速撤离引起中暑的高温环境，选择阴凉通风的地方休息;并多饮用一些含盐分的清凉饮料。还可以在额部、颞部（太阳穴）涂抹清凉油、风油精等，或服用人丹、十滴水、藿香正气水等中药。

//   2、如果出现血压降低、虚脱时应立即平卧，及时上医院静脉滴注盐水。对于重症中暑者除了立即把中暑者从高温环境中转移至阴凉通风处外，还应该迅速将其送至医院，同时采取综合措施进行救治。
  
//   3、若远离医院，应将病人脱离高温环境，用湿床单或湿衣服包裹病人并给强力风扇，以增加蒸发散热。在等待转运期间，可将病人浸泡于湖泊或河流，或甚至用雪或冰冷却，也是一种好办法。
  
//   4、若病人出现发抖，应减缓冷却过程，因为发抖可增加核心体温（警告：应每10分钟测1次体温，不允许体温降至38.3℃，以免继续降温而导致低体温）。
//   `,
//   createTime: util.getFormatDate(new Date()),
// })

module.exports = {
  createCounsel: ({ question, userId, doctorId }) => {
    let createTime = util.getFormatDate(new Date())
    let isReply = false
    return new Promise(function (resolve, reject) {
      Counsel.create({ question, userId, doctorId, createTime, isReply }, (err, doc) => {
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
      Counsel.find({ userId, isReply: true }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}