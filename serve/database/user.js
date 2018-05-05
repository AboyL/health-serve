const database = require('../database.js')
module.exports = {
  checkUsername: (username) => {
    return new Promise(function (resolve, reject) {
      database.User.find({ username: username }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  checkUserPass: (username,password) => {
    return new Promise(function (resolve, reject) {
      database.User.findOne({ username: username,password:password }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}