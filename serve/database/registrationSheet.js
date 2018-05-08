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
RegistrationSheet.find({}, function (err, doc) {
  console.log('find RegistrationSheet')
  console.log(doc)
  console.log(doc.todayMorning)
})
// // 新建
// RegistrationSheet.create({
//   doctorId: '5aeecc272e0876496cc01f78',
// })


const exp = {
  createDoctorRegistrationSheet: (sheet) => {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      RegistrationSheet.update({ doctorId: sheet.doctorId }, sheet, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  // 今天早上的
  setRegistration: async function ({ doctorId, index, userId }) {
    console.log('提交挂号')
    let registration = await this.getDoctorRegistrationSheet({ doctorId })
    console.log(registration)
    if (index === 0) {
      // 此时是今天上午
      let count = ++registration.todayMorningCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          todayMorningCount: count,
          $push: { todayMorning: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })
            let number = newRegistration.todayMorningCount
            let time = newRegistration.todayTime
            let range = '上午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
    if (index === 1) {
      // 此时是今天下午
      let count = ++registration.todayAfternoonCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          todayAfternoonCount: count,
          $push: { todayAfternoon: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })

            let number = newRegistration.todayMorningCount
            let time = newRegistration.todayTime
            let range = '下午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
    if (index === 2) {
      // 此时是明天上午
      let count = ++registration.tomorrowMorningCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          tomorrowMorningCount: count,
          $push: { tomorrowMorning: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })

            let number = newRegistration.tomorrowMorningCount
            let time = newRegistration.tomorrowTime
            let range = '上午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
    if (index === 3) {
      // 此时是明天下午
      let count = ++registration.tomorrowAfternoonCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          tomorrowAfternoonCount: count,
          $push: { tomorrowAfternoon: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })

            let number = newRegistration.tomorrowAfternoonCount
            let time = newRegistration.tomorrowTime
            let range = '下午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
    if (index === 4) {
      // 此时是后天上午
      let count = ++registration.afterTomorrowMorningCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          afterTomorrowMorningCount: count,
          $push: { afterTomorrowMorning: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })

            let number = newRegistration.afterTomorrowMorningCount
            let time = newRegistration.afterTomorrowTime
            let range = '上午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
    if (index === 5) {
      // 此时是后天下午
      let count = ++registration.afterTomorrowAfternoonCount
      return new Promise((resolve, reject) => {
        RegistrationSheet.update({ doctorId }, {
          doctorId,
          afterTomorrowAfternoonCount: count,
          $push: { afterTomorrowAfternoon: { number: count, patient: userId, } }
        }, async (err, doc) => {
          if (err) {
            reject(err)
          } else {
            console.log(doc)
            let newRegistration = await this.getDoctorRegistrationSheet({ doctorId })
            let number = newRegistration.afterTomorrowAfternoonCount
            let time = newRegistration.afterTomorrowTime
            let range = '下午'
            resolve({
              number,
              time,
              range
            })
          }
        })
      })
    }
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
        todayMorningCount: 0,
        todayMorning: [],
        todayAfternoonCount: 0,
        todayAfternoon: [],
        tomorrowTime: util.getFormatDay(newToday, 1),
        tomorrowMorningCount: 0,
        tomorrowMorning: [],
        tomorrowAfternoonCount: 0,
        tomorrowAfternoon: [],
        afterTomorrowTime: util.getFormatDay(newToday, 2),
        afterTomorrowMorningCount: 0,
        afterTomorrowMorning: [],
        afterTomorrowAfternoonCount: 0,
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
        todayMorningCount: data.tomorrowMorningCount,
        todayMorning: data.tomorrowMorning,
        todayAfternoonCount: data.tomorrowAfternoonCount,
        todayAfternoon: data.tomorrowAfternoon,
        tomorrowTime: util.getFormatDay(newToday, 1),
        tomorrowMorningCount: data.afterTomorrowMorningCount,
        tomorrowMorning: data.afterTomorrowMorning,
        tomorrowAfternoonCount: data.afterTomorrowAfternoonCount,
        tomorrowAfternoon: data.afterTomorrowAfternoon,
        afterTomorrowTime: util.getFormatDay(newToday, 2),
        afterTomorrowMorningCount: 0,
        afterTomorrowMorning: [],
        afterTomorrowAfternoonCount: 0,
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
  let sheetToday = await exp.getDoctorRegistrationSheet({ doctorId }).todayTime
  if (today !== sheetToday) {
    console.log(doctorId)
    today = util.getFormatDate(new Date())
    resetRegistrationSheet()
  }
}, 60000)
// resetRegistrationSheet()


module.exports = exp