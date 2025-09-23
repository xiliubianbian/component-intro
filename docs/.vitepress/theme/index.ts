import DefaultTheme from 'vitepress/theme'
import Preview from './components/Preview.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册预览组件供 Markdown 中直接使用
    app.component('Preview', Preview)
  }
}


