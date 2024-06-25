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
      const touch = e.touches[0];
      if (touch.identifier !== this.data.touchId) return;
      const height = wx.getSystemInfoSync().windowHeight;
      const y = touch.clientY - this.data.fTop;
      console.log(y, height);
      if (y > 100 && y < height - 300) {
        this.setData({
          top: y * (750 / wx.getSystemInfoSync().windowWidth),
        });
      }
    },
    onEnd(e: any) {
      //   console.log("end", e);
    },
  },
});
