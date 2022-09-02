// 根据窗口尺寸发生变化时进行适配
function remSize() {
  // 获取设备屏幕宽度
  // document.documentElement.clientWidth  元素的内部宽度   window.innerWidth   窗口的内部宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth
  // 固定设备最大和最小宽度
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  // 设置rem  750px-->1rem=100px   375px-->1rem=50px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px"
  // 设置字体大小
  document.querySelector('body').style.fontSize = 0.3 + "rem"
}
remSize()

// 窗口尺寸发生变化时调用
window.onresize = function () {
  remSize()
}