const User = require('../database/user.js')

module.exports = {
  login: async (ctx, next) => {
    let result = { status: 0 }
    let { username, password } = ctx.request.body
    let parame = { username, password }
    let hasUser = await User.checkUsername(parame)
    if (hasUser) {
      let userPass = await User.checkUserPass(parame)
      console.log(userPass)
      if (userPass) {
        result.status = 1
        result.msg = '登录成功'
        result.data = { token: userPass.id }
      } else {
        result.msg = '密码不正确'
      }
    } else {
      result.msg = '未找到用户'
    }
    ctx.body = result
    await next()
  },
  register: async (ctx, next) => {
    let result = { status: 0 }
    let { username, password, question, answer } = ctx.request.body
    let parame = { username, password, question, answer }
    let hasUser = await User.checkUsername({ username })
    if (hasUser) {
      result.msg = '用户名已存在'
    } else {
      let ok = await User.register(parame)
      if (ok) {
        result.status = 1
        result.msg = '注册成功'
      } else {
        result.msg = '注册失败'
      }
    }
    ctx.body = result
    await next()
  },
  getQuestion: async (ctx, next) => {
    let result = { status: 0 }
    let { username } = ctx.request.body
    let { question } = await User.getQuestion({ username })
    if (question) {
      console.log(question)
      result.status = 1
      result.data = {
        question
      }
    } else {
      result.msg = '获取问题失败'
    }
    ctx.body = result
    await next()
  },
  checkAnswer: async (ctx, next) => {
    let result = { status: 0 }
    let { answer, username } = ctx.request.body
    let ok = await User.checkAnswer({ username, answer })
    console.log(ok)
    if (ok) {
      console.log(answer)
      result.status = 1
      result.msg = '检验通过'
    } else {
      result.msg = '回答不正确'
    }
    ctx.body = result
    await next()
  },
  resetPassword: async (ctx, next) => {
    let result = { status: 0 }
    let { password, username } = ctx.request.body
    let { n } = await User.resetPassword({ username, password })
    console.log(n)
    if (n) {
      console.log(password)
      result.status = 1
      result.msg = '检验通过'
    } else {
      result.msg = '回答不正确'
    }
    ctx.body = result
    await next()
  },
  changePass: async (ctx, next) => {
    console.log('chang pass')
    let result = { status: 0 }
    let { oldPassword, newPassword, _id } = ctx.request.body
    let { n } = await User.changePass({ _id, newPassword, oldPassword })
    console.log(n)
    if (n) {
      result.status = 1
      result.msg = '修改密码成功'
    } else {
      result.msg = '原密码不正确'
    }
    ctx.body = result
    await next()
  }

}