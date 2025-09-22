# 组件库文档

基于 VitePress 构建的公共组件库文档站点。

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看文档站点。

### 构建部署

```bash
npm run docs:build
```

构建完成后，静态文件将生成在 `docs/.vitepress/dist` 目录中。

### 预览构建结果

```bash
npm run docs:preview
```

## 📁 目录结构

```
component-intro/
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # VitePress 配置文件
│   ├── components/             # 组件文档
│   │   ├── index.md           # 组件概览
│   │   ├── button.md          # 按钮组件
│   │   ├── input.md           # 输入框组件
│   │   ├── card.md            # 卡片组件
│   │   └── ...
│   ├── guide/                 # 使用指南
│   │   ├── index.md           # 指南概览
│   │   ├── getting-started.md # 快速开始
│   │   ├── installation.md    # 安装说明
│   │   └── theme-config.md    # 主题配置
│   └── index.md               # 首页
├── package.json
└── README.md
```

## 🎯 功能特性

- 📖 **完善的文档系统** - 基于 VitePress 构建，支持 Markdown 和 Vue 组件
- 🎨 **组件演示** - 提供在线代码示例和实时预览
- 🔍 **全文搜索** - 内置搜索功能，快速定位内容
- 🌈 **主题定制** - 支持自定义主题和样式
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **快速热更新** - 开发时实时预览修改效果

## 📝 文档编写

### 添加新组件文档

1. 在 `docs/components/` 目录下创建新的 Markdown 文件
2. 在 `docs/.vitepress/config.js` 中添加侧边栏配置
3. 参考现有组件文档的格式编写内容

### 文档格式规范

每个组件文档应包含：

- **何时使用** - 组件的使用场景
- **代码演示** - 各种使用示例
- **API** - 组件的属性、事件、方法等
- **主题定制** - 相关的 CSS 变量

### 代码演示格式

使用 `::: demo` 代码块来创建可交互的示例：

```markdown
::: demo
\`\`\`vue
<template>
  <c-button type="primary">按钮</c-button>
</template>
\`\`\`
:::
```

## 🚀 部署

### GitHub Pages

1. 在 GitHub 仓库设置中开启 Pages 功能
2. 配置 GitHub Actions 自动部署
3. 推送代码到 main 分支即可自动部署

### Vercel/Netlify

1. 连接 GitHub 仓库
2. 设置构建命令：`npm run docs:build`
3. 设置输出目录：`docs/.vitepress/dist`

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进文档！

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

[MIT License](./LICENSE)

