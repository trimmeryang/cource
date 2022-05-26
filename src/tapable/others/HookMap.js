const { HookMap, SyncHook } = require('tapable');

// 创建HookMap实例
const keyedHook = new HookMap((key) => new SyncHook(['arg']));

// 在keyedHook中创建一个name为key1的hook，同时为该hook通过tap注册事件
keyedHook.for('key1').tap('Plugin 1', (arg) => {
  console.log('Plugin 1', arg);
});

// 在keyedHook中创建一个name为key2的hook，同时为该hook通过tap注册事件
keyedHook.for('key2').tap('Plugin 2', (arg) => {
  console.log('Plugin 2', arg);
});

// 在keyedHook中创建一个name为key3的hook，同时为该hook通过tap注册事件
keyedHook.for('key3').tap('Plugin 3', (arg) => {
  console.log('Plugin 3', arg);
});

// 从HookMap中拿到name为key1的hook
const hook = keyedHook.get('key');

if (hook) {
  // 通过call方法触发Hook
  hook.call('hello');
}
