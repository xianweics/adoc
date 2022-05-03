# project

## Prerequisite

- node
- pnpm 

## Development
```
pnpm install

pnpm run dev

<!-- client -->
client: http://localhost:8089

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
- 支持不同版本 vue3/react16?
- 阿波罗gateway接入 - 支持Redis权限校验 - graphql
- docker image 
- k8s 调用
- 数据库初始化脚本: docker init
- readme 使用文档更新

#### version 2
- ci cd 环境: jenkins, gitlab/github, sonar
- docker image ci cd
- readme 使用文档更新
- sharing........

#### version 3
- 可视化，可配置初始化项目

#### version 4
- 引入git flow，源码审核流程
- 项目引入ts，单元测试, webpack更多插件
- 支持vite, rollup打包，单元测试配置
- 支持微前端qiankun构建、单独部署
- 支持可配置mongodb、oracle、memocache数据库
- 支持可配置ci cd
- readme 使用文档更新

#### version 5
- 写单元测试
- 支持每个package热插拔式单独打包
- 初始化更简单的demo
- readme 使用文档更新

#### version 6
- 预发布：内网、外网部署
- 发布：灰度发布策略，回滚机制
- 日志：整合分析策略
- 监控：前端/sentry? 
- 后端：普罗米修斯 - 微服务/pm2可视化等

#### version 7
- 动态可视化流程架构图
- 可添加式的架构

### 补充

