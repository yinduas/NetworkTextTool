# 网络文本工具 (Network Text Tool)

一个简单而功能完整的在线文本编辑工具，支持多种文本操作功能。提供两个版本：原生JavaScript版本和Vue + Element UI版本。

## 功能特点

- 响应式设计，支持PC/平板/手机
- 纯JavaScript实现的二维码生成
- 本地存储功能
- 一键复制文本
- 保存状态提示

- 📝 在线文本编辑与保存
- 💾 本地存储自动保存
- 📋 一键复制文本
- ⬇️ 文本下载功能
- 🔗 链接分享功能
- 📱 响应式设计
- 🔄 自动聚焦功能
- ❌ 一键清空功能

## 项目结构 

- index.html: 主页面
- js/NetworkText.js: 原生JavaScript版本
- js/NetworkText.vue: Vue + Element UI版本
- css/NetworkText.css: 样式文件
- js/qrcode.js: 二维码生成库

## 使用说明

1. 将项目文件夹上传到服务器，确保index.html文件可以访问。
2. 打开index.html，即可使用。
3. 关于二维码不能使用，请务必修改js/NetworkText.js中的WEBSITE_URL【第三行】为你的网站地址。很重要，很重要，很重要。

## 自定义配置
### 修改网站URL
javascript  WEBSITE_URL: 'your-website-url'

### Vue + Element UI版本

1. 安装依赖：

```bash
# 安装Element Plus
npm install element-plus
# 安装Vue
npm install vue@next
```

2. 运行项目：

```bash
npm run dev
```

3. 在main.js中引入Element Plus：

```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

4. 在组件中使用：

```javascript
// App.vue
<template>
  <network-text />
</template>

<script>
import NetworkText from './components/NetworkText.vue'

export default {
  name: 'App',
  components: {
    NetworkText
  }
}
</script>

5. 确保相关文件存在：
- 将`NetworkText.vue`放在components目录下
- 将`qrcode.min.js`放在相应目录下
- 将`NetworkText.css`放在相应目录下

6. 配置路径：
在NetworkText.vue中修改相关路径：

```javascript
// 修改引入路径
import QRCode from '../js/qrcode.min.js'
// 修改CSS引入路径
@import '../css/NetworkText.css';
```

7. Vue版本关于二维码不能使用，请务必修改js/NetworkText.js中的WEBSITE_URL【第三行】为你的网站地址。很重要，很重要，很重要。


## 注意事项

1. Vue版本需要确保：
   - Element Plus安装正确
   - 所有依赖都已安装
   - 文件路径正确
   - Vue版本 >= 3.0

2. 原生版本需要确保：
   - 文件结构完整
   - 引入路径正确
   - qrcode.min.js可用

3. 通用注意事项：
   - 确保浏览器支持localStorage
   - 检查跨域限制
   - 注意文件编码（推荐UTF-8）

4. 关于二维码不能使用，请务必修改js/NetworkText.js中的WEBSITE_URL【第三行】为你的网站地址。很重要，很重要，很重要。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

## 使用许可


## 作者
- 作者：aoyuan-yinduas

## 更新日志

### v1.0.0
- 初始版本发布
- 基本功能实现
- 响应式布局支持

### v1.1.1206
- 优化了布局
- 添加了状态
- 优化了文本背景

### v2.1.0
- 删除了文本背景
- 更节省服务器资源

### v2.2.0
- 优化了状态
- 优化了逻辑

项目不维护了！！！
