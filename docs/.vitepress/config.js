import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "智校前端组件库文档",
  base: '/component-intro/',
  description: "公共组件库使用文档",
  head: [
    ['link', { rel: 'icon', href: '/component-intro/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '指南', link: '/guide/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '开发规范',
          items: [
            { text: '组件文档编写规范', link: '/guide/component-doc-rules' }
          ]
        }
      ],
      '/components/': [
        {
          text: '移动端组件',
          items: [
            {
              text: '基础组件',
              items: [
              ]
            },
            {
              text: '反馈组件',
              items: [
                { text: 'Toast 消息提示', link: '/components/mobile/feedback/toast' },
                { text: 'Dialog 对话框', link: '/components/mobile/feedback/dialog' },
                { text: 'ActionSheet 动作面板', link: '/components/mobile/feedback/action-sheet' },
                { text: 'Loading 加载中', link: '/components/mobile/feedback/loading' }
              ]
            },
            {
              text: '表单组件',
              items: [
                { text: 'DateBar 日期选择条', link: '/components/mobile/form/date-bar' },
                { text: 'Calendar 日历选择', link: '/components/mobile/form/calendar' },
                { text: 'QuickDate 快捷日期', link: '/components/mobile/form/quickdate' }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiliubianbian/component-intro/tree/main' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 智校前端团队'
    },

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/xiliubianbian/component-intro/',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})

