# project

## Prerequisite

- node
- pnpm 
- lerna

## Development
```
lerna bootstrap

npm run client

<!-- client -->
client: http://localhost:8089

npm run start

<!-- server -->
auth service: http://localhost:4002
products service: http://localhost:4001
users service: http://localhost:4000
middleware service: http://localhost:2000

```

## Building
```
npm run build
```

## Deployment 
```
// Deploy project after built
npm run start

auth service: http://localhost:4002
products service: http://localhost:4001
users service: http://localhost:4000
middleware service: http://localhost:2000
```

## Database setting

### mysql
```
// serviceUser/database/config.js

database: 'users',
username: 'root',
password: '123456',
port: '3306',
host: 'localhost'
```

```
// serviceAuth/database/config.js

database: 'auth',
username: 'root',
password: '123456',
port: '3306',
host: 'localhost'
```

### postgres
```text
// serviceProducts/database/config.js

database: 'products',
username: 'postgres',
password: '123456',
port: '5432',
host: 'localhost'
```

### redis
## server
```
<!-- mac -->
# 安装 redis
➜ brew install redis

# 启动 redis 服务端
➜ redis-server

# 启动 redis 客户端
➜ redis-cli

# 编辑默认配置文件
➜ sudo vim /usr/local/etc/redis.conf
```

```
// serviceInit/src/config.js

<!-- 密码替换成自己设置的密码， 如没设，不需要 password 字段 -->
password: "xxxxxx",
socket: {
    port: 6379,
    host: "127.0.0.1"
}

```

### TODOLIST

#### version 1
- 支持不同版本 vue/react
- 完善webpack配置
- 阿波罗gateway接入 - 支持Redis权限校验 - graphql  
- docker image
- k8s 调用
- 数据库初始化脚本
- readme 使用文档更新

#### version 2
- ci cd 环境
- docker image ci cd
- 可视化，可配置初始化项目
- readme 使用文档更新
- sharing........

#### version 3
- 引入git flow，源码审核流程
- 项目引入ts，单元测试
- 支持vite, rollup打包，单元测试配置
- 支持微前端qiankun构建、单独部署
- 支持可配置mongodb、oracle数据库
- 支持可配置ci cd
- readme 使用文档更新

#### version 4
- 单元测试
- 支持每个package热插拔式单独打包
- 支持每个package单独可视化
- 初始化更简单的demo
- readme 使用文档更新
