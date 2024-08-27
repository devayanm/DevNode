const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const redisClient = redis.createClient({
  url: config.redisUrl,
});

redisClient.on('ready', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.connect().catch(console.error);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 

app.get('/', (req, res) => {
  res.send('Welcome to DevNode API');
});

module.exports = app;
