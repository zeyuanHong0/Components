1. 自定义 tabBar 组件目录结构（必须是根目录）：
2. /custom-tab-bar/
├── index.wxml
├── index.js
├── index.json
└── index.wxss
文件名必须是 index 前缀，目录名必须是 custom-tab-bar，否则微信不会识别为 tabbar 组件。
app.json 中的配置如下：
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
},