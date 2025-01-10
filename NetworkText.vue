<template>
  <div class="container">
    <!-- 状态提示区域：使用Element UI的Alert组件显示操作反馈 -->
    <el-alert
      v-if="statusVisible"
      :title="statusMessage"
      :type="statusType"
      center
      show-icon
      @close="statusVisible = false"
    />

    <!-- 页面标题区域 -->
    <header>
      <h1>网络文本</h1>
    </header>

    <!-- 主要内容区域：包含文本编辑器和操作按钮 -->
    <main>
      <div class="content-wrapper">
        <!-- 文本编辑区域 -->
        <div class="textarea-wrapper">
          <!-- Element UI的Input组件，用于文本编辑 -->
          <el-input
            v-model="textContent"
            type="textarea"
            :rows="12"
            resize="none"
            ref="textArea"
            @input="handleInput"
          />
          <!-- 清空按钮：仅在有内容时显示 -->
          <el-button
            v-if="textContent"
            class="clear-btn"
            icon="el-icon-close"
            circle
            @click="clearText"
          />
          <!-- 提示文本：仅在无内容时显示 -->
          <div v-if="!textContent" class="textarea-tips">
            <!-- 提示内容 -->
          </div>
        </div>

        <!-- 操作按钮组 -->
        <div class="button-group">
          <el-button type="primary" @click="saveContent">保存内容</el-button>
          <el-button type="primary" @click="copyText">复制文本</el-button>
          <el-button type="primary" @click="downloadText">下载文本</el-button>
          <el-button type="primary" @click="copyLink">复制链接</el-button>
          <!-- 二维码显示区域 -->
          <div ref="qrcodeContainer" class="qrcode-container"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// 导入二维码生成库和Vue的nextTick函数
import QRCode from './qrcode.min.js'
import { nextTick } from 'vue'

export default {
  name: 'NetworkText',
  // 组件数据
  data() {
    return {
      STORAGE_KEY: 'network-text-content', // localStorage存储键名
      WEBSITE_URL: 'http://www.chzhang.xyz/index.html', // 网站URL
      textContent: '', // 文本内容
      statusVisible: false, // 状态提示是否可见
      statusMessage: '', // 状态提示消息
      statusType: 'success' // 状态提示类型
    }
  },
  // 组件挂载后执行
  mounted() {
    this.loadSavedContent() // 加载保存的内容
    this.generateQRCode() // 生成二维码
  },
  methods: {
    // 保存内容到localStorage
    saveContent() {
      try {
        localStorage.setItem(this.STORAGE_KEY, this.textContent)
        this.showStatus('保存成功', 'success')
      } catch (error) {
        this.showStatus('保存失败', 'error')
      }
    },

    // 从localStorage加载保存的内容
    loadSavedContent() {
      const savedContent = localStorage.getItem(this.STORAGE_KEY)
      if (savedContent) {
        this.textContent = savedContent
        // 等待DOM更新后设置光标位置
        nextTick(() => {
          this.$refs.textArea.focus()
          const textarea = this.$refs.textArea.$el.querySelector('textarea')
          textarea.setSelectionRange(textarea.value.length, textarea.value.length)
        })
      } else {
        // 无保存内容时，聚焦到输入框
        nextTick(() => {
          this.$refs.textArea.focus()
        })
      }
    },

    // 复制文本内容到剪贴板
    copyText() {
      if (!this.textContent.trim()) {
        this.showStatus('请先输入内容', 'error')
        return
      }
      
      const textarea = this.$refs.textArea.$el.querySelector('textarea')
      textarea.select()
      try {
        document.execCommand('copy')
        this.showStatus('复制成功', 'success')
      } catch (error) {
        this.showStatus('复制失败', 'error')
      }
    },

    // 显示状态提示
    showStatus(message, type) {
      this.statusMessage = message
      this.statusType = type
      this.statusVisible = true
      // 3秒后自动隐藏
      setTimeout(() => {
        this.statusVisible = false
      }, 3000)
    },

    // 复制网站链接到剪贴板
    copyLink() {
      const tempInput = document.createElement('input')
      tempInput.value = this.WEBSITE_URL
      document.body.appendChild(tempInput)
      tempInput.select()
      try {
        document.execCommand('copy')
        this.showStatus('链接复制成功', 'success')
      } catch (error) {
        this.showStatus('链接复制失败', 'error')
      }
      document.body.removeChild(tempInput)
    },

    // 生成网站二维码
    generateQRCode() {
      this.$refs.qrcodeContainer.innerHTML = ''
      new QRCode(this.$refs.qrcodeContainer, {
        text: this.WEBSITE_URL,
        width: 120,
        height: 120,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
    },

    // 清空文本内容
    clearText() {
      this.textContent = ''
      nextTick(() => {
        this.$refs.textArea.focus()
      })
      this.saveContent()
    },

    // 下载文本内容为txt文件
    downloadText() {
      const text = this.textContent.trim()
      if (!text) {
        this.showStatus('请先输入内容', 'error')
        return
      }

      // 创建Blob对象
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      // 生成带时间戳的文件名
      const fileName = `text_${new Date().toISOString().slice(0,19).replace(/[:-]/g, '')}.txt`
      link.download = fileName
      // 触发下载
      document.body.appendChild(link)
      link.click()
      // 清理
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      this.showStatus('下载成功', 'success')
    },

    // 输入处理函数
    handleInput() {
      // 可以添加防抖、验证等逻辑
    }
  }
}
</script>

<style>
/* 引入原有的CSS文件 */
@import './NetworkText.css';

/* Element UI样式覆盖 */
.el-textarea__inner {
  height: 300px !important; /* 固定文本框高度 */
}

.el-alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

/* 按钮组样式调整 */
.button-group .el-button {
  width: 100%;
  margin-left: 0;
  margin-bottom: 10px;
}

/* 清除Element UI默认样式 */
.el-button+.el-button {
  margin-left: 0;
}
</style> 