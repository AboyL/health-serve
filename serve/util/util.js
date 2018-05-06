module.exports = {
  getFormatDate: () => {
    const date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()+1
    let day=date.getDate()
    let hour=date.getHours()
    let minute=date.getMinutes()
    let seconds=date.getSeconds()
    let formatTime=`${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    console.log('format---------data')
    console.log(formatTime)
    return formatTime
  }
}