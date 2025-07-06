
# 自定义 TabBar 使用说明

## 目录结构要求

自定义 TabBar 必须放在 **项目根目录**，并遵循如下结构命名：

```
/custom-tab-bar/
├── index.wxml      # 组件模板
├── index.js        # 组件逻辑
├── index.json      # 组件配置
└── index.wxss      # 组件样式
```

> ⚠️ 注意：
> - 目录名必须是 `custom-tab-bar`
> - 文件名前缀必须是 `index`
> - 否则微信不会识别为 TabBar 组件

---

## app.json 配置

在 `app.json` 中启用自定义 TabBar：

```json
{
  "tabBar": {
    "custom": true,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  }
}
```

- `custom: true` 表示启用自定义 TabBar。
- `list` 中的页面路径必须存在，对应你的 Tab 页面。

---

## 使用说明

- 被配置为 Tab 页面（`tabBar.list` 中的页面）将自动注入自定义 TabBar。
- 如果页面未显示 TabBar，确保页面路径与 `list.pagePath` 完全一致。
- 推荐在每个 Tab 页面中通过 `onShow` 设置当前激活项：

```js
onShow() {
  const tabbar = this.getTabBar && this.getTabBar();
  if (tabbar) {
    tabbar.setData({
      selectedPath: "/pages/index/index" // 当前页面路径
    });
  }
}
```

---

## 自定义按钮示例（如凸起二维码按钮）

你可以在 `index.wxml` 中实现自定义布局，例如中间凸起按钮：

```xml
<view class="custom-tabbar">
  <view class="tab-item" bindtap="switchTab" data-path="/pages/index/index">
    <text>首页</text>
  </view>

  <view class="qrcode-button" bindtap="openQRCode">
    <image src="/assets/images/icon_qrcode.png" />
  </view>

  <view class="tab-item" bindtap="switchTab" data-path="/pages/my/my">
    <text>我的</text>
  </view>
</view>
```

---

## 样式建议

```css
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-bottom: 20rpx;
  z-index: 1000;
  box-shadow: 0 -1rpx 10rpx rgba(0, 0, 0, 0.05);
  pointer-events: auto;
}
```

---

## 常见问题

- **TabBar 不显示：** 请检查目录名、文件名、`app.json` 配置是否正确。
- **状态丢失：** 页面切换会销毁 TabBar，每次 `onShow` 需重新设置状态。
- **图标不同步：** 使用状态管理或页面生命周期配合切换 `selectedPath`。

---

## 备注

如需加入图标、颜色变化、动画等功能，请在 `custom-tab-bar/index.js` 和样式文件中进行扩展。
