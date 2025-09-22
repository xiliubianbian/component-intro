# 安装

详细的安装和配置指南。

## 环境要求

### Node.js 版本

推荐使用 Node.js 的 LTS 版本：

- Node.js >= 16.0.0
- npm >= 7.0.0

您可以通过以下命令检查当前版本：

```bash
node --version
npm --version
```

### 浏览器支持

组件库支持现代浏览器：

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --- | --- | --- | --- |
| Chrome ≥ 64 | Firefox ≥ 69 | Safari ≥ 12 | Edge ≥ 79 |

## 包管理器

### npm

```bash
# 安装组件库
npm install your-component-library

# 安装开发依赖（如果需要）
npm install --save-dev your-component-library-dev-tools
```

### yarn

```bash
# 安装组件库
yarn add your-component-library

# 安装开发依赖（如果需要）
yarn add --dev your-component-library-dev-tools
```

### pnpm

```bash
# 安装组件库
pnpm add your-component-library

# 安装开发依赖（如果需要）
pnpm add -D your-component-library-dev-tools
```

## CDN 引入

如果您不想使用包管理器，可以通过 CDN 方式引入：

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://cdn01.xiaogj.com/uploads/fe/libs/xgj-fe-libs/core-mobile-vue/2.3.0/plugin.css">

<!-- 引入组件库 -->
<script src="https://cdn01.xiaogj.com/uploads/fe/libs/xgj-fe-libs/core-mobile-vue/2.3.0/plugin.js"></script>
```

## 配置

### Vite 项目

在 `vite.config.js` 中添加配置：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['your-component-library']
  }
})
```

### Webpack 项目

在 `webpack.config.js` 中添加配置：

```javascript
module.exports = {
  // ... 其他配置
  resolve: {
    alias: {
      'your-component-library': path.resolve(__dirname, 'node_modules/your-component-library')
    }
  }
}
```

### TypeScript 支持

如果使用 TypeScript，需要安装类型定义：

```bash
npm install --save-dev @types/your-component-library
```

或者在 `tsconfig.json` 中添加类型声明：

```json
{
  "compilerOptions": {
    "types": ["your-component-library"]
  }
}
```

## 验证安装

创建一个简单的测试页面来验证安装是否成功：

```vue
<template>
  <div>
    <h1>组件库测试页面</h1>
    <c-button type="primary">测试按钮</c-button>
  </div>
</template>

<script setup>
import { Button } from 'your-component-library'
</script>
```

如果页面正常显示且按钮样式正确，说明安装成功！

