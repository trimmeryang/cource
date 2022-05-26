/**
 * 如果任意一个注册函数执行返回非 undefined 的值，
 * 那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了
 */
const { SyncBailHook } = require('tapable');

const hook = new SyncBailHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1:', arg1, arg2, arg3);
  // 存在返回值 阻断flag2事件的调用
  return true;
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('a', 'b', 'c');
