// pages/bbPig/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: "",
    password: ""
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
    this.imgs();
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

  imgs() {
    let number = this.randomNumber(1,8);
    let imgs = `../../images/img${number}.jpg`

    this.setData({
      imgs
    })
  },
  randomNumber(m, n) {
    let num = Math.floor(Math.random() * (m - n) + n);
    return num

  },
  inputChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  showMoudl() {
    if (this.data.password !== "956838") {
      wx.showModal({
        title: '温馨提示',
        content: '非常抱歉,你不是陈忠伟请不要再试',
        showCancel: false,
        confirmText: "知道了"
      })
      return
    }
    const list = [
      "加入天地会,免会费500",
      "烤五串",
      "一滴都不剩",
      "天上人间会所体验券一张",
      "爆炸糖一次",
      "GRT一辆",
      "烧鸭腿一只",
      "想要手绳吗,不,你不想,小皮筋一根",
      "烧鸭腿一只",
      "老广一份",
      "华丰面一包",
      "螺蛳粉加蛋",
      "摆驾洛溪,临幸一周",
      "豌豆海王的亲亲一个",
      "404,没有找到陈忠伟的礼物",
      "500,服务炸了,请重启",
      "谢谢惠顾"
    ]
    let number = this.randomNumber(0,list.length)
   
    wx.showModal({
      title: '恭喜陈忠伟获得以下礼物',
      content: list[number],
      showCancel: false,
      confirmText: "好的好的"
    })

  }
})