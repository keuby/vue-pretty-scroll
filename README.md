# Vue Pretty Scroll

Vue 滚动条指令插件，基于 [better-scroll](https://better-scroll.github.io/docs/zh-CN/)。

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

然后在 Vue 中注册该插件

```ts
import Vue from "vue";
import PrettyScroll from "vue-pretty-scroll";

Vue.use(PrettyScroll, {
    // 支持鼠标滚轮，手机端不需要该配置
    mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
    },
    // 显示滚动条，手机端可不需要该该配置
    scrollbar: {
        fade: false,
        interactive: true,
    },
    ... // 其他配置项
});
```

## 使用方式

### 容器样式

滚动内容必须放置在一个容器下，该容器至少需要如下三个要素

1. 确保 wrapper 至少某一个方向上大小固定
2. overflow 为 hidden
3. position 为 relative 或者 absolute

```html
<style>
    .wrapper {
        position: relative;
        height: 300px;
        overflow: hidden;
    }
</style>
```

### directive

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

若需要在 wrapper 内部某个元素中应用 better-scroll，可以传入 selector 参数，
例如在使用第三方组件库时，滚动区域封装在某个组件内部

```html
<templete>
    <div class="app">
        <!-- Card 组件 内部有一个 .card-body 的元素 -->
        <Card v-pretty-scroll="{ selector: '.card-body' }">
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            <p>内容内容内容内容内容</p>
            。。。
        </Card>
    </div>
</templete>
```

### component

> component 使用的函数式组件，并且使用了 props 的隐式解析，所以 vue 版本必须大于 2.3.0

```html
<div class="wrapper">
    <pretty-scroll id="aaa" class-name="container">
        <p>使用 component 不带 wrapper</p>
        <p>测试测试测试测试测试测试测试测试</p>
        <p>测试测试测试测试测试测试测试测试</p>
        // ....
    </pretty-scroll>
</div>
```

上述方法中，pretty-scroll 必须显式放置在一个的容器中，[容器样式参考](#容器样式)，
也可以使用 has-wrapper 属性使组件自己生成一个 wrapper

```html
<pretty-scroll id="aaa" class="wrapper" class-name="container" has-wrapper>
    <p>使用 component 不带 wrapper</p>
    <p>测试测试测试测试测试测试测试测试</p>
    <p>测试测试测试测试测试测试测试测试</p>
    // ....
</pretty-scroll>
```

使用 component 时，所有的 prop 会自动解析为 better-scroll 的配置参数

```html
<pretty-scroll
    id="aaa"
    class="wrapper"
    class-name="container"
    :free-scroll="true"
    :disable-mouse="false"
    :disable-touch="false"
    has-wrapper
>
    <p>使用 component 不带 wrapper</p>
    <p>测试测试测试测试测试测试测试测试</p>
    <p>测试测试测试测试测试测试测试测试</p>
    // ....
</pretty-scroll>
```

## 使用 better-scroll 插件

vue-pretty-scroll 基于 better-scroll 封装，支持 better-scroll 所有插件功能

> 下面以 [zoom](https://better-scroll.github.io/docs/zh-CN/plugins/zoom.html) 插件为例子

安装方式:

1. 安装 [better-scroll 插件](https://better-scroll.github.io/docs/zh-CN/plugins/)

    ```bash
    npm install @better-scroll/zoom@next --save
    # or
    yarn add @better-scroll/zoom@next
    ```

1. 使用

    ```ts
    import Vue from "vue";
    import BScroll from '@better-scroll/core'
    import Zoom from '@better-scroll/zoom'
    import PrettyScroll from "vue-pretty-scroll";

    BScroll.use(Zoom)

    Vue.use(PrettyScroll, {
        zoom: {
            start: 1,
            min: 0.5,
            max: 2
        }
        ... // 其他配置项
    });
    ```
