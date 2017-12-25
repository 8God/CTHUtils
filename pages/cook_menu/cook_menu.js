// pages/cook_menu/cook_menu.js
const app = getApp();
const cookMenuPath = "/v1/cook/menu/search";

var isCanLoadMore = false;
var isLoadingMore = false;
var page = 1;
var total = 0;
var cid = '';
var cname = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookMenuList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    cid = options.cid;
    cname = options.cname;

    wx.setNavigationBarTitle({
      title: cname,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    wx.showLoading({
      title: '获取数据中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    this.getCookMenuList();

  },

  getCookMenuList: function () {
    var that = this;
    wx: wx.request({
      url: app.globalData.mobAPI + cookMenuPath,
      data: {
        key: app.globalData.mobKey,
        cid: cid,
        page: page,
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res != null && res.statusCode == 200) {
          if (res.data != null) {
            var result = res.data.result
            if (result != null && result.list != null && result.list.length > 0) {
              if (that.data.cookMenuList != null && that.data.cookMenuList.length > 0) { //已有数据的情况下（加载更多）
                var mCookMenuList = that.data.cookMenuList;
                for (var i = 0; i < result.list.length; i++) {
                  mCookMenuList.push(result.list[i]);
                }
                that.setData({
                  cookMenuList: mCookMenuList,
                });
              } else {
                that.setData({
                  cookMenuList: result.list,
                });
                total = result.total;
              }
            }
          }
        }
        that.onFinishGetData();
      },
      fail: function (res) {
        that.onFinishGetData();
      },
      complete: function (res) {
        that.onFinishGetData();
      },
    })
  },

  onFinishGetData: function () {
    var that = this;
    if (that.data.cookMenuList != null && that.data.cookMenuList.length > 0) {
      if (total > 0 && that.data.cookMenuList.length < total) {
        isCanLoadMore = true;
      } else if (total > 0) {
        isCanLoadMore = false;
      }
    }

    isLoadingMore = false;

    wx: wx.hideLoading();
  },

  onLoadMore: function () {
    if (!isLoadingMore) {
      page++;
      console.log("onLoadMore:page = " + page);
      isLoadingMore = true;
      this.getCookMenuList();
    }
  },

  onClickCook: function(event) {
    var menuId = event.currentTarget.dataset.id;
    var cookObj = event.currentTarget.dataset.cook;

    wx.navigateTo({
      url: '/pages/cook_detail/cook_detail?cookMenu=' + JSON.stringify(cookObj),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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