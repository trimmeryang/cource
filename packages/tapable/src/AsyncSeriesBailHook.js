const { AsyncSeriesBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件, tapPromise 中不会有callback
hook.tapPromise('flag1', (arg1, arg2, arg3, callback) => {
  console.log('flag1:', arg1, arg2, arg3);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve函数存在任何值表示存在返回值
      // 1. 存在返回值 bail保险打开 中断后续执行
      //   resolve(true);

      // 2. 如果返回值为undefined， 执行后续事件
      resolve(undefined);
    }, 1000);
  });
});

// flag2 不会被执行了
hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  console.log('flag2:', arg1, arg2, arg3);
  setTimeout(() => {
    // 1. 不传参数，继续执行
    callback();
    // 2 传递参数， 结束执行
    // callback('参数来了');
  }, 1000);
});

hook.tapAsync('flag3', (arg1, arg2, arg3, callback) => {
  console.log('flag3:', arg1, arg2, arg3);
  setTimeout(() => {
    callback('参数来了');
  }, 1000);
});

// 调用事件并传递执行参数
hook.callAsync('a', 'b', 'c', (arg) => {
  console.log('全部执行完毕 done', arg);
  console.timeEnd('timer');
});
