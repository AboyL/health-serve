const Symptom = require('../database/symptom.js')
// const util = require('../util/util.js')

module.exports = {
  getSymptom: async (ctx, next) => {
    let result = { status: 0 }
    let { key } = ctx.request.body
    let symptom = await Symptom.getSymptom({ key })
    console.log(symptom)
    if (symptom) {
      result.status = 1
      result.data= {
        symptom
      }
    }
    else {
      result.msg = '未找到对应症状'
    }
    ctx.body = result
    await next()
  },
  getCommonSymptom: async (ctx, next) => {
    console.log('寻找普遍症状')
    let result = { status: 0 }
    let symptoms = await Symptom.getCommonSymptom( )
    console.log(symptoms)
    if (symptoms) {
      result.status = 1
      result.data= {
        symptoms
      }
    }
    else {
      result.msg = '未找到对应症状'
    }
    ctx.body = result
    await next()
  },
  querySymptom: async (ctx, next) => {
    console.log('查询症状')
    let result = { status: 0 }
    let {keyValue}=ctx.request.body
    console.log(keyValue)
    let symptom = await Symptom.querySymptom({keyValue} )
    if (symptom) {
      result.status = 1
      result.data= {
        symptom
      }
    }
    else {
      result.msg = '未找到对应症状'
    }
    ctx.body = result
    await next()
  }
}