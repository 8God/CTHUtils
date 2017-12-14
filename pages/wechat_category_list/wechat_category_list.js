// pages/wechat_category_list/wechat_category_list.js
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    categoryListPath: "/wx/article/category/query",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var it = this;
    wx:wx.showLoading({
      title: '请求数据中',
    })
    wx: wx.request({
      url: app.globalData.mobAPI + this.data.categoryListPath,
      data: {
        key: app.globalData.mobKey
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        if (res != null && res.statusCode == 200) {
          var result = res.data.result;
          if (result != null) {
            it.setData({
              categoryList: result
            });
          }
        }
        wx:wx.hideLoading();
      },
      fail: function (res) {
        wx:wx.hideLoading();
       },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})