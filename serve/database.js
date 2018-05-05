const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/test'
const Schema = mongoose.Schema

const init = () => {
  mongoose.connect(dbUrl)
  mongoose.connection.on('connected', function () {
  })
  mongoose.connection.on('error', function () {
  })
}

const User = mongoose.model('User', new Schema({
  username: String,
  password: String,
}))
// 清除数据
// User.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// User.find({}, function (err, doc) {
//   console.log('find')
//   console.log(doc)
// })
// // 新建
// User.create({
//   username: 'L',
//   password:'123'
// })
module.exports = {
  init: init,
  User: User
}