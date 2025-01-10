// 常量定义
const STORAGE_KEY = 'network-text-content';
const WEBSITE_URL = 'http://www.baidu.com/index.html';

// DOM元素
const textArea = document.getElementById('textContent');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const downloadBtn = document.getElementById('downloadBtn');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const statusMsg = document.getElementById('statusMsg');
const qrcodeContainer = document.getElementById('qrcodeContainer');
const clearBtn = document.getElementById('clearBtn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载保存的内容
    loadSavedContent();
    
    // 绑定事件监听器
    copyBtn.addEventListener('click', copyText);
    saveBtn.addEventListener('click', saveContent);
    downloadBtn.addEventListener('click', downloadText);
    copyLinkBtn.addEventListener('click', copyLink);
    clearBtn.addEventListener('click', clearText);
    textArea.addEventListener('input', toggleClearButton);
    
    // 初始化时检查是否显示清空按钮
    toggleClearButton();
    
    // 自动生成二维码
    generateQRCode();
});

// 保存内容
function saveContent() {
    try {
        localStorage.setItem(STORAGE_KEY, textArea.value);
        showStatus('保存成功', 'success');
    } catch (error) {
        showStatus('保存失败', 'error');
    }
}

// 复制文本
function copyText() {
    if (!textArea.value.trim()) {
        textArea.classList.add('error');
        showStatus('请先输入内容', 'error');
        setTimeout(() => {
            textArea.classList.remove('error');
        }, 3000);
        return;
    }
    
    textArea.select();
    try {
        document.execCommand('copy');
        showStatus('复制成功', 'success');
    } catch (error) {
        showStatus('复制失败', 'error');
    }
}

// 显示状态消息
function showStatus(message, type) {
    statusMsg.textContent = message;
    statusMsg.className = 'status-message ' + type;
    statusMsg.style.display = 'block';
    setTimeout(() => {
        statusMsg.style.display = 'none';
    }, 3000);
}

// 复制链接
function copyLink() {
    // 创建临时输入框
    const tempInput = document.createElement('input');
    tempInput.value = WEBSITE_URL;
    document.body.appendChild(tempInput);
    
    // 选择并复制
    tempInput.select();
    try {
        document.execCommand('copy');
        showStatus('链接复制成功', 'success');
    } catch (error) {
        showStatus('链接复制失败', 'error');
    }
    
    // 移除临时输入框
    document.body.removeChild(tempInput);
}

// 生成二维码
function generateQRCode() {
    // 清空之前的二维码
    qrcodeContainer.innerHTML = '';
    
    // 创建新的QRCode实例
    new QRCode(qrcodeContainer, {
        text: WEBSITE_URL,
        width: 120,
        height: 120,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    });
}

// 添加输入监听以移除错误状态
textArea.addEventListener('input', () => {
    textArea.classList.remove('error');
});

// 切换清空按钮的显示状态
function toggleClearButton() {
    clearBtn.style.display = textArea.value ? 'block' : 'none';
}

// 清空文本
function clearText() {
    textArea.value = '';
    toggleClearButton();
    textArea.focus();
    saveContent();
}

// 下载文本
function downloadText() {
    const text = textArea.value.trim();
    if (!text) {
        textArea.classList.add('error');
        showStatus('请先输入内容', 'error');
        setTimeout(() => {
            textArea.classList.remove('error');
        }, 3000);
        return;
    }

    // 创建Blob对象
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    
    // 设置文件名（使用当前时间戳）
    const fileName = `text_${new Date().toISOString().slice(0,19).replace(/[:-]/g, '')}.txt`;
    link.download = fileName;
    
    // 添加到文档并触发点击
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    showStatus('下载成功', 'success');
}

// 加载保存的内容
function loadSavedContent() {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
        textArea.value = savedContent;
        // 隐藏提示文本
        document.querySelector('.textarea-tips').style.display = 'none';
        // 将光标移到内容末尾
        textArea.focus();
        textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    } else {
        // 如果没有内容，聚焦到文本框
        textArea.focus();
    }
} 