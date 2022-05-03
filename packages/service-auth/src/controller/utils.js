import redis from 'redis';
const redisConfig = {
  password: 'redis',
  socket: {
    port: 6379,
    host: '127.0.0.1'
  }
};
export class RedisClient {
  constructor() {
    const client = redis.createClient(redisConfig);
    client.on('ready', () => {
      console.info('redis connected successfully');
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect();
    this.redisClient = client;
    this._instance = null;
  }

  static getInstance() {
    if (!RedisClient._instance) {
      RedisClient._instance = new RedisClient();
    }
    return RedisClient._instance;
  }
}
