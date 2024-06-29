// components/floating-panel/floating-panel.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    fLeft: 0,
    fTop: 0,
    left: 0,
    top: 0,
    touchId: 0,
  },

  lifetimes: {
    attached() {
      this.setData({
        top: 820,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onStart(e: any) {
      const touch = e.touches[0];
      this.setData({
        touchId: touch.identifier,
      });
      const query = wx.createSelectorQuery().in(this);
      query
        .select(".floatingComponent")
        .boundingClientRect((rect) => {
          console.log(rect);
          this.setData({
            fLeft: touch.clientX - rect.left,
            fTop: touch.clientY - rect.top,
          });
        })
        .exec();
    },
    onMove(e: any) {
      const systemInfo = wx.getSystemInfoSync();
      const windowHeight = systemInfo.windowHeight;
      const windowWidth = systemInfo.windowWidth;
      const heightRpx = windowHeight * (750 / windowWidth);
      const touch = e.touches[0];
      // 检查触摸点是否匹配
      if (touch.identifier !== this.data.touchId) return;
      // 计算 Y 轴的偏移量
      const y = touch.clientY - this.data.fTop;
      const yRpx = y * (750 / windowWidth);
      // 判断 yRpx 是否在指定范围内
      if (yRpx > 200 && yRpx < heightRpx - 320) {
        this.setData({
          top: yRpx,
        });
      }
    },
    onEnd(e: any) {
      //   console.log("end", e);
    },
  },
});
