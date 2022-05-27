[toc]

# 简单示例

从如下渠道复制[示例代码](https://github.com/tangxiaojun1996/mywebpack)

# 流程

init->run->make->build->seal->emit

- init:
  1. 初始化 options 参数 - 合并配置文件和 cli 中的参数，并赋予初始值
  2. 实例化 Compiler 对象
  3. 初始化默认的和配置的插件
  4. 调用 compiler 的 run 方法开始编译
- run (compiler):
  1. 实例化 Compilation
  2. 执行各个 plugins 里面的的 make hook ，如 EntryPlugin, DynamicEntryPlugin, DllEntryPlugin
- make (EntryPlugin 举例):
  1. 根据依赖的类型获取对应模块工厂 moduleFactory, 如 NormalModuleFactory
  2. 调用 moduleFactory 的 create 方法，创建模块 module
  3. 调用 buildModule 方法，其核心是使用 loaders 和 parser 解析 module
  4. 解析完成回到 create 的回调中，继续分析该模块的依赖项，并递归解析处理其依赖
  5. 处理结束后，回到 make 的回调中，执行 compilation.finish，准备进入 seal 阶段
- seal: 密封
  1. 根据 entry 生成 chunk 图
  2. 生成构建 hash
  3. 生成 chunk 对应的资源，保存在 compilation.assets 中
- emit: 把 bundler 写到 dist 文件中

# 总结

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

# hooks

以官网为准
[compiler hooks](https://webpack.js.org/api/compiler-hooks/)
