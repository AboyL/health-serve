const database = require('../database.js')
const PhysicalExamination=database.PhysicalExamination
// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// PhysicalExamination.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// PhysicalExamination.find({}, function (err, doc) {
//   console.log('find PhysicalExamination')
//   console.log(doc)
// })
// // 新建
// PhysicalExamination.create({
//   key:'concern_parent',
//   name:'关爱父母',
//   price:590,
//   img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526883222787&di=fc155c0a912b9d46cd7b204fba88aea3&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170526%2F1161f66961e24ef0b8bc090998b75dbd_th.png',
//   detail:'针对中老年人的初筛健康体检，检查的中心是心、肺、肝胆胰脾、肾、前列腺（男）、乳腺子宫附件(女性)等重要器官，同时对高血压、高血脂、高血糖、肠胃疾病、骨质疏松进行健康评估和预防'
// })
// PhysicalExamination.create({
//   key:'concern_child',
//   name:'关爱小孩',
//   price:490,
//   img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526883457788&di=6b4ef66556ed43713f7aa78222067bba&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Df83d1edbac51f3dec3e7b160a1dedc29%2F6a600c338744ebf87f67b22edaf9d72a6059a789.jpg',
//   detail:'为您的小孩报价护航，关爱小生命的每一步成长'
// })



module.exports = {
  getPhysicalExaminationList: () => {
    return new Promise(function (resolve, reject) {
      PhysicalExamination.find({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getPhysicalExamination: ({key}) => {
    return new Promise(function (resolve, reject) {
      PhysicalExamination.findOne({key}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}