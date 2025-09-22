# 快速开始

本指南将帮助您快速上手组件库的使用。

## 前置要求

在开始之前，请确保您的开发环境满足以下要求：

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本（推荐使用 pnpm 或 yarn）

## 安装

### npm

```bash
npm install your-component-library
```

### yarn

```bash
yarn add your-component-library
```

### pnpm

```bash
pnpm add your-component-library
```

## 基本使用

### 全量引入

```javascript
import { createApp } from 'vue'
import ComponentLibrary from 'your-component-library'
import 'your-component-library/dist/style.css'

const app = createApp(App)
app.use(ComponentLibrary)
app.mount('#app')
```

### 按需引入

```javascript
import { Button, Input } from 'your-component-library'
import 'your-component-library/dist/button.css'
import 'your-component-library/dist/input.css'
```

## 第一个例子

```vue
<template>
  <div>
    <c-button type="primary" @click="handleClick">
      点击我
    </c-button>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

## 下一步

- 查看 [组件文档](/components/) 了解所有可用组件
- 参考 [组件文档编写规范](./component-doc-rules.md) 了解文档标准
- 了解更多 [安装和配置](./installation.md) 信息

