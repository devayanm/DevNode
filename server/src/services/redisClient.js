const redis = require('redis');
const config = require('../config');

const redisClient = redis.createClient({
  url: config.redisUrl,
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
