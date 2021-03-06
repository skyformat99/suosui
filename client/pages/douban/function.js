/**
 * @Date:   2017-12-26 12:30
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2017-12-26 14:33
 */

var config = require('./config.js')
var store = require('./store.js')
module.exports = {
  // 获取位置坐标，使用百度API逆向解析
  getLocation: function (cb) {
    var location = store.location
    if (location) {
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
          header: {
            "Content-Type": "json",
          },
          success: function (res) {
            var data = res.data
            store.location = data.result
            cb(data.result)
          }
        })
      }
    })
  },
  // 获取所在城市
  getCity: function (cb) {
    this.getLocation(function (location) {
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  // 获取当地的热映电影
  fetchFilms: function (url, city, start, count, cb) {
    var that = this
    wx.request({
      url: url + '?city=' + city + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        var data = res.data
        if (data.subjects.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
        }
        cb(data)
      }
    })
  }
}
