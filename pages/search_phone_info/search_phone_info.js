// pages/search_phone_info/search_phone_info.js
var mobileQueryPath = "/v1/mobile/address/query";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: "",
    city: "",
    operator: "",
    zipCode: "",
    phoneNum: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  inputPhoneNum: function (e) {
    var that = this;
    that.setData({
      phoneNum: e.detail.value
    })
  },
  searchPhoneInfo: function () {
    var that = this;
    
    wx: wx.showLoading({
      title: '查询' + that.data.phoneNum + '中',
    });
   
    wx: wx.request({
      url: app.globalData.mobAPI + mobileQueryPath,
      data: {
        key: app.globalData.mobKey,
        phone: that.data.phoneNum
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        if (res != null && res.statusCode == 200) {
          if (res.data != null) {
            var result = res.data.result;
            that.setData({
              province: result.province,
              city: result.city,
              operator: result.operator,
              zipCode: result.zipCode,

            });
          }
        }

        wx: wx.hideLoading();
      },
      fail: function (res) {
        wx: wx.hideLoading();
      },
      complete: function (res) {
        wx: wx.hideLoading();
      },
    })
  }
})