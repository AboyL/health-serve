const User = require('../database/user.js')

module.exports = {
  checkLogin: async (ctx, next) => {
    console.log(ctx.request.body.username)
    let postData = ctx.request.body
    let result = {}
    let username = postData.username
    let password = postData.password
    let userArr = await User.checkUsername(username)
    if (userArr.length > 0) {
      let userPass = await User.checkUserPass(username, password)
      console.log(userPass)
      if(userPass){
        result={
          status:1,
          msg:'登录成功',
          token:userPass.id
        }
      }
    } else {
      result = {
        status: 0,
        msg: '未找到用户',
      }
    }
    ctx.body = result
    await next()
  }
}