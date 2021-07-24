# vue3.0+vite+element-plus

##  项目搭建

### 1、使用 npm 进行安装

```
$ npm init vite-app 项目名
$ cd vant-v3
$ npm install
$ npm run dev
```

package.json 文件做响应的配置

**dependencies**

```
$ npm install vue-router@next    #安装路由模块
$ npm install element-plus       #安装element3.0
$ npm install js-md5             #前端加密工具
$ npm install pushstate-server   #本地启用临时服务器，局域网可访问
$ npm install qs                 #将 url 解析成对象形式
$ npm install wangeditor         #富文本编辑器
```

**devDependencies**

```
$ npm install @babel/core         #将e6代码转成e5 处理兼容
$ npm install @babel/runtime      # 解决babel 不转换新的API问题
$ npm install @rollup/plugin-babel  #
$ npm install @vitejs/plugin-vue   # 支持vue
$ npm install  "@vue/compiler-sfc": "^3.0.5",
    "babel": "^6.23.0",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-import": "^1.13.3",
    "element-theme-chalk": "^2.15.1",
    "vite": "^2.0.1",
    "vite-babel-plugin": "^0.0.2",
    "vite-plugin-babel-import": "^2.0.2",
    "vite-plugin-imp": "^2.0.4"
```

**scripts 命令更改**

```
    "dev": "vite --mode development",
    "build:beta": "vite build --mode beta",
    "build:release": "vite build --mode release",
    "serve": "vite preview"
```

### 2、新建 vite.config.js 增加配置

