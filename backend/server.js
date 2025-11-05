// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const developerRoutes = require('./routes/developerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quotes', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/blogs', blogRoutes);

// health check
app.get('/', (req, res) => res.send({ success: true, msg: 'API is running' }));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
