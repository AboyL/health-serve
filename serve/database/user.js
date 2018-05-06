const database = require('../database.js')
// const ObjectId = require('mongoose').Types.ObjectId
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