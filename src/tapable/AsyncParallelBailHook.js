const { AsyncParallelBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncParallelBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  return new Promise((resolve, reject) => {
    console.log('flag1 done:', arg1, arg2, arg3);
    setTimeout(() => {
      // 停止后续事件，将执行callback
      //   resolve(true);

      // 继续执行后续事件
      resolve(undefined);
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  setTimeout(() => {
    console.log('flag2 done:', arg1, arg2, arg3);
    callback();
  }, 3000);
});

hook.callAsync('a', 'b', 'c', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
