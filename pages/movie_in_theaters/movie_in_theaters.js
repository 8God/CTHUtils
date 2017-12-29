// pages/movie_in_theaters/movie_in_theaters.js
const app = getApp();

const moviePath = "/v2/movie/in_theaters";

var isCanLoadMore = false;
var isLoadingMore = false;
var isRefreshing = false;
var isLoadingMore = false;

const COUNT = 10;
var mStart = 0;
var total = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
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
    this.getMoviesInTheaters(mStart);
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
    console.log("onPullDownRefresh");

    mStart = 0;
    isRefreshing = true;
   
    this.getMoviesInTheaters(mStart);
  },

  /**
   * 页面相关事件处理函数--监听用户上拉到底部动作
   */
  onReachBottom: function () {
    console.log("onReachBottom : isCanLoadMore = " + isCanLoadMore);
    if (isCanLoadMore && !isLoadingMore) {
      isLoadingMore = true;

      this.getMoviesInTheaters(mStart);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getMoviesInTheaters: function (start) {
    console.log("start = " + start);
    var that = this;
    wx.request({
      url: app.globalData.doubanAPI + moviePath,
      data: {
        start: start,
        count: COUNT,
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data != null) {
          if (res.data.subjects != null && res.data.subjects.length > 0) {
            var mMovieList = that.data.movieList;
            if(isRefreshing) {
              mMovieList = new Array();
            }
            for (var i = 0; i < res.data.subjects.length; i++) {
              mMovieList.push(res.data.subjects[i]);
            }

            total = res.data.total;

            if (mMovieList.length >= 0) {
              mStart = mMovieList.length;
            } else {
              mStart = 0;
            }

            console.log("success:total = " + total);
            if (mMovieList.length < total) {
              isCanLoadMore = true;

            } else {
              isCanLoadMore = false;
            }

            that.setData({
              movieList: mMovieList,
            });
          }
        }

      },
      fail: function (res) { },
      complete: function (res) {
        if (isRefreshing) {
          wx.stopPullDownRefresh();
          isRefreshing = false;
        }
        if(isLoadingMore) {
          isLoadingMore = false;
        }
      },
    })
  }


})