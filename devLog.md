### 开发计划
* 先完成 tkd后端部分接口，然后根据接口显示UI；webpack 实现模块化；
* 下周完成首页及webpack监听配置；
* cdn地址：http://www.bootcdn.cn/
* 2016-02-20 完成滑动公共模块， 添加个人信息面板；
* 2016-02-21 添加提示弹层（网络错误提示等）；
* 2016-02-24 处理提示弹出层图标（雪碧图）, 搜索webpack处理雪碧图发现的[gulp + webpack 构建多页面前端项目](https://segmentfault.com/a/1190000003969465?_ea=441560)
* 2016-02-25 CSS Sprites，base64编码 理解: 1.[css Sprites](http://baike.baidu.com/link?url=lN45Y6tRGnuyJd8FxIJeWCKnBk90DwgGNiz4k2B653lqSURYfobyS1GIkkRSNDAdvlbWWL7GGFjXAsMXotdNrK)就是我们说的雪碧图啦；2.css base64(IE8+支持，包括IE8), 图片直接存储在样式表中；
* base 64优点： 1.减少了HTTP请求； 2.避免文件跨域的问题； 3.解决没有图片更新要重新上传，还要清理缓存的问题；
缺点：1.ie6 ie7不支持；2.增加了CSS文件的尺寸；（ase64编码图片本质上是将图片的二进制大小以一些字母的形式展示，例如一个1024字节的图片，base64编码后至少1024个字符，这个大小会被完全嵌入到CSS文件中）
* 2016-03-08 搜索公共模块功能开发；（待完成）

### 开发日志
* 2016-02-14
* webpack 加载css文件，首页的dom节点短时间内会有闪烁问题
* 解决：首页dom起始隐藏；
* 问题：出现跨域提示
* 解决：设置 webpack-dev-server(没使用webpack 使用 虚拟服务器：tomcat xampp), 所谓的同域：是指 协议，域名，端口都必须相同！
* [跨源资源共享 Cross Origin Resource Sharing(CORS)](http://twlidong.github.io/blog/2013/12/22/kua-yuan-zi-yuan-gong-xiang-cross-origin-resource-sharing-cors/)
* [跨域解决方案汇总](http://www.cnblogs.com/think/archive/2010/06/23/1763616.html)
* 2016-02-18 问题：为什么jq ajax请求总是不能CORS跨域，而原生xhr对象请求能成功？
* 解决：因为使用jquery时的URL没写对，`ADMIN_URL = 'localhost:8001'`改成`ADMIN_URL = 'http://localhost:8001'`


* 2017-03-14
* 升级webpack 2.0, [参考网址：](http://www.css88.com/doc/webpack2/guides/migrating/)
* `npm install webpack@<version> --save-dev` - 指定webpack版本安装；

* `webpack-dev-server --progress --colors --hot --content-base build`
* `webpack-dev-server`  --- webpack-dev-server是一个小型的Node.js Express服务器;相当于一个虚拟服务器，让脚本权限更大；
* `--progress`  --- 显示编译进度;
* `--colors`  --- 显示静态资源的颜色;
* `--hot` --- 开启热加载模式.
* `--content-base build` --- 将build目录作为根目录。（方便访问资源文件）
```
webpack-dev-server默认在当前目录提供文件服务，除非你在配置中特别指定了content base选项。
    output: {
      path: path.resolve(__dirname, 'build'),
      // publicPath: '/assets/',
      filename: 'bundle.js'
    },
    比如在webpack.config.js中写了如上的配置，如果未指定content-base，如果你想要访问到bundle.js，则需要在地址栏里写上http://localhost:5000/build/bundle.js，这个时候如果我们指定

    webpack-dev-server --content-base build/
    则可以直接通过http://localhost:5000/bundle.js访问到JS文件。
```
* css-loader  和 style-loader
* webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

* 2017-03-31 重新开发: 结构重构(使用公司内部研究框架重新实现)；

### 遗留bug:
