# 介绍

[简单例子](./index.js)

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

- Waterfall: 瀑布类型的钩子
  瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数
- Bail : 保险类型钩子
  如果任意一个注册函数执行返回非 undefined 的值，那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了
- Loop : 循环类型钩子
  循环类型钩子通过 call 调用时，如果任意一个注册的事件函数返回值非 undefeind ,那么会立即重头开始重新执行所有的注册事件函数，直到所有被注册的事件函数都返回 undefined
