<template>
  <div class="vp-preview">
    <div class="vp-preview__header" v-if="title">
      <span class="vp-preview__title">{{ title }}</span>
    </div>
    <iframe
      ref="frameRef"
      class="vp-preview__frame"
      :style="{ height: height + 'px' }"
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
  
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  title?: string
  height?: number
  html?: string
  css?: string
  js?: string
  // 可覆盖默认 CDN（如需切换版本）
  cdnCss?: string
  cdnJs?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  height: 420,
  html: '',
  css: '',
  js: '',
  cdnCss: 'https://cdn01.xiaogj.com/uploads/fe/libs/xgj-fe-libs/core-mobile-vue/2.3.0/plugin.css',
  cdnJs: 'https://cdn01.xiaogj.com/uploads/fe/libs/xgj-fe-libs/core-mobile-vue/2.3.0/plugin.js'
})

const frameRef = ref<HTMLIFrameElement | null>(null)

function writeDoc() {
  const doc = frameRef.value?.contentDocument
  if (!doc) return

  const html = `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="${props.cdnCss}" />
      <style>
        html,body{margin:0;padding:0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;}
        ${props.css || ''}
      </style>
    </head>
    <body>
      <div id="app">
        ${props.html || ''}
      </div>
      <script src="https://cdn01.xiaogj.com/uploads/fe/libs/official/vue/2.5.16/vue.js"><\/script>
      <script src="https://cdn01.xiaogj.com/uploads/fe/libs/official/vue-router/2.7.0/vue-router.js"><\/script>
      <script src="${props.cdnJs}"><\/script>
      <script>
        (function boot(){
          var tryRun = function(){
            // 为 Dialog 组件提供路由环境
            if (window.VueRouter && window.Vue && window.Vue.event && !window.app.alert) {
              try {
                // 创建一个模拟路由，防止 Dialog 关闭时影响 iframe 导航
                var router = new VueRouter({ 
                  routes: [],
                  mode: 'abstract' // 使用 abstract 模式，不会影响浏览器 URL
                });
                
                // 重写 router.go 方法，防止路由跳转
                var originalGo = router.go;
                var originalBack = router.back;
                var originalPush = router.push;
                var originalReplace = router.replace;
                
                router.go = function() { /* 阻止路由跳转 */ };
                router.back = function() { /* 阻止路由跳转 */ };
                router.push = function() { /* 阻止路由跳转 */ };
                router.replace = function() { /* 阻止路由跳转 */ };
                
                Vue.event.$emit('instanceVueRouter', router);
              } catch(e) { console.warn('Router init failed:', e); }
            }
            
            try { ${props.js || ''} } catch(e) { console.error(e); }
          };
          // 等待 Vue 与 组件库脚本加载
          var ready = function(){ return !!(window.Vue) && !!(window.app) && !!(window.VueRouter); };
          if (ready()) return tryRun();
          var timer = setInterval(function(){
            if (ready()) { clearInterval(timer); tryRun(); }
          }, 50);
          setTimeout(function(){ clearInterval(timer); }, 10000);
        })();
      <\/script>
    </body>
  </html>`

  doc.open()
  doc.write(html)
  doc.close()
}

onMounted(writeDoc)
watch(() => [props.html, props.css, props.js, props.cdnCss, props.cdnJs], writeDoc)
</script>

<style scoped>
.vp-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.vp-preview__header {
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.vp-preview__title {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.vp-preview__frame {
  width: 100%;
  display: block;
  border: 0;
}
</style>


