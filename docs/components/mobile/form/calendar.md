# Calendar 日历选择

用于选择单个日期的弹出式日历组件，基于 ActionSheet 与 Vux InlineCalendar 封装。

::: tip Vue2 组件
此组件基于 Vue2 开发，适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要选择具体某一天日期
- 与日期范围组件配合使用（如 DateBar 的开始/结束日期选择）

## 代码演示

### 预览（CDN 实例）

<Preview
  title="Calendar 预览"
  :width="375"
  :height="600"
  html="<div style='padding:12px'><button onclick='showCalendar()'>选择日期</button> <button onclick='showCalendarWithOptions()'>选择日期（禁用未来）</button><div id='result' style='margin-top:10px;padding:8px;background:#f0f0f0;border-radius:4px;'>选择的日期将显示在这里</div></div>"
  js="window.showCalendar=function(){app.calendar({value:'2025-09-01'}).then(date=>{document.getElementById('result').innerHTML='选择的日期: '+date;app.toast('success','已选择: '+date)})};window.showCalendarWithOptions=function(){app.calendar({value:'2025-08-01',disableFuture:true}).then(date=>{document.getElementById('result').innerHTML='选择的日期: '+date+' (禁用未来)';app.toast('success','已选择: '+date)})};new Vue({el:'#app'});"
/>

### 基础用法（全局调用）

```javascript
// 传入默认值
app.calendar({ value: '2025-09-01' }).then(date => {
  console.log('选择的日期：', date)
})
```

### 禁用未来日期、使用自定义 slot

```javascript
app.calendar({
  value: '2025-08-01',
  disableFuture: true,
  useSlot: true,
  props: { firstDayOfWeek: 1 } // 透传给 InlineCalendar 的属性
}).then(date => {
  // ...
})
```

## API（app.calendar）

```typescript
app.calendar(options?: CalendarOptions): Promise<string>
```

### CalendarOptions

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| value | 默认选中日期 | string | '' | 格式 `YYYY-MM-DD` |
| autoClosed | 选择后是否自动关闭 | boolean | true | 选择回调触发后关闭 |
| disableFuture | 是否禁用未来日期 | boolean | false | 控制可选范围 |
| useSlot | 是否启用自定义 each-day slot | boolean | false | 自定义单元格内容 |
| props | 透传给 InlineCalendar 的属性 | object | - | 例如 `{ firstDayOfWeek: 1 }` |

### 返回值

- `Promise<string>`：选择的日期，格式为 `YYYY-MM-DD`

## 注意事项

- 该组件以 ActionSheet 弹层形式呈现，需与 `popupWindowRouteMixin` 配合已在项目中注册。
- 若与 DateBar 配合，请在回调中更新父组件持有的日期状态。
