/**
 * 如果同时使用 before 和 stage 时，优先会处理 before ，在满足 before 的条件之后才会进行 stage 的判断。
 * 不建议混用
 */
const { SyncHook } = require('tapable');

const hooks = new SyncHook();

hooks.tap(
  {
    name: 'flag1',
    stage: 1
  },
  () => {
    console.log('This is flag1 function.');
  }
);

hooks.tap(
  {
    name: 'flag2'
    // 默认为stage: 0,
  },
  () => {
    console.log('This is flag2 function.');
  }
);

hooks.call();
