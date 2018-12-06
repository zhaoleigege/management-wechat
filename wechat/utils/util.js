const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const DAY = new Array('星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');

const dayNum2Str = day => {
  return DAY[day];
}

const monthMM = month => {
  return month < 10 ? '0' + month : '' + month;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const Ok2xx = status => {
  return status < 300
}

const unAuth = status => {
  return status > 400 && status < 500;
}

const errorTips = (view, errorMsg, time) => {
  view.setData({
    showTopTips: true,
    errorMessage: errorMsg
  });

  setTimeout(() => {
    view.setData({
      showTopTips: false
    });
  }, time || 3000);
}

module.exports = {
  formatTime: formatTime,
  Ok2xx: Ok2xx,
  errorTips: errorTips,
  unAuth: unAuth,
  dayNum2Str: dayNum2Str,
  monthMM: monthMM
}
