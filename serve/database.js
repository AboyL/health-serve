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
  answer: String
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
  state: Number
}))
const Counsel = mongoose.model('Counsel', new Schema({
  question: String,
  doctorId: String,
  userId: String,
  isReply: Boolean,
  answer: String,
  createTime: String
}))
const MedicalHistory = mongoose.model('MedicalHistory', new Schema({
  userId: String,
  doctorId: String,
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
  todayCount: Number,
  todayMorning: [{ number: Number, patient: String }],
  todayAfternoon: [{ number: Number, patient: String }],  
  tomorrowTime: String,
  tomorrowCount: Number,
  tomorrowMorning: [{ number: Number, patient: String }],
  tomorrowAfternoon: [{ number: Number, patient: String }],    
  afterTomorrowTime: String,
  afterTomorrowCount: Number,
  afterTomorrowMorning: [{ number: Number, patient: String }],
  afterTomorrowAfternoon: [{ number: Number, patient: String }],  
}))

module.exports = {
  init,
  User,
  Subject,
  Doctor,
  Counsel,
  MedicalHistory,
  RegistrationSheet
}