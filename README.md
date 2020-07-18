# Vue Pretty Scroll

Vue 滚动条指令插件，基于 better-scroll。

## 概述

在浏览器环境中，直接使用 overflow 属性添加滚动条，在不同操作系统，不同浏览器中，其表现可能都不一样，
需要许多额外的工作量来兼容不同的浏览器

使用 better-scroll 可以很方便的兼容所有浏览器，并且样式美观。

> 本插件封装中，内部实现了滚动区域内容更新、窗口 resize、插件配置更新 时自动 refresh 滚动条插件

## 安装

Yarn:

```bash
yarn add vue-pretty-scroll
```

Npm:

```bash
npm install vue-pretty-scroll
```

### 使用方式

```html
<templete>
    <div class="wrapper" v-pretty-scroll>
        <div class="container">
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            。。。
        </div>
    </div>
</templete>
```

若需要额外的配置，可以在使用时添加额外配置

```html
<templete>
    <div class="wrapper" v-pretty-scroll="{ scrollY: true }">
        <div class="container">
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            。。。
        </div>
    </div>
</templete>
```

若需要在 wrapper 内部某个元素中应用 better-scroll，可以传入 selector 参数，例如滚动区域封装在某个组件内部

```html
<templete>
    <div class="wrapper" v-pretty-scroll="{ selector: '.container' }">
        <!-- component 内部有一个 .container 的元素 -->
        <MyComponent>
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            。。。
        </MyComponent>
    </div>
</templete>
```

### 在手机端使用

better-scroll 默认监听了 `touch` 事件，所以在手机端直接注册插件可直接使用：

```ts
import Vue from "vue";
import PrettyScroll from "vue-pretty-scroll";

Vue.use(PrettyScroll, {
    ... // 默认 better-scroll 创建时的默认配置
});
```

### 在 PC 端使用

better-scroll 不会显示滚动条，也不会监听滚轮事件，所以需要安装额外的插件来使用

```bash
yarn add @better-scroll/core@next
yarn add @better-scroll/mouse-wheel@next
yarn add @better-scroll/scroll-bar@next
```

注册插件时需要有额外的配置

```ts
import Vue from "vue";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

Vue.use(PrettyScroll, {
    mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
    },
    scrollbar: true,
    ... // 其他配置项
});
```
