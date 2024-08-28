const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoute = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/posts/:id/comments', commentRoutes);
app.use('/api/cloud', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
