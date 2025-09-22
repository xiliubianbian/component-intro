# Loading 加载中

全局加载指示组件，用于在耗时操作期间给出反馈，防止误操作。

::: tip Vue2 组件
此组件基于 Vue2 开发，适用于 Vue 2.x 项目。
:::

## 何时使用

- 发起耗时的网络请求或计算时
- 需要阻止用户在后台处理中重复操作时
- 执行批量/多步异步流程时

## 设计特色

- 🌓 **背景遮罩**：支持不同遮罩类型，适配不同使用场景
- 🔁 **全局单例**：统一由 `app.loading` 管理，避免多实例冲突
- 🧩 **可配置**：支持是否展示 loading 图标、遮罩类型

## 代码演示

### 方式一：全局调用（app.loading）

展示全局加载，完成后关闭。

```javascript
// 开始加载（默认）
app.loading.show();

// 完成后关闭
app.loading.close();
```

#### 配置遮罩与图标

结合实际项目（如高阶图片选择时），根据环境控制遮罩与图标显示。

```javascript
// 仅遮罩，不显示 loading 图标
app.loading.show({ bgType: 1, showIcon: false });

// 半透明遮罩 + 显示图标（示例值，实际以业务样式为准）
app.loading.show({ bgType: 2, showIcon: true });
```

#### 与异步流程结合

```javascript
async function runTask() {
  try {
    app.loading.show({ bgType: 1, showIcon: false });
    const data = await doAsyncJob();
    // ...处理数据
  } catch (e) {
    // 错误处理
  } finally {
    app.loading.close();
  }
}
```

### 方式二：直接引入组件（loading.vue）

适用于页面或局部区域需要可控遮罩/图标时；可作为容器包裹插槽内容。

```vue
<template>
  <div>
    <button @click="toggle">切换 Loading</button>

    <!-- 方式A：整页遮罩，使用 v-if 控制显示 -->
    <loading v-if="opened"
             :isDefault="true"
             :bgType="1"
             :showIcon="true" />

    <!-- 方式B：局部容器遮罩，包裹插槽内容（可显示文字） -->
    <div class="card">
      <loading v-if="loadingSection"
               :isDefault="false"
               :bgType="2"
               :showIcon="true">
        <p style="margin-top: 8px; color: #888;">正在加载数据…</p>
      </loading>
      <!-- 实际内容 -->
      <div class="content">列表 / 表单内容</div>
    </div>
  </div>
</template>

<script>
import Loading from 'src/plugin/components/loading/loading.vue'

export default {
  name: 'LoadingDirectDemo',
  components: { Loading },
  data() {
    return {
      opened: false,
      loadingSection: false
    }
  },
  methods: {
    toggle() {
      this.opened = !this.opened
    },
    async fetchSection() {
      this.loadingSection = true
      try {
        await api.fetch()
      } finally {
        this.loadingSection = false
      }
    }
  }
}
</script>
```

#### 组件 Props（loading.vue）

| 名称 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| isDefault | 是否使用默认定位（覆盖在容器之上） | Boolean | true | 默认全屏/容器绝对定位覆盖 |
| bgType | 背景遮罩类型 | Number | 0 | 0: 白色; 1: 半透明黑; 2: 透明 |
| showIcon | 是否显示 loading 图标 | Boolean | true | 为 false 时仅显示遮罩 |

提示：该组件本身不内置可见性控制，请在使用处通过 `v-if`/`v-show` 控制显示/隐藏。

## API（app.loading）

### 调用方式

全局对象 `app.loading` 提供以下方法：

```typescript
app.loading.show(options?: LoadingOptions): Promise<void>
app.loading.close(): void
```

### LoadingOptions

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| bgType | 背景遮罩类型 | number | 1 | 不同值对应不同遮罩风格（见上） |
| showIcon | 是否展示 loading 图标 | boolean | true | 在部分场景可关闭以减少干扰 |

说明：
- `show()` 返回一个 Promise，可在需要时用于串联流程；一般使用 `finally` 关闭即可。

## 使用场景

### 1. 媒体处理流程（推荐）

在调用相册/相机或处理媒体期间展示遮罩，完成后关闭。

```javascript
app.loading.show({ bgType: 1, showIcon: false })
chooseImages()
  .then(handleImages)
  .finally(() => app.loading.close())
```

### 2. 表单提交与批量操作

```javascript
async function submitForm() {
  try {
    app.loading.show()
    await api.submit(formData)
    app.toast('success', '提交成功')
  } catch (e) {
    app.toast('error', '提交失败')
  } finally {
    app.loading.close()
  }
}
```

### 3. 级联异步任务

多个步骤依次执行时，贯穿整个流程显示加载状态。

```javascript
async function processSteps() {
  app.loading.show({ showIcon: true })
  try {
    await step1()
    await step2()
    await step3()
  } finally {
    app.loading.close()
  }
}
```

## Vue2 集成指南

### 插件注册与全局使用

该组件以插件形式注册（在 `app.js` 中）：

```javascript
// 注册（已在项目初始化阶段完成）
Vue.use(Loading, { router, root: app })

// 业务中直接使用
app.loading.show({ bgType: 1, showIcon: false })
// ...
app.loading.close()
```

### 直接组件引入

当需要更细粒度控制或局部遮罩时，推荐直接引入 `loading.vue`：

```javascript
import Loading from 'src/plugin/components/loading/loading.vue'
export default { components: { Loading } }
```

## 注意事项

- 建议与 `try/catch/finally` 或 `Promise.finally()` 搭配，确保出错也能正确关闭
- 浏览器内（非宿主 App）如需交互请谨慎使用不透明遮罩，避免阻塞点击
- 全局与局部两种方式不要同时叠加，避免多层遮罩影响体验
- 确保整个流程只维护一个全局 loading，避免多实例叠加

## 常见问题

**Q: show 后忘记 close 怎么办？**
A: 建议统一封装在 `try...finally` 中，或在业务封装层确保流程收尾关闭。

**Q: show 返回的 Promise 有什么用？**
A: 用于特殊链路下的串联控制，普通业务可不关注，直接 `close()` 结束即可。

**Q: 背景遮罩点击是否可关闭？**
A: 该组件用于全局加载，通常不提供点击关闭能力，避免误操作。
