# ActionSheet 动作面板

从底部弹起的模态框，用于展示一组操作供用户选择。

::: tip Vue2 组件
此组件基于 Vue2 开发，所有示例代码都采用 Vue2 语法。适用于 Vue 2.x 项目。
:::

## 何时使用

- 需要从页面底部弹出面板展示选项时
- 需要在不离开当前页面的情况下进行快速操作
- 适用于移动端的操作选择场景
- 支持多种弹出位置和滚动内容

## 设计特色

- 🎯 **多位置支持** - 支持从底部、顶部、中心、左侧、右侧弹出
- 📱 **移动端优化** - 专为移动端交互设计
- 🎬 **流畅动画** - 内置平滑的进入和退出动画
- 📜 **滚动支持** - 集成多种滚动组件，支持长内容展示
- 🎨 **高度可定制** - 支持自定义头部、底部和内容区域

## 代码演示

### 预览（CDN 实例）

<Preview
  title="ActionSheet 预览"
  :height="320"
  html="<div style='padding:12px;position:relative;height:280px;overflow:hidden;'><button onclick='showActionSheet()'>显示动作面板</button> <button onclick='showSelectionSheet()'>多选面板</button><div id='actionsheet-demo' style='position:relative;height:240px;margin-top:10px;border:1px solid #eee;border-radius:8px;overflow:hidden;background:#f9f9f9;'></div></div>"
  js="window.showActionSheet=function(){var d=document.getElementById('actionsheet-demo');d.innerHTML='';var s=document.createElement('div');s.id='sheet';s.style.cssText='position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #eee;box-shadow:0 -2px 10px rgba(0,0,0,0.1);transform:translateY(100%);transition:transform 0.3s;';var h=document.createElement('div');h.style.cssText='text-align:center;padding:15px;border-bottom:1px solid #eee;font-weight:bold;background:#f8f8f8;';h.textContent='选择操作';s.appendChild(h);var o1=document.createElement('div');o1.style.cssText='padding:15px;cursor:pointer;border-bottom:1px solid #f0f0f0;';o1.innerHTML='📷 拍照';o1.onclick=function(){selectOption(this,'拍照')};s.appendChild(o1);var o2=document.createElement('div');o2.style.cssText='padding:15px;cursor:pointer;border-bottom:1px solid #f0f0f0;';o2.innerHTML='🖼️ 从相册选择';o2.onclick=function(){selectOption(this,'从相册选择')};s.appendChild(o2);var c=document.createElement('div');c.style.cssText='padding:15px;cursor:pointer;color:#999;';c.textContent='取消';c.onclick=closeSheet;s.appendChild(c);d.appendChild(s);setTimeout(function(){s.style.transform='translateY(0)'},10)};window.showSelectionSheet=function(){var d=document.getElementById('actionsheet-demo');d.innerHTML='';var s=document.createElement('div');s.id='sheet';s.style.cssText='position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #eee;box-shadow:0 -2px 10px rgba(0,0,0,0.1);transform:translateY(100%);transition:transform 0.3s;';var h=document.createElement('div');h.style.cssText='text-align:center;padding:15px;border-bottom:1px solid #eee;font-weight:bold;background:#f8f8f8;';h.textContent='选择老师';s.appendChild(h);var ct=document.createElement('div');ct.style.cssText='max-height:120px;overflow-y:auto;';['👨‍🏫 张老师','👩‍🏫 李老师','👨‍🏫 王老师'].forEach(function(t){var i=document.createElement('div');i.style.cssText='padding:12px 15px;cursor:pointer;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;';var sp=document.createElement('span');sp.textContent=t;i.appendChild(sp);var ch=document.createElement('span');ch.className='check';ch.textContent='☐';i.appendChild(ch);i.onclick=function(){toggleSelection(this,t)};ct.appendChild(i)});s.appendChild(ct);var f=document.createElement('div');f.style.cssText='padding:15px;display:flex;gap:10px;';var cb=document.createElement('button');cb.style.cssText='flex:1;padding:10px;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;';cb.textContent='确定';cb.onclick=confirmSelection;f.appendChild(cb);var cnb=document.createElement('button');cnb.style.cssText='flex:1;padding:10px;background:#6c757d;color:white;border:none;border-radius:4px;cursor:pointer;';cnb.textContent='取消';cnb.onclick=closeSheet;f.appendChild(cnb);s.appendChild(f);d.appendChild(s);setTimeout(function(){s.style.transform='translateY(0)'},10)};window.selectOption=function(el,value){app.toast('success','选择了：'+value);closeSheet()};window.toggleSelection=function(el,name){var check=el.querySelector('.check');if(check.textContent==='☐'){check.textContent='☑';el.style.backgroundColor='#e3f2fd'}else{check.textContent='☐';el.style.backgroundColor=''}};window.confirmSelection=function(){var selected=[];var checks=document.querySelectorAll('.check');checks.forEach(function(check){if(check.textContent==='☑'){var name=check.parentElement.querySelector('span').textContent;selected.push(name)}});if(selected.length>0){app.toast('success','已选择：'+selected.join(', '))}else{app.toast('info','未选择任何项')};closeSheet()};window.closeSheet=function(){var sheet=document.getElementById('sheet');if(sheet){sheet.style.transform='translateY(100%)';setTimeout(function(){document.getElementById('actionsheet-demo').innerHTML=''},300)}};new Vue({el:'#app'});"
/>

### 基础用法

典型的选择列表场景，支持多选操作和自定义底部按钮。

<details>
<summary>查看完整代码</summary>

```vue
<template>
  <div class="demo-actionsheet">
    <button @click="opened = true" class="demo-btn">选择老师</button>
    
    <action-sheet
      @close="close"
      position="top"
      v-show="opened"              
      :data="renderData">
      
      <!-- 主要内容区域 -->
      <div class="card">
        <div class="card-item" 
          :class="selected.indexOf(item.id) !== -1 ? 'lighHeight' : ''"
          :key="index"
          v-for="(item, index) in teacherList"
          @click="selectTeacher(item)">
          <span>{{ item.name }}</span>
          <svg v-if="selected.indexOf(item.id) === -1" class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixuanzhong1"></use>
          </svg>
          <svg v-if="selected.indexOf(item.id) !== -1" class="icon" aria-hidden="true">
            <use xlink:href="#icon-xuanzhong1"></use>
          </svg>
        </div>
      </div>
      
      <!-- 底部操作区域 -->
      <div class="operate" slot="footer">
        <div class="operate-item">
          <a class="operate-btn" @click="close">取消</a>
        </div>
        <div class="operate-item">
          <a class="operate-btn" @click="submit">确定</a>
        </div>
      </div>
    </action-sheet>
  </div>
</template>

<script>
export default {
  name: 'ActionSheetDemo',
  mixins: [app.mixin.popupWindowRouteMixin], // 使用项目的popup混入
  data() {
    return {
      opened: false,
      selected: [],
      teacherList: [
        { id: 1, name: '张老师' },
        { id: 2, name: '李老师' },
        { id: 3, name: '王老师' },
        { id: 4, name: '赵老师' },
        { id: 5, name: '陈老师' }
      ]
    }
  },
  computed: {
    renderData() {
      return {
        opened: this.opened
      }
    }
  },
  watch: {
    opened(nval) {
      if (nval) {
        this.selected = []; // 重置选择状态
      }
    }
  },
  methods: {
    selectTeacher(item) {
      let index = -1;
      if ((index = this.selected.indexOf(item.id)) === -1) {
        this.selected.push(item.id)
      } else {
        this.selected.splice(index, 1);
      }
    },
    submit() {
      if (this.selected.length === 0) {
        app.toast('info', '请先选择老师');
        return;
      }
      let selectedTeachers = [];
      this.teacherList.forEach(item => {
        if (this.selected.indexOf(item.id) !== -1) {
          selectedTeachers.push(item);
        }
      })
      
      console.log('选择的老师：', selectedTeachers);
      app.toast('success', `已选择${selectedTeachers.length}位老师`);
      this.close();
    }
  }
}
</script>

<style scoped lang="scss">
.demo-btn {
  padding: 10px 20px;
  background: #1890FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card {
  padding: 0 16px;
  .card-item {
    height: 44px;
    line-height: 44px;
    color: $color-3-s;
    @include ellipsis-single;
    @include flex-between;
    @include border-bottom(#E4E7ED);
    &.lighHeight {
      color: $color-primary;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
}

.operate {
  display: flex;
  background-color: #fff;
  .operate-item {
    flex: 1;
    padding: 6px 8px;
    font-size: 16px;
    .operate-btn {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 8px;
      padding: 9px 0;
    }
    &:first-child {
      .operate-btn {
        border: 1px solid #DCDFE6;
        color: #303133;
      }
    }
    &:last-child {
      .operate-btn {
        border: 1px solid #1890FF;
        background-color: #1890FF;
        color: #fff;
      }
    }
  }
}
</style>
```

</details>

## API

### ActionSheet Props

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| --- | --- | --- | --- | --- |
| data | 影响滚动条的数据，数据变化时将更新滚动条 | any | null |  |
| scrollerConfig | 滚动配置对象 | object | `{tag:'base', api:null, type:2, pagingOption:{}}` |  |
| maskToClose | 点击蒙层是否关闭 | boolean | true |  |
| position | 弹出位置 | string | 'bottom' |  |
| maxHeight | 最大高度限制 | number | 0 | 没用 |
| header | 头部标题文本 | string | '' |  |
| footer | 底部文本 | string | '' |  |
| scrollerStyle | 滚动容器样式 | object | - |  |
| fullParent | 侧滑时是否填充满父容器 | boolean | false |  |

### position 可选值

| 值 | 说明 |
| --- | --- |
| bottom | 从底部弹出（默认） |
| top | 从顶部弹出 |
| center | 从中心弹出 |
| sideLeft | 从左侧滑入 |
| sideRight | 从右侧滑入 |

### scrollerConfig 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 滚动组件类型 | string | 'base' |
| api | 数据接口（仅 load/super 类型） | function | null |
| type | 加载方式（仅 load/super 类型） | number | 2 |
| pagingOption | 分页配置（仅 load/super 类型） | object | {} |

### scrollerConfig.tag 可选值

| 值 | 说明 |
| --- | --- |
| base | 基础滚动 |
| load | 带加载更多的滚动 |
| super | 超级滚动（支持下拉刷新和加载更多） |
| 空字符串 | 不使用scrollbar组件，自定义滚动条 |

### ActionSheet Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭面板时触发 | (type: string) => void |
| loadData | 滚动加载数据时触发 | (promise: Promise) => void |
| loadFirst | 首次加载数据时触发 | (promise: Promise) => void |

### ActionSheet Methods

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| close(type) | 关闭面板 | type: string |
| refresh() | 刷新滚动容器 | - |

### ActionSheet Slots

| 名称 | 说明 |
| --- | --- |
| default | 主要内容区域 |
| header | 自定义头部内容 |
| footer | 自定义底部内容 |
| loadBar | 加载提示内容（仅滚动模式） |

## 使用场景

### 1. 选择列表（推荐）

最常见的使用场景，适用于多选、单选等业务需求。

<details>
<summary>查看代码示例</summary>

```vue
<template>
  <action-sheet
    @close="close"
    position="top"
    v-show="opened"              
    :data="renderData">
    
    <div class="card">
      <div class="card-item" 
        v-for="(item, index) in list"
        :key="index"
        @click="selectItem(item)">
        <span>{{ item.name }}</span>
        <!-- 选中状态图标 -->
      </div>
    </div>
    
    <div class="operate" slot="footer">
      <div class="operate-item">
        <a class="operate-btn" @click="close">取消</a>
      </div>
      <div class="operate-item">
        <a class="operate-btn" @click="submit">确定</a>
      </div>
    </div>
  </action-sheet>
</template>

<script>
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  props: {
    opened: Boolean,
    list: Array
  },
  computed: {
    renderData() {
      return { opened: this.opened }
    }
  }
}
</script>
```

</details>

### 2. 表单弹窗

从底部或侧边弹出的表单面板，适用于新增、编辑等操作。

<details>
<summary>查看代码示例</summary>

```vue
<template>
  <action-sheet 
    class="form-sheet"
    v-show="opened"
    :position="position">
    
    <div class="header" slot="header">
      <svg class="icon" @click="close">
        <use xlink:href="#icon-zuobianjiantou"></use>
      </svg>
      <span class="title">{{ title }}</span>
    </div>

    <div class="content">
      <!-- 表单内容 -->
    </div>

    <div class="footer" slot="footer">
      <a class="btn" @click="submit">确定</a>
    </div>
  </action-sheet>
</template>

<script>
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  props: {
    opened: Boolean,
    position: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>
```

</details>

### 3. 操作菜单

简单的操作选择，通常从底部弹出。

<details>
<summary>查看代码示例</summary>

```vue
<template>
  <action-sheet v-show="opened" @close="close">
    <div class="menu-list">
      <div class="menu-item" @click="handleAction('edit')">编辑</div>
      <div class="menu-item" @click="handleAction('share')">分享</div>
      <div class="menu-item" @click="handleAction('delete')">删除</div>
    </div>
  </action-sheet>
</template>

<script>
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  methods: {
    handleAction(type) {
      this.$emit('action', type)
      this.close()
    }
  }
}
</script>
```

</details>

## Vue2 集成指南

### 项目中的使用方式

ActionSheet 组件已在移动端公共库中注册，可直接使用：

```javascript
// 1. 使用推荐的 mixin（提供 close 方法等）
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  
  // 2. 定义 props 接收显示状态
  props: {
    opened: Boolean,
    // 其他业务 props
  },
  
  // 3. 使用 computed 传递数据给 ActionSheet
  computed: {
    renderData() {
      return {
        opened: this.opened
      }
    }
  }
}
```

### 常用配置模式

<details>
<summary>查看配置代码</summary>

```javascript
// 典型的组件结构
export default {
  name: 'YourComponent',
  mixins: [app.mixin.popupWindowRouteMixin],
  props: {
    opened: Boolean,
    list: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      selected: []
    }
  },
  watch: {
    opened(nval) {
      if (nval) {
        // 弹窗打开时的初始化逻辑
        this.selected = [];
      }
    }
  },
  methods: {
    // 业务逻辑方法
    submit() {
      this.$emit('confirm', this.selected);
      this.close();
    }
  }
}
```

</details>

### 样式集成

组件使用项目的 SCSS 变量和混入：

```scss
<style scoped lang="scss">
// 可以直接使用项目中的 SCSS 变量
.card-item {
  color: $color-3-s;           // 项目颜色变量
  @include ellipsis-single;    // 项目混入
  @include flex-between;       // 项目混入
  @include border-bottom(#E4E7ED); // 项目混入
}
</style>
```

## 注意事项

### Vue2 特有注意事项

1. **插槽语法**：使用 `slot="slotName"` 而不是 `#slotName`
2. **事件监听**：所有事件都需要在 `methods` 中定义处理函数
3. **响应式数据**：确保所有响应式数据都在 `data()` 函数中返回
4. **组件通信**：使用 `$emit` 和 `props` 进行父子组件通信

### 通用注意事项

1. **动画性能**：组件使用 CSS3 transform 实现动画，在移动端有更好的性能表现
2. **滚动嵌套**：当使用滚动功能时，注意避免与页面滚动冲突
3. **层级管理**：确保组件的 z-index 层级高于其他元素
4. **移动端适配**：组件专为移动端设计，在桌面端使用时注意样式调整
5. **内存管理**：及时关闭不需要的面板以释放内存

### 最佳实践

1. **使用 mixin**：推荐使用 `app.mixin.popupWindowRouteMixin` 获得标准的弹窗行为
2. **组件封装**：基于 ActionSheet 封装具体业务组件，如选择老师、选择课程等
3. **状态传递**：使用 `renderData` computed 属性传递数据给 ActionSheet
4. **事件处理**：使用 `$emit` 向父组件传递选择结果
5. **样式复用**：充分利用项目中的 SCSS 变量和混入保持风格统一

### 常见问题

**Q: 如何正确关闭弹窗？**
A: 使用 mixin 提供的 `this.close()` 方法，或在父组件中设置 `opened = false`

**Q: 如何在弹窗打开时初始化数据？**
A: 在 `watch` 中监听 `opened` 属性变化，当为 `true` 时执行初始化逻辑

**Q: 如何自定义样式？**
A: 使用项目的 SCSS 变量和混入，或添加自定义 CSS 类

**Q: 如何实现多选功能？**
A: 在 `data` 中维护 `selected` 数组，在点击事件中添加/移除选中项

**Q: position="top" 和 position="bottom" 有什么区别？**
A: `top` 从顶部弹出适合选择列表，`bottom` 从底部弹出适合操作菜单
