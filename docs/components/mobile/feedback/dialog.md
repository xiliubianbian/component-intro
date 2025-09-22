# Dialog 对话框

模态对话框组件，用于显示重要信息并与用户进行交互。

::: tip Vue2 组件
此组件基于 Vue2 开发，所有示例代码都采用 Vue2 语法。适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要用户确认重要操作时
- 显示详细的错误信息或警告时
- 需要用户做出选择（确认/取消）时
- 展示无法在当前页面展示的内容时

## 设计特色

- 🎯 **模态交互** - 阻止用户与页面其他部分交互
- 📱 **移动优化** - 专为移动端设计的弹窗体验
- 🎬 **平滑动画** - 优雅的显示和隐藏动画效果
- 🔄 **Promise支持** - 支持Promise链式调用

## 代码演示

### Alert 警告框

用于显示警告信息，只有一个确认按钮。

<details>
<summary>查看完整代码</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="showBasicAlert">基础警告框</button>
    <button @click="showHtmlAlert">HTML内容警告框</button>
    <button @click="showCustomAlert">自定义样式警告框</button>
  </div>
</template>

<script>
export default {
  name: 'AlertDemo',
  methods: {
    showBasicAlert() {
      // 最简单的用法
      app.alert('未授权。此操作需要以下权限：教务管理>课表和点名>点名上课。');
    },
    
    showHtmlAlert() {
      // 支持HTML内容
      app.alert({
        html: '检测到以下学员上课时间有冲突，不能点名。<br/>张三、李四、王五'
      });
    },
    
    showCustomAlert() {
      // 自定义标题和样式
      app.alert({
        title: '操作提示',
        text: '请确认您的操作',
        titleStyle: {
          color: '#ff3c00'
        },
        textStyle: {
          fontSize: '16px'
        }
      });
    }
  }
}
</script>
```

</details>

### Confirm 确认框

用于需要用户确认的操作，包含确认和取消两个按钮。

<details>
<summary>查看代码示例</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="showBasicConfirm">基础确认框</button>
    <button @click="showHtmlConfirm">HTML内容确认框</button>
    <button @click="showCustomConfirm">自定义按钮确认框</button>
  </div>
</template>

<script>
export default {
  methods: {
    showBasicConfirm() {
      app.confirm('确定删除吗？').then(result => {
        if (result) {
          app.toast('success', '删除成功');
        } else {
          app.toast('info', '已取消删除');
        }
      });
    },
    
    showHtmlConfirm() {
      app.confirm({
        html: '检测到以下学员上课时间有冲突，是否继续点名？<br/>张三、李四'
      }).then(result => {
        if (result) {
          this.continueAttendance();
        }
      });
    },
    
    showCustomConfirm() {
      app.confirm({
        title: '删除确认',
        text: '删除后无法恢复，确定要删除吗？',
        btns: [
          {
            text: '取消',
            style: { color: '#666' },
            action: false
          },
          {
            text: '确定删除',
            style: { color: '#ff3c00' },
            action: true
          }
        ]
      }).then(result => {
        console.log('用户选择:', result);
      });
    },
    
    continueAttendance() {
      app.toast('info', '继续点名操作');
    }
  }
}
</script>
```

</details>

### 高级用法

结合路由和业务逻辑的高级用法示例。

<details>
<summary>查看配置代码</summary>

```vue
<template>
  <div class="demo-container">
    <button @click="handleImportantAction">重要操作</button>
  </div>
</template>

<script>
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  
  methods: {
    async handleImportantAction() {
      try {
        // 显示确认对话框
        const confirmed = await app.confirm({
          title: '重要操作确认',
          html: '此操作将影响所有相关数据，<br/><strong>请谨慎操作！</strong>',
          clickMask2close: false, // 禁止点击蒙层关闭
          btns: [
            {
              text: '我再想想',
              style: { color: '#999' },
              action: false
            },
            {
              text: '确认执行',
              style: { 
                color: '#fff',
                backgroundColor: '#ff3c00',
                borderRadius: '4px',
                padding: '0 8px'
              },
              action: true
            }
          ]
        });
        
        if (confirmed) {
          // 执行重要操作
          await this.executeImportantAction();
          app.toast('success', '操作执行成功');
        }
      } catch (error) {
        app.alert({
          title: '操作失败',
          html: `操作执行失败：<br/>${error.message}`
        });
      }
    },
    
    async executeImportantAction() {
      // 模拟异步操作
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
  }
}
</script>
```

</details>

## API

### Alert 方法

```javascript
// 简单文本
app.alert(text)

// 配置对象
app.alert(options)
```

### Confirm 方法

```javascript
// 简单文本，返回Promise
app.confirm(text).then(result => {})

// 配置对象，返回Promise
app.confirm(options).then(result => {})
```

### Dialog 通用方法

```javascript
// 直接创建Dialog实例
app.dialog(type, options)
```

### 参数说明

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| type | 对话框类型 | string | 'alert' | alert/confirm |
| title | 标题文本 | string | '提示' | 显示在顶部 |
| text | 内容文本 | string | '' | 纯文本内容 |
| html | HTML内容 | string | - | 支持HTML标签 |
| titleStyle | 标题样式 | object | - | CSS样式对象 |
| textStyle | 内容样式 | object | - | CSS样式对象 |
| btn | 单按钮配置 | object | - | 仅alert类型使用 |
| btns | 多按钮配置 | array | - | confirm类型使用 |
| clickMask2close | 点击蒙层关闭 | boolean | false | 控制交互行为 |
| cancelAction | 取消时的返回值 | any | false | Promise resolve值 |

### 按钮配置

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| text | 按钮文本 | string | - | 显示的文字 |
| style | 按钮样式 | object | - | CSS样式对象 |
| action | 点击返回值 | any | - | Promise resolve值 |

### 返回值

- **Alert**: 无返回值
- **Confirm**: 返回Promise，resolve按钮的action值

## 使用场景

### 1. 权限验证提示（推荐）

用户执行需要权限的操作时显示提示。

```javascript
// 权限不足提示
if (!hasPermission) {
  app.alert('未授权。此操作需要以下权限：教务管理>课表和点名>点名上课。');
  return;
}
```

### 2. 删除确认

重要数据删除前的确认操作。

```javascript
// 删除确认
app.confirm('确定删除吗？').then(confirmed => {
  if (confirmed) {
    this.deleteItem();
  }
});
```

### 3. 冲突处理

数据冲突时让用户选择处理方式。

```javascript
// 时间冲突处理
app.confirm({
  html: '检测到以下学员上课时间有冲突，是否继续点名？<br/>' + conflictNames
}).then(result => {
  if (result) {
    this.continueWithConflict();
  }
});
```

### 4. 错误信息展示

显示详细的错误信息。

```javascript
// 错误信息展示
if (res.ErrorCode == 403) {
  app.alert({
    html: res.ErrorMsg
  });
}
```

## Vue2 集成指南

### 项目中的使用方式

Dialog组件通过路由集成，需要在路由实例化后使用：

```javascript
// 在Vue组件中使用
export default {
  mixins: [app.mixin.popupWindowRouteMixin], // 使用弹窗路由混入
  
  methods: {
    showDialog() {
      app.alert('这是一个提示');
    }
  }
}
```

### 路由集成模式

Dialog组件与路由系统深度集成：

```javascript
// 组件内部会自动处理路由
beforeCreate() {
  this.$router.popupWindow.push(this);
  this.$router.push({
    path: this.$route.path,
    query: {
      ...this.$route.query,
      pwIndex: this.$router.popupWindow.length
    }
  });
}
```

### 样式集成

Dialog使用了项目的SCSS变量和混入：

```scss
.dialog-box {
  background-color: #FFF;
  border-radius: 8px;
  
  .dialog-title {
    color: #333;
    font-size: 18px;
    text-align: center;
  }
  
  .text-body {
    color: #888;
    font-size: 15px;
    line-height: 22px;
  }
}
```

## 注意事项

### Vue2 特有注意事项

- Dialog组件需要路由支持，确保在路由实例化后使用
- 组件会自动管理路由历史，关闭时会执行路由回退
- 使用了Vue2的生命周期和响应式系统

### 通用注意事项

- Dialog是模态组件，会阻止用户与页面其他部分交互
- 同时只能显示一个Dialog
- HTML内容要注意XSS安全问题
- 移动端使用时注意屏幕适配

### 最佳实践

- **内容长度**：避免内容过长，影响用户体验
- **按钮文案**：使用清晰明确的按钮文案
- **重要操作**：重要操作前必须使用确认框
- **错误处理**：详细的错误信息使用HTML格式展示

### 常见问题

**Q: Dialog没有显示？**
A: 检查路由是否正确初始化，确保使用了popupWindowRouteMixin。

**Q: 点击蒙层无法关闭Dialog？**
A: 默认情况下点击蒙层不会关闭，设置clickMask2close: true可以启用。

**Q: 如何自定义Dialog样式？**
A: 通过titleStyle和textStyle参数自定义样式，或通过CSS覆盖相应类名。

**Q: Dialog关闭后页面路由异常？**
A: 确保正确使用了popupWindowRouteMixin，组件会自动管理路由状态。

**Q: 可以在Dialog中嵌套其他Dialog吗？**
A: 技术上可以，但不建议，会影响用户体验和路由管理。

---

*基于项目实际使用案例编写，结合路由系统的深度集成方案。*
