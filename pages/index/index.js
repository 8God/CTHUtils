//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShowHeader: true,
    headerPicsPath: "/data/福利/10/1",
    imgUrls: [],
    autoplay: true,
    duration: 1000,
    interval: 5000,
    circular: true,
    indicatorDots: true,
    menuItemWidth: 0,
    menuItem: [
      [{
        iconPath: '/resources/icons/ic_phone_infos.png',
        title: '手机归属地',
        path: '/pages/search_phone_info/search_phone_info',
        bgColor: '#F70044',
        textColor: '#ffffff'
      }, {
        iconPath: '/resources/icons/ic_wechat.png',
        title: '微信精选',
        path: '/pages/wechat_category_list/wechat_category_list',
        bgColor: '#11CD86',
        textColor: '#ffffff'
      }, {
        iconPath: '/resources/icons/ic_cook_guide.png',
        title: '菜谱大全',
        path: '/pages/cook_guide/cook_guide',
        bgColor: '#FEDA6A',
        textColor: '#ffffff'
      }],
      [{
        iconPath: '/resources/icons/ic_wechat.png',
        title: '热映电影',
        path: '/pages/movie_in_theaters/movie_in_theaters',
        bgColor: '#066FA5',
        textColor: '#ffffff'
      }, {
        iconPath: '/resources/icons/ic_wechat.png',
        title: '微信精选5',
        path: '',
        bgColor: '#EFA7A7',
        textColor: '#ffffff'
      }, {
        iconPath: '/resources/icons/ic_wechat.png',
        title: '微信精选5',
        path: '',
        bgColor: '#48B8D0',
        textColor: '#ffffff'
      }]
    ]
  },

  onLoad: function () {
    this.getHeaderPics();
    this.getScreenWidth();
    //https://apicloud.mob.com/wx/article/category/query?key=93c718b5f428
    //http://apicloud.mob.com/wx/article/search?key=123456&cid=1

  },

  getScreenWidth: function () {
    var it = this;
    wx: wx.getSystemInfo({
      success: function (res) {
        it.setData({
          menuItemWidth: res.screenWidth / 3 - 1,
        });

        console.log("it.data.menuItemWidth = " + it.data.menuItemWidth);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 获取首页顶部图片
   */
  getHeaderPics: function () {
    var that = this;
    wx.showLoading({
      title: '请求数据中',
    })
    wx.request({
      url: app.globalData.gankBaseUrl + this.data.headerPicsPath,
      method: "GET",
      success: function (res) {
        var mIsShowHeader = false;
        if (res != null && res.statusCode == 200) {
          var picsArray = res.data.results;
          if (picsArray != null && picsArray.length > 0) {
            var mImgUrls = Array();
            for (var i in picsArray) {
              mImgUrls[i] = {
                url: picsArray[i].url,
                link: "/pages/image_preview/image_preview?imgUrl=" + picsArray[i].url
              }
            }
            if (mImgUrls.length > 0) {
              mIsShowHeader = true
              that.setData({
                imgUrls: mImgUrls
              })
            }
          }

        }

        that.setData({
          isShowHeader: mIsShowHeader
        })

        wx.hideLoading();
      },
      fail: function () {
        that.setData({
          isShowHeader: false
        })
        wx.hideLoading();
      }
    })
  }

})
