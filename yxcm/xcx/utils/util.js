const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

exports.getFansNum = function(value) {
  return (
    {
      1: {
        label: {
          start_fans_num: "0",
          end_fans_num: "100000"
        }
      },
      2: {
        label: {
          start_fans_num: "100000",
          end_fans_num: "200000"
        }
      },
      3: {
        label: {
          start_fans_num: "200000",
          end_fans_num: "500000"
        }
      },
      4: {
        label: {
          start_fans_num: "500000",
          end_fans_num: "1000000"
        }
      },
      5: {
        label: {
          start_fans_num: "1000000",
          end_fans_num: "100000000"
        }
      }
    }[value] || {}
  ).label || '--'
}