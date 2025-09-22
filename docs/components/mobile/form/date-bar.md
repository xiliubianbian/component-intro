# DateBar 日期选择条

用于选择开始/结束日期，并支持快捷日期选择。

::: tip Vue2 组件
此组件基于 Vue2 开发，适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要选择日期范围（开始/结束）
- 需要一键选择“今天/本周/最近7天”等快捷日期
- 需要在查询条件区快速设置时间范围

## 设计特色

- 🧭 **双日期选择**：支持开始/结束两个日期
- ⚡ **快捷选择**：支持预设快捷日期（今天/昨天/本周/最近7天/最近30天/本月/上月）
- 🧩 **可配置**：支持组件样式类型 `type`（1/2）
- 🔗 **深度集成**：依赖全局 `app.calendar` 和 `app.quickDate` 弹窗组件

## 代码演示

### 基础用法（type=1）

```vue
<template>
  <date-bar
    :sdate="sdate"
    :edate="edate"
    :index="quickDateIndex"
    @changeDate="onChangeDate"/>
</template>

<script>
export default {
  data() {
    return {
      sdate: '',
      edate: '',
      quickDateIndex: -1
    }
  },
  methods: {
    onChangeDate({ sdate, edate, index }) {
      this.sdate = sdate
      this.edate = edate
      this.quickDateIndex = index
      this.fetch()
    },
    fetch() {
      // 根据日期范围刷新数据
    }
  }
}
</script>
```

### 企业微信样式（type=2）

```vue
<date-bar
  :sdate="sdate"
  :edate="edate"
  :index="quickDateIndex"
  :shortcuts="['今天','昨天','本周','最近7天','最近30天','本月','上月']"
  :type="2"
  @changeDate="onChangeDate"/>
```

### 搭配查询按钮

```vue
<template>
  <div class="search-bar">
    <date-bar
      class="date-filter"
      :sdate='sdate'
      :edate='edate'
      :index="quickDateIndex"
      @changeDate="onChangeDate"/>
    <a class="btn-query" @click="refresh">查询</a>
  </div>
</template>
```

## 依赖组件

DateBar 内部通过全局方法调用以下弹窗组件，请确保项目已注册：

- `app.calendar(options)`：选择单个日期
  - 入参：`{ value: string }` 当前默认日期
  - 返回：`Promise<string>` 选择的日期，如 `2025-09-01`
- `app.quickDate(options)`：快捷日期选择
  - 入参：`{ type: number, index: number, shortcuts: string[] }`
  - 返回：`Promise<{ sdate: string, edate: string, index: number }>`

在 `app.js` 中应已注册相关插件：

```javascript
Vue.use(Calendar, { router, root: app })
Vue.use(QuickDate, { router, root: app })
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| sdate | 开始日期 | String | '' | 格式如 `YYYY-MM-DD` |
| edate | 结束日期 | String | '' | 格式如 `YYYY-MM-DD` |
| index | 快捷日期下标 | Number | -1 | 传入上次选择的快捷项，便于高亮 |
| shortcuts | 快捷日期集合 | Array | `['今天','昨天','本周','最近7天','最近30天','本月','上月']` | 自定义快捷项 |
| type | 组件样式类型 | Number | 1 | 1：圆角胶囊；2：企业微信样式 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| changeDate | 日期变化后触发 | `{ sdate, edate, index }` |

## 行为说明

- 点击“开始/结束日期”会调用 `app.calendar` 分别选择日期；选择完成后进行校验：若开始日期大于结束日期，会提示并阻止。
- 点击“快捷选择”会调用 `app.quickDate`，选择后一次性返回 `{ sdate, edate, index }`。
- 组件不直接修改父级数据，而是通过 `@changeDate` 将变更回传给父组件，由父组件持有状态并刷新数据。

## 与业务结合示例

```vue
<template>
  <div>
    <date-bar :sdate="sdate" :edate="edate" :index="quickDateIndex" @changeDate="onChangeDate"/>
    <list-view :params="{ sdate, edate }"/>
  </div>
</template>

<script>
export default {
  data() {
    return { sdate: '', edate: '', quickDateIndex: -1 }
  },
  methods: {
    onChangeDate(val) {
      Object.assign(this.$data, val)
      this.refresh()
    },
    refresh() {
      // 根据 sdate/edate 拉取列表
    }
  }
}
</script>
```

## 注意事项

- 统一的日期格式约定为 `YYYY-MM-DD`；若后端需要时间戳，请在业务层转换。
- 若父组件初始值传入了 `sdate/edate`，可直接显示并继续选择。
- `index` 仅用于快捷选择的状态管理，不影响直接日期选择。
- 选择完成后组件会进行开始/结束日期的先后校验，避免错误时间区间。
