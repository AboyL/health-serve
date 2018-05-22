const Koa = require('koa2')
const router = require('koa-router')()
const boydParset = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const User = require('./router/user.router.js')
const Hospital = require('./router/hospital.router.js')
const Knowledge =require('./router/knowledge.router.js')

const db = require('./database.js')
// 连接数据库
db.init()
// 中间件设置
app.use(boydParset())
app.use(cors())
app.use(router.routes())

// 监听
app.listen(2333)

// 路由配置
// 用户路由配置
router.post('/api/user/login', User.login)
router.post('/api/user/register', User.register)
router.post('/api/user/getQuestion', User.getQuestion)
router.post('/api/user/checkAnswer', User.checkAnswer)
router.post('/api/user/resetPassword', User.resetPassword)
router.post('/api/user/changePass', User.changePass)
router.post('/api/user/getUserInfo', User.getUserInfo)

// 医院路由配置
router.post('/api/hospital/getAllSubject', Hospital.getAllSubject)
router.post('/api/hospital/getDoctors', Hospital.getDoctors)
router.post('/api/hospital/getADoctor', Hospital.getADoctor)

router.post('/api/hospital/submitCounsel', Hospital.submitCounsel)
router.post('/api/hospital/getCounsels', Hospital.getCounsels)
router.post('/api/hospital/getMedicalHistorys', Hospital.getMedicalHistorys)
router.post('/api/hospital/getDoctorRegistrationSheet', Hospital.getDoctorRegistrationSheet)
router.post('/api/hospital/submitRegistration', Hospital.submitRegistration)
router.post('/api/hospital/clearRegistrationSheet', Hospital.clearRegistrationSheet)

router.post('/api/hospital/getCheckExplainSheet', Hospital.getCheckExplainSheet)
router.post('/api/hospital/getCheckSheet', Hospital.getCheckSheet)

router.post('/api/hospital/getPhysicalExaminationList', Hospital.getPhysicalExaminationList)
router.post('/api/hospital/getPhysicalExamination', Hospital.getPhysicalExamination)
router.post('/api/hospital/submitPhysicalExamination', Hospital.submitPhysicalExamination)
router.post('/api/hospital/cancelPhysicalExamination', Hospital.cancelPhysicalExamination)

// 知识库配置
router.post('/api/knowledge/getSymptom', Knowledge.getSymptom)
router.post('/api/knowledge/getCommonSymptom', Knowledge.getCommonSymptom)
router.post('/api/knowledge/querySymptom', Knowledge.querySymptom)
router.post('/api/knowledge/getAllKnowledge', Knowledge.getAllKnowledge)
router.post('/api/knowledge/getKnowledge', Knowledge.getKnowledge)














