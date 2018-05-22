module.exports = {
  getFormatDate: (date) => {
    if (date instanceof Date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let seconds = date.getSeconds()
      let formatTime = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      console.log('format---------data')
      console.log(formatTime)
      return formatTime
    } else {
      throw Error('非日期类型')
    }
  },
  getFormatDay: (date, difference) => {
    if (date instanceof Date) {
      if (difference) {
        date.setTime(date.getTime() + difference * 24 * 60 * 60 * 1000)
      }
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let formatTime = `${year}-${month}-${day}`
      return formatTime
    } else {
      throw Error('非日期类型')
    }
  },
  deepCopy: (obj) => {
    var str, newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (global.JSON) {
      str = JSON.stringify(obj) //系列化对象
      newobj = JSON.parse(str) //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ?
          this.deepCopy(obj[i]) : obj[i]
      }
    }
    return newobj
  }
}