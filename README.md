# project

## Prerequisite

- node
- pnpm 
- lerna
- supervisor

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
