const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/test'
const Schema = mongoose.Schema

let db = mongoose.connection
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise

const init = () => {
  mongoose.connect(dbUrl)
  db.on('connected', function () {
    console.log('link success')
  })
  db.on('error', function () {
    console.log('link error')
  })
}

const User = mongoose.model('User', new Schema({
  username: String,
  password: String,
  question:String,
  answer:String
}))
// 清除数据
// User.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
User.find({}, function (err, doc) {
  console.log('find')
  console.log(doc)
})
// // 新建
// User.create({
//   username: 'L',
//   password:'123',
//   question:'我是谁',
//   answer:'L'
// })
module.exports = {
  init: init,
  User: User
}