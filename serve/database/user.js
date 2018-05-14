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
//   console.log('find user')
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
  getUserInfo: ({ username }) => {
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
  },
  setRegistrationSheet: ({ userId, registerTime, registerRange, registerNumber, registerSubject, registerDoctorId }) => {
    console.log('setRegistrationSheet')
    console.log(registerNumber)
    console.log(registerDoctorId)
    console.log(userId)
    return new Promise(function (resolve, reject) {
      database.User.updateOne({ _id: userId }, {
        registerTime,
        registerRange,
        registerNumber,
        registerSubject,
        registerDoctorId
      }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          console.log(doc)
          resolve(doc)
        }
      })
    })
  },
  clearRegistrationSheet: ({ _id }) => {
    return new Promise(function (resolve, reject) {
      database.User.updateOne({ _id }, { registerTime: '', registerRang: '', registerNumber: '', registerSubject: '', registerDoctorId: '' }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }


}