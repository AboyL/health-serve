const Koa = require('koa2')
const router = require('koa-router')()
const boydParset = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const User = require('./router/user.router.js')

const db = require('./database.js')
// 连接数据库
db.init()
// 中间件设置
app.use(boydParset())
app.use(cors())
app.use(router.routes())
// 路由配置
// 用户路由配置
router.post('/api/user/login', User.login)
router.post('/api/user/register', User.register)
router.post('/api/user/getQuestion', User.getQuestion)
router.post('/api/user/checkAnswer', User.checkAnswer)
router.post('/api/user/resetPassword', User.resetPassword)
router.post('/api/user/changePass', User.changePass)




// 监听
app.listen(2333)
