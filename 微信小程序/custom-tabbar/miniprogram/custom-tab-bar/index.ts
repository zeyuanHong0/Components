Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    selectedPath: "/pages/index/index",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e: any) {
      const path = e.currentTarget.dataset.path;
      wx.switchTab({ url: path });
    },
    openQRCode() {
      wx.scanCode({
        success(res) {
          console.log("扫码结果：", res);
        },
        fail(err) {
          console.warn("扫码失败：", err);
        },
      });
    },
  },
});
