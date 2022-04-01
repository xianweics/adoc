# project

## Prerequisite

- node
- pnpm 
- lerna

## Development
```
lerna bootstrap
npm run dev

auth service: http://localhost:4002
products service: http://localhost:4001
users service: http://localhost:4000
middleware service: http://localhost:3000
client: http://localhost:8000
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
client service: http://localhost:3000
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
```
1. 支持不同版本 vue/react
2. 完善webpack配置
3. api权限
```