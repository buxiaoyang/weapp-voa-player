const formatTime = thisDate => {
  const year = thisDate.getFullYear()
  const month = thisDate.getMonth() + 1
  const day = thisDate.getDate()
  const hour = thisDate.getHours()
  const minute = thisDate.getMinutes()
  const second = thisDate.getSeconds()

  return year + "年" + month + "月" + day + "日 " + hour + "时" + minute + "分" + second + "秒"
}

const formatDate = thisDate => {
  //console.log(thisDate);
  const year = thisDate.getFullYear()
  const month = thisDate.getMonth() + 1
  const day = thisDate.getDate()
  return year + "年" + month + "月" + day + "日";
}

const formatTimeMinute = thisDate => {
  const year = thisDate.getFullYear()
  const month = thisDate.getMonth() + 1
  const day = thisDate.getDate()
  const hour = thisDate.getHours()
  const minute = thisDate.getMinutes()

  return year + "年" + month + "月" + day + "日 " + hour + "时" + minute + "分";
}

const formatDateEN = thisDate => {
  //console.log(thisDate);
  const year = thisDate.getFullYear()
  const month = thisDate.getMonth() + 1
  const day = thisDate.getDate()
  return year + "-" + month + "-" + day;
}

const formatDateEN2CH = thisDate => {
  //console.log(thisDate);
  const data = thisDate.split("-");
  return data[0] + "年" + data[1] + "月" + data[2] + "日";
}

const Date1MinusData2 = (date1, date2) => {
  var temp1 = date1.split("-");
  var temp2 = date2.split("-");
  var day1 = parseInt(temp1[0]) * 400 + parseInt(temp1[1]) * 40 + parseInt(temp1[2]);
  var day2 = parseInt(temp2[0]) * 400 + parseInt(temp2[1]) * 40 + parseInt(temp2[2]);
  return day1 - day2;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getUUID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 100000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示成功提示
var showFail = text => wx.showToast({
  title: text,
  icon: 'none'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

// 显示失败提示
var showModel = (title) => {
  wx.hideToast();

  wx.showModal({
    title,
    showCancel: false
  })
}

module.exports = { getUUID, formatTime, formatTimeMinute, formatDate, formatDateEN, formatDateEN2CH, Date1MinusData2, showBusy, showSuccess, showFail, showModel }
