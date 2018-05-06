const Subject = require('../database/subject.js')
const Doctor = require('../database/doctor.js')
const Counsel = require('../database/counsel.js')
const MedicalHistory = require('../database/medicalHistory.js')

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
  submitCounsel: async (ctx, next) => {
    console.log('get doctors')
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
    console.log('get doctors')
    let result = {
      status: 0
    }
    let { userId } = ctx.request.body
    let list = await Counsel.getCounsels({ userId })
    console.log('获取病历')
    console.log(list)
    if (list) {
      result.msg = '获取病历成功'
      result.status = 1
      result.data={
        list
      }
    } else {
      result.msg = '获取病历失败'
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
    console.log('获取咨询')
    console.log(list)
    if (list) {
      result.msg = '获取咨询成功'
      result.status = 1
      result.data={
        list
      }
    } else {
      result.msg = '获取咨询失败'
    }
    ctx.body = result
    await next()
  }
}