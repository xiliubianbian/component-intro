# QuickDate 快捷日期

用于快速选择常见时间范围的弹出层组件，基于 ActionSheet 封装。

::: tip Vue2 组件
此组件基于 Vue2 开发，适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要快速选择“今天/本周/最近7天/本月/上月”等时间范围
- 作为 DateBar 的快捷日期面板

## 代码演示

### 基础用法（全局调用）

```javascript
app.quickDate({
  type: 1,
  index: -1,
  shortcuts: ['今天','昨天','本周','最近7天','最近30天','本月','上月']
}).then(({ sdate, edate, index }) => {
  console.log(sdate, edate, index)
})
```

### 自定义快捷项与样式类型

```javascript
app.quickDate({
  type: 2, // 企业微信样式
  index: '3', // 字符串形式兼容
  shortcuts: ['今天','近15天','近30天','近90天']
}).then(({ sdate, edate, index }) => {
  // 根据返回的范围刷新数据
})
```

## API（app.quickDate）

```typescript
app.quickDate(options?: QuickDateOptions): Promise<{ sdate: string, edate: string, index: string }>
```

### QuickDateOptions

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| type | 组件样式类型 | number | 1 | 1：默认；2：企业微信样式 |
| index | 当前选中的快捷项下标 | string \| number | '-1' | 会被内部转换为字符串 |
| shortcuts | 可用快捷项集合 | string[] | 见下 | 需为预置 key 名称 |

预置快捷项映射（内部）：

- 不限: `-99`（返回空范围）
- 今天: `0`
- 昨天: `1`
- 本周: `2`
- 最近7天: `3`
- 最近30天: `4`
- 本月: `5`
- 上月: `6`
- 近15天: `7`
- 近30天: `8`
- 近90天: `9`
- 下周: `10`
- 最近一年: `11`

### 返回值

- `Promise<{ sdate, edate, index }>`：返回所选时间范围及所选快捷项下标（字符串）

## 注意事项

- 传入的 `shortcuts` 必须是以上映射表中的 key 名称数组。
- `index` 在内部统一转为字符串，比较时请注意类型。
- 组件通过 ActionSheet 弹层呈现，需已注册相关弹层能力。
