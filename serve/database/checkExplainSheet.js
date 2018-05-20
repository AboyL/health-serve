const database = require('../database.js')
const CheckExplainSheet = database.CheckExplainSheet
// const util = require('../util/util.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// CheckExplainSheet.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// CheckExplainSheet.find({}, function (err, doc) {
//   console.log('find CheckExplainSheet')
//   console.log(doc)
// })
// // 新建
// CheckExplainSheet.create({
//   name: '白细胞',
//   range: '4.0-10.0',
//   unit: '10^9/L',
//   low: '减少常见于流感、麻疹等病毒性传染病及严重败血症、药物或放射线所致及某些血液病',
//   high: '白细胞增多常见于炎性感染、出血、中毒、白血病等'
// })
// CheckExplainSheet.create({
//   name: '红细胞数',
//   range: '1.0-5.5',
//   unit: '10^12/L',
//   low: '脱水、先天性心脏病、肺心病等',
//   high: '见于各种贫血（如再生障碍性贫血、缺铁性贫血、铁粒幼细胞性贫血、巨幼细胞性贫血、溶血性贫血、地中海性贫血等）、大量失血（如外伤大出血、手术大出血、产后大出血、急性消化道出血、溃疡所致的慢性失血等）、白血病、产后、化疗等'
// })
// CheckExplainSheet.create({
//   name: '血红蛋白浓度',
//   range: '120-160',
//   unit: 'g/L',
//   low: '贫血',
//   high: '慢性肺源性心脏病、发绀型先天性心脏病、真性红细胞增多症、高原病和大细胞高色素性贫血等'
// })

module.exports = {
  getCheckExplainSheet: () => {
    return new Promise(function (resolve, reject) {
      CheckExplainSheet.find({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}