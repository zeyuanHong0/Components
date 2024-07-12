// components/tabs/tabs.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer(newVal) {
        this.updateTabWidth(newVal.length);
      },
    },
    activeColor: {
      type: String,
      value: "#000",
    },
    inactiveColor: {
      type: String,
      value: "rgb(97, 98, 98)",
    },
    underlineColor: {
      type: String,
      value: "rgb(87, 123, 239)",
    },
    offset: {
      // 组件距离视口左边的距离 单位rpx
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0,
    underlineLeft: 0,
    underlineWidth: 0,
    tabWidth: 100, // 默认单个tab宽度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateTabWidth(tabCount) {
      this.setData({
        tabWidth: 100 / tabCount,
      });
    },

    // 更新下划线位置
    updateUnderline(current) {
      const query = wx.createSelectorQuery().in(this);
      const systemInfo = wx.getSystemInfoSync();
      const windowWidth = systemInfo.windowWidth;
      query
        .select(`.tab-title${current}`)
        .boundingClientRect((rect) => {
          const offset = this.data.offset * (windowWidth / 750);
          this.setData({
            underlineLeft: (rect.left - offset) * (750 / windowWidth),
            underlineWidth: rect.width * (750 / windowWidth),
          });
        })
        .exec();
    },

    swichNav(e) {
      const current = e.currentTarget.dataset.current;
      if (this.data.currentTab === current) {
        return;
      } else {
        this.setData({
          currentTab: current,
        });
        this.updateUnderline(current);
      }
    },
  },

  ready() {
    this.updateTabWidth(this.data.tabs.length);
    this.updateUnderline(this.data.currentTab);
  },
});
