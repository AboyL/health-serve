const database = require('../database.js')
const RegistrationSheet = database.RegistrationSheet
const Doctor = require('./doctor.js')
const util = require('../util/util.js')

// 调试脚本用来在开发阶段对数据库进行一些操作
// 清除数据
// RegistrationSheet.remove({}, function (err, doc) {
//   console.log('remove')
//   console.log(doc)
// })
// 查找
//RegistrationSheet.find({}, function (err, doc) {
//   console.log('find RegistrationSheet')
//   console.log(doc)
// })
// // 新建
// RegistrationSheet.create({
//   doctorId: '5aeecc272e0876496cc01f78',
// })


const exp = {
  createDoctorRegistrationSheet: (sheet) => {
    return new Promise(function (resolve, reject) {
      RegistrationSheet.create(sheet, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          console.log('create sheet')
          console.log(doc)
          resolve(doc)
        }
      })
    })
  },
  getDoctorRegistrationSheet: ({ doctorId }) => {
    return new Promise(function (resolve, reject) {
      RegistrationSheet.findOne({ doctorId }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getAllRegistrationSheet: () => {
    return new Promise(function (resolve, reject) {
      RegistrationSheet.find({}, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  resetRegistrationSheet: (sheet) => {
    return new Promise(function (resolve, reject) {
      RegistrationSheet.update({ doctorId: sheet.doctorId }, sheet, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  submitRegistration: ({ doctorId, index, userId }) => {
    return new Promise(function (resolve, reject) {
      RegistrationSheet.update({ doctorId }, { doctorId, index, patient: userId }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}

const resetRegistrationSheet = async () => {
  // 判断数据库是否存在,如果没有就进行赋值
  let RegistrationSheet = await exp.getAllRegistrationSheet()
  if (RegistrationSheet.length === 0) {
    console.log('此时数据库中没有数据')
    let doctorList = await Doctor.getAllDoctor()
    doctorList.map(async d => {
      console.log(d)
      let newToday = new Date()
      let sheet = {
        doctorId: d.id,
        todayTime: util.getFormatDay(newToday),
        todayCount: 0,
        todayMorning: [],
        todayAfternoon: [],
        tomorrowTime: util.getFormatDay(newToday, 1),
        tomorrowCount: 0,
        tomorrowMorning: [],
        tomorrowAfternoon: [],
        afterTomorrowTime: util.getFormatDay(newToday, 2),
        afterTomorrowCount: 0,
        afterTomorrowMorning: [],
        afterTomorrowAfternoon: []
      }
      await exp.createDoctorRegistrationSheet(sheet)
    })
  } else {
    // 此时有表，进行复制操作
    RegistrationSheet.forEach(async (data) => {
      let newToday = new Date()
      let sheet = {
        doctorId: data.doctorId,
        todayTime: util.getFormatDay(newToday),
        todayCount: data.tomorrowCount,
        todayMorning: data.tomorrowMorning,
        todayAfternoon: data.tomorrowAfternoon,
        tomorrowTime: util.getFormatDay(newToday, 1),
        tomorrowCount: data.afterTomorrowCount,
        tomorrowMorning: data.afterTomorrowMorning,
        tomorrowAfternoon: data.afterTomorrowAfternoon,
        afterTomorrowTime: util.getFormatDay(newToday, 2),
        afterTomorrowCount: 0,
        afterTomorrowMorning: [],
        afterTomorrowAfternoon: [],
      }
      await exp.resetRegistrationSheet(sheet)
    })
  }
}

// 根据今天的情况创建日期
let today = util.getFormatDate(new Date())
setInterval(async () => {
  let doctorId = await Doctor.getADoctor()._id
  let sheetToday = await exp.getDoctorRegistrationSheet({ doctorId }).today.time
  if (today !== sheetToday) {
    console.log(doctorId)
    today = util.getFormatDate(new Date())
    resetRegistrationSheet()
  }
}, 60000)
// resetRegistrationSheet()


module.exports = exp