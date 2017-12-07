// pages/cook_guide/cook_guide.js
const app = getApp();
const cook_category_path = "/v1/cook/category/query";

Page({

  /**
   * 页面的初始数据
   */
  data: {
   cook_category_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '请求数据中',
      mask: true,
    })
   wx.request({
     url: app.globalData.mobAPI + cook_category_path,
     data: {
       key:app.globalData.mobKey,
     },
     header: {},
     method: "GET",
     dataType: "json",
     success: function(res) {
       if(res != null && res.statusCode == 200) {
         if (res.data != null) {
           var result = res.data.result;
           if(result != null) {
             console.log(result);
             that.setData({
               cook_category_list:result.childs
             });
           }
         }
       }
     },
     fail: function(res) {},
     complete: function(res) {
       wx.hideLoading();
     },
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
  
  },

  onClickCategoryParent:function(event) {
    console.log("onClickCategoryParent: index = " + event.currentTarget.dataset.index);
    // console.log("index = " + index);                   
    // if (this.data.cook_category_list != null ) {
    //   console.log("length = " + this.data.cook_category_list.length);
    // }
  }
})