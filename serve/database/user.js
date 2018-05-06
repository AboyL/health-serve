const database = require('../database.js')
// const ObjectId = require('mongoose').Types.ObjectId

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// database.User.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
// database.User.find({}, function (err, doc) {
//   console.log('find')
//   console.log(doc)
// })
// // 新建
// database.User.create({
//   username: 'L',
//   password:'123',
//   question:'我是谁',
//   answer:'L'
// })

module.exports = {
  checkUsername: ({ username }) => {
    return new Promise(function (resolve, reject) {
      database.User.findOne({ username }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  checkUserPass: ({ username, password }) => {
    return new Promise(function (resolve, reject) {
      database.User.findOne({ username, password }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  register: ({ username, password, question, answer }) => {
    return new Promise(function (resolve, reject) {
      database.User.create({ username, password, question, answer }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getQuestion: ({ username }) => {
    return new Promise(function (resolve, reject) {
      database.User.findOne({ username }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  checkAnswer: ({ username, answer }) => {
    return new Promise(function (resolve, reject) {
      database.User.findOne({ username, answer }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  resetPassword: ({ username, password }) => {
    return new Promise(function (resolve, reject) {
      database.User.updateOne({ username }, { password }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  changePass: ({ oldPassword, newPassword, _id }) => {
    console.log(oldPassword)
    return new Promise(function (resolve, reject) {
      database.User.updateOne({ _id, password: oldPassword }, { password: newPassword }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }


}