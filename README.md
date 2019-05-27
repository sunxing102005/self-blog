## 项目目录

  
	├── src
	│   ├── bootstrap		//启动自动执行目录
	│   ├── config			//配置目录
	│   ├── controller		//控制器目录
	│   │   ├── api			//接口控制器目录
	│   ├── extend
	│   ├── logic
	│   ├── model			//模型目录
	│   └── service
     
    ├── system       //前端vue项目目录
      ├── blog     //后台页面vue项目
      ├── build     //配置
      ├── config
	│   ├── index.html
	│   ├── package.json
	│   ├── src
	│   └── static
	├── view			//前台模版目录
	└── www				//对外开放目录
	    └── static			//静态资源
#### 启动
  首先将database.sql里面的sql数据导入mysql数据库，我起的database名字是blog,大家可以根据自己库名改config/adapter里面的配置。
  ```bash
  npm install
  # 启动服务端
  npm start
  # 启动前端服务
  cd ./sytem
  npm install
  #vue ssr，服务渲染
  npm run server
  #vue ssr，客户端渲染
  npm start
  ```
  这样就启动完成了
  
 #### 开发
 启动后访问localhost:8362，自动跳转到博客展示页面，展示博客列表。
 
 访问localhost:8362/backend，访问后台管理页面,增删改博客。
 #### 打包
 本项目博客展示页面采用了vue的ssr做服务端渲染，所以打包时，要执行npm run server，生成服务端渲染文件vue-ssr-bundile.json，
 在运行npm run build打包客户端渲染的文件。
 #### 部署
 将src,view,www/static,pm2.json,production.js放到服务器上。使用pm2管理node进程,注意修改pm2.json里cwd为项目在服务器的目录。
 常用pm2 命令
  ```bash
  pm2 start pm2.json //启动服务
  pm2 log self_blog //查看日志
  pm2 restart pm2.json //重启服务
  pm2 delete self_blog //终止服务进程
  ```
 #### 项目功能介绍
 项目的功能介绍系列：
 
 <a href="https://blog.csdn.net/qq_36228442/article/details/86715347">Vue+thinkJs博客网站（一）之vue多页面应用的webpack3配置</a>
 
 <a href="https://blog.csdn.net/qq_36228442/article/details/87913781">Vue+thinkJs博客网站（二）之thinkJs的使用</a>
 
