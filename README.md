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
  # 启动服务端
  npm install
  npm start
  # 启动前端服务
  cd ./sytem
  npm install
  npm start
  ```
  这样就启动完成了
  
 #### 进入页面
 启动后访问localhost:8362，自动跳转到博客展示页面，展示博客列表。
 
 访问localhost:8362/backend，访问后台管理页面。点击文章管理，可以编辑，删除现有文章，点击发布文章新增文章。
 
 项目的功能介绍系列：<a href="https://blog.csdn.net/qq_36228442/article/details/86715347">Vue+thinkJs博客网站（一）之vue多页面应用的webpack3配置</a>
 
