const Subject = require('../database/subject.js')
const Doctor = require('../database/doctor.js')
const User = require('../database/user.js')
const Counsel = require('../database/counsel.js')
const MedicalHistory = require('../database/medicalHistory.js')
const RegistrationSheet = require('../database/registrationSheet.js')

module.exports = {
  getAllSubject: async (ctx, next) => {
    let result = {
      status: 0
    }
    let list = await Subject.getAllSubject()
    if (list.length > 0) {
      result.data = list
      result.status = 1
    } else {
      result.msg = '查找失败'
    }
    ctx.body = result
    await next()
  },
  getDoctors: async (ctx, next) => {
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { subject } = ctx.request.body
    console.log(subject)
    let list = await Doctor.getDoctors({ subject })
    console.log(list)
    if (list.length > 0) {
      result.data = list
      result.status = 1
    } else {
      result.msg = '查找失败'
    }
    ctx.body = result
    await next()
  },
  getADoctor: async (ctx, next) => {
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { doctorId } = ctx.request.body
    console.log(doctorId)
    let doctor = await Doctor.getADoctor({ doctorId })
    console.log(doctor)
    if (doctor) {
      result.data = doctor
      result.status = 1
    } else {
      result.msg = '查找医生失败'
    }
    ctx.body = result
    await next()
  },
  submitCounsel: async (ctx, next) => {
    let result = {
      status: 0
    }
    let { question, userId, doctorId } = ctx.request.body
    let ok = await Counsel.createCounsel({ question, userId, doctorId })
    console.log('提交咨询')
    console.log(ok)
    if (ok) {
      result.msg = '提交咨询成功'
      result.status = 1
    } else {
      result.msg = '获取咨询信息失败'
    }
    ctx.body = result
    await next()
  },
  getCounsels: async (ctx, next) => {
    let result = {
      status: 0
    }
    console.log('获取咨询------')
    let { userId } = ctx.request.body
    console.log(userId)
    let list = await Counsel.getCounsels({ userId })
    console.log('获取咨询')
    console.log(list)
    if (list) {
      result.msg = '获取咨询成功'
      result.status = 1
      result.data = {
        list
      }
    } else {
      result.msg = '获取咨询失败'
    }
    ctx.body = result
    await next()
  },
  getMedicalHistorys: async (ctx, next) => {
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { userId } = ctx.request.body
    let list = await MedicalHistory.getMedicalHistorys({ userId })
    console.log('获取病历')
    console.log(list)
    if (list) {
      result.msg = '获取病历成功'
      result.status = 1
      result.data = {
        list
      }
    } else {
      result.msg = '获取病历失败'
    }
    ctx.body = result
    await next()
  },
  getDoctorRegistrationSheet: async (ctx, next) => {
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { doctorId } = ctx.request.body
    let sheet = await RegistrationSheet.getDoctorRegistrationSheet({ doctorId })
    console.log('获取医生的挂号列表')
    console.log(doctorId)
    console.log(sheet)
    let lastSheet = {
      today: {
        morning: false,
        afternoon: false
      },
      tomorrow: {
        morning: false,
        afternoon: false
      },
      afterTomorrow: {
        morning: false,
        afternoon: false
      }
    }
    const MaxPatient = 10
    if (sheet.todayMorning.length < MaxPatient) {
      lastSheet.today.morning = true
    }
    if (sheet.todayAfternoon.length < MaxPatient) {
      lastSheet.today.afternoon = true
    }
    if (sheet.tomorrowMorning.length < MaxPatient) {
      lastSheet.tomorrow.morning = true
    }
    if (sheet.tomorrowAfternoon.length < MaxPatient) {
      lastSheet.tomorrow.afternoon = true
    }
    if (sheet.afterTomorrowMorning.length < MaxPatient) {
      lastSheet.afterTomorrow.morning = true
    }
    if (sheet.afterTomorrowAfternoon.length < MaxPatient) {
      lastSheet.afterTomorrow.afternoon = true
    }

    if (sheet) {
      result.msg = '获取医生的挂号成功'
      result.status = 1
      result.data = {
        sheet: lastSheet
      }
    } else {
      result.msg = '获取医生的挂号列表失败'
    }
    ctx.body = result
    await next()
  },
  submitRegistration: async (ctx, next) => {
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { userId, index, doctorId,subject } = ctx.request.body
    let registration = await RegistrationSheet.setRegistration({ userId, index, doctorId })
    console.log('给用户中添加挂号表')
    console.log(registration)
    let UserRegistrationSheet = await User.setRegistrationSheet({
      userId,
      registerTime: registration.time,
      registerRange: registration.range,
      registerNumber: registration.number,
      registerDoctorId:doctorId,
      registerSubject:subject
    })
    console.log(UserRegistrationSheet)
    console.log('获取号码和日期')
    console.log(registration)
    if (registration) {
      result.msg = '获取号码和日期成功'
      result.status = 1
      result.data = {
        registration
      }
    } else {
      result.msg = '获取号码和日期失败'
    }
    ctx.body = result
    await next()
  },
  clearRegistrationSheet: async (ctx, next) => {
    console.log('取消挂号')
    let result = {
      status: 0
    }
    let { userId, doctorId, time, range } = ctx.request.body
    console.log(ctx.request.body)
    let registration = await RegistrationSheet.clearRegistrationSheet({ userId, time, range, doctorId })

    if (registration.ok) {
      await User.clearRegistrationSheet({
        _id: userId
      })
      result.msg = '取消挂号成功'
      result.status = 1
    } else {
      result.msg = '取消挂号失败'
    }
    ctx.body = result
    await next()
  },
}