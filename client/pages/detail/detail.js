/**
 * @Date:   2017-12-26 17:24
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2018-01-01 12:30
 */

Page({
  data: {
    film: {},
    showLoading: true,
    options: null
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + options.id,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data
        // console.log(data);
        that.setData({
          film: data,
          showLoading: false
        })
      }
    })
  },
  // 点击查看演员页面
  viewCast: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../cast/cast?id=' + ds.id + '&name=' + ds.name + '&type=ing'
    })
  }
})
