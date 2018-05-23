const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/test'
const Schema = mongoose.Schema

let db = mongoose.connection
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise

const init = () => {
  mongoose.connect(dbUrl)
  db.on('connected', function () {
    console.log('link success')
  })
  db.on('error', function () {
    console.log('link error')
  })
}

const User = mongoose.model('User', new Schema({
  username: String,
  password: String,
  question: String,
  answer: String,
  registerTime: String,
  registerRange: String,
  registerNumber: Number,
  registerSubject: Array,
  registerDoctorId: String,
  physicalExaminationList:[
    {
      key:String,
      date:String,
      isPass:Number
    }
  ]
}))
const Subject = mongoose.model('Subject', new Schema({
  label: String,
  value: String,
  children: [
    {
      label: String,
      value: String
    }
  ]
}))
const Doctor = mongoose.model('Doctor', new Schema({
  subject: String,
  name: String,
  sex: Number,
  introduce: String,
  position: String,
}))
const Counsel = mongoose.model('Counsel', new Schema({
  question: String,
  doctorId: String,
  userId: String,
  isReply: Boolean,
  answer: String,
  createTime: String,
}))
const MedicalHistory = mongoose.model('MedicalHistory', new Schema({
  userId: String,
  doctorId: String,
  checkSheetId:String,//检查单id  
  symptom: String,
  result: String,
  recipe: [{
    name: String,
    number: Number,
    unit: String,
    frequency: Number
  }],
  createTime: String
}))
const RegistrationSheet = mongoose.model('RegistrationSheet', new Schema({
  doctorId: String,
  todayTime: String,
  todayMorningCount: Number,
  todayMorning: [{ number: Number, patient: String }],
  todayAfternoon: [{ number: Number, patient: String }],
  todayAfternoonCount: Number,
  tomorrowTime: String,
  tomorrowMorningCount: Number,
  tomorrowMorning: [{ number: Number, patient: String }],
  tomorrowAfternoonCount: Number,
  tomorrowAfternoon: [{ number: Number, patient: String }],
  afterTomorrowTime: String,
  afterTomorrowMorningCount: Number,
  afterTomorrowMorning: [{ number: Number, patient: String }],
  afterTomorrowAfternoonCount: Number,
  afterTomorrowAfternoon: [{ number: Number, patient: String }],
}))
// 常见症状
const Symptom = mongoose.model('Symptom', new Schema({
  key: String,
  name: String,
  isCommon: Boolean,//是否是常见病
  abstract: String,// 简介
  reason: String,
  behave: String,// 表现
  therapy: String,// 治疗方法
  prevent: String,// 预防
}))
const Knowledge=mongoose.model('Knowledge',new Schema({
  key:String,
  name:String,
  knowledges:[{
    createTime:String,
    author:String,
    title:String,
    // abstract:String,//摘要
    content:String
  }]
}))
const CheckExplainSheet=mongoose.model('CheckExplainSheet',new Schema(
  {
    name: String,
    key:String,
    range: String,
    unit: String,
    low: String,
    high: String
  }
))
const CheckSheet=mongoose.model('CheckSheet',new Schema(
  {
    createTime: String,
    result:[
      {
        name:String,//项目名称
        key:String,
        unit: String,//单位
        count:String,//数值
      }
    ]
  }
))
const PhysicalExamination=mongoose.model('PhysicalExamination',new Schema(
  {
    key:String,
    name:String,
    img:String,
    detail:String
  }
))
module.exports = {
  init,
  User,
  Subject,
  Doctor,
  Counsel,
  MedicalHistory,
  RegistrationSheet,
  Symptom,
  Knowledge,
  CheckExplainSheet,
  CheckSheet,
  PhysicalExamination
}