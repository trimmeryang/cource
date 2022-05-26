const { AsyncSeriesHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件, 实参结尾额外接受一个 callback ，调用 callback 表示本次事件执行完毕。
hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
  console.log('flag1:', arg1, arg2, arg3);
  setTimeout(() => {
    // 1s后调用callback表示 flag1执行完成，
    /**
     * callback 类似使用这样的参数机制 callback(err, ...args)
     * 所以当有第一个参数时，退出事件流。
     * 第二个参数表示返回的数据
     */
    // 如果不传递callback，不会执行后续事件
    callback();
    // callback('结束');
    // callback(null, 'data');
  }, 1000);
});

hook.tapPromise('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
  // tapPromise返回Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve();

      // 如果有错误，不会执行后续事件
      reject('error');
    }, 1000);
  });
});

hook.tapPromise('flag3', (arg1, arg2, arg3) => {
  console.log('flag3:', arg1, arg2, arg3);
  return Promise.resolve('ok');
});

// 调用事件并传递执行参数
hook.callAsync('a', 'b', 'c', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
