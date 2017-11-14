var app = getApp();
var isCanLoadMore = false;
var isLoadingMore = false;
var articlePath = "/wx/article/search";
var page = 1;
var total = 0;
var cid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    articleList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    cid = options.cid;
    wx.showLoading({
      title: '请求数据中',
    })
    this.getArticleList();
  },

  getArticleList: function () {
    var that = this;
    wx: wx.request({
      url: app.globalData.mobAPI + articlePath,
      data: {
        key: app.globalData.mobKey,
        cid: cid,
        page: page
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        if (res != null && res.statusCode == 200) {
          if (res.data != null) {
            var result = res.data.result
            if (result != null && result.list != null && result.list.length > 0) {
              if (that.data.articleList != null && that.data.articleList.length > 0) { //已有数据的情况下（加载更多）
                var mArticalList = that.data.articleList;
                for (var i = 0; i < result.list.length; i++) {
                  mArticalList.push(result.list[i]);
                }
                that.setData({
                  articleList: mArticalList,
                });
              } else {
                that.setData({
                  articleList: result.list,
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
    if (that.data.articleList != null && that.data.articleList.length > 0) {
      if (total > 0 && that.data.articleList.length < total) {
        isCanLoadMore = true;
        page++;
      } else if (total > 0) {
        isCanLoadMore = false;
      }
    }

    isLoadingMore = false;

    wx: wx.hideLoading();
  },

  onLoadMore: function () {
    console.log("onLoadMore");
    if (!isLoadingMore) {
      isLoadingMore = true;
      this.getArticleList();
    }
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