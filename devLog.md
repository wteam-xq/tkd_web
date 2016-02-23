### 开发计划
* 先完成 tkd后端部分接口，然后根据接口显示UI；webpack 实现模块化；
* 下周完成首页及webpack监听配置；
* cdn地址：http://www.bootcdn.cn/
* 2016-02-20 完成滑动公共模块， 添加个人信息面板；
* 2016-02-21 添加提示弹层（网络错误提示等）；
* 2016-02-23 处理提示弹出层图标（雪碧图）


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

### 遗留bug: