# Toast 消息提示

轻量级的消息提示组件，用于向用户显示简短的提示信息。

::: tip Vue2 组件
此组件基于 Vue2 开发，所有示例代码都采用 Vue2 语法。适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要显示简短的成功、错误、信息或警告消息时
- 需要给用户操作反馈，但不需要用户确认时
- 显示系统状态变化或操作结果时

## 设计特色

- 🎯 **轻量级** - 简洁的API，易于使用
- 📱 **移动优化** - 专为移动端设计的交互体验
- 🎬 **动画效果** - 平滑的显示和隐藏动画
- 🎨 **多种类型** - 支持不同类型的消息样式

## 代码演示

### 基础用法

最简单的用法，直接传入文本消息。

<details>
<summary>查看完整代码</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="showBasicToast">显示基础提示</button>
    <button @click="showInfoToast">显示信息提示</button>
    <button @click="showErrorToast">显示错误提示</button>
  </div>
</template>

<script>
export default {
  name: 'ToastDemo',
  methods: {
    showBasicToast() {
      // 最简单的用法
      app.toast('操作成功');
    },
    
    showInfoToast() {
      // 指定消息类型
      app.toast('info', '请输入需要查询学员的姓名/学号/电话');
    },
    
    showErrorToast() {
      // 错误消息
      app.toast('error', '操作失败，请重试');
    }
  }
}
</script>
```

</details>

### 不同类型的提示

Toast组件支持4种不同类型的消息提示。

<details>
<summary>查看代码示例</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="showDefault">默认提示</button>
    <button @click="showSuccess">成功提示</button>
    <button @click="showError">错误提示</button>
    <button @click="showInfo">信息提示</button>
  </div>
</template>

<script>
export default {
  methods: {
    showDefault() {
      app.toast('default', '这是默认提示');
    },
    
    showSuccess() {
      app.toast('success', '操作成功');
    },
    
    showError() {
      app.toast('error', '操作失败');
    },
    
    showInfo() {
      app.toast('info', '这是信息提示');
    }
  }
}
</script>
```

</details>

### 自定义持续时间

可以设置消息显示的持续时间。

<details>
<summary>查看配置代码</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="showShortToast">短时间显示</button>
    <button @click="showLongToast">长时间显示</button>
  </div>
</template>

<script>
export default {
  methods: {
    showShortToast() {
      // 显示1秒
      app.toast('success', '快速提示', 1000);
    },
    
    showLongToast() {
      // 显示5秒
      app.toast('info', '长时间提示信息', 5000);
    }
  }
}
</script>
```

</details>

## API

### 调用方式

Toast组件通过全局的 `app.toast()` 方法调用。

### 方法签名

```javascript
// 方式一：只传入消息文本
app.toast(text)

// 方式二：传入类型和消息文本
app.toast(type, text)

// 方式三：传入类型、消息文本和持续时间
app.toast(type, text, duration)

// 方式四：传入消息文本和持续时间
app.toast(text, duration)

// 方式五：传入配置对象
app.toast(options)
```

### 参数说明

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| type | 消息类型 | string | 'default' | 支持 default/success/error/info |
| text | 消息文本内容 | string | - | 支持HTML格式 |
| duration | 显示持续时间(毫秒) | number | 2000 | 自动隐藏延时 |
| options | 配置对象 | object | - | 包含上述所有属性 |

### type 可选值

| 值 | 说明 | 样式 |
| --- | --- | --- |
| default | 默认样式 | 黑色半透明背景 |
| success | 成功提示 | 绿色背景 |
| error | 错误提示 | 红色背景 |
| info | 信息提示 | 橙色背景 |

## 使用场景

### 1. 表单验证提示（推荐）

在表单提交或验证失败时显示错误信息。

```javascript
// 表单验证失败
if (!this.keyword.trim()) {
  app.toast('info', '请输入需要查询学员的姓名/学号/电话');
  return;
}

// 网络请求失败
if (res.ErrorCode !== 0) {
  app.toast('error', res.ErrorMsg);
}
```

### 2. 操作结果反馈

用户操作后的成功或失败反馈。

```javascript
// 保存成功
app.toast('success', '保存成功');

// 删除失败
app.toast('error', '删除失败，请重试');
```

### 3. 系统状态提示

显示系统状态变化或提醒用户注意事项。

```javascript
// 网络状态
app.toast('info', '网络连接已恢复');

// 功能提示
app.toast('default', '功能正在开发中');
```

## Vue2 集成指南

### 项目中的使用方式

Toast组件已经通过插件的方式集成到项目中，可以直接使用：

```javascript
// 在任何Vue组件中使用
export default {
  methods: {
    handleSubmit() {
      // 直接调用全局方法
      app.toast('success', '提交成功');
    }
  }
}
```

### 常用配置模式

```javascript
// 1. 简单文本提示
app.toast('操作完成');

// 2. 带类型的提示
app.toast('error', '请求失败');

// 3. 自定义持续时间
app.toast('info', '正在处理中...', 3000);

// 4. 配置对象方式
app.toast({
  type: 'success',
  text: '操作成功',
  duration: 1500
});
```

### 样式集成

Toast组件的样式已经内置，无需额外引入CSS文件。样式使用了项目的SCSS变量：

```scss
// 组件内部使用的样式变量
.toast-content {
  &.toast-default {
    background-color: rgba(0,0,0,.8);
  }
  &.toast-success {
    background-color: #26a733;
  }
  &.toast-error {
    background-color: #ff3c00;
  }
  &.toast-info {
    background-color: #f5a400;
  }
}
```

## 注意事项

### Vue2 特有注意事项

- Toast组件通过全局插件注册，确保在Vue实例化后调用
- 组件内部使用了Vue2的响应式数据和生命周期

### 通用注意事项

- Toast消息会自动隐藏，不需要手动关闭
- 同时只能显示一个Toast消息
- 消息文本支持HTML格式，但要注意XSS安全
- 建议消息文本不要过长，影响用户体验

### 最佳实践

- **类型选择**：根据消息的重要性选择合适的类型
- **文本长度**：保持消息简洁明了，一般不超过20个字符
- **显示时机**：在用户操作完成后立即显示反馈
- **错误处理**：网络请求失败时统一使用error类型

### 常见问题

**Q: Toast消息没有显示？**
A: 确保在页面加载完成后调用，检查console是否有错误信息。

**Q: 可以同时显示多个Toast吗？**
A: 不可以，新的Toast会替换当前显示的Toast。

**Q: 如何自定义Toast样式？**
A: Toast样式已经内置，如需自定义可以通过CSS覆盖相应的类名。

**Q: Toast支持点击事件吗？**
A: 当前版本不支持点击事件，Toast主要用于信息展示。

---

*基于项目实际使用案例编写，确保示例代码的实用性和准确性。*
