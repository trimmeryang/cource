[toc]

# 介绍

[简单例子](src/index.js)

# 分类

## 异步/同步

### 同步

- SyncHook
- SyncBailHook
- SyncWaterfallHook
- SyncLoopHook

### 异步

#### 串行

- AsyncSeriesHook
- AsyncSeriesBailHook
- AsyncSeriesWaterfallHook

#### 并行

- AsyncParallelHook
- AsyncParallelBailHook

## 执行机制

- Basic hook: 基础类型钩子
  执行->执行注册函数 1->执行注册函数 2->执行注册函数 3->结束
  [例子](src/index.js)

- Waterfall: 瀑布类型的钩子
  瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数
  [例子](src/SyncWaterfall.js)
- Bail : 保险类型钩子
  如果任意一个注册函数执行返回非 undefined 的值，那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了
  [例子](src/SyncBailHook.js)
- Loop : 循环类型钩子
  循环类型钩子通过 call 调用时，如果任意一个注册的事件函数返回值非 undefeind ,那么会立即重头开始重新执行所有的注册事件函数，直到所有被注册的事件函数都返回 undefined
  [例子](src/SyncLoopHook.js)

# 拦截器

它和 Axios 中的拦截器的效果非常类似。
[例子](src/others/Interception.js)

# 模块 API

## 执行顺序

### Before 属性

[例子](src/others/before.js)

### stage 属性

[例子](src/others/stage.js)

## HookMap - 辅助类

[例子](src/others/HookMap.js)

# 源码简单流程

使用 Hook.js 生成特定的 hook(如 SyncHook)，使用 HookCodeFactory.js 生成需要执行的代码， 然后执行具体的代码。
